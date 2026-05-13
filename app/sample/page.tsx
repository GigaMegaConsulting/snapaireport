import Link from "next/link";
import type { Metadata } from "next";
import { VERSION_LABEL } from "@/lib/version";

export const metadata: Metadata = {
  title: "Specimen — Acme Plumbing · SnapReport",
  description:
    "A sample SnapReport. See the company profile, their answers, and the full AI Readiness Report they received by email.",
};

/* ─── Sample content ───────────────────────────────────────────── */

const PROFILE = {
  business: "Acme Plumbing",
  city: "Greater Montréal · QC",
  years: "8 years operating",
  team: "12 employees · 2 owners",
  industry: "Residential plumbing & emergency repair",
  revenue: "≈ $1.1M annual",
};

const ANSWERS = [
  {
    q: "What does your business do, and how long have you been operating?",
    a:
      "We're a residential plumbing company in the Greater Montréal area. Mostly emergency repairs (leaks, blocked drains, water-heater failures) and some scheduled installs. Eight years in, second-generation family business — my dad started it.",
  },
  {
    q: "How many employees do you have? Are they local or remote?",
    a:
      "12 people total. Two of us own it (myself and my brother). Five field techs in service trucks, three apprentices, two office staff handling dispatch and billing, plus my brother who runs the field side.",
  },
  {
    q:
      "Walk me through your main day-to-day operations — what happens from when a customer reaches out to when you deliver?",
    a:
      "Customer calls our main line OR fills out our website form. Office staff (Sylvie) takes the info, decides if it's an emergency or scheduled. For emergencies she radios the nearest tech. For scheduled jobs she books in Jobber. Tech arrives, diagnoses, gives a price verbally or via printed quote. Customer approves, work happens, tech logs hours in Jobber, then we invoice through QuickBooks two days later. Follow-up call from Sylvie a week after for satisfaction.",
  },
  {
    q: "What software or tools does your team use daily?",
    a:
      "Jobber for scheduling and tech dispatch. QuickBooks for billing and accounting. Google Workspace for email and calendar. A WhatsApp group for the field guys to coordinate. Excel for tracking inventory of parts in the trucks. Sylvie also keeps a paper notebook for callbacks.",
  },
  {
    q: "Where do most of your leads or customers come from right now?",
    a:
      "About 50% word of mouth — long-time customers and referrals. 30% Google search (we rank #2 for 'plombier Montréal urgence'). 15% Facebook ads my nephew runs for us. 5% the Yellow Pages still, somehow.",
  },
  {
    q: "What are your biggest bottlenecks?",
    a:
      "Answering the phone is the worst. We lose maybe 4-6 calls a day to voicemail when Sylvie is on another line, and a chunk of those don't call back. Sending quotes also drags — techs handwrite them and Sylvie retypes into Jobber later. Following up on unpaid invoices is a constant headache. Inventory in the trucks is a black box — techs run out of parts, drive back, lose half a day.",
  },
  {
    q: "Have you tried using AI or automation in your business before? What happened?",
    a:
      "Tried ChatGPT to write Facebook ad copy — works fine, saves time, but feels hit or miss. My brother tried a robo-call answering service last year that was terrible (customers hated it). Nothing else.",
  },
  {
    q: "On a scale of 1–10, how comfortable is your team with new technology?",
    a: "Office staff: 6. Owners: 7. Field techs: range from 3 to 8 depending on age. As a team, I'd say 5.",
  },
  {
    q: "What does success look like for you in the next 12 months?",
    a:
      "Hit $1.5M in revenue, hire 2 more techs without me working 60-hour weeks. Stop missing calls. Get our quote-to-cash cycle from 5 days down to 2.",
  },
  {
    q: "If you could automate one thing in your business tomorrow, what would it be?",
    a:
      "The back-and-forth scheduling with customers. Sylvie spends maybe 2 hours a day on phone tag — 'is Tuesday at 2pm good? no? how about Wednesday?'. If a customer could just book a slot online with the right tech, that's gold.",
  },
];

