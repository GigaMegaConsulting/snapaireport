import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VERSION, VERSION_LABEL } from "@/lib/version";
import { getMessages, type Locale, isLocale, type NicheKey, isNiche, getNicheMessages } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import type { ReportAnalysis } from "@/types/report";

export const dynamic = "force-dynamic"; // always fetch fresh — reports update rarely but cache invalidation isn't worth wiring

interface ProcessedEntry {
  id: string;
  submittedAt: string;
  processedAt?: string;
  sentAt?: string;
  locale: Locale;
  niche?: NicheKey;
  clientName: string;
  clientEmail: string;
  businessName: string;
  transcript: string;
  analysis: ReportAnalysis;
  status: string;
}

async function fetchProcessed(id: string): Promise<ProcessedEntry | null> {
  const repo = process.env.GITHUB_QUEUE_REPO;
  const token = process.env.GITHUB_QUEUE_TOKEN;
  if (!repo || !token) return null;

  // Use GitHub Contents API to fetch raw file (no auth needed for public; we use auth anyway since repo is private)
  const url = `https://api.github.com/repos/${repo}/contents/processed/${encodeURIComponent(id)}.json`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.raw+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    // Cache for a minute — most viewers visit once
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  try {
    return (await res.json()) as ProcessedEntry;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const entry = await fetchProcessed(id);
  if (!entry) {
    return { title: "Report not found · SnapReport", robots: { index: false, follow: false } };
  }
  return {
    title: `AI Report — ${entry.businessName} · SnapReport`,
    description: entry.analysis.executiveSummary[0] ?? "Your AI Readiness Report.",
    robots: { index: false, follow: false },
  };
}

export default async function ReportView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await fetchProcessed(id);
  if (!entry) notFound();

  const loc: Locale = isLocale(entry.locale) ? entry.locale : "en";
  const t = getMessages(loc);
  const niche: NicheKey | undefined = isNiche(entry.niche) ? entry.niche : undefined;
  const nicheBadge = niche ? getNicheMessages(loc, niche).badge : null;
  const { analysis } = entry;

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      <div>
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between gap-3">
            <Link href={`/${loc}`} className="flex items-center gap-3 min-w-0">
              <Mark />
              <span className="serif text-xl">{t.common.brand}</span>
              <span className="hidden sm:inline-block mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                Report · {entry.id.slice(0, 6)}
              </span>
              <span
                className="hidden sm:inline-block mono text-[10px] tracking-[0.18em] uppercase border px-1.5 py-0.5"
                style={{ borderColor: "var(--stamp)", color: "var(--stamp)" }}
              >
                {t.sample.confidential}
              </span>
              {nicheBadge && (
                <span className="hidden md:inline-block mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                  {nicheBadge}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-4">
              <LocaleSwitch current={loc} />
              <Link href={`/${loc}/assessment`} className="btn-ghost text-[13px] !py-2 !px-3 sm:!px-4">
                {t.sample.getOwn}
              </Link>
            </div>
          </div>
        </header>

        {/* Hero / report header */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="tick-frame border border-ink p-10 bg-paper">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div className="eyebrow">{t.sample.reportHeader}</div>
                <span className="stamp">{t.sample.confidential}</span>
              </div>
              <h1 className="serif text-5xl md:text-6xl leading-[1] tracking-tight mb-3">
                {entry.businessName}
              </h1>
              <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                {entry.clientName} · {entry.clientEmail}
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mt-2">
                {t.sample.issuedShort} ·{" "}
                {new Date(entry.processedAt ?? entry.submittedAt).toLocaleDateString(
                  loc === "fr" ? "fr-CA" : "en-CA",
                )}
              </div>
              <p className="serif italic text-[13px] leading-relaxed text-ink-2 mt-6 pt-5 border-t border-rule max-w-2xl">
                {t.sample.confidentialNote}
              </p>
            </div>
          </div>
        </section>

        {/* Executive summary */}
        <Section letter="C" title={t.sample.sectionC}>
          <div className="space-y-6">
            {analysis.executiveSummary.map((s, i) => (
              <div key={i} className="flex items-start gap-6">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 pt-1.5 min-w-[40px]">
                  ES.{String(i + 1).padStart(2, "0")}
                </span>
                <p className="serif text-[22px] leading-[1.3] flex-1">{s}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Readiness score */}
        <Section letter="D" title={t.sample.sectionD}>
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <div className="border border-rule p-8 text-center">
                <div className="eyebrow mb-4">{t.sample.overall}</div>
                <div className="serif text-[120px] leading-none">
                  {analysis.aiReadinessScore.overall}
                  <span className="text-ink-3 text-4xl align-top">/100</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="eyebrow mb-6">{t.sample.breakdown}</div>
              <div className="space-y-4">
                {Object.entries(analysis.aiReadinessScore.breakdown).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="serif text-[18px]">{prettyKey(k)}</span>
                      <span className="mono text-[14px] text-ink">
                        {v}<span className="text-ink-3">/100</span>
                      </span>
                    </div>
                    <div className="h-1 bg-rule">
                      <div className="h-full bg-ink" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Quick wins */}
        <Section letter="E" title={t.sample.sectionE}>
          <div className="space-y-6">
            {analysis.quickWins.map((w, i) => (
              <div key={i} className="border border-rule p-6 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                      QW.{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="serif text-2xl leading-tight">{w.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-2">{w.description}</p>
                </div>
                <div className="md:col-span-5 md:border-l md:border-rule md:pl-6 grid grid-cols-2 gap-x-4 gap-y-3 content-center">
                  <MetaPair label="Impact" v={w.impact} />
                  <MetaPair label="Effort" v={w.effort} />
                  <MetaPair label="Cost" v={w.estimatedCost} />
                  <MetaPair label="Timeline" v={w.timeline} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Strategic plays */}
        <Section letter="F" title={t.sample.sectionF}>
          <div className="space-y-6">
            {analysis.strategicOpportunities.map((s, i) => (
              <div key={i} className="border border-rule p-6 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                      SP.{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="serif text-2xl leading-tight">{s.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-2">{s.description}</p>
                </div>
                <div className="md:col-span-4 md:border-l md:border-rule md:pl-6 flex flex-col justify-center">
                  <MetaPair label="ROI" v={s.roiPotential} />
                  <div className="mt-3"><MetaPair label="Timeline" v={s.timeline} /></div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Financial impact */}
        {analysis.financialImpact && (
          <Section letter="K" title={t.sample.sectionK}>
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-5 border border-ink tick-frame p-8 bg-paper">
                <div className="eyebrow mb-3">{t.sample.financialImpact.eyebrow}</div>
                <div className="serif text-[64px] leading-none">
                  ${analysis.financialImpact.netMonthlySavings.toLocaleString("en-US")}
                </div>
                <div className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2 mt-2">
                  {t.sample.financialImpact.netLabel} / mo
                </div>
              </div>
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule border border-rule self-center">
                <div className="bg-paper p-5">
                  <div className="eyebrow mb-2">{t.sample.financialImpact.hoursLabel}</div>
                  <div className="serif text-2xl">{analysis.financialImpact.weeklyHoursReclaimed}</div>
                  <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">h/wk</div>
                </div>
                <div className="bg-paper p-5">
                  <div className="eyebrow mb-2">{t.sample.financialImpact.rateLabel}</div>
                  <div className="serif text-2xl">${analysis.financialImpact.hourlyRateAssumption}</div>
                  <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">/h</div>
                </div>
                <div className="bg-paper p-5">
                  <div className="eyebrow mb-2">{t.sample.financialImpact.toolCostLabel}</div>
                  <div className="serif text-2xl">${analysis.financialImpact.monthlyToolCost}</div>
                  <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">/mo</div>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Quick win plan */}
        {analysis.quickWinPlan && analysis.quickWinPlan.length > 0 && (
          <Section letter="L" title={t.sample.sectionL}>
            <p className="mb-8 max-w-2xl text-[15px] text-ink-2 leading-relaxed">
              {t.sample.dayPlan.lead}
            </p>
            <div className="grid md:grid-cols-4 gap-px bg-rule border border-rule">
              {analysis.quickWinPlan.map((d) => (
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
          </Section>
        )}

        {/* Risks */}
        <Section letter="G" title={t.sample.sectionG}>
          <div className="border border-rule">
            <div className="grid grid-cols-12 mono text-[10px] uppercase tracking-[0.18em] text-ink-3 border-b border-rule">
              <div className="col-span-1 p-4 border-r border-rule">{t.sample.risksHeader.sev}</div>
              <div className="col-span-5 p-4 border-r border-rule">{t.sample.risksHeader.flag}</div>
              <div className="col-span-6 p-4">{t.sample.risksHeader.mitigation}</div>
            </div>
            {analysis.riskFlags.map((r, i) => (
              <div key={i} className={`grid grid-cols-12 ${i < analysis.riskFlags.length - 1 ? "border-b border-rule" : ""}`}>
                <div className="col-span-1 p-4 border-r border-rule mono text-[10px] uppercase tracking-[0.18em]">
                  {r.severity}
                </div>
                <div className="col-span-5 p-4 border-r border-rule text-[14px] leading-relaxed">{r.flag}</div>
                <div className="col-span-6 p-4 text-[14px] leading-relaxed text-ink-2">{r.mitigation}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tools */}
        <Section letter="H" title={t.sample.sectionH}>
          <div className="border border-rule">
            <div className="grid grid-cols-12 mono text-[10px] uppercase tracking-[0.18em] text-ink-3 border-b border-rule">
              <div className="col-span-3 p-4 border-r border-rule">{t.sample.toolsHeader.tool}</div>
              <div className="col-span-6 p-4 border-r border-rule">{t.sample.toolsHeader.purpose}</div>
              <div className="col-span-3 p-4">{t.sample.toolsHeader.cost}</div>
            </div>
            {analysis.recommendedTools.map((tool, i) => (
              <div key={i} className={`grid grid-cols-12 ${i < analysis.recommendedTools.length - 1 ? "border-b border-rule" : ""}`}>
                <div className="col-span-3 p-4 border-r border-rule serif text-[18px]">
                  {tool.url ? (
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink transition">
                      {tool.name} ↗
                    </a>
                  ) : tool.name}
                </div>
                <div className="col-span-6 p-4 border-r border-rule text-[14px] leading-relaxed text-ink-2">{tool.purpose}</div>
                <div className="col-span-3 p-4 mono text-[13px]">{tool.cost}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Next steps */}
        <Section letter="I" title={t.sample.sectionI}>
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            <div className="bg-paper p-8">
              <div className="eyebrow mb-4">{t.sample.nextThisWeek}</div>
              <ol className="space-y-3">
                {analysis.nextSteps.immediate.map((step, i) => (
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
                {analysis.nextSteps.thirtyDays.map((step, i) => (
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
        </Section>

        {/* Closing */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <h2 className="serif text-3xl md:text-4xl leading-tight max-w-2xl mx-auto mb-6">
              {analysis.nextSteps.cta}
            </h2>
            <Link href={`/${loc}/assessment`} className="btn-ghost mt-4 inline-flex">
              ← {t.common.cta.backToHome}
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between text-[12px] text-ink-2">
            <div className="flex items-center gap-3">
              <Mark size={14} />
              <span className="mono">{t.common.brand}</span>
              <span className="mono text-ink-3">·</span>
              <span className="mono text-ink-3">{entry.id}</span>
            </div>
            <span className="text-ink-3" title={VERSION_LABEL}>v{VERSION}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ─── Helpers ──────────────────────────────────────────────────── */

function Section({
  letter,
  title,
  children,
}: {
  letter: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-rule">
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

function prettyKey(k: string): string {
  return k
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
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
