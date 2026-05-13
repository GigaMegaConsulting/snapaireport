import Link from "next/link";
import { VERSION, VERSION_LABEL } from "@/lib/version";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import type { Locale, Messages, NicheKey } from "@/lib/i18n";
import { getNicheMessages } from "@/lib/i18n";

/**
 * Niche-targeted landing page (e.g. /en/lawyers, /fr/accountants).
 *
 * Renders the SnapReport landing with:
 *   - hero copy from the niche-specific message bundle
 *   - a niche-specific "bottlenecks" section instead of generic Process
 *   - links to /assessment?niche=<key> so the backend tunes the report
 *
 * The Process, Deliverable, Pricing, and Closing CTA sections fall back
 * to the generic translations — they're already tight and don't need a
 * niche-specific rewrite.
 */
export function NicheLanding({
  locale,
  niche,
  t,
}: {
  locale: Locale;
  niche: NicheKey;
  t: Messages;
}) {
  const n = getNicheMessages(locale, niche);
  const assessmentHref = `/${locale}/assessment?niche=${niche}`;
  const homeHref = `/${locale}`;

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      <div>
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
            <Link href={homeHref} className="flex items-center gap-3">
              <Mark />
              <span className="serif text-xl">{t.common.brand}</span>
              <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                {n.badge}
              </span>
            </Link>
            <nav className="flex items-center gap-7">
              <a href="#bottlenecks" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                {t.common.nav.process}
              </a>
              <a href="#deliverable" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                {t.common.nav.deliverable}
              </a>
              <a href="#pricing" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                {t.common.nav.pricing}
              </a>
              <LocaleSwitch current={locale} />
              <Link href={assessmentHref} className="btn-ink text-[13px] !py-2 !px-4">
                {t.common.cta.start}
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="eyebrow">{n.eyebrow}</span>
                <span className="annotation flex-1" />
                <span className="mono text-[10px] text-ink-3 uppercase tracking-[0.12em]">
                  {t.landing.hero.estimate}
                </span>
              </div>

              <h1 className="serif text-[64px] md:text-[88px] leading-[0.95] tracking-tight text-ink">
                {n.headline.map((line, i) => (
                  <span key={i}>
                    {i === n.headlineItalicIndex ? <em>{line}</em> : line}
                    {i < n.headline.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <p className="mt-10 max-w-xl text-[17px] leading-[1.55] text-ink-2">{n.lead}</p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link href={assessmentHref} className="btn-ink">
                  <span>{t.common.cta.beginAssessment}</span>
                  <Arrow />
                </Link>
                <a href="#bottlenecks" className="btn-ghost">
                  {t.common.cta.seeProcess}
                </a>
              </div>

              <div className="mt-10 flex items-center gap-6 mono text-[11px] text-ink-2 uppercase tracking-[0.12em] flex-wrap">
                {n.badges.map((b) => (
                  <span key={b} className="flex items-center gap-2">
                    <Dot /> {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <Link href={`/${locale}/sample?niche=${niche}`} className="block group">
                <div className="flex items-center justify-between mb-4 mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  <span>{t.landing.hero.specimenLabel}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition">{t.common.cta.viewFull}</span>
                </div>
                <div className="border border-rule-strong bg-paper-2 p-5 transition group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_0_-6px_var(--rule-strong)]">
                  <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-rule">
                    <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">{t.common.brand} · 2026.05</span>
                    <span className="mono text-[9px] text-ink-3">PG 01 / 07</span>
                  </div>
                  <div className="serif text-[15px] leading-tight mb-2">{t.sample.reportHeader}</div>
                  <div className="mono text-[10px] text-ink-2 uppercase tracking-[0.12em] mb-4">Sample · {n.badge}</div>
                  <div className="mb-4">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">{t.sample.overall}</span>
                      <span className="serif text-2xl leading-none">68<span className="text-ink-3 text-base">/100</span></span>
                    </div>
                    <div className="h-1 bg-rule"><div className="h-full bg-ink" style={{ width: "68%" }} /></div>
                  </div>
                  <div className="space-y-2.5">
                    {n.bottlenecks.items.slice(0, 3).map((b) => (
                      <div key={b.tag} className="flex items-baseline gap-2 text-[11px]">
                        <span className="mono text-ink-3 text-[9px] uppercase tracking-[0.1em]">{b.tag}</span>
                        <span className="text-ink leading-tight">{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                  <span>Fig. 01</span>
                  <span className="group-hover:text-ink transition">{t.common.cta.clickToExpand}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Niche bottlenecks (replaces generic Process) */}
        <section id="bottlenecks" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-5">
                <div className="eyebrow mb-6">§ 01 · OPPORTUNITIES</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  {n.bottlenecks.title.map((line, i) => (
                    <span key={i}>
                      {i === n.bottlenecks.titleItalicIndex ? <em>{line}</em> : line}
                      {i < n.bottlenecks.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>
              <div className="md:col-span-6 md:col-start-7 self-end">
                <p className="text-ink-2 leading-relaxed">{n.bottlenecks.lead}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
              {n.bottlenecks.items.map((item) => (
                <div key={item.tag} className="bg-paper p-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{item.tag}</span>
                    <h3 className="serif text-xl leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-[14px] text-ink-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverable (generic) */}
        <section id="deliverable" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-5">
                <div className="eyebrow mb-6">{t.landing.deliverable.sectionNumber}</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  {t.landing.deliverable.title.map((line, i) => (
                    <span key={i}>
                      {i === t.landing.deliverable.titleItalicIndex ? <em>{line}</em> : line}
                      {i < t.landing.deliverable.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="mt-6 text-ink-2 leading-relaxed">{t.landing.deliverable.lead}</p>
              </div>
              <div className="md:col-span-6 md:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule">
                {t.landing.deliverable.items.map((d) => (
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

        {/* Pricing (generic) */}
        <section id="pricing" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div className="eyebrow mb-6">{t.landing.pricing.sectionNumber}</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  {t.landing.pricing.title}
                </h2>
                <p className="mt-6 text-ink-2 leading-relaxed">{t.landing.pricing.lead}</p>
              </div>

              <div className="md:col-span-7 md:col-start-6 tick-frame border border-ink p-10 relative bg-paper">
                <div className="absolute -top-4 right-8">
                  <span className="stamp">{t.landing.pricing.stamp}</span>
                </div>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="serif text-[80px] leading-none">{t.landing.pricing.price}</span>
                  <span className="serif text-[24px] text-ink-3 italic line-through">
                    {t.landing.pricing.strikePrice}
                  </span>
                </div>
                <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2 mb-8">
                  {t.landing.pricing.priceCaption}
                </div>
                <ul className="space-y-3 mb-10">
                  {t.landing.pricing.features.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px]">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={assessmentHref} className="btn-ink w-full justify-center">
                  <span>{t.common.cta.claimReport}</span>
                  <Arrow />
                </Link>
                <p className="mt-4 mono text-[10px] uppercase tracking-[0.12em] text-ink-3 text-center">
                  {t.landing.pricing.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-32 text-center">
            <div className="eyebrow mb-6 justify-center flex">{t.landing.closingCta.eyebrow}</div>
            <h2 className="serif text-5xl md:text-7xl leading-[1] tracking-tight max-w-4xl mx-auto">
              {n.closingHeadline}
            </h2>
            <div className="mt-12 flex items-center justify-center gap-4">
              <Link href={assessmentHref} className="btn-ink text-[15px] !py-4 !px-6">
                <span>{t.common.cta.beginAssessment}</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between text-[12px] text-ink-2">
            <div className="flex items-center gap-3">
              <Mark size={14} />
              <span className="mono">{t.common.brand}</span>
              <span className="mono text-ink-3">·</span>
              <span className="mono text-ink-3">{n.badge}</span>
            </div>
            <div className="flex items-center gap-6 mono text-[11px] uppercase tracking-[0.12em]">
              <LocaleSwitch current={locale} />
              <a href="mailto:info@snapaireport.com" className="hover:text-ink transition">
                info@snapaireport.com
              </a>
              <span className="text-ink-3" title={VERSION_LABEL}>v{VERSION}</span>
            </div>
          </div>
        </footer>
      </div>
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

// VERSION reference to silence unused-var lint
void VERSION;