const REPORT = {
  score: 62,
  breakdown: [
    { label: "Digital foundation", v: 70 },
    { label: "Process maturity", v: 65 },
    { label: "Team readiness", v: 55 },
    { label: "Data quality", v: 50 },
    { label: "Leadership buy-in", v: 75 },
  ],
  summary: [
    "Acme is well-positioned for AI: clear processes, an existing software stack (Jobber, QuickBooks, Google), and ownership that's already experimenting with ChatGPT.",
    "The single biggest leak is the phone — missed calls = lost emergency revenue. An AI receptionist + online booking pays for itself inside a month.",
    "Quote-to-cash cycle compression is the next-largest opportunity. Going from handwritten quotes to AI-drafted PDFs from the truck cuts admin time by ~50%.",
  ],
  quickWins: [
    {
      tag: "QW.01",
      title: "AI receptionist for after-hours and overflow calls",
      desc:
        "Plug a voice agent (Retell, VAPI, or similar) into your main line as overflow. Triages emergencies, books slots in Jobber via API, transcribes the rest. Captures the 4–6 missed calls/day at roughly $200 average ticket.",
      impact: "High",
      effort: "Medium",
      cost: "≈ $80/mo + $0.08/min",
      eta: "2–3 weeks",
    },
    {
      tag: "QW.02",
      title: "Auto-generate quote PDFs from tech voice notes",
      desc:
        "Tech speaks the job + parts into their phone after diagnosis. AI transcribes, generates a branded PDF quote, emails it to the customer and Sylvie within 90 seconds. Eliminates handwriting + Sylvie's retype step.",
      impact: "High",
      effort: "Low",
      cost: "≈ $20/mo (Anthropic API)",
      eta: "1–2 weeks",
    },
    {
      tag: "QW.03",
      title: "Online booking embed on the website",
      desc:
        "Replace the contact form with a Cal.com (or Calendly) embed that respects tech availability + service area. Cuts the phone-tag scheduling that costs Sylvie ~2h/day.",
      impact: "Medium",
      effort: "Low",
      cost: "Free–$15/mo",
      eta: "3 days",
    },
  ],
  strategic: [
    {
      tag: "SP.01",
      title: "Predictive truck inventory from past job patterns",
      desc:
        "Mine 3 years of Jobber + QuickBooks data to predict what parts each tech needs to restock weekly. Cuts return-trips to the warehouse — recovers ~5h/week per tech.",
      roi: "≈ $30K/yr in recovered labor",
      eta: "2–3 months",
    },
    {
      tag: "SP.02",
      title: "AI-drafted invoice follow-ups",
      desc:
        "Auto-draft polite collection emails based on invoice age + customer history. Owner approves with one click. Closes 60-day receivables ~2× faster.",
      roi: "≈ 8% improvement in cash-flow cycle",
      eta: "3–4 weeks",
    },
    {
      tag: "SP.03",
      title: "French-language SEO content engine",
      desc:
        "Agent writes ~4 service-area landing pages per month (\"plombier urgence Laval\", \"chauffe-eau Brossard\"). Pairs with existing Google ranking; long-tail organic should 2× over 6 months.",
      roi: "Organic leads +50–100%",
      eta: "Month 2+",
    },
  ],
  risks: [
    {
      flag: "Field-tech adoption (3 of 5 score themselves under 5/10 on tech comfort).",
      mitigation:
        "Roll out voice-quote tool only after a 2-week pilot with the most tech-comfortable tech. Have him demo to the others. Voice-driven UX (no typing) lowers the barrier.",
      severity: "Medium",
    },
    {
      flag: "Customer pushback on AI receptionist (your brother's previous robo-call attempt failed).",
      mitigation:
        "Position it as 'overflow assistant', not the primary line. Sylvie still picks up first. AI only after 3 rings. Use a natural voice (11labs or similar), not a robo voice.",
      severity: "Medium",
    },
    {
      flag: "Data hygiene — quotes are handwritten, not all flowing into Jobber.",
      mitigation:
        "QW.02 (voice-to-quote) fixes this structurally. Once quotes are AI-drafted they land in Jobber automatically.",
      severity: "Low",
    },
  ],
  tools: [
    { name: "Retell AI", purpose: "AI receptionist + booking voice agent", cost: "$0.08/min", url: "https://retellai.com" },
    { name: "Anthropic Claude", purpose: "Voice-to-quote generation + email drafts", cost: "$0.50/quote avg.", url: "https://anthropic.com" },
    { name: "Cal.com", purpose: "Online booking, embeds in website", cost: "Free–$15/mo", url: "https://cal.com" },
    { name: "Make.com", purpose: "Glue layer: Jobber ↔ QuickBooks ↔ AI tools", cost: "$9–29/mo", url: "https://make.com" },
    { name: "Lindy / Magical AI", purpose: "Invoice follow-up drafts, owner-approves-then-sends", cost: "$30–50/mo", url: "https://lindy.ai" },
  ],
  next: {
    immediate: [
      "Pick one field tech (the most tech-comfortable) for the voice-to-quote pilot.",
      "Set up a Cal.com account and add a basic booking embed to acmeplumbing.ca this week.",
      "Forward the next missed call to a Retell trial agent. Listen to the transcript.",
    ],
    thirtyDays: [
      "Wire Retell as Jobber-aware overflow. Measure missed-call recovery rate.",
      "Voice-to-quote rolled out to all 5 techs after pilot validates.",
      "AI invoice follow-ups running on 30–60 day buckets.",
    ],
  },
};

