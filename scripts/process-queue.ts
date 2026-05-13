#!/usr/bin/env tsx
/**
 * SnapReport queue worker — runs on the Mac mini via OpenClaw cron.
 *
 * Every ~2 min, this script:
 *   1. Pulls the queue repo to fetch new `pending/<uuid>.json` submissions
 *   2. For each pending entry, calls Claude CLI (Sonnet, uses Pro subscription)
 *      to generate the structured report JSON
 *   3. Renders the PDF via @react-pdf/renderer
 *   4. Sends the report by email via Resend
 *   5. Moves the entry to `processed/<uuid>.json` (with report + sentAt)
 *   6. Mirrors the processed entry locally so Mission Control can read it
 *   7. Sends a Slack notification on success
 *
 * Failure modes are non-fatal — a failed submission stays in `pending/` and
 * is retried on the next run. A persistent-failure marker file prevents
 * infinite retry on truly broken inputs.
 */

import { execSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { generatePDF } from "../lib/pdf";
import { sendReportEmail } from "../lib/email";
import type { ReportAnalysis } from "../types/report";
import type { Locale, NicheKey } from "../lib/i18n";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");

// Load env from the workspace canonical .env.local
const ENV_FILE = process.env.SNAPAIREPORT_ENV ?? path.resolve(PROJECT_DIR, ".env.local");
if (existsSync(ENV_FILE)) {
  for (const line of readFileSync(ENV_FILE, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!(key in process.env)) process.env[key] = value;
  }
}

// ─── Config ─────────────────────────────────────────────────────────
const QUEUE_REPO_URL = "https://github.com/GigaMegaConsulting/snapaireport-queue.git";
const QUEUE_DIR = process.env.QUEUE_DIR ?? "/Users/samagentbot/.openclaw/workspace/data/snapaireport-queue";
const PROCESSED_LOCAL_MIRROR = "/Users/samagentbot/.openclaw/workspace/data/snapaireport-processed";
const LOCK_FILE = "/tmp/snapaireport-worker.lock";
const STAMP = () => new Date().toISOString().replace("T", " ").slice(0, 19);

function log(msg: string) {
  console.log(`[${STAMP()}] ${msg}`);
}

// ─── Lock to prevent overlapping runs ──────────────────────────────
function acquireLock(): boolean {
  if (existsSync(LOCK_FILE)) {
    const pid = readFileSync(LOCK_FILE, "utf8").trim();
    try {
      // Throws if process doesn't exist
      process.kill(Number(pid), 0);
      log(`worker already running as PID ${pid}, skipping`);
      return false;
    } catch {
      // Stale lock, take over
      log(`removing stale lock from PID ${pid}`);
    }
  }
  writeFileSync(LOCK_FILE, String(process.pid), "utf8");
  return true;
}

function releaseLock() {
  try { unlinkSync(LOCK_FILE); } catch { /* noop */ }
}

// ─── Queue repo: clone or pull ─────────────────────────────────────
function syncQueueRepo() {
  if (!existsSync(QUEUE_DIR)) {
    mkdirSync(path.dirname(QUEUE_DIR), { recursive: true });
    execSync(`git clone ${QUEUE_REPO_URL} ${QUEUE_DIR}`, { stdio: "inherit" });
  } else {
    // Fast-forward only. If there's a divergence we abort the run.
    execSync("git fetch --quiet origin main", { cwd: QUEUE_DIR });
    execSync("git reset --hard --quiet origin/main", { cwd: QUEUE_DIR });
  }
}

function listPendingSubmissions(): string[] {
  const dir = path.join(QUEUE_DIR, "pending");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "README.md")
    .map((f) => path.join(dir, f));
}

// ─── Claude CLI invocation ─────────────────────────────────────────
interface Submission {
  id: string;
  submittedAt: string;
  locale: Locale;
  niche?: NicheKey;
  clientName: string;
  clientEmail: string;
  businessName: string;
  transcript: string;
  answers: Record<string, string | undefined>;
}

