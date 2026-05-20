import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 15;

/**
 * Public unsubscribe endpoint — receives clicks from cold-email "unsubscribe"
 * links and one-click POSTs from Gmail/Outlook (RFC 8058 List-Unsubscribe-Post).
 *
 * What it does:
 *   1. Read `lid` (lead ID) from query string OR body.
 *   2. Commit an entry to the queue repo at `unsubscribes/<lid>.json` via the
 *      GitHub Contents API — same pattern as submit-assessment writes
 *      `pending/<uuid>.json`. The Mac mini worker polls this directory and
 *      flips the matching lead to `opted-out` locally.
 *   3. Return an HTML confirmation page (or 200 for one-click POST).
 *
 * Env vars (set in Vercel):
 *   - GITHUB_QUEUE_REPO  e.g. "GigaMegaConsulting/snapaireport-queue"
 *   - GITHUB_QUEUE_TOKEN  GitHub PAT with repo write
 *
 * CASL: unsubscribes must be processed within 10 business days. We commit
 * within seconds and the worker applies the opt-out on its next poll
 * (≤ 2 min). The confirmation page tells the user it's done.
 */

const CONFIRMATION_HTML_EN = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Unsubscribed · SnapReport</title>
<style>
  body { font-family:-apple-system,BlinkMacSystemFont,sans-serif; background:#efeae0; color:#1a1a1a; max-width:480px; margin:8vh auto; padding:0 24px; line-height:1.6; }
  h1 { font-family: Georgia, serif; font-weight: 400; margin: 0 0 16px; }
  p { color: #444; }
  .muted { color:#888; font-size:13px; margin-top:32px; }
</style>
</head>
<body>
  <h1>You're unsubscribed.</h1>
  <p>I won't email you again from SnapReport. Sorry for the bother.</p>
  <p>— Jérôme</p>
  <p class="muted">SnapReport · Montréal, Québec, Canada</p>
</body>
</html>`;

const CONFIRMATION_HTML_FR = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Désabonné · SnapReport</title>
<style>
  body { font-family:-apple-system,BlinkMacSystemFont,sans-serif; background:#efeae0; color:#1a1a1a; max-width:480px; margin:8vh auto; padding:0 24px; line-height:1.6; }
  h1 { font-family: Georgia, serif; font-weight: 400; margin: 0 0 16px; }
  p { color: #444; }
  .muted { color:#888; font-size:13px; margin-top:32px; }
</style>
</head>
<body>
  <h1>Vous êtes désabonné.</h1>
  <p>Je ne vous écrirai plus de SnapReport. Désolé du dérangement.</p>
  <p>— Jérôme</p>
  <p class="muted">SnapReport · Montréal, Québec, Canada</p>
</body>
</html>`;

const ERROR_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Unsubscribe error · SnapReport</title>
<style>
  body { font-family:-apple-system,BlinkMacSystemFont,sans-serif; background:#efeae0; color:#1a1a1a; max-width:520px; margin:8vh auto; padding:0 24px; line-height:1.6; }
  h1 { font-family: Georgia, serif; font-weight: 400; margin: 0 0 16px; }
  p { color: #444; }
  a { color: #333; }
</style>
</head>
<body>
  <h1>Something went wrong.</h1>
  <p>I couldn't process the unsubscribe request right now. Please email
  <a href="mailto:unsubscribe@snapaireport.com">unsubscribe@snapaireport.com</a>
  with the address you'd like removed, and I'll handle it personally.</p>
  <p>— Jérôme · SnapReport</p>
</body>
</html>`;

interface UnsubscribePayload {
  leadId: string;
  receivedAt: string;
  source: "link-click" | "list-unsubscribe-one-click";
  ip?: string;
  userAgent?: string;
}

/**
 * Commit a JSON file to the queue repo via the GitHub Contents API.
 * Same pattern as submit-assessment.ts.
 */
async function commitToQueue(
  repo: string,
  token: string,
  path: string,
  contentBase64: string,
  message: string,
): Promise<{ ok: boolean; error?: string }> {
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
  return { ok: true };
}

function detectLocale(req: NextRequest): "en" | "fr" {
  const al = req.headers.get("accept-language") ?? "";
  return al.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

async function handleUnsubscribe(
  req: NextRequest,
  leadId: string,
  source: UnsubscribePayload["source"],
): Promise<{ ok: boolean; error?: string }> {
  if (!leadId || !/^[a-z0-9-]{8,64}$/i.test(leadId)) {
    return { ok: false, error: "missing-or-invalid-lid" };
  }
  const repo = process.env.GITHUB_QUEUE_REPO;
  const token = process.env.GITHUB_QUEUE_TOKEN;
  if (!repo || !token) {
    // Soft-fail: confirm to the user anyway (CASL requires we honour the
    // request even if our backend hiccups) and log loudly for operator.
    console.error("[email-unsubscribe] queue env vars missing", {
      hasRepo: !!repo, hasToken: !!token, leadId,
    });
    return { ok: false, error: "config-missing" };
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? undefined;
  const userAgent = req.headers.get("user-agent")?.slice(0, 200) ?? undefined;
  const payload: UnsubscribePayload = {
    leadId,
    receivedAt: new Date().toISOString(),
    source,
    ip,
    userAgent,
  };
  const contentBase64 = Buffer.from(JSON.stringify(payload, null, 2), "utf8").toString("base64");
  // Path: unsubscribes/<timestamp>-<lid>.json — timestamp avoids 409 if
  // somebody clicks twice (each click is a separate file).
  const stamp = payload.receivedAt.replace(/[:.]/g, "-");
  const path = `unsubscribes/${stamp}-${leadId}.json`;
  return commitToQueue(repo, token, path, contentBase64, `unsubscribe ${leadId}`);
}

// ── GET: user clicked the link in the email ──────────────────────────
export async function GET(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const leadId = url.searchParams.get("lid") ?? "";
  const result = await handleUnsubscribe(req, leadId, "link-click");
  const locale = detectLocale(req);
  if (!result.ok) {
    // Tell the user it didn't work and give them a fallback mailto.
    // We still 200 so Resend / mail clients don't retry; the user has an
    // actionable next step (the mailto link).
    return htmlResponse(ERROR_HTML, 200);
  }
  return htmlResponse(locale === "fr" ? CONFIRMATION_HTML_FR : CONFIRMATION_HTML_EN);
}

// ── POST: RFC 8058 one-click unsubscribe (Gmail / Outlook etc.) ───────
// Mail clients POST here without rendering a page; we just need 200 OK.
export async function POST(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  let leadId = url.searchParams.get("lid") ?? "";
  if (!leadId) {
    // Some clients send the lid in the body as form-encoded
    try {
      const body = await req.text();
      const params = new URLSearchParams(body);
      leadId = params.get("lid") ?? "";
    } catch {
      // ignore
    }
  }
  const result = await handleUnsubscribe(req, leadId, "list-unsubscribe-one-click");
  if (!result.ok) {
    console.error("[email-unsubscribe] one-click failed", { leadId, error: result.error });
    // 200 anyway — RFC 8058 wants the client to consider it handled, and
    // we have the lid in the failure log to manually reconcile.
  }
  return NextResponse.json({ ok: true });
}
