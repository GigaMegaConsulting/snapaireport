import Anthropic from '@anthropic-ai/sdk';
import type { ReportAnalysis } from '@/types/report';
import type { Locale, NicheKey } from '@/lib/i18n';

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
    "cta": "Book your implementation strategy call with Giga at hello@gigamega.ca or at https://cal.com/gigamega/ai-assessment"
  }
}`;

export async function analyzeTranscript(
  transcript: string,
  locale: Locale = 'en',
  niche?: NicheKey,
): Promise<ReportAnalysis> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
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

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: composedSystem,
    messages: [{ role: 'user', content: composedUser }],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  return JSON.parse(content.text) as ReportAnalysis;
}
