import type { ReportAnalysis } from '@/types/report';
import type { Locale, NicheKey } from '@/lib/i18n';

/**
 * Report-generation pipeline.
 *
 * Calls OpenRouter (https://openrouter.ai) so we can swap models via env
 * without code changes. Defaults to Claude Haiku 4.5 — same family as
 * Sonnet so French + structured-JSON behavior transfers, but ~3× cheaper.
 *
 * To switch models, set LLM_MODEL in Vercel env to any OpenRouter slug:
 *   - anthropic/claude-haiku-4.5  (default)
 *   - anthropic/claude-sonnet-4.6 (best quality)
 *   - openai/gpt-4.1-mini         (cheapest competitive option)
 *   - google/gemini-2.5-flash     (very fast, lowest cost)
 */
const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = 'anthropic/claude-haiku-4.5';

const LANGUAGE_DIRECTIVES: Record<Locale, string> = {
  en: 'Write all output in English.',
  fr: 'Écris toutes les sorties en français (français du Québec : utilise « courriel » plutôt que « email », évite les anglicismes). Toutes les valeurs textuelles du JSON doivent être en français — titres, descriptions, recommandations, étapes suivantes. Conserve les noms de marques et les chaînes structurelles (« low | medium | high », « QW.01 », etc.) en anglais.',
};

/**
 * Niche-aware framing directives. Steer Claude to use the language and
 * pattern-recognition of the target audience without rewriting the entire
 * structured-output schema.
 */
const NICHE_DIRECTIVES: Record<NicheKey, string> = {
  lawyers:
    'The client is a law firm or solo legal practitioner. Use language a lawyer would recognize: matters, intake, conflicts, discovery, billables, retainer, motions, pleadings, trust accounting, Bar compliance. Frame AI opportunities around: discovery review, drafting first-draft pleadings and standard motions, intake/conflict triage, automatic billable-time capture, client status communication, and trust-ledger reconciliation. Avoid generic SMB framing — be lawyer-specific in tool recommendations (e.g., Clio + AI add-ons, Spellbook, Casetext CoCounsel, Harvey).',
  accountants:
    'The client is an accounting or bookkeeping practice. Use language a CPA/accountant would recognize: client cleanup, reconciliation, audit fieldwork, tax season, advisory services, T1/T2 (Canadian) or 1040/1120 (US), trial balance, GL accounts, HST/GST returns. Frame AI opportunities around: document intake + OCR, bank/CC reconciliation, tax return first drafts, client document chase, audit analytics, and advisory note prep. Tool recommendations should be accountant-specific (e.g., Dext, Hubdoc, Karbon, TaxDome, QBO/Xero/Sage AI add-ons, Botkeeper).',
};

