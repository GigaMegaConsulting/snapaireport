import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isLocale, isNiche, type Locale, type NicheKey } from "@/lib/i18n";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30; // generous — actual work is one HTTP call

interface FormAnswers {
  email?: string;
  fullName?: string;
  businessName?: string;
  businessDescription?: string;
  yearsOperating?: string;
  teamSize?: string;
  teamLocation?: string;
  operationsWalkthrough?: string;
  toolsInUse?: string;
  leadSources?: string;
  bottlenecks?: string;
  priorAiExperience?: string;
  techComfortScore?: string;
  twelveMonthGoals?: string;
  automationWish?: string;
  anythingElse?: string;
  locale?: string;
  niche?: string;
  // Honeypot field — real users never see it (hidden via CSS). Bots that fill
  // every input will populate it, and we silently drop the submission.
  companyWebsite?: string;
}

// fullName is intentionally NOT required — the form lets users skip it.
const REQUIRED: (keyof FormAnswers)[] = [
  "email",
  "businessName",
  "businessDescription",
  "yearsOperating",
  "teamSize",
  "teamLocation",
  "operationsWalkthrough",
  "toolsInUse",
  "leadSources",
  "bottlenecks",
  "priorAiExperience",
  "techComfortScore",
  "twelveMonthGoals",
  "automationWish",
];

/** Build the Q&A transcript that the Mac mini's worker will feed to Claude. */
function buildTranscript(a: FormAnswers): string {
  const sections: [string, string][] = [
    ["Q: What does your business do, and how long have you been operating?", `A: ${a.businessName} — ${a.businessDescription} They have been operating for ${a.yearsOperating}.`],
    ["Q: How many employees do you have, and are they local or remote?", `A: ${a.teamSize}. ${a.teamLocation}.`],
    ["Q: Walk me through your main day-to-day operations — what happens from when a customer reaches out to when you deliver?", `A: ${a.operationsWalkthrough}`],
    ["Q: What software or tools does your team use daily?", `A: ${a.toolsInUse}`],
    ["Q: Where do most of your leads or customers come from right now?", `A: ${a.leadSources}`],
    ["Q: What are your biggest bottlenecks — the things that slow you down or take too much time?", `A: ${a.bottlenecks}`],
    ["Q: Have you tried using AI or automation in your business before? What happened?", `A: ${a.priorAiExperience}`],
    ["Q: On a scale of 1–10, how comfortable is your team with new technology?", `A: ${a.techComfortScore}/10.`],
    ["Q: What does success look like for you in the next 12 months?", `A: ${a.twelveMonthGoals}`],
    ["Q: If you could automate one thing in your business tomorrow, what would it be?", `A: ${a.automationWish}`],
  ];
  let transcript = sections.map(([q, ans]) => `${q}\n${ans}`).join("\n\n");
  const extra = (a.anythingElse ?? "").trim();
  if (extra) {
    transcript += `\n\n[ADDITIONAL CONTEXT FROM CLIENT — weight this heavily when tailoring the report]\n${extra}`;
  }
  return transcript;
}

/**
 * Commit a JSON file to the queue repo via the GitHub Contents API.
 *
 * The queue repo lives at GITHUB_QUEUE_REPO (e.g. "GigaMegaConsulting/snapaireport-queue")
 * and the file lands at pending/<uuid>.json. The Mac mini OpenClaw cron polls
 * this directory every 2 minutes and processes each entry.
 */
async function commitToQueue(
  repo: string,
  token: string,
  path: string,
  contentBase64: string,
  message: string,
): Promise<{ ok: boolean; sha?: string; error?: string }> {
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, content: contentBase64 }),
  });
  if (!res.ok) {
    return { ok: false, error: `GitHub ${res.status}: ${(await res.text()).slice(0, 400)}` };
  }
  const data = (await res.json()) as { content?: { sha?: string } };
  return { ok: true, sha: data.content?.sha };
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: FormAnswers;
  try {
    body = (await request.json()) as FormAnswers;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // ── Abuse guards ───────────────────────────────────────────────────
  // 1. Honeypot: real users never see/fill this hidden field. Bots usually do.
  //    Respond 200 OK so bots can't differentiate "rejected" from "accepted".
  if (body.companyWebsite && body.companyWebsite.trim() !== "") {
    console.warn("[submit-assessment] honeypot tripped", {
      ip: getRequestIp(request),
      userAgent: request.headers.get("user-agent")?.slice(0, 120),
    });
    return NextResponse.json({ ok: true, id: randomUUID(), queued: false }, { status: 200 });
  }

  // 2. Missing User-Agent — almost all real browsers send one. Most basic
  //    bots forget. Reject with a generic 400.
  const userAgent = request.headers.get("user-agent");
  if (!userAgent || userAgent.length < 8) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 3. Per-IP rate limit (best-effort, in-memory).
  const ip = getRequestIp(request);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many submissions from this address. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const missing = REQUIRED.filter((k) => !body[k] || String(body[k]).trim() === "");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const id = randomUUID();
  const submittedAt = new Date().toISOString();
  const clientName = body.fullName?.trim() || body.businessName!.trim();
  const clientEmail = body.email!.trim();
  const businessName = body.businessName!.trim();
  const locale: Locale = isLocale(body.locale) ? body.locale : "en";
  const niche: NicheKey | undefined = isNiche(body.niche) ? body.niche : undefined;
  const transcript = buildTranscript(body);

  const submission = {
    id,
    submittedAt,
    locale,
    niche,
    clientName,
    clientEmail,
    businessName,
    transcript,
    answers: body, // keep the full raw form for audit
  };

  const repo = process.env.GITHUB_QUEUE_REPO;
  const token = process.env.GITHUB_QUEUE_TOKEN;

  if (!repo || !token) {
    // Soft failure: store nothing, but acknowledge so the user isn't dropped.
    // Operator must check Vercel env vars.
    console.error("[submit-assessment] queue env vars missing", { hasRepo: !!repo, hasToken: !!token });
    return NextResponse.json(
      {
        ok: true,
        id,
        warning: "Submission received, but queue is not configured — operator notified.",
      },
      { status: 200 },
    );
  }

  const contentBase64 = Buffer.from(JSON.stringify(submission, null, 2), "utf8").toString("base64");
  const commitResult = await commitToQueue(
    repo,
    token,
    `pending/${id}.json`,
    contentBase64,
    `submission ${id} (${niche ?? "general"} · ${locale})`,
  );

  if (!commitResult.ok) {
    console.error("[submit-assessment] queue commit failed:", commitResult.error);
    // Still acknowledge — we have the data in this function's logs and
    // we don't want to surface a 500 to the user.
    return NextResponse.json(
      {
        ok: true,
        id,
        warning: "Submission received. Backend handoff hit a snag; operator notified.",
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      id,
      queued: true,
      eta: "2-5 minutes",
    },
    { status: 200 },
  );
}
