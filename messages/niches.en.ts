/**
 * Niche-specific copy overrides. Each niche keeps the brand voice but
 * speaks the language of its audience and points at the bottlenecks and
 * tools relevant to that profession.
 *
 * Used by /en/lawyers, /en/accountants, etc. The form posts the niche
 * key in the submission so Claude knows to tailor the report.
 */

export type NicheKey = "lawyers" | "accountants";

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
  },
};

export default en;
