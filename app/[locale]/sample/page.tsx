import Link from "next/link";
import type { Metadata } from "next";
import { VERSION_LABEL } from "@/lib/version";
import { getMessages, isLocale, type Locale, type Messages } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/LocaleSwitch";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);
  return { title: t.sample.metaTitle };
}

export default async function Sample({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);
  const { profile, answers, report } = t.sample;
  const labels = profile.labels;

  return (
    <div className="min-h-screen bg-paper text-ink relative">
      <div className="bp-grid pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
            <Link href={`/${loc}`} className="flex items-center gap-3">
              <Mark />
              <span className="serif text-xl">{t.common.brand}</span>
              <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                {t.sample.badge}
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <LocaleSwitch current={loc} />
              <Link href={`/${loc}/assessment`} className="btn-ink text-[13px] !py-2 !px-4">
                {t.sample.getOwn}
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="eyebrow mb-6 flex items-center gap-3">
                <span>{t.sample.eyebrow}</span>
                <span className="annotation flex-1 max-w-xs" />
                <span className="mono text-[10px] text-ink-3 uppercase tracking-[0.12em]">
                  {t.sample.eyebrowSuffix}
                </span>
              </div>
              <h1 className="serif text-[64px] leading-[0.95] tracking-tight mb-6">
                {t.sample.heroTitle.map((line, i) => (
                  <span key={i}>
                    {i === t.sample.heroTitleItalicIndex ? <em>{line}</em> : line}
                    {i < t.sample.heroTitle.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="text-[17px] leading-[1.55] text-ink-2 max-w-xl">
                {t.sample.heroLead}
              </p>
              <div className="mt-8 mono text-[11px] uppercase tracking-[0.12em] text-ink-2 italic">
                {t.sample.note}
              </div>
            </div>
            <aside className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <div className="eyebrow mb-4">{t.sample.contents}</div>
              <ol className="space-y-2 mono text-[12px]">
                {t.sample.contentsItems.map(([n, label]) => (
                  <li key={n}>
                    <a href={`#s${n}`} className="flex items-baseline gap-3 text-ink-2 hover:text-ink transition">
                      <span className="text-ink-3">§ {n}</span>
                      <span className="font-sans text-sm">{label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* § A · Company profile */}
        <SectionBlock id="sA" letter="A" title={t.sample.sectionA}>
          <div className="border border-rule p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 bg-paper-2/40">
            {[
              [labels.Business, profile.business],
              [labels.Location, profile.city],
              [labels.Years, profile.years],
              [labels.Team, profile.team],
              [labels.Industry, profile.industry],
              [labels.Revenue, profile.revenue],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-rule pb-3">
                <div className="eyebrow mb-1.5">{k}</div>
                <div className="serif text-xl leading-tight">{v}</div>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* § B · Answers */}
        <SectionBlock id="sB" letter="B" title={t.sample.sectionB}>
          <div className="border border-rule">
            {answers.map((qa, i) => (
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

        <div className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <div className="annotation w-24 mx-auto mb-4" />
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-2">
              {t.sample.pause}
            </div>
            <div className="annotation w-24 mx-auto mt-4" />
          </div>
        </div>

        {/* Report header */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="tick-frame border border-ink p-10 bg-paper">
              <div className="flex items-baseline justify-between mb-6">
                <div className="eyebrow">{t.sample.reportHeader}</div>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  {t.sample.issued}
                </div>
              </div>
              <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight mb-2">
                {profile.business}
              </h2>
              <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                {profile.city} · {profile.industry}
              </div>
            </div>
          </div>
        </section>

        <SectionBlock id="sC" letter="C" title={t.sample.sectionC}>
          <div className="space-y-6">
            {report.summary.map((s, i) => (
              <div key={i} className="flex items-start gap-6">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 pt-1.5 min-w-[40px]">
                  ES.{String(i + 1).padStart(2, "0")}
                </span>
                <p className="serif text-[22px] leading-[1.3] flex-1">{s}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="sD" letter="D" title={t.sample.sectionD}>
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <div className="border border-rule p-8 text-center">
                <div className="eyebrow mb-4">{t.sample.overall}</div>
                <div className="serif text-[120px] leading-none">{report.score}<span className="text-ink-3 text-4xl align-top">/100</span></div>
                <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2 mt-4">
                  {t.sample.aboveAvg}
                </div>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="eyebrow mb-6">{t.sample.breakdown}</div>
              <div className="space-y-4">
                {report.breakdown.map((b) => (
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

        <SectionBlock id="sE" letter="E" title={t.sample.sectionE}>
          <div className="space-y-6">
            {report.quickWins.map((w) => (
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

        <SectionBlock id="sF" letter="F" title={t.sample.sectionF}>
          <div className="space-y-6">
            {report.strategic.map((s) => (
              <div key={s.tag} className="border border-rule p-6 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{s.tag}</span>
                    <h3 className="serif text-2xl leading-tight">{s.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-2">{s.desc}</p>
                </div>
                <div className="md:col-span-4 md:border-l md:border-rule md:pl-6 flex flex-col justify-center">
                  <MetaPair label="ROI" v={s.roi} />
                  <div className="mt-3"><MetaPair label="ETA" v={s.eta} /></div>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="sG" letter="G" title={t.sample.sectionG}>
          <div className="border border-rule">
            <div className="grid grid-cols-12 mono text-[10px] uppercase tracking-[0.18em] text-ink-3 border-b border-rule">
              <div className="col-span-1 p-4 border-r border-rule">{t.sample.risksHeader.sev}</div>
              <div className="col-span-5 p-4 border-r border-rule">{t.sample.risksHeader.flag}</div>
              <div className="col-span-6 p-4">{t.sample.risksHeader.mitigation}</div>
            </div>
            {report.risks.map((r, i) => (
              <div key={i} className={`grid grid-cols-12 ${i < report.risks.length - 1 ? "border-b border-rule" : ""}`}>
                <div className="col-span-1 p-4 border-r border-rule mono text-[10px] uppercase tracking-[0.18em]">
                  {r.severity}
                </div>
                <div className="col-span-5 p-4 border-r border-rule text-[14px] leading-relaxed">{r.flag}</div>
                <div className="col-span-6 p-4 text-[14px] leading-relaxed text-ink-2">{r.mitigation}</div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="sH" letter="H" title={t.sample.sectionH}>
          <div className="border border-rule">
            <div className="grid grid-cols-12 mono text-[10px] uppercase tracking-[0.18em] text-ink-3 border-b border-rule">
              <div className="col-span-3 p-4 border-r border-rule">{t.sample.toolsHeader.tool}</div>
              <div className="col-span-6 p-4 border-r border-rule">{t.sample.toolsHeader.purpose}</div>
              <div className="col-span-3 p-4">{t.sample.toolsHeader.cost}</div>
            </div>
            {report.tools.map((tool, i) => (
              <div key={tool.name} className={`grid grid-cols-12 ${i < report.tools.length - 1 ? "border-b border-rule" : ""}`}>
                <div className="col-span-3 p-4 border-r border-rule serif text-[18px]">{tool.name}</div>
                <div className="col-span-6 p-4 border-r border-rule text-[14px] leading-relaxed text-ink-2">{tool.purpose}</div>
                <div className="col-span-3 p-4 mono text-[13px]">{tool.cost}</div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="sI" letter="I" title={t.sample.sectionI}>
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            <div className="bg-paper p-8">
              <div className="eyebrow mb-4">{t.sample.nextThisWeek}</div>
              <ol className="space-y-3">
                {report.next.immediate.map((step, i) => (
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
              <div className="eyebrow mb-4">{t.sample.nextThirtyDays}</div>
              <ol className="space-y-3">
                {report.next.thirtyDays.map((step, i) => (
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
            <div className="eyebrow mb-6 flex justify-center">{t.sample.closingEyebrow}</div>
            <h2 className="serif text-5xl md:text-6xl leading-[1] tracking-tight max-w-3xl mx-auto mb-8">
              {t.sample.closingHeadline.map((line, i) => (
                <span key={i}>
                  {i === t.sample.closingHeadlineItalicIndex ? <em>{line}</em> : line}
                  {i < t.sample.closingHeadline.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <Link href={`/${loc}/assessment`} className="btn-ink text-[15px] !py-4 !px-6">
                <span>{t.common.cta.getOwnReport}</span>
                <Arrow />
              </Link>
              <Link href={`/${loc}`} className="btn-ghost">
                ← {t.common.cta.backToHome}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between text-[12px] text-ink-2">
            <div className="flex items-center gap-3">
              <Mark size={14} />
              <span className="mono">{t.common.brand} · Specimen</span>
            </div>
            <div className="flex items-center gap-6 mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
              <LocaleSwitch current={loc} />
              <a href="mailto:info@snapaireport.com" className="hover:text-ink transition">info@snapaireport.com</a>
              <span title={VERSION_LABEL}>{VERSION_LABEL}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

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
            <h2 className="serif text-3xl md:text-4xl leading-[1.05] tracking-tight">{title}</h2>
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