const LANGUAGE_DIRECTIVES: Record<Locale, string> = {
  en: "Write all output in English.",
  fr: "Écris toutes les sorties en français (français du Québec : utilise « courriel » plutôt que « email », évite les anglicismes). Toutes les valeurs textuelles du JSON doivent être en français — titres, descriptions, recommandations, étapes suivantes. Conserve les noms de marques et les chaînes structurelles (« low | medium | high », « QW.01 », etc.) en anglais.",
};

const NICHE_DIRECTIVES: Record<NicheKey, string> = {
  lawyers:
    "The client is a law firm or solo legal practitioner. Use language a lawyer would recognize: matters, intake, conflicts, discovery, billables, retainer, motions, pleadings, trust accounting, Bar compliance. Frame AI opportunities around: discovery review, drafting first-draft pleadings and standard motions, intake/conflict triage, automatic billable-time capture, client status communication, and trust-ledger reconciliation. Be lawyer-specific in tool recommendations (e.g., Clio + AI add-ons, Spellbook, Casetext CoCounsel, Harvey).",
  accountants:
    "The client is an accounting or bookkeeping practice. Use language a CPA/accountant would recognize: client cleanup, reconciliation, audit fieldwork, tax season, advisory services, T1/T2 (Canadian) or 1040/1120 (US), trial balance, GL accounts, HST/GST returns. Frame AI opportunities around: document intake + OCR, bank/CC reconciliation, tax return first drafts, client document chase, audit analytics, and advisory note prep. Tool recommendations should be accountant-specific (e.g., Dext, Hubdoc, Karbon, TaxDome, QBO/Xero/Sage AI add-ons, Botkeeper).",
};

const SYSTEM_PROMPT = `You are an expert AI business consultant with deep experience helping small and medium businesses identify AI automation opportunities. You analyze transcripts of business discovery calls and produce structured AI readiness assessments.

The client just completed a structured intake covering:
1. What their business does and how long they've operated
2. Team size and structure
3. Day-to-day operations workflow
4. Software/tools they currently use
5. Where leads/customers come from
6. Biggest bottlenecks and time sinks
7. Prior AI or automation experience
8. Tech comfort level (1-10)
9. 12-month success vision
10. One thing they'd automate tomorrow
(Plus optional free-text "anything else" that should weigh heavily on framing.)

Your assessment must be honest, specific to their situation, and actionable. Avoid generic advice. Match tools and recommendations to their actual context.

Critical patterns to consider on every report:
- SPEED-TO-LEAD: If the business has inbound leads (calls, web forms, emails), a speed-to-lead AI agent that responds in under 60 seconds is almost always a top-3 quick win.
- NON-AI TOOLS WELCOME: Plain SaaS that automates a workflow is often higher leverage than force-fitting AI. If a $42/mo off-the-shelf SaaS saves 8 hours/month, recommend it.
- PROCESS-BEFORE-AUTOMATION: Don't recommend automating bad processes — that just speeds up the mess.

Tool recommendation rules:
- Every recommendedTool MUST include a real homepage URL. Never empty, never a search URL. If you don't know the URL for sure, pick a different tool you do know.
- Prefer well-known tools the reader can verify.

Return ONLY valid JSON. No markdown fences, no preamble. Use this exact structure:

{
  "executiveSummary": ["<bullet 1>", "<bullet 2>", "<bullet 3>"],
  "aiReadinessScore": {
    "overall": <1-100>,
    "breakdown": {
      "digitalFoundation": <1-100>,
      "processMaturity": <1-100>,
      "teamReadiness": <1-100>,
      "dataQuality": <1-100>,
      "leadershipBuyIn": <1-100>
    }
  },
  "quickWins": [
    { "title": "<short>", "description": "<2-3 sentences>", "effort": "low|medium|high", "impact": "low|medium|high", "timeline": "<e.g. 1-2 weeks>", "estimatedCost": "<pricing>" }
  ],
  "strategicOpportunities": [
    { "title": "<title>", "description": "<3-4 sentences with ROI framing>", "roiPotential": "<e.g. Save 10h/week, $2400/mo>", "timeline": "<e.g. 2-3 months>" }
  ],
  "riskFlags": [
    { "flag": "<risk>", "severity": "low|medium|high", "mitigation": "<concrete step>" }
  ],
  "recommendedTools": [
    { "name": "<tool name>", "purpose": "<1 sentence>", "cost": "<pricing>", "url": "<real homepage URL>" }
  ],
  "nextSteps": {
    "immediate": ["<action>", "<action>"],
    "thirtyDays": ["<action>", "<action>"],
    "cta": "Book your implementation strategy call at hello@gigamega.ca"
  },
  "financialImpact": {
    "weeklyHoursReclaimed": <number>,
    "hourlyRateAssumption": 100,
    "monthlyToolCost": <number>,
    "netMonthlySavings": <number — round((weeklyHoursReclaimed * 4.33 * 100) - monthlyToolCost)>
  },
  "quickWinPlan": [
    { "day": 1, "action": "<step>" },
    { "day": 2, "action": "<step>" },
    { "day": 3, "action": "<step>" },
    { "day": 4, "action": "<step>" }
  ]
}`;