/* ─── Page ─────────────────────────────────────────────────────── */

export default function Sample() {
  return (
    <div className="min-h-screen bg-paper text-ink relative">
      <div className="bp-grid pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Mark />
              <span className="serif text-xl">SnapReport</span>
              <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                Specimen · Fig. 01
              </span>
            </Link>
            <Link href="/assessment" className="btn-ink text-[13px] !py-2 !px-4">
              Get your own →
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="eyebrow mb-6 flex items-center gap-3">
                <span>§ ▢ · SPECIMEN</span>
                <span className="annotation flex-1 max-w-xs" />
                <span className="mono text-[10px] text-ink-3 uppercase tracking-[0.12em]">
                  Public sample
                </span>
              </div>
              <h1 className="serif text-[64px] leading-[0.95] tracking-tight mb-6">
                What a SnapReport<br /><em>actually looks like.</em>
              </h1>
              <p className="text-[17px] leading-[1.55] text-ink-2 max-w-xl">
                Below: a fictional Montreal plumbing company, the 10 answers they
                gave the form, and the full report Claude generated for them. Same
                process you&apos;ll go through. Same kind of report you&apos;ll get back.
              </p>
              <div className="mt-8 mono text-[11px] uppercase tracking-[0.12em] text-ink-2 italic">
                Note: Acme Plumbing is invented for demonstration. No real customer data shown.
              </div>
            </div>
            <aside className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <div className="eyebrow mb-4">Contents</div>
              <ol className="space-y-2 mono text-[12px]">
                {[
                  ["A", "Company profile"],
                  ["B", "The 10 answers"],
                  ["C", "Report — exec summary"],
                  ["D", "AI Readiness score"],
                  ["E", "Quick wins"],
                  ["F", "Strategic plays"],
                  ["G", "Risk flags"],
                  ["H", "Tool stack"],
                  ["I", "Next steps"],
                ].map(([n, t]) => (
                  <li key={n}>
                    <a href={`#s${n}`} className="flex items-baseline gap-3 text-ink-2 hover:text-ink transition">
                      <span className="text-ink-3">§ {n}</span>
                      <span className="font-sans text-sm">{t}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* § A · Company profile */}
        <SectionBlock id="sA" letter="A" title="Company profile">
          <div className="border border-rule p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 bg-paper-2/40">
            {[
              ["Business", PROFILE.business],
              ["Location", PROFILE.city],
              ["Years operating", PROFILE.years],
              ["Team", PROFILE.team],
              ["Industry", PROFILE.industry],
              ["Approx. revenue", PROFILE.revenue],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-rule pb-3">
                <div className="eyebrow mb-1.5">{k}</div>
                <div className="serif text-xl leading-tight">{v}</div>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* § B · The 10 answers */}
        <SectionBlock id="sB" letter="B" title="The 10 answers they gave">
          <div className="border border-rule">
            {ANSWERS.map((qa, i) => (
              <details key={i} className="group border-b border-rule last:border-b-0">
                <summary className="cursor-pointer list-none px-6 py-5 flex items-baseline gap-4 hover:bg-paper-2/40 transition">
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 min-w-[40px]">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="serif text-[18px] leading-tight flex-1">{qa.q}</span>
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 group-open:rotate-90 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pl-[72px] -mt-2">
                  <div className="annotation w-12 mb-3" />
                  <p className="text-[15px] leading-relaxed text-ink-2">{qa.a}</p>
                </div>
              </details>
            ))}
          </div>
        </SectionBlock>

        {/* Pause / Report begins */}
        <div className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <div className="annotation w-24 mx-auto mb-4" />
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-2">
              ↓ Below: what Claude generated and emailed them
            </div>
            <div className="annotation w-24 mx-auto mt-4" />
          </div>
        </div>

        {/* Report header card */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="tick-frame border border-ink p-10 bg-paper">
              <div className="flex items-baseline justify-between mb-6">
                <div className="eyebrow">SnapReport · AI Readiness</div>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Issued · 2026.05.13
                </div>
              </div>
              <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight mb-2">
                {PROFILE.business}
              </h2>
              <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                {PROFILE.city} · {PROFILE.industry}
              </div>
            </div>
          </div>
        </section>

        {/* § C · Executive summary */}
        <SectionBlock id="sC" letter="C" title="Executive summary">
          <div className="space-y-6">
            {REPORT.summary.map((s, i) => (
              <div key={i} className="flex items-start gap-6">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 pt-1.5 min-w-[40px]">
                  ES.{String(i + 1).padStart(2, "0")}
                </span>
                <p className="serif text-[22px] leading-[1.3] flex-1">{s}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* § D · Readiness score */}
        <SectionBlock id="sD" letter="D" title="AI Readiness score">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <div className="border border-rule p-8 text-center">
                <div className="eyebrow mb-4">Overall</div>
                <div className="serif text-[120px] leading-none">{REPORT.score}<span className="text-ink-3 text-4xl align-top">/100</span></div>
                <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2 mt-4">
                  Above SMB average (54)
                </div>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="eyebrow mb-6">Breakdown</div>
              <div className="space-y-4">
                {REPORT.breakdown.map((b) => (
                  <div key={b.label}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="serif text-[18px]">{b.label}</span>
                      <span className="mono text-[14px] text-ink">{b.v}<span className="text-ink-3">/100</span></span>
                    </div>
                    <div className="h-1 bg-rule">
                      <div className="h-full bg-ink" style={{ width: `${b.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* § E · Quick wins */}
        <SectionBlock id="sE" letter="E" title="Top 3 quick wins (≤30 days)">
          <div className="space-y-6">
            {REPORT.quickWins.map((w) => (
              <div key={w.tag} className="border border-rule p-6 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{w.tag}</span>
                    <h3 className="serif text-2xl leading-tight">{w.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-2">{w.desc}</p>
                </div>
                <div className="md:col-span-5 md:border-l md:border-rule md:pl-6 grid grid-cols-2 gap-x-4 gap-y-3 content-center">
                  <MetaPair label="Impact" v={w.impact} />
                  <MetaPair label="Effort" v={w.effort} />
                  <MetaPair label="Cost" v={w.cost} />
                  <MetaPair label="ETA" v={w.eta} />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* § F · Strategic plays */}
        <SectionBlock id="sF" letter="F" title="Top 3 strategic plays (3–6 months)">
          <div className="space-y-6">
            {REPORT.strategic.map((s) => (
              <div key={s.tag} className="border border-rule p-6 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{s.tag}</span>
                    <h3 className="serif text-2xl leading-tight">{s.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-2">{s.desc}</p>
                </div>
                <div className="md:col-span-4 md:border-l md:border-rule md:pl-6 flex flex-col justify-center">
                  <MetaPair label="ROI estimate" v={s.roi} />
                  <div className="mt-3"><MetaPair label="Timeline" v={s.eta} /></div>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* § G · Risk flags */}
        <SectionBlock id="sG" letter="G" title="Risk flags + mitigations">
          <div className="border border-rule">
            <div className="grid grid-cols-12 mono text-[10px] uppercase tracking-[0.18em] text-ink-3 border-b border-rule">
              <div className="col-span-1 p-4 border-r border-rule">Sev</div>
              <div className="col-span-5 p-4 border-r border-rule">Flag</div>
              <div className="col-span-6 p-4">Mitigation</div>
            </div>
            {REPORT.risks.map((r, i) => (
              <div key={i} className={`grid grid-cols-12 ${i < REPORT.risks.length - 1 ? "border-b border-rule" : ""}`}>
                <div className="col-span-1 p-4 border-r border-rule mono text-[10px] uppercase tracking-[0.18em] flex items-start">
                  {r.severity === "High" && <span className="text-stamp">⚠</span>}
                  {r.severity === "Medium" && <span className="text-ink-2">●</span>}
                  {r.severity === "Low" && <span className="text-ink-3">○</span>}
                  <span className="ml-2">{r.severity}</span>
                </div>
                <div className="col-span-5 p-4 border-r border-rule text-[14px] leading-relaxed">{r.flag}</div>
                <div className="col-span-6 p-4 text-[14px] leading-relaxed text-ink-2">{r.mitigation}</div>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* § H · Tool stack */}
        <SectionBlock id="sH" letter="H" title="Recommended tool stack">
          <div className="border border-rule">
            <div className="grid grid-cols-12 mono text-[10px] uppercase tracking-[0.18em] text-ink-3 border-b border-rule">
              <div className="col-span-3 p-4 border-r border-rule">Tool</div>
              <div className="col-span-6 p-4 border-r border-rule">Purpose</div>
              <div className="col-span-3 p-4">Cost</div>
            </div>
            {REPORT.tools.map((t, i) => (
              <div key={t.name} className={`grid grid-cols-12 ${i < REPORT.tools.length - 1 ? "border-b border-rule" : ""}`}>
                <div className="col-span-3 p-4 border-r border-rule serif text-[18px]">{t.name}</div>
                <div className="col-span-6 p-4 border-r border-rule text-[14px] leading-relaxed text-ink-2">{t.purpose}</div>
                <div className="col-span-3 p-4 mono text-[13px]">{t.cost}</div>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* § I · Next steps */}
        <SectionBlock id="sI" letter="I" title="Next steps">
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            <div className="bg-paper p-8">
              <div className="eyebrow mb-4">This week</div>
              <ol className="space-y-3">
                {REPORT.next.immediate.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 pt-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-paper p-8">
              <div className="eyebrow mb-4">Within 30 days</div>
              <ol className="space-y-3">
                {REPORT.next.thirtyDays.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 pt-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </SectionBlock>

        {/* Closing CTA */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <div className="eyebrow mb-6 flex justify-center">// END OF SPECIMEN</div>
            <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight max-w-3xl mx-auto mb-8">
              This was Acme&apos;s.<br />
              <em>What would yours say?</em>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <Link href="/assessment" className="btn-ink text-[15px] !py-4 !px-6">
                <span>Get your own report</span>
                <Arrow />
              </Link>
              <Link href="/" className="btn-ghost">
                ← Back to home
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between text-[12px] text-ink-2">
            <div className="flex items-center gap-3">
              <Mark size={14} />
              <span className="mono">SnapReport · Specimen Fig. 01</span>
              <span className="mono text-ink-3">·</span>
              <span className="mono text-ink-3 italic">Fictional company</span>
            </div>
            <div className="flex items-center gap-6 mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
              <a href="mailto:info@snapaireport.com" className="hover:text-ink transition">info@snapaireport.com</a>
              <span title={VERSION_LABEL}>{VERSION_LABEL}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────── */

function SectionBlock({
  id,
  letter,
  title,
  children,
}: {
  id: string;
  letter: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-rule">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid md:grid-cols-12 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="eyebrow">§ {letter}</div>
          </div>
          <div className="md:col-span-10">
            <h2 className="serif text-3xl md:text-4xl leading-[1.05] tracking-tight">
              {title}
            </h2>
          </div>
        </div>
        <div className="md:pl-[calc(100%/12*2+2rem)] md:max-w-none">{children}</div>
      </div>
    </section>
  );
}

function MetaPair({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <div className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3 mb-1">{label}</div>
      <div className="text-[13px] leading-snug">{v}</div>
    </div>
  );
}

function Mark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="0.5" y="0.5" width="17" height="17" stroke="currentColor" />
      <path d="M4 13 L9 4 L14 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5 H12 M8 1 L12 5 L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