const SYSTEM_PROMPT = `You are an expert AI business consultant with deep experience helping small and medium businesses identify AI automation opportunities. You analyze transcripts of business discovery calls and produce structured AI readiness assessments.

The client just completed a 20-minute voice intake covering:
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

Your assessment must be honest, specific to their situation, and actionable. Avoid generic advice. Match tools and recommendations to their actual context.

Critical patterns to consider on every report:
- SPEED-TO-LEAD: If the business has inbound leads (calls, web forms, emails), a speed-to-lead AI agent that responds in under 60 seconds is almost always a top-3 quick win. Inbound leads that aren't answered within 10 minutes go to a competitor — this is high-impact, low-effort, and easy to quantify.
- NON-AI TOOLS WELCOME: Some of the highest-leverage recommendations are plain SaaS that automate a workflow without any AI (e.g. Dash This for analytics dashboards, Cal.com for booking). If a $42/mo off-the-shelf SaaS saves the team 8 hours/month, recommend it — don't force-fit an AI tool when a simpler one is better.
- PROCESS-BEFORE-AUTOMATION: If a process has 15 steps and could be 7, recommend simplifying first. Don't recommend automating bad processes — that just speeds up the mess.

Tool recommendation rules:
- Every recommendedTool MUST include a real homepage URL (e.g. "https://anthropic.com", "https://make.com"). Never leave url empty. Never use a Google search URL. If you don't know the URL for sure, pick a different tool you do know.
- Prefer well-known tools the reader can verify. If recommending something niche, double-check the URL is correct.
- For tool discovery beyond what you explicitly recommend, the report frontend already links to There's An AI For That (theresanaiforthat.com), Futurepedia (futurepedia.io), and FutureTools (futuretools.io). Don't repeat these in recommendedTools — your job is to suggest specific tools for THIS business, not directories.

Return ONLY valid JSON — no markdown, no explanation, no preamble. Use this exact structure:

{
  "executiveSummary": ["<plain-language bullet 1>", "<bullet 2>", "<bullet 3>"],
  "aiReadinessScore": {
    "overall": <number 1-100>,
    "breakdown": {
      "digitalFoundation": <number 1-100>,
      "processMaturity": <number 1-100>,
      "teamReadiness": <number 1-100>,
      "dataQuality": <number 1-100>,
      "leadershipBuyIn": <number 1-100>
    }
  },
  "quickWins": [
    {
      "title": "<short title>",
      "description": "<2-3 sentence description specific to their business>",
      "effort": "low|medium|high",
      "impact": "low|medium|high",
      "timeline": "<e.g. 1-2 weeks>",
      "estimatedCost": "<e.g. $0-50/mo or Free>"
    }
  ],
  "strategicOpportunities": [
    {
      "title": "<opportunity title>",
      "description": "<3-4 sentence description with ROI framing>",
      "roiPotential": "<e.g. Save 10h/week, $2,400/mo>",
      "timeline": "<e.g. 2-3 months>"
    }
  ],
  "riskFlags": [
    {
      "flag": "<specific risk for this business>",
      "severity": "low|medium|high",
      "mitigation": "<concrete mitigation step>"
    }
  ],
  "recommendedTools": [
    {
      "name": "<tool name>",
      "purpose": "<1 sentence — why this tool for this business>",
      "cost": "<pricing>",
      "url": "<REQUIRED: real, working homepage URL — never empty, never a search result>"
    }
  ],
  "nextSteps": {
    "immediate": ["<action 1>", "<action 2>"],
    "thirtyDays": ["<action 1>", "<action 2>"],
    "cta": "Reply to your SnapReport email or write info@snapaireport.com to schedule an implementation review."
  },
  "financialImpact": {
    "weeklyHoursReclaimed": <number — total hours/week the team reclaims if all 3 quick wins ship>,
    "hourlyRateAssumption": 100,
    "monthlyToolCost": <number — sum of recommended quick-win tool costs per month>,
    "netMonthlySavings": <number — round((weeklyHoursReclaimed * 4.33 * 100) - monthlyToolCost)>
  },
  "quickWinPlan": [
    { "day": 1, "action": "<one specific, do-this-today step toward QW.01>" },
    { "day": 2, "action": "<one specific step>" },
    { "day": 3, "action": "<one specific step>" },
    { "day": 4, "action": "<final step that locks in the first quick win>" }
  ]
}`;

/** Strip any ```json fences or surrounding prose so JSON.parse works. */
function extractJson(raw: string): string {
  const trimmed = raw.trim();
  // Strip ```json ... ``` or ``` ... ``` fences
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fenceMatch) return fenceMatch[1].trim();
  // Fall back: find first { and last }
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }
  return trimmed;
}

export async function analyzeTranscript(
  transcript: string,
  locale: Locale = 'en',
  niche?: NicheKey,
): Promise<ReportAnalysis> {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY not configured');
  }

  const model = process.env.LLM_MODEL ?? DEFAULT_MODEL;
  const languageDirective = LANGUAGE_DIRECTIVES[locale];
  const nicheDirective = niche ? NICHE_DIRECTIVES[niche] : '';

  const composedSystem = [SYSTEM_PROMPT, languageDirective, nicheDirective]
    .filter(Boolean)
    .join('\n\n');

  const composedUser =
    `Here is the discovery call transcript:\n\n${transcript}\n\n` +
    `${languageDirective}\n\n` +
    (nicheDirective ? `${nicheDirective}\n\n` : '') +
    `Generate the AI readiness assessment JSON now.`;

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      // OpenRouter recommends these for analytics + attribution
      'HTTP-Referer': 'https://snapaireport.com',
      'X-Title': 'SnapReport',
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      temperature: 0.4,
      messages: [
        { role: 'system', content: composedSystem },
        { role: 'user', content: composedUser },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${errBody.slice(0, 500)}`);
  }

  const data: {
    choices?: Array<{ message?: { content?: string } }>;
  } = await response.json();

  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('No content in OpenRouter response');
  }

  try {
    return JSON.parse(extractJson(text)) as ReportAnalysis;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'parse error';
    throw new Error(
      `Failed to parse LLM JSON output: ${message}. Raw start: ${text.slice(0, 200)}`,
    );
  }
}