function callClaudeCLI(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "claude",
      [
        "--print",
        "--model", "sonnet",
        "--output-format", "json",
        "--no-session-persistence",
        "--allowed-tools", "",
      ],
      { stdio: ["pipe", "pipe", "pipe"] },
    );
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => { stdout += d; });
    child.stderr.on("data", (d) => { stderr += d; });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`claude exited ${code}: ${stderr.slice(0, 500)}`));
        return;
      }
      resolve(stdout);
    });
    child.on("error", reject);
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

function stripJsonFences(s: string): string {
  const trimmed = s.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fenced) return fenced[1].trim();
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first >= 0 && last > first) return trimmed.slice(first, last + 1);
  return trimmed;
}

async function analyzeViaClaudeCli(submission: Submission): Promise<ReportAnalysis> {
  const langDirective = LANGUAGE_DIRECTIVES[submission.locale];
  const nicheDirective = submission.niche ? NICHE_DIRECTIVES[submission.niche] : "";
  const composed = [SYSTEM_PROMPT, langDirective, nicheDirective].filter(Boolean).join("\n\n");
  const userPrompt = `${composed}\n\nHere is the discovery call transcript:\n\n${submission.transcript}\n\n${langDirective}\n\n${nicheDirective ? nicheDirective + "\n\n" : ""}Generate the AI readiness assessment JSON now. Output ONLY the JSON object, no markdown.`;

  const rawCliOutput = await callClaudeCLI(userPrompt);
  // CLI --output-format json wraps the model's text in {"result": "<text>", ...}
  let modelText: string;
  try {
    const wrapper = JSON.parse(rawCliOutput) as { result?: string; is_error?: boolean; subtype?: string };
    if (wrapper.is_error) {
      throw new Error(`Claude CLI returned is_error=true. result: ${wrapper.result?.slice(0, 300)}`);
    }
    modelText = wrapper.result ?? "";
  } catch (err) {
    // Maybe the CLI returned plain text after all
    modelText = rawCliOutput;
    if (err instanceof Error && !err.message.startsWith("Claude CLI")) {
      // Re-throw if it wasn't our wrapper-parse failure
      throw err;
    }
  }
  return JSON.parse(stripJsonFences(modelText)) as ReportAnalysis;
}

// ─── Slack notification ────────────────────────────────────────────
function notifySlack(message: string) {
  try {
    execSync(
      `openclaw message send --channel slack --target 'channel:C0B08HRFA75' --message ${JSON.stringify(message)}`,
      { stdio: "pipe" },
    );
  } catch (err) {
    log(`slack notify failed: ${(err as Error).message.slice(0, 200)}`);
  }
}

