/**
 * Niche-specific copy overrides. Each niche keeps the brand voice but
 * speaks the language of its audience and points at the bottlenecks and
 * tools relevant to that profession.
 *
 * Used by /en/lawyers, /en/accountants, etc. The form posts the niche
 * key in the submission so Claude knows to tailor the report.
 */

export type NicheKey = "lawyers" | "accountants";

/** Form-field keys we can override per niche. Mirrors the keys in messages/en.ts form.steps. */
export type FormFieldKey =
  | "businessName"
  | "businessDescription"
  | "yearsOperating"
  | "teamSize"
  | "teamLocation"
  | "operationsWalkthrough"
  | "toolsInUse"
  | "leadSources"
  | "bottlenecks"
  | "priorAiExperience"
  | "twelveMonthGoals"
  | "automationWish"
  | "anythingElse";

export type FieldOverride = {
  label?: string;
  placeholder?: string;
  helper?: string;
};

interface NicheContent {
  /** Slug appearing in the URL (e.g. /en/lawyers). Stays the same in FR. */
  slug: NicheKey;
  /** "For Lawyers" — appears next to the brand mark as a context badge. */
  badge: string;
  /** Hero eyebrow line in mono uppercase. */
  eyebrow: string;
  /** Hero headline — array of lines, optional italic index. */
  headline: string[];
  headlineItalicIndex: number;
  /** Hero subhead paragraph. */
  lead: string;
  /** Three short value-prop badges under hero CTAs. */
  badges: [string, string, string];
  /** Section 02: "What slows your practice down" — niche-specific bottlenecks. */
  bottlenecks: {
    title: string[];
    titleItalicIndex: number;
    lead: string;
    items: Array<{ tag: string; title: string; desc: string }>;
  };
  /** Closing CTA copy. */
  closingHeadline: string;
  /** Tailored intro shown at the top of the assessment form when this niche is in the URL. */
  formIntro?: string;
  /** Per-field text overrides for the assessment form. Only fields that need rephrasing per niche. */
  formOverrides?: Partial<Record<FormFieldKey, FieldOverride>>;
  /** Niche-specific specimen — overrides profile + answers + report on /sample?niche=<key>. */
  sample?: NicheSample;
}

/**
 * Shape mirrors the data subset of t.sample (profile + answers + report).
 * UI labels (sectionA, badges, etc.) come from the generic messages.
 */
export interface NicheSample {
  profile: {
    business: string;
    city: string;
    years: string;
    team: string;
    industry: string;
    revenue: string;
  };
  answers: Array<{ q: string; a: string }>;
  report: {
    score: number;
    breakdown: Array<{ label: string; v: number }>;
    summary: string[];
    quickWins: Array<{
      tag: string;
      title: string;
      desc: string;
      impact: string;
      effort: string;
      cost: string;
      eta: string;
    }>;
    strategic: Array<{
      tag: string;
      title: string;
      desc: string;
      roi: string;
      eta: string;
    }>;
    risks: Array<{ flag: string; mitigation: string; severity: string }>;
    tools: Array<{ name: string; purpose: string; cost: string; url: string }>;
    next: { immediate: string[]; thirtyDays: string[] };
    financialImpact: {
      weeklyHoursReclaimed: number;
      hourlyRateAssumption: number;
      monthlyToolCost: number;
      netMonthlySavings: number;
    };
    quickWinPlan: Array<{ day: number; action: string }>;
  };
}

export interface NicheMessages {
  lawyers: NicheContent;
  accountants: NicheContent;
}

