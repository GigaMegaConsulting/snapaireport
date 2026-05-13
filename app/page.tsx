import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink relative">
      {/* Blueprint grid background, fixed */}
      <div className="bp-grid pointer-events-none fixed inset-0 opacity-100 z-0" aria-hidden />

      <div className="relative z-10">
        {/* ─── Header ──────────────────────────────────────────────── */}
        <header className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Mark />
              <span className="serif text-xl">SnapReport</span>
              <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                v0.1
              </span>
            </Link>
            <nav className="flex items-center gap-7">
              <a href="#process" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                Process
              </a>
              <a href="#deliverable" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                Deliverable
              </a>
              <a href="#pricing" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                Pricing
              </a>
              <Link href="/assessment" className="btn-ink text-[13px] !py-2 !px-4">
                Start →
              </Link>
            </nav>
          </div>
        </header>

        {/* ─── Hero ────────────────────────────────────────────────── */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="eyebrow">§ 00 · INTAKE</span>
                <span className="annotation flex-1" />
                <span className="mono text-[10px] text-ink-3 uppercase tracking-[0.12em]">
                  est. 5 min
                </span>
              </div>

              <h1 className="serif text-[64px] md:text-[88px] leading-[0.95] tracking-tight text-ink">
                Map the AI<br />
                <em>opportunities</em><br />
                hiding in your<br />
                business.
              </h1>

              <p className="mt-10 max-w-xl text-[17px] leading-[1.55] text-ink-2">
                Answer 10 questions about how you operate. Claude reads them, finds the highest-leverage AI plays for your specific situation, and emails you a tailored report. No call. No pitch. Just clarity.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link href="/assessment" className="btn-ink">
                  <span>Begin assessment</span>
                  <Arrow />
                </Link>
                <a href="#process" className="btn-ghost">See the process</a>
              </div>

              <div className="mt-10 flex items-center gap-6 mono text-[11px] text-ink-2 uppercase tracking-[0.12em]">
                <span className="flex items-center gap-2">
                  <Dot /> 10 questions
                </span>
                <span className="flex items-center gap-2">
                  <Dot /> PDF in inbox
                </span>
                <span className="flex items-center gap-2">
                  <Dot /> Free for first 3
                </span>
              </div>
            </div>

            <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-4">
                Specimen
              </div>
              <ReportPreview />
              <div className="mt-4 flex items-center justify-between mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                <span>Fig. 01</span>
                <span>Output sample</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Process ─────────────────────────────────────────────── */}
        <section id="process" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-4">
                <div className="eyebrow mb-6">§ 01 · METHOD</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  Three steps,<br />
                  zero friction.
                </h2>
              </div>
              <div className="md:col-span-7 md:col-start-6 self-end">
                <p className="text-ink-2 leading-relaxed">
                  Designed to be done in one sitting on your phone or laptop. No software to install. No prep. No follow-up call required to get value out of it.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
              {[
                {
                  n: "01",
                  title: "Answer 10 questions",
                  desc: "A short web form covers your operations, team, tools, leads, bottlenecks, AI experience, and 12-month goals.",
                  meta: "≈ 5 minutes",
                },
                {
                  n: "02",
                  title: "Claude reads them",
                  desc: "Your answers are analyzed by Claude (Anthropic's frontier model) — pattern-matched against thousands of SMB profiles.",
                  meta: "≈ 30 seconds",
                },
                {
                  n: "03",
                  title: "Report in your inbox",
                  desc: "PDF arrives at the email you provided. Readiness score, three quick wins, three strategic plays, tool stack, next steps.",
                  meta: "≈ 2 minutes",
                },
              ].map((s) => (
                <div key={s.n} className="bg-paper p-8 relative">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                      Step
                    </span>
                    <span className="serif text-5xl text-ink leading-none">{s.n}</span>
                  </div>
                  <h3 className="serif text-2xl mb-3 leading-tight">{s.title}</h3>
                  <p className="text-[14px] text-ink-2 leading-relaxed mb-6">{s.desc}</p>
                  <div className="annotation w-full mb-3" />
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-ink-2">
                    {s.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Deliverable ─────────────────────────────────────────── */}
        <section id="deliverable" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-5">
                <div className="eyebrow mb-6">§ 02 · DELIVERABLE</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  What you get,<br /><em>section by section.</em>
                </h2>
                <p className="mt-6 text-ink-2 leading-relaxed">
                  A 6–8 page PDF. Plain language. Specific to your business. Designed to be readable in 10 minutes and acted on in 30 days.
                </p>
              </div>
              <div className="md:col-span-6 md:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule">
                {[
                  { tag: "01", title: "AI Readiness Score", desc: "0–100 with breakdown across 5 dimensions." },
                  { tag: "02", title: "Executive Summary", desc: "Three plain-language bullets — what you'd tell a co-founder." },
                  { tag: "03", title: "Quick Wins", desc: "Three high-leverage moves you can ship in 30 days." },
                  { tag: "04", title: "Strategic Plays", desc: "Three bigger bets for the 3–6 month horizon." },
                  { tag: "05", title: "Risk Flags", desc: "What's likely to block adoption and how to defuse it." },
                  { tag: "06", title: "Tool Stack", desc: "Specific products with pricing, matched to your situation." },
                ].map((d) => (
                  <div key={d.tag} className="bg-paper p-5">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="mono text-[10px] text-ink-3 tracking-[0.18em]">{d.tag}</span>
                      <h3 className="serif text-lg leading-tight">{d.title}</h3>
                    </div>
                    <p className="text-[13px] text-ink-2 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pricing ─────────────────────────────────────────────── */}
        <section id="pricing" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div className="eyebrow mb-6">§ 03 · TERMS</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  Free, for now.
                </h2>
                <p className="mt-6 text-ink-2 leading-relaxed">
                  We're running the first cohort at no cost to build case studies. Reports normally retail at $1,000.
                </p>
              </div>

              <div className="md:col-span-7 md:col-start-6 tick-frame border border-ink p-10 relative bg-paper">
                <div className="absolute -top-4 right-8">
                  <span className="stamp">First Cohort · Limited</span>
                </div>

                <div className="flex items-baseline gap-4 mb-2">
                  <span className="serif text-[80px] leading-none">$0</span>
                  <span className="serif text-[24px] text-ink-3 italic line-through">$1,000</span>
                </div>
                <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2 mb-8">
                  One-time · No subscription · No card required
                </div>

                <ul className="space-y-3 mb-10">
                  {[
                    "Custom AI readiness report (PDF)",
                    "Top 3 quick wins + 3 strategic plays",
                    "Tool recommendations with pricing",
                    "Risk flags and 30-day action plan",
                    "Delivered to your inbox within minutes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px]">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/assessment" className="btn-ink w-full justify-center">
                  <span>Claim your report</span>
                  <Arrow />
                </Link>
                <p className="mt-4 mono text-[10px] uppercase tracking-[0.12em] text-ink-3 text-center">
                  Implementation services available separately ($3–5K)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Closing CTA ─────────────────────────────────────────── */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-32 text-center">
            <div className="eyebrow mb-6 justify-center flex">// END OF PROSPECTUS</div>
            <h2 className="serif text-5xl md:text-7xl leading-[1] tracking-tight max-w-3xl mx-auto">
              Ten questions stand between you and a tailored AI roadmap.
            </h2>
            <div className="mt-12 flex items-center justify-center gap-4">
              <Link href="/assessment" className="btn-ink text-[15px] !py-4 !px-6">
                <span>Begin assessment</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────────── */}
        <footer>
          <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between text-[12px] text-ink-2">
            <div className="flex items-center gap-3">
              <Mark size={14} />
              <span className="mono">SnapReport</span>
              <span className="mono text-ink-3">·</span>
              <span className="mono text-ink-3">Giga Mega Consulting Inc.</span>
            </div>
            <div className="flex items-center gap-6 mono text-[11px] uppercase tracking-[0.12em]">
              <a href="mailto:hello@gigamega.ca" className="hover:text-ink transition">
                hello@gigamega.ca
              </a>
              <span className="text-ink-3">v0.1 · 2026</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ─── Inline icons / marks ──────────────────────────────────────── */

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

function Dot() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6">
      <circle cx="3" cy="3" r="3" fill="currentColor" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
      <path d="M3 8 L7 12 L13 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ─── Sample report preview (for the hero specimen) ──────────────── */

function ReportPreview() {
  return (
    <div className="border border-rule-strong bg-paper-2 p-5 shadow-sm">
      <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-rule">
        <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">
          SnapReport · 2026.05
        </span>
        <span className="mono text-[9px] text-ink-3">PG 01 / 07</span>
      </div>
      <div className="serif text-[15px] leading-tight mb-2">
        AI Readiness Report
      </div>
      <div className="mono text-[10px] text-ink-2 uppercase tracking-[0.12em] mb-4">
        Acme Plumbing · Montreal QC
      </div>

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">Score</span>
          <span className="serif text-2xl leading-none">68<span className="text-ink-3 text-base">/100</span></span>
        </div>
        <div className="h-1 bg-rule">
          <div className="h-full bg-ink" style={{ width: "68%" }} />
        </div>
      </div>

      <div className="space-y-2.5">
        {[
          { tag: "QW.01", label: "AI receptionist for after-hours calls" },
          { tag: "QW.02", label: "Auto-generate quote PDFs from intake" },
          { tag: "SP.01", label: "Predictive scheduling from past jobs" },
        ].map((r) => (
          <div key={r.tag} className="flex items-baseline gap-2 text-[11px]">
            <span className="mono text-ink-3 text-[9px] uppercase tracking-[0.1em]">{r.tag}</span>
            <span className="text-ink leading-tight">{r.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-rule mono text-[9px] uppercase tracking-[0.18em] text-ink-3 flex items-center justify-between">
        <span>↳ continued · pg 02</span>
        <span>SR/v0.1</span>
      </div>
    </div>
  );
}