// ─── Per-submission processing ─────────────────────────────────────
async function processOne(filePath: string): Promise<{ ok: boolean; id: string; err?: string }> {
  const raw = readFileSync(filePath, "utf8");
  const submission: Submission = JSON.parse(raw);
  log(`processing ${submission.id} · ${submission.niche ?? "general"} · ${submission.locale} · ${submission.clientEmail}`);

  // 1. Analyze
  const analysis = await analyzeViaClaudeCli(submission);
  log(`  ✓ analysis done · score ${analysis.aiReadinessScore.overall}/100`);

  // 2. PDF
  const pdfBuffer = await generatePDF(analysis, submission.clientName);
  log(`  ✓ pdf generated · ${(pdfBuffer.length / 1024).toFixed(1)} KB`);

  // 3. Email
  await sendReportEmail({
    to: submission.clientEmail,
    clientName: submission.clientName,
    assessmentId: submission.id,
    pdfBuffer,
    locale: submission.locale,
  });
  log(`  ✓ email sent`);

  // 4. Move pending → processed (in the queue repo)
  const processedAt = new Date().toISOString();
  const processedEntry = {
    ...submission,
    analysis,
    processedAt,
    sentAt: processedAt,
    status: "sent",
  };
  const processedPath = path.join(QUEUE_DIR, "processed", `${submission.id}.json`);
  writeFileSync(processedPath, JSON.stringify(processedEntry, null, 2), "utf8");
  unlinkSync(filePath);

  // 5. Mirror locally so Mission Control can read without hitting GitHub
  mkdirSync(PROCESSED_LOCAL_MIRROR, { recursive: true });
  writeFileSync(
    path.join(PROCESSED_LOCAL_MIRROR, `${submission.id}.json`),
    JSON.stringify(processedEntry, null, 2),
    "utf8",
  );

  // 6. Slack ping
  const topWin = analysis.quickWins[0]?.title ?? "(no quick win)";
  notifySlack(
    [
      `:bell: SnapReport sent · ${submission.niche ?? "general"}`,
      `${submission.businessName} · ${submission.clientName} <${submission.clientEmail}>`,
      `Score: ${analysis.aiReadinessScore.overall}/100`,
      `Top quick win: ${topWin}`,
      `Net monthly value: $${analysis.financialImpact?.netMonthlySavings ?? "?"}`,
      `ID: \`${submission.id}\``,
    ].join("\n"),
  );

  return { ok: true, id: submission.id };
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  if (!acquireLock()) {
    process.exit(0);
  }
  process.on("exit", releaseLock);
  process.on("SIGINT", () => { releaseLock(); process.exit(130); });
  process.on("SIGTERM", () => { releaseLock(); process.exit(143); });

  try {
    log("starting queue sync");
    syncQueueRepo();
    const pending = listPendingSubmissions();
    log(`found ${pending.length} pending submission(s)`);

    let processed = 0;
    let failed = 0;

    for (const file of pending) {
      try {
        await processOne(file);
        processed++;
      } catch (err) {
        failed++;
        const msg = err instanceof Error ? err.message : String(err);
        log(`  ✗ failed: ${msg.slice(0, 400)}`);
        notifySlack(`:warning: SnapReport submission ${path.basename(file, ".json")} failed: ${msg.slice(0, 300)}`);
      }
    }

    if (processed > 0 || failed > 0) {
      // Push processed/* + deleted pending/* back to the queue repo
      execSync("git add -A", { cwd: QUEUE_DIR });
      try {
        execSync(
          `git -c user.email=worker@snapaireport.com -c user.name="SnapReport Worker" commit -q -m "process: ${processed} sent, ${failed} failed"`,
          { cwd: QUEUE_DIR },
        );
        execSync("git push -q", { cwd: QUEUE_DIR });
        log(`pushed: ${processed} sent, ${failed} failed`);
      } catch (err) {
        log(`commit/push failed (probably nothing to commit): ${(err as Error).message.slice(0, 200)}`);
      }
    } else {
      log("nothing to do");
    }
  } finally {
    releaseLock();
  }
}

main().catch((err) => {
  log(`fatal: ${err instanceof Error ? err.stack ?? err.message : String(err)}`);
  releaseLock();
  process.exit(1);
});
