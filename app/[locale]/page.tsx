import Link from "next/link";
import type { Metadata } from "next";
import { VERSION, VERSION_LABEL } from "@/lib/version";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/LocaleSwitch";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);
  return {
    title: t.landing.metaTitle,
    description: t.landing.metaDescription,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      <div>
        {/* ─── Header ──────────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
            <Link href={`/${loc}`} className="flex items-center gap-3">
              <Mark />
              <span className="serif text-xl">{t.common.brand}</span>
              <span className="mono text-[10px] tracking-[0.18em] text-amber-600 uppercase border border-amber-300 px-1.5 py-0.5">
                Beta
              </span>
              <span className="hidden sm:inline-block mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5" title={VERSION_LABEL}>
                v{VERSION}
              </span>
            </Link>
            {/* Desktop nav — anchors hidden on mobile (visitors scroll on small screens). */}
            <nav className="hidden lg:flex items-center gap-7">
              <a href="#process" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                {t.common.nav.process}
              </a>
              <a href="#tailored" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                {locale === "fr" ? "Sur mesure" : "Tailored"}
              </a>
              <a href="#deliverable" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                {t.common.nav.deliverable}
              </a>
              <a href="#pricing" className="mono text-[12px] tracking-wide text-ink-2 hover:text-ink transition">
                {t.common.nav.pricing}
              </a>
            </nav>
            {/* Always-visible: locale + CTA */}
            <div className="flex items-center gap-4">
              <LocaleSwitch current={loc} />
              <Link href={`/${loc}/assessment`} className="btn-ink text-[13px] !py-2 !px-3 sm:!px-4">
                {t.common.cta.start}
              </Link>
            </div>
          </div>
        </header>

        {/* ─── Hero ────────────────────────────────────────────────── */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="eyebrow">{t.landing.hero.eyebrow}</span>
                <span className="annotation flex-1" />
                <span className="mono text-[10px] text-ink-3 uppercase tracking-[0.12em]">
                  {t.landing.hero.estimate}
                </span>
              </div>

              <h1 className="serif text-[64px] md:text-[88px] leading-[0.95] tracking-tight text-ink">
                {t.landing.hero.headline.map((line, i) => (
                  <span key={i}>
                    {i === t.landing.hero.headlineItalicIndex ? <em>{line}</em> : line}
                    {i < t.landing.hero.headline.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <p className="mt-10 max-w-xl text-[17px] leading-[1.55] text-ink-2">
                {t.landing.hero.lead}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link href={`/${loc}/assessment`} className="btn-ink">
                  <span>{t.common.cta.beginAssessment}</span>
                  <Arrow />
                </Link>
                <a href="#process" className="btn-ghost">
                  {t.common.cta.seeProcess}
                </a>
              </div>

              <div className="mt-10 flex items-center gap-6 mono text-[11px] text-ink-2 uppercase tracking-[0.12em]">
                {t.landing.hero.badges.map((b) => (
                  <span key={b} className="flex items-center gap-2">
                    <Dot /> {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <Link href={`/${loc}/sample`} className="block group" aria-label="View specimen">
                <div className="flex items-center justify-between mb-4 mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  <span>{t.landing.hero.specimenLabel}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition">{t.common.cta.viewFull}</span>
                </div>
                <div className="transition group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_0_-6px_var(--rule-strong)]">
                  <ReportPreview t={t} />
                </div>
                <div className="mt-4 flex items-center justify-between mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                  <span>{t.landing.hero.specimenCaption}</span>
                  <span className="group-hover:text-ink transition">{t.common.cta.clickToExpand}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Process ─────────────────────────────────────────────── */}
        <section id="process" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-4">
                <div className="eyebrow mb-6">{t.landing.process.sectionNumber}</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  {t.landing.process.title.map((line, i) => (
                    <span key={i}>
                      {i === t.landing.process.titleItalicIndex ? <em>{line}</em> : line}
                      {i < t.landing.process.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>
              <div className="md:col-span-7 md:col-start-6 self-end">
                <p className="text-ink-2 leading-relaxed">{t.landing.process.lead}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
              {t.landing.process.steps.map((s) => (
                <div key={s.n} className="bg-paper p-8 relative">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                      {t.common.misc.step}
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

        {/* ─── Tailored versions ───────────────────────────────────── */}
        <section id="tailored" className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-5">
                <div className="eyebrow mb-6">{t.landing.tailored.sectionNumber}</div>
                <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight">
                  {t.landing.tailored.title.map((line, i) => (
                    <span key={i}>
                      {i === t.landing.tailored.titleItalicIndex ? <em>{line}</em> : line}
                      {i < t.landing.tailored.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>
              <div className="md:col-span-7 md:col-start-6 self-end">
                <p className="text-ink-2 leading-relaxed">{t.landing.tailored.lead}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
              {t.landing.tailored.versions.map((v) => (
                <Link
                  key={v.key}
                  href={`/${loc}${v.href}`}
                  className="bg-paper p-8 flex flex-col hover:bg-paper-2/60 transition group"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                      {v.key === "general" ? "Default" : v.key === "lawyers" ? "Niche · 01" : "Niche · 02"}
                    </span>
                    <Arrow />
                  </div>
                  <h3 className="serif text-2xl mb-3 leading-tight">{v.label}</h3>
                  <p className="text-[14px] text-ink-2 leading-relaxed flex-1">{v.desc}</p>
                  <div className="annotation w-full mt-6 mb-3" />
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-ink-2 group-hover:text-ink transition">
                    {v.href === "/assessment" ? "snapaireport.com/assessment" : `snapaireport.com${v.href}`}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Deliverable ─────────────────────────────────────────── */}
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

        {/* ─── Pricing ─────────────────────────────────────────────── */}
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

                <Link href={`/${loc}/assessment`} className="btn-ink w-full justify-center">
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

        {/* ─── Closing CTA ─────────────────────────────────────────── */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 py-32 text-center">
            <div className="eyebrow mb-6 justify-center flex">{t.landing.closingCta.eyebrow}</div>
            <h2 className="serif text-5xl md:text-7xl leading-[1] tracking-tight max-w-3xl mx-auto">
              {t.landing.closingCta.headline}
            </h2>
            <div className="mt-12 flex items-center justify-center gap-4">
              <Link href={`/${loc}/assessment`} className="btn-ink text-[15px] !py-4 !px-6">
                <span>{t.common.cta.beginAssessment}</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────────── */}
        <footer>
          <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[12px] text-ink-2">
            <div className="flex items-center gap-3">
              <Mark size={14} />
              <span className="mono">{t.common.brand}</span>
              <span className="mono text-ink-3">·</span>
              <span className="mono text-ink-3">{t.common.footer.tagline}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mono text-[11px] uppercase tracking-[0.12em]">
              <LocaleSwitch current={loc} />
              <a href={`/${loc}/privacy`} className="hover:text-ink transition">
                {t.common.footer.privacy}
              </a>
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

type Msgs = ReturnType<typeof getMessages>;
function ReportPreview({ t }: { t: Msgs }) {
  return (
    <div className="border border-rule-strong bg-paper-2 p-5 shadow-sm">
      <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-rule">
        <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">
          {t.common.brand} · 2026.05
        </span>
        <span className="mono text-[9px] text-ink-3">PG 01 / 07</span>
      </div>
      <div className="serif text-[15px] leading-tight mb-2">{t.sample.reportHeader}</div>
      <div className="mono text-[10px] text-ink-2 uppercase tracking-[0.12em] mb-4">
        {t.sample.profile.business} · {t.sample.profile.city}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">{t.sample.overall}</span>
          <span className="serif text-2xl leading-none">68<span className="text-ink-3 text-base">/100</span></span>
        </div>
        <div className="h-1 bg-rule">
          <div className="h-full bg-ink" style={{ width: "68%" }} />
        </div>
      </div>

      <div className="space-y-2.5">
        {t.sample.report.quickWins.slice(0, 2).map((r) => (
          <div key={r.tag} className="flex items-baseline gap-2 text-[11px]">
            <span className="mono text-ink-3 text-[9px] uppercase tracking-[0.1em]">{r.tag}</span>
            <span className="text-ink leading-tight">{r.title}</span>
          </div>
        ))}
        {t.sample.report.strategic.slice(0, 1).map((r) => (
          <div key={r.tag} className="flex items-baseline gap-2 text-[11px]">
            <span className="mono text-ink-3 text-[9px] uppercase tracking-[0.1em]">{r.tag}</span>
            <span className="text-ink leading-tight">{r.title}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-rule mono text-[9px] uppercase tracking-[0.18em] text-ink-3 flex items-center justify-between">
        <span>↳ pg 02 →</span>
        <span>SR/v{VERSION}</span>
      </div>
    </div>
  );
}