const en: NicheMessages = {
  lawyers: {
    slug: "lawyers",
    badge: "For Lawyers",
    eyebrow: "§ 00 · LAW PRACTICE",
    headline: [
      "The AI playbook",
      "for your law firm",
      "— in 5 minutes."],
    headlineItalicIndex: 1,
    lead:
      "Discovery summaries. Drafting standard motions. Triaging intake calls. Reconciling billable hours. There's an AI workflow for every billable-time leak in your practice — and 10 questions is all we need to map yours.",
    badges: ["Built for solo & small firms", "Quebec & Ontario", "No software to install"],
    bottlenecks: {
      title: ["The leaks every", "small firm has."],
      titleItalicIndex: 1,
      lead:
        "Most lawyers we talk to lose 8–12 hours/week to the same handful of admin tasks. AI handles the bulk so you can bill the work that actually requires you.",
      items: [
        {
          tag: "01",
          title: "Intake & conflict checks",
          desc:
            "AI screens initial calls/emails, runs conflict-of-interest checks against your matter database, books qualified leads into your calendar. Stops wasting your time on tire-kickers.",
        },
        {
          tag: "02",
          title: "First-draft pleadings & motions",
          desc:
            "Boilerplate motions, settlement letters, retainer agreements — drafted in seconds against your firm's templates and case-specific facts. You edit, not author.",
        },
        {
          tag: "03",
          title: "Discovery review",
          desc:
            "Bulk-process opposing party productions. Auto-tag privileged docs, summarize key emails, flag inconsistencies. What took a week of associate time → an afternoon.",
        },
        {
          tag: "04",
          title: "Billable-time capture",
          desc:
            "AI parses your email, calendar, and document edits — reconstructs your billable hours retroactively. Captures the 15-minute calls you forgot to log.",
        },
        {
          tag: "05",
          title: "Client communication",
          desc:
            "Auto-drafted status updates after every filing or milestone. Approve and send in one click. Clients feel informed; you don't lose an hour a week to status emails.",
        },
        {
          tag: "06",
          title: "Trust accounting & invoice review",
          desc:
            "Reconciles trust ledgers against operating accounts, flags suspicious entries, prepares Bar-compliant reports. Catches errors before audit season.",
        },
      ],
    },
    closingHeadline:
      "Ten questions stand between your firm and a tailored AI roadmap — built around how lawyers actually work.",
    formIntro:
      "Tailored to legal practices. Same 5-minute form — the questions speak the language of matters, intake, and billables.",
    formOverrides: {
      businessName: { label: "Firm name", placeholder: "Tremblay Legal" },
      businessDescription: {
        label: "What's your practice area, and how long has the firm operated?",
        helper: "Solo, boutique, family law, civil litigation, real-estate — one or two sentences is fine.",
        placeholder: "We're a 3-attorney family-law firm in Montréal. Founded in 2018, mostly Quebec residents.",
      },
      teamSize: {
        label: "How many attorneys + support staff in the firm?",
        placeholder: "3 attorneys, 1 paralegal, 1 office manager",
      },
      teamLocation: {
        label: "Office-based, remote, or hybrid?",
        placeholder: "Hybrid — attorneys in office 3 days, support staff 5 days",
      },
      operationsWalkthrough: {
        label: "Walk us through a typical matter — intake call to file closing.",
        helper: "Conflicts check, retainer signing, drafting, hearings, billing, archive. Where do hours actually go?",
        placeholder: "Client calls or fills our intake form → conflict check → consult → retainer signed → matter opened in Clio → drafting → hearings → billing monthly → close after final order...",
      },
      toolsInUse: {
        label: "What's your practice-management + tech stack?",
        helper: "Practice mgmt (Clio, MyCase, PracticePanther), billing, calendar, document mgmt, e-signature, court e-filing.",
        placeholder: "Clio Manage for practice mgmt + billing, Microsoft 365 for email/docs, DocuSign for signatures, manual e-filing through SOQUIJ...",
      },
      leadSources: {
        label: "Where do new clients come from?",
        placeholder: "60% referrals from past clients + other lawyers, 25% Google search, 10% directory listings (Lawyers.com), 5% other",
      },
      bottlenecks: {
        label: "Where do you and your attorneys lose the most billable hours to admin?",
        helper: "Intake/conflict checks, drafting standard motions, discovery review, time capture, billing follow-ups, client status updates.",
        placeholder: "Drafting boilerplate motions (4-6h/week each attorney). Time capture — partners forgetting to log 15-min calls. Following up on aging A/R.",
      },
      priorAiExperience: {
        label: "Have you tried AI in the firm? What happened?",
        helper: "Spellbook, Casetext CoCounsel, Harvey, ChatGPT for drafting, Claude — anything that touched a matter.",
        placeholder: "Tried ChatGPT for first-draft emails — fine but not specific enough. Looked at Spellbook but never deployed. Worried about privilege on cloud tools.",
      },
      twelveMonthGoals: {
        label: "What does a great next 12 months look like for the firm?",
        placeholder: "Add 1 attorney without scaling support staff. Get realization rate from 82% to 90%. Stop working Sundays.",
      },
      automationWish: {
        label: "If you could automate one thing in the firm tomorrow, what would it be?",
        placeholder: "Status updates to clients after every filing and hearing — eats 30 min/day across the partners.",
      },
      anythingElse: {
        helper:
          "Privilege constraints, Bar guidance you're trying to stay ahead of, an associate who'll resist anything new, a case management migration that scarred everyone — whatever colors what's realistic.",
        placeholder:
          "We're in the middle of a Clio migration from a legacy system; partners are burnt out from that. Also, Quebec Bar is tightening guidance on AI in legal work — we want recommendations that age well.",
      },
    },
    sample: {
      profile: {
        business: "Tremblay Legal",
        city: "Montréal · QC",
        years: "6 years operating",
        team: "3 attorneys + 1 paralegal + 1 office manager",
        industry: "Family law boutique (divorce, custody, separation)",
        revenue: "≈ $1.6M annual",
      },
      answers: [
        { q: "What does your firm do, and how long has it operated?", a: "Family-law boutique in Montréal. Mostly divorces and custody cases for Quebec residents. Six years in, founded by Maud Tremblay in 2020 after 12 years at a large firm. We try amicable settlement first, litigate when needed." },
        { q: "How many attorneys + support staff, and where do they work?", a: "Three attorneys — Maud (senior partner), Léo (senior associate), Émilie (junior). Plus one paralegal and one office manager. Mostly office-based; associates work from home Fridays." },
        { q: "Walk us through a typical matter — intake call to file closing.", a: "Lead calls our line or fills the website intake form → paralegal runs the conflict check → 30-min discovery consult (free) → if good fit, retainer signed via DocuSign → matter opened in Clio → ongoing work logged to matter file → court filings via SOQUIJ (manual), hearings, settlement negotiations → invoicing every 2 weeks through Clio → matter closed when judgment final or settlement signed." },
        { q: "What's your practice-management + tech stack?", a: "Clio Manage for practice mgmt, billing, time capture, and document mgmt. Microsoft 365 for email and Word. DocuSign for retainers and settlement docs. SOQUIJ for court e-filing (still manual). LexisAdvance for research. No AI in production yet." },
        { q: "Where do new clients come from?", a: "70% referrals from past clients and other lawyers — we're well-known in family law. 20% Google (we rank well for 'avocat famille Montréal' and 'divorce Montréal'). 10% directory listings (Lawyers.com, Juristes du Québec)." },
        { q: "Where do you and your attorneys lose the most billable hours to admin?", a: "Drafting standard motions — applications for interim measures, separation orders, joint-custody applications. Each one is 80% template + 20% specific facts. Each attorney bleeds 4-6 hours/week on this. Time capture is the other big one — partners forget to log 15-min calls and quick email reviews. Realization rate sits at 85% when it should be 92%." },
        { q: "Have you tried AI in the firm? What happened?", a: "Tried ChatGPT for first-draft emails to opposing counsel — worked but felt risky on privilege. Looked at Spellbook but never deployed; Léo would use it, the others wouldn't. Cautious about cloud AI on client data — the Quebec Bar has rules." },
        { q: "On a scale of 1–10, how comfortable is your team with new tech?", a: "Paralegal: 8. Léo (associate): 8. Émilie (junior): 7. Maud (partner): 6. Office manager: 7. Firm avg: about 7." },
        { q: "What does success look like in the next 12 months?", a: "Add 1 senior associate without scaling support staff. Move realization rate from 85% to 92%. Stop working Sundays — partners average 55h/week, want to be at 45h." },
        { q: "If you could automate one thing tomorrow, what would it be?", a: "Client status updates after every filing or hearing. Right now Sarah (office manager) drafts them and the lead attorney reviews. Eats 30 min/day across the partners. Clients constantly ask 'what's happening with my case' because we're not proactive." },
      ],
      report: {
        score: 71,
        breakdown: [
          { label: "Digital foundation", v: 78 },
          { label: "Process maturity", v: 75 },
          { label: "Team readiness", v: 72 },
          { label: "Data quality", v: 60 },
          { label: "Leadership buy-in", v: 70 },
        ],
        summary: [
          "Tremblay Legal is well-positioned for AI: solid process discipline (Clio + DocuSign), partner-led culture open to experimentation but appropriately cautious about privilege — the right starting profile.",
          "Drafting standard motions is the single biggest leak — 4-6 hours per attorney per week on 80%-template work. Spellbook + a firm-specific motion library reclaims 12-16 hours/week firm-wide.",
          "Time capture is the hidden leak. Auto-Time tools (Clio's built-in or a vendor) lift realization from 85% to ~92% with no extra effort. That's ~$10K/month in billable hours that already exist.",
        ],
        quickWins: [
          {
            tag: "QW.01",
            title: "Spellbook for first-draft pleadings + retainers",
            desc: "Spellbook integrates with Word. The associate or paralegal opens a motion template, feeds Spellbook the matter facts from Clio, and gets a draft in 2 minutes vs 90. Maud reviews. Reclaims 12-16 hours/week firm-wide on standard motions.",
            impact: "High",
            effort: "Low",
            cost: "≈ $89/lawyer/mo",
            eta: "2 weeks",
          },
          {
            tag: "QW.02",
            title: "Clio Auto-Time firm-wide",
            desc: "Clio's Auto-Time captures time from calendar events, emails, and document edits — no manual entry. Partners stop forgetting 15-min calls. Realization rate climbs from 85% to ~92%. Already built into your existing Clio subscription tier.",
            impact: "High",
            effort: "Low",
            cost: "Included in Clio Suite",
            eta: "1 week",
          },
          {
            tag: "QW.03",
            title: "AI intake screening",
            desc: "Claude API screens website form submissions before they reach the paralegal. Filters cold-callers, flags potential conflicts against the Clio matter database, suggests fit/no-fit. Paralegal only sees pre-qualified leads. Saves ~3 hours/week.",
            impact: "Medium",
            effort: "Low",
            cost: "≈ $30/mo (API usage)",
            eta: "2 weeks",
          },
        ],
        strategic: [
          {
            tag: "SP.01",
            title: "Discovery review AI for opposing-party productions",
            desc: "Bulk-process opposing party's document productions. Auto-tag privileged docs, summarize key emails by topic, flag inconsistencies vs the client's testimony. A week of associate time becomes an afternoon. Particularly valuable on contested custody cases.",
            roi: "≈ $20K/yr in recovered associate hours",
            eta: "2–3 months",
          },
          {
            tag: "SP.02",
            title: "Trust accounting AI + Bar-compliance flagging",
            desc: "Reconciles trust ledgers against operating accounts, flags suspicious entries, prepares Bar-compliant reports automatically. Catches errors before audit season. Quebec Bar has strict trust rules; an AI guardrail reduces compliance risk.",
            roi: "Reduces compliance risk + 4h/mo on bookkeeping",
            eta: "2 months",
          },
          {
            tag: "SP.03",
            title: "French-language SEO content engine for service-area pages",
            desc: "Agent writes ~4 pages/month: 'avocat divorce Laval', 'garde partagée Brossard', 'séparation Westmount'. Pairs with existing Google ranking. Long-tail organic traffic should 2× in 6 months.",
            roi: "Organic leads +50–100% over 6 months",
            eta: "Month 2+",
          },
        ],
        risks: [
          {
            flag: "Privilege concerns on cloud AI tools.",
            mitigation: "Use SOC 2-certified vendors with Canada or EU data residency. Spellbook is SOC 2; Clio's AI is hosted appropriately. Add an AI disclosure clause to engagement letters. Don't paste client confidential content into ChatGPT.",
            severity: "Medium",
          },
          {
            flag: "Junior associate adoption — Léo will use new tools, Émilie + Maud may resist.",
            mitigation: "Roll out Spellbook to Léo first as a 2-week pilot. He demos to the others with a real recent motion. Position as '80% draft + lawyer judgment', not 'AI replaces lawyer'.",
            severity: "Low",
          },
          {
            flag: "Quebec Bar guidance on generative AI is evolving.",
            mitigation: "Read the Quebec Bar's Sept 2024 guidance on AI in practice. Document an internal AI policy (what data can be entered into which tools). Revisit quarterly.",
            severity: "Medium",
          },
        ],
        tools: [
          { name: "Spellbook", purpose: "First-draft pleadings + contracts inside Word", cost: "$89/lawyer/mo", url: "https://spellbook.legal" },
          { name: "Clio Manage", purpose: "Already using — enable Auto-Time + AI features", cost: "Included", url: "https://clio.com" },
          { name: "Anthropic Claude", purpose: "Intake screening, status updates, custom prompts", cost: "≈ $30/mo API", url: "https://anthropic.com" },
          { name: "Casetext CoCounsel", purpose: "Case-law research + legal drafting", cost: "$110/mo", url: "https://casetext.com" },
          { name: "DocuSign", purpose: "Already using — add AI clause-suggestion module", cost: "+$15/user/mo", url: "https://docusign.com" },
        ],
        next: {
          immediate: [
            "Sign up for Spellbook 14-day trial. Léo runs 3 standard motions through it side-by-side with the current process.",
            "Enable Clio Auto-Time for Maud + Léo. Compare auto-captured hours to their week-end manual entries.",
            "Read the Quebec Bar's Sept 2024 AI guidance and draft a 1-page internal AI policy.",
          ],
          thirtyDays: [
            "Spellbook deployed firm-wide for first-draft motions and retainers.",
            "Clio Auto-Time active for all lawyers. Realization rate measured.",
            "AI status-update generator live on 50% of active matters.",
          ],
        },
        financialImpact: {
          weeklyHoursReclaimed: 14,
          hourlyRateAssumption: 200,
          monthlyToolCost: 445,
          netMonthlySavings: 11679,
        },
        quickWinPlan: [
          { day: 1, action: "Sign up for Spellbook 14-day trial. Léo runs 3 standard motions (separation order, joint custody application, interim measures) through it. Compare side-by-side with current drafts." },
          { day: 2, action: "Enable Clio Auto-Time for Maud + Léo (Settings → Time tracking → Auto-Time). Let it run all day. Compare captured time to what they would have logged manually." },
          { day: 3, action: "Draft AI intake screening prompts in Claude. Wire to the website form via Zapier — Claude reads the submission and flags fit/conflicts before the paralegal sees it." },
          { day: 4, action: "Pilot the status-update generator on 2 active matters. Sarah reviews each draft before sending. Aim: draft generation under 30 seconds." },
        ],
      },
    },
  },

  accountants: {
    slug: "accountants",
    badge: "For Accountants",
    eyebrow: "§ 00 · ACCOUNTING",
    headline: [
      "The AI playbook",
      "for your firm",
      "— in 5 minutes."],
    headlineItalicIndex: 1,
    lead:
      "Bookkeeping cleanup. Client document chasing. Tax prep first drafts. Audit fieldwork. There's an AI workflow for every hour your team loses to repetitive work — and 10 questions is all we need to map yours.",
    badges: ["Built for SMB firms", "Quebec & Ontario", "No software to install"],
    bottlenecks: {
      title: ["The work that", "should be automated."],
      titleItalicIndex: 1,
      lead:
        "Most accounting practices we talk to lose 30–40% of staff hours to data entry, reconciliation, and chasing clients for documents. AI handles the repetitive volume so your team focuses on advisory.",
      items: [
        {
          tag: "01",
          title: "Document intake & OCR",
          desc:
            "Client emails a stack of receipts/invoices — AI extracts amounts, vendors, GL accounts, posts to QuickBooks/Xero/Sage. Eliminates the data-entry bottleneck.",
        },
        {
          tag: "02",
          title: "Bank & credit card reconciliation",
          desc:
            "AI matches transactions to invoices, flags unmatched entries, drafts journal entries for review. Cuts month-end close by 60–70%.",
        },
        {
          tag: "03",
          title: "Tax return first drafts",
          desc:
            "T1/T2 (or 1040/1120) preliminary drafts generated from client docs + prior-year returns. You review and refine. Doubles your tax-season throughput.",
        },
        {
          tag: "04",
          title: "Client document chase",
          desc:
            "AI tracks which clients haven't sent their HST returns, slips, or year-end docs. Drafts polite follow-ups automatically. You approve and send.",
        },
        {
          tag: "05",
          title: "Audit fieldwork",
          desc:
            "AI runs analytics on client ledgers — variance analysis, ratio benchmarks, unusual entries. Highlights risk areas before fieldwork starts. Sharper testing, less senior time.",
        },
        {
          tag: "06",
          title: "Advisory note prep",
          desc:
            "Auto-drafts monthly/quarterly client letters with key metrics, cash flow trends, comparison to last year. You add the strategic insight. Builds advisory revenue without billable bloat.",
        },
      ],
    },
    closingHeadline:
      "Ten questions stand between your practice and a tailored AI roadmap — built around how accountants actually work.",
    formIntro:
      "Tailored to accounting and bookkeeping practices. Same 5-minute form — the questions speak the language of trial balances, T1s, and tax season.",
    formOverrides: {
      businessName: { label: "Firm name", placeholder: "Tremblay CPA" },
      businessDescription: {
        label: "What's your practice mix, and how long has the firm operated?",
        helper: "Bookkeeping, tax prep, audit, advisory — or all of the above. Solo, boutique, regional.",
        placeholder: "We're a 5-person boutique CPA firm in Montréal. ~60% tax prep, 30% bookkeeping, 10% advisory. Founded 2014.",
      },
      teamSize: {
        label: "How many staff total — partners, accountants, bookkeepers, admin?",
        placeholder: "2 partners (CPAs), 2 staff accountants, 1 bookkeeper, 1 admin",
      },
      teamLocation: {
        label: "Office-based, remote, or hybrid?",
        placeholder: "Mostly remote since 2020, partners come in 2 days/week, admin full-time at office",
      },
      operationsWalkthrough: {
        label: "Walk us through a typical client engagement — onboarding through delivery.",
        helper: "Engagement letter, document gathering, bookkeeping, tax prep, review, sign-off, billing. Where does staff time actually go?",
        placeholder: "Engagement letter signed → we set them up in QBO → monthly bookkeeping → quarterly review → year-end docs collected → T2 prep → partner review → e-file → bill in 3 installments...",
      },
      toolsInUse: {
        label: "What's your accounting + practice-management stack?",
        helper: "Accounting (QBO, Xero, Sage), practice mgmt (Karbon, TaxDome, Canopy), tax prep (CCH iFirm, ProFile, TaxCycle), document mgmt, e-signature.",
        placeholder: "QBO Accountant for client books, ProFile for T1/T2, Karbon for workflow + client portal, Dext for receipt capture, DocuSign for engagement letters...",
      },
      leadSources: {
        label: "Where do new clients come from?",
        placeholder: "70% referrals from existing clients + other professionals (lawyers, financial advisors), 20% Google search, 10% other",
      },
      bottlenecks: {
        label: "Where does staff time get eaten up?",
        helper: "Chasing client documents, data entry, reconciliation, tax-season crunch, advisory note prep, A/R collection.",
        placeholder: "Chasing tax docs from clients (Feb-Apr is brutal). Bank reconciliation on messy QBO files. Manual data entry for clients who still email PDFs of receipts.",
      },
      priorAiExperience: {
        label: "Have you tried AI in the firm? What happened?",
        helper: "Dext, Hubdoc, Botkeeper, Karbon AI, ChatGPT for drafting, tax research tools — anything you've tested.",
        placeholder: "Use Dext for receipt OCR — works. Tried ChatGPT for client emails, fine but generic. Worried about data confidentiality so haven't gone deeper.",
      },
      twelveMonthGoals: {
        label: "What does a great next 12 months look like for the firm?",
        placeholder: "Grow advisory revenue from 10% to 25%. Cut tax-season overtime in half. Hire 1 staff accountant without losing margin.",
      },
      automationWish: {
        label: "If you could automate one thing in the firm tomorrow, what would it be?",
        placeholder: "Following up with clients who haven't sent their tax docs — feels like a part-time job in March.",
      },
      anythingElse: {
        helper:
          "Client confidentiality concerns, a partner who's allergic to change, a workflow tool migration that left scars, a client segment you want to grow into — anything that shapes what's actually doable.",
        placeholder:
          "We've been talking about dropping our 20 worst clients for 2 years but never do it. Also, the other partner is allergic to anything that costs more than $100/mo per tool — keep recommendations cheap or with clear ROI.",
      },
    },
    sample: {
      profile: {
        business: "Tremblay CPA",
        city: "Montréal · QC",
        years: "11 years operating",
        team: "2 partners + 2 staff accountants + 1 bookkeeper + 1 admin",
        industry: "Boutique CPA firm — 55% tax, 30% bookkeeping, 15% advisory",
        revenue: "≈ $1.4M annual",
      },
      answers: [
        { q: "What's your practice mix, and how long has the firm operated?", a: "Boutique CPA firm in Montréal. About 80 corporate accounts and 200 personal returns. 55% tax prep (T1/T2), 30% monthly bookkeeping, 15% advisory work. Founded by Marie Tremblay in 2015 after a decade at a Big Four firm." },
        { q: "How many staff total — partners, accountants, bookkeepers, admin?", a: "2 CPA partners, 2 staff accountants, 1 bookkeeper, 1 admin. 6 total." },
        { q: "Office-based, remote, or hybrid?", a: "Mostly remote since 2020. Partners come in 2 days/week, admin is full-time at the office, accountants and bookkeeper are home-based." },
        { q: "Walk us through a typical client engagement — onboarding to delivery.", a: "New client signs engagement letter via DocuSign → we set them up in QBO if they need it → monthly bookkeeping for retainer clients → quarterly review with the partner → year-end: collect tax docs, build trial balance, prep T1/T2 in ProFile → partner review → e-file → bill in 3 installments. Tax season Feb-April is brutal — staff regularly work 25-30 OT hours/week." },
        { q: "What's your accounting + practice-management stack?", a: "QBO Accountant for client books, ProFile for T1/T2 tax prep, Karbon for workflow + client portal, Dext for receipt OCR (works great), DocuSign for engagement letters, Excel for advisory work, Microsoft 365 for everything else." },
        { q: "Where do new clients come from?", a: "70% referrals — other professionals (lawyers, financial advisors) and existing clients. 20% Google search for 'comptable Montréal' and 'CPA Québec'. 10% other (LinkedIn, networking events)." },
        { q: "Where does staff time get eaten up?", a: "Chasing tax documents from clients in March is a part-time job — admin spends 6h/day for 6 weeks on follow-ups. Bank reconciliation on messy QBO files for the 10 worst clients eats 4-6h each per month. Manual data entry for clients who still email PDF receipts. Year-end advisory letter prep eats ~3 days per advisory client." },
        { q: "Have you tried AI in the firm? What happened?", a: "Dext for OCR — works, we keep it. Tried ChatGPT for client emails, feels generic. Karbon has some AI features (template suggestions) but we haven't really turned them on. Worried about confidentiality on cloud AI for actual client financials." },
        { q: "On a scale of 1–10, how comfortable is your team with new tech?", a: "Staff accountants: 7. Marie (partner): 7. Other partner: 5. Bookkeeper: 5. Admin: 7. Firm avg: about 6." },
        { q: "What does success look like in the next 12 months?", a: "Grow advisory revenue from 15% to 30% of total. Cut tax-season overtime by half (currently 25-30 OT hours/staff in March/April). Hire 1 more staff accountant without crushing margins." },
      ],
      report: {
        score: 64,
        breakdown: [
          { label: "Digital foundation", v: 70 },
          { label: "Process maturity", v: 55 },
          { label: "Team readiness", v: 62 },
          { label: "Data quality", v: 65 },
          { label: "Leadership buy-in", v: 65 },
        ],
        summary: [
          "Tremblay CPA has solid tooling (QBO, ProFile, Karbon, Dext) but bleeds 6 hours/day every March–April on document chase — that's 240 hours per tax season recoverable with the right workflow tool.",
          "Reconciliation is the second leak. AI-assisted reconciliation handles 70% of routine entries, freeing staff for the messy 30% that needs judgment.",
          "Advisory note prep is the third — auto-drafting from QBO data + firm template cuts prep from 3 days to 4 hours per client. Unlocks the advisory growth target.",
        ],
        quickWins: [
          {
            tag: "QW.01",
            title: "TaxDome automated document request + chase",
            desc: "TaxDome handles the entire tax-season document workflow: automated request emails, reminders, client portal upload, status tracking. Replaces admin's manual follow-up calls and emails. Cuts the March doc-chase from 6h/day to 30min/day for the admin.",
            impact: "High",
            effort: "Medium",
            cost: "$50/user/mo",
            eta: "3 weeks (avoid Feb–April)",
          },
          {
            tag: "QW.02",
            title: "Botkeeper or AI-assisted reconciliation in QBO Accountant",
            desc: "Plug AI-assisted reconciliation into your messiest 10 QBO files. AI matches transactions to invoices, flags unmatched entries, drafts journal entries for staff review. Cuts month-end close on those files from 4-6h to 1h each.",
            impact: "High",
            effort: "Low",
            cost: "$99–249/mo",
            eta: "2 weeks",
          },
          {
            tag: "QW.03",
            title: "AI-drafted advisory notes (Claude + firm template)",
            desc: "Pull QBO data via API, feed it to Claude with your firm template, get a draft advisory letter in 30 seconds. Partner adds the strategic insight on top. Cuts prep from 3 days to 4 hours per client — unlocks advisory growth.",
            impact: "Medium",
            effort: "Low",
            cost: "≈ $20/mo (API usage)",
            eta: "1 week",
          },
        ],
        strategic: [
          {
            tag: "SP.01",
            title: "Tax return first drafts from prior-year + current-year docs",
            desc: "AI builds preliminary T1/T2 drafts from client documents and prior-year returns. Staff review and refine. Doubles tax-season throughput without doubling staff. Highest-ROI play of the year if executed correctly.",
            roi: "≈ $80K/yr in unlocked tax-season capacity",
            eta: "2–3 months (deploy May–Jan, not during tax season)",
          },
          {
            tag: "SP.02",
            title: "Audit fieldwork analytics — variance + outlier detection",
            desc: "Run analytics on client ledgers: variance vs prior year, ratio benchmarks vs industry, unusual entries. Highlights risk areas before fieldwork starts. Sharper, faster audit testing.",
            roi: "≈ 30% reduction in audit fieldwork hours",
            eta: "3 months",
          },
          {
            tag: "SP.03",
            title: "French-language SEO content engine",
            desc: "Agent writes 4 service-area pages/month: 'comptable Saint-Henri', 'TPS-TVQ Laval', 'fiscalité PME Plateau'. Long-tail organic growth to add ~20% to inbound leads over 6 months.",
            roi: "Organic leads +20–40% over 6 months",
            eta: "2 months",
          },
        ],
        risks: [
          {
            flag: "Client data on cloud AI tools.",
            mitigation: "Use SOC 2-certified vendors only (TaxDome, Botkeeper, Anthropic all qualify). Add an AI/data clause to engagement letters with explicit consent. Encrypt at rest. Don't paste client SINs or banking into ChatGPT.",
            severity: "Medium",
          },
          {
            flag: "Bookkeeper at 5/10 tech comfort — adoption risk.",
            mitigation: "Roll out one tool at a time. Demo first to the most tech-comfortable staff accountant. Have them sit with the bookkeeper for the first reconciliation. Don't push during tax season.",
            severity: "Medium",
          },
          {
            flag: "Tax-season transition timing.",
            mitigation: "Never roll out major changes Feb–April. Pilot in May–Jan and lock workflow before Feb 1. Schedule QW.01 (TaxDome) for completion by Jan 15 at the latest.",
            severity: "High",
          },
        ],
        tools: [
          { name: "TaxDome", purpose: "Workflow + client portal + automated doc chase", cost: "$50/user/mo", url: "https://taxdome.com" },
          { name: "Botkeeper", purpose: "AI-assisted bookkeeping and reconciliation", cost: "$99–249/mo", url: "https://botkeeper.com" },
          { name: "Dext", purpose: "Already using — expand to all retainer clients", cost: "$25/client/mo", url: "https://dext.com" },
          { name: "Anthropic Claude", purpose: "Advisory note drafts, client emails, T1/T2 first drafts", cost: "≈ $50/mo API", url: "https://anthropic.com" },
          { name: "Karbon", purpose: "Already using — enable AI features in Settings", cost: "Included", url: "https://karbonhq.com" },
        ],
        next: {
          immediate: [
            "Sign up for TaxDome 14-day trial. Pilot 5 corporate clients to test the workflow fit before committing.",
            "Connect Botkeeper to your 2 messiest QBO files. Run a reconciliation pass — measure time savings.",
            "Draft one client's next advisory letter in Claude using your firm template. Marie reviews and refines.",
          ],
          thirtyDays: [
            "TaxDome live for all retainer clients — automated doc-chase pre-loaded for next tax season.",
            "Botkeeper assisting reconciliation across the 10 messiest client files.",
            "AI-drafted advisory notes running on 20% of advisory clients.",
          ],
        },
        financialImpact: {
          weeklyHoursReclaimed: 16,
          hourlyRateAssumption: 90,
          monthlyToolCost: 370,
          netMonthlySavings: 5865,
        },
        quickWinPlan: [
          { day: 1, action: "Sign up for TaxDome 14-day trial. Migrate 1 retainer client's workflow from Karbon to test the fit and feel." },
          { day: 2, action: "Connect Botkeeper to your 2 messiest QBO files (the ones eating 4-6h/month each). Run a reconciliation pass and measure." },
          { day: 3, action: "Pick your top advisory client. Pull their QBO data, feed to Claude with your firm template, generate a draft monthly letter. Marie reviews." },
          { day: 4, action: "Set up the TaxDome doc-chase flow for 5 corporate clients. Send the welcome flow + first document request." },
        ],
      },
    },
  },
};

export default en;
