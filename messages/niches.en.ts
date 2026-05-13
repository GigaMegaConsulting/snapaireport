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
  | "automationWish";

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
    },
  },
};

export default en;
