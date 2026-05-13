import Anthropic from '@anthropic-ai/sdk';
import type { ReportAnalysis } from '@/types/report';
import type { Locale } from '@/lib/i18n';

const LANGUAGE_DIRECTIVES: Record<Locale, string> = {
  en: 'Write all output in English.',
  fr: 'Écris toutes les sorties en français (français du Québec : utilise « courriel » plutôt que « email », évite les anglicismes). Toutes les valeurs textuelles du JSON doivent être en français — titres, descriptions, recommandations, étapes suivantes. Conserve les noms de marques et les chaînes structurelles (« low | medium | high », « QW.01 », etc.) en anglais.',
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
      "url": "<homepage url>"
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
): Promise<ReportAnalysis> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const languageDirective = LANGUAGE_DIRECTIVES[locale];

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: `${SYSTEM_PROMPT}\n\n${languageDirective}`,
    messages: [
      {
        role: 'user',
        content: `Here is the discovery call transcript:\n\n${transcript}\n\n${languageDirective}\n\nGenerate the AI readiness assessment JSON now.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  return JSON.parse(content.text) as ReportAnalysis;
}
