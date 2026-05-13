import Link from "next/link";
import type { Metadata } from "next";
import { VERSION, VERSION_LABEL } from "@/lib/version";
import {
  getMessages,
  isLocale,
  isNiche,
  getNicheMessages,
  type Locale,
  type Messages,
  type NicheKey,
} from "@/lib/i18n";
import { LocaleSwitch } from "@/components/LocaleSwitch";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ for?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const forParam = sp.for;
  const loc = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);
  const nicheKey: NicheKey | undefined = isNiche(forParam) ? forParam : undefined;
  if (nicheKey) {
    const n = getNicheMessages(loc, nicheKey);
    return { title: `${t.sample.badge} — ${n.sample?.profile.business ?? n.badge}` };
  }
  return { title: t.sample.metaTitle };
}

export default async function Sample({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ for?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const forParam = sp.for;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);
  const nicheKey: NicheKey | undefined = isNiche(forParam) ? forParam : undefined;
  const nicheBadge = nicheKey ? getNicheMessages(loc, nicheKey).badge : undefined;

  // Pull niche-specific sample if present, else fall back to the generic Acme one.
  const nicheSample = nicheKey ? getNicheMessages(loc, nicheKey).sample : undefined;
  const profile = nicheSample?.profile ?? t.sample.profile;
  const answers = nicheSample?.answers ?? t.sample.answers;
  const report = nicheSample?.report ?? t.sample.report;
  const labels = t.sample.profile.labels;

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      <div>
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
            <Link href={`/${loc}`} className="flex items-center gap-3">
              <Mark />
              <span className="serif text-xl">{t.common.brand}</span>
              <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                {t.sample.badge}
              </span>
              {nicheBadge && (
                <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                  {nicheBadge}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-6">
              <LocaleSwitch current={loc} />
              <Link
                href={nicheKey ? `/${loc}/assessment?for=${nicheKey}` : `/${loc}/assessment`}
                className="btn-ink text-[13px] !py-2 !px-4"
              >
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

        {/* § J · Effort × Impact matrix */}
        <SectionBlock id="sJ" letter="J" title={t.sample.sectionJ}>
          <EffortImpactMatrix t={t} />
        </SectionBlock>

        {/* § K · Financial impact */}
        {report.financialImpact && (
          <SectionBlock id="sK" letter="K" title={t.sample.sectionK}>
            <FinancialImpact t={t} impact={report.financialImpact} locale={loc} />
          </SectionBlock>
        )}

        {/* § L · 4-day quick-win plan */}
        {report.quickWinPlan && report.quickWinPlan.length > 0 && (
          <SectionBlock id="sL" letter="L" title={t.sample.sectionL}>
            <DayPlan t={t} plan={report.quickWinPlan} />
          </SectionBlock>
        )}

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
            {report.tools.map((tool, i) => {
              const toolWithUrl = tool as { name: string; purpose: string; cost: string; url?: string };
              return (
                <div key={tool.name} className={`grid grid-cols-12 ${i < report.tools.length - 1 ? "border-b border-rule" : ""}`}>
                  <div className="col-span-3 p-4 border-r border-rule serif text-[18px]">
                    {toolWithUrl.url ? (
                      <a href={toolWithUrl.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink transition">
                        {tool.name} ↗
                      </a>
                    ) : tool.name}
                  </div>
                  <div className="col-span-6 p-4 border-r border-rule text-[14px] leading-relaxed text-ink-2">{tool.purpose}</div>
                  <div className="col-span-3 p-4 mono text-[13px]">{tool.cost}</div>
                </div>
              );
            })}
          </div>

          {/* Explore-more: AI tool directories */}
          <div className="mt-10 border border-rule p-8 bg-paper-2/40">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <div className="eyebrow mb-3">Beyond this stack</div>
                <h3 className="serif text-2xl leading-tight mb-2">{t.sample.exploreMore.heading}</h3>
                <p className="text-[13px] text-ink-2 leading-relaxed">{t.sample.exploreMore.body}</p>
              </div>
              <div className="md:col-span-8 grid gap-px bg-rule border border-rule">
                {t.sample.exploreMore.directories.map((d) => (
                  <a
                    key={d.url}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-paper p-4 flex items-start gap-4 hover:bg-paper-2/60 transition group"
                  >
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 pt-1 min-w-[14px]">↗</span>
                    <div className="flex-1">
                      <div className="serif text-[17px] leading-tight mb-1 group-hover:text-ink transition">{d.name}</div>
                      <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mb-1.5">{new URL(d.url).hostname}</div>
                      <div className="text-[12px] text-ink-2 leading-relaxed">{d.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
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
              <Link
                href={nicheKey ? `/${loc}/assessment?for=${nicheKey}` : `/${loc}/assessment`}
                className="btn-ink text-[15px] !py-4 !px-6"
              >
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
              <span title={VERSION_LABEL}>v{VERSION}</span>
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

/* ─── Effort × Impact matrix ─────────────────────────────────────
 * 3 × 3 grid. Y-axis (top → bottom): high, medium, low impact.
 * X-axis (left → right): low, medium, high effort. The top-left
 * cell is the "quick-win zone" — low effort + high impact.
 *
 * Plots the report's quickWins + strategic plays into the cells
 * by their effort/impact levels. Items in the same cell stack.
 */
function EffortImpactMatrix({ t }: { t: Messages }) {
  type Item = { tag: string; title: string; effort: string; impact: string; kind: "qw" | "sp" };
  const quickWins: Item[] = t.sample.report.quickWins.map((w) => ({
    tag: w.tag, title: w.title, effort: w.effort, impact: w.impact, kind: "qw",
  }));
  // Strategic plays usually run high-effort + medium/high-impact — plot them in the right two columns.
  const strategic: Item[] = t.sample.report.strategic.map((s) => ({
    tag: s.tag, title: s.title, effort: "High", impact: "High", kind: "sp",
  }));
  const all = [...quickWins, ...strategic];

  function norm(level: string): "Low" | "Medium" | "High" {
    const v = level.trim().toLowerCase();
    if (["low", "faible", "bas"].includes(v)) return "Low";
    if (["high", "élevé", "eleve", "haut"].includes(v)) return "High";
    return "Medium";
  }
  const effortOrder = ["Low", "Medium", "High"] as const;
  const impactOrder = ["High", "Medium", "Low"] as const;

  function itemsAt(eff: typeof effortOrder[number], imp: typeof impactOrder[number]) {
    return all.filter((i) => norm(i.effort) === eff && norm(i.impact) === imp);
  }

  return (
    <div>
      {/* Y-axis label + matrix + X-axis label */}
      <div className="flex gap-3">
        <div className="flex items-center">
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 -rotate-90 whitespace-nowrap">
            {t.sample.matrix.impactLabel}
          </div>
        </div>
        <div className="flex-1">
          {/* Matrix grid */}
          <div className="grid grid-cols-3 gap-px bg-rule border border-rule">
            {impactOrder.map((imp) =>
              effortOrder.map((eff) => {
                const isSweet = imp === "High" && eff === "Low";
                const items = itemsAt(eff, imp);
                return (
                  <div
                    key={`${imp}-${eff}`}
                    className={`bg-paper p-3 min-h-[120px] relative ${isSweet ? "bg-paper-2/70" : ""}`}
                  >
                    {isSweet && (
                      <div className="absolute top-1 right-1 mono text-[9px] uppercase tracking-[0.18em] text-ink-3">
                        ★ {t.sample.matrix.sweetSpot}
                      </div>
                    )}
                    <div className="space-y-1.5 mt-3">
                      {items.map((item) => (
                        <div key={item.tag} className="flex items-baseline gap-2 text-[11px]">
                          <span
                            className={`mono text-[9px] uppercase tracking-[0.1em] ${item.kind === "qw" ? "text-ink" : "text-ink-3"}`}
                          >
                            {item.tag}
                          </span>
                          <span className="text-ink-2 leading-tight">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* Y-axis labels (right side) */}
          <div className="grid grid-cols-3 mt-2 mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
            <div className="text-center">{t.sample.matrix.effortLevels.low}</div>
            <div className="text-center">{t.sample.matrix.effortLevels.medium}</div>
            <div className="text-center">{t.sample.matrix.effortLevels.high}</div>
          </div>
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 text-center mt-1">
            {t.sample.matrix.effortLabel}
          </div>
        </div>
        {/* Right side impact labels */}
        <div className="flex flex-col justify-around mono text-[10px] uppercase tracking-[0.12em] text-ink-3 -mr-2">
          <span>{t.sample.matrix.impactLevels.high}</span>
          <span>{t.sample.matrix.impactLevels.medium}</span>
          <span>{t.sample.matrix.impactLevels.low}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-ink" />{t.sample.matrix.legendQw}</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-ink-3" />{t.sample.matrix.legendSp}</span>
      </div>
    </div>
  );
}

/* ─── Financial impact card ─────────────────────────────────────── */
function FinancialImpact({
  t,
  impact,
  locale,
}: {
  t: Messages;
  impact: { weeklyHoursReclaimed: number; hourlyRateAssumption: number; monthlyToolCost: number; netMonthlySavings: number };
  locale: Locale;
}) {
  const fmt = (n: number) => {
    const isFr = locale === "fr";
    return isFr
      ? `${n.toLocaleString("fr-CA")} $`
      : `$${n.toLocaleString("en-US")}`;
  };

  return (
    <div>
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-5 border border-ink tick-frame p-8 bg-paper">
          <div className="eyebrow mb-3">{t.sample.financialImpact.eyebrow}</div>
          <div className="serif text-[64px] leading-none">
            {fmt(impact.netMonthlySavings)}
          </div>
          <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2 mt-2">
            {t.sample.financialImpact.netLabel} / mo
          </div>
        </div>
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule border border-rule self-center">
          <div className="bg-paper p-5">
            <div className="eyebrow mb-2">{t.sample.financialImpact.hoursLabel}</div>
            <div className="serif text-2xl">{impact.weeklyHoursReclaimed}</div>
            <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">h/sem</div>
          </div>
          <div className="bg-paper p-5">
            <div className="eyebrow mb-2">{t.sample.financialImpact.rateLabel}</div>
            <div className="serif text-2xl">{fmt(impact.hourlyRateAssumption)}</div>
            <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">/h</div>
          </div>
          <div className="bg-paper p-5">
            <div className="eyebrow mb-2">{t.sample.financialImpact.toolCostLabel}</div>
            <div className="serif text-2xl">{fmt(impact.monthlyToolCost)}</div>
            <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">/mo</div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-[13px] text-ink-2 italic leading-relaxed max-w-2xl">
        {t.sample.financialImpact.explainer}
      </p>
    </div>
  );
}

/* ─── 4-day quick-win plan ──────────────────────────────────────── */
function DayPlan({
  t,
  plan,
}: {
  t: Messages;
  plan: Array<{ day: number; action: string }>;
}) {
  return (
    <div>
      <p className="mb-8 max-w-2xl text-[15px] text-ink-2 leading-relaxed">
        {t.sample.dayPlan.lead}
      </p>
      <div className="grid md:grid-cols-4 gap-px bg-rule border border-rule">
        {plan.map((d) => (
          <div key={d.day} className="bg-paper p-6 flex flex-col">
            <div className="flex items-baseline justify-between mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                {t.sample.dayPlan.dayLabel}
              </span>
              <span className="serif text-5xl text-ink leading-none">
                {String(d.day).padStart(2, "0")}
              </span>
            </div>
            <div className="annotation w-full mb-3" />
            <p className="text-[14px] leading-relaxed text-ink-2 flex-1">{d.action}</p>
          </div>
        ))}
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
