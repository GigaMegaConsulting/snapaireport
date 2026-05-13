import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { ReportAnalysis } from '@/types/report';

// Paper/blueprint palette — mirrors app/globals.css so the PDF matches the
// snapaireport.com look exactly (paper background, ink black, forest accent,
// stamp red, mono eyebrows, serif titles).
const C = {
  paper: '#faf8f1',
  paper2: '#f3f0e6',
  ink: '#0a0a0a',
  ink2: '#525252',
  ink3: '#a3a3a3',
  rule: '#dcd9ce',         // approximation of rgba(10,10,10,0.12) on paper
  ruleStrong: '#b6b0a1',   // approximation of rgba(10,10,10,0.28) on paper
  accent: '#1a4d3a',
  accent2: '#2d6b54',
  stamp: '#bf2127',
  amber: '#a35a00',
};

const FONT_SANS = 'Helvetica';
const FONT_SANS_BOLD = 'Helvetica-Bold';
const FONT_SERIF_BOLD = 'Times-Bold';
const FONT_MONO = 'Courier';
const FONT_MONO_BOLD = 'Courier-Bold';

const styles = StyleSheet.create({
  // ── Page ───────────────────────────────────────────────────────────
  // NOTE: do NOT set `lineHeight` on Page or on the footer style.
  // @react-pdf v4.5 silently drops `fixed` Text from output when either has
  // an explicit lineHeight. Body lineHeight is applied per-Text below.
  page: {
    backgroundColor: C.paper,
    color: C.ink,
    paddingTop: 56,
    paddingBottom: 64,
    paddingHorizontal: 56,
    fontSize: 10,
    fontFamily: FONT_SANS,
  },

  // ── Cover ──────────────────────────────────────────────────────────
  cover: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  coverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 36,
  },
  coverEyebrow: {
    fontFamily: FONT_MONO,
    fontSize: 9,
    letterSpacing: 1.8,
    color: C.ink2,
    textTransform: 'uppercase',
  },
  coverStamp: {
    fontFamily: FONT_MONO_BOLD,
    fontSize: 9,
    letterSpacing: 1.6,
    color: C.stamp,
    textTransform: 'uppercase',
    borderWidth: 1.2,
    borderColor: C.stamp,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  coverMain: {
    marginTop: 40,
  },
  coverTitle: {
    fontFamily: FONT_SERIF_BOLD,
    fontSize: 44,
    color: C.ink,
    lineHeight: 1.05,
    marginBottom: 14,
  },
  coverSubtitle: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: C.ink2,
    marginBottom: 28,
    maxWidth: 380,
    lineHeight: 1.5,
  },
  coverDivider: {
    width: 56,
    height: 1.5,
    backgroundColor: C.ink,
    marginBottom: 28,
  },
  coverMetaRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  coverMetaLabel: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: C.ink3,
    textTransform: 'uppercase',
    width: 96,
    paddingTop: 2,
  },
  coverMetaValue: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: C.ink,
  },

  // ── Section header ─────────────────────────────────────────────────
  sectionWrap: {
    marginBottom: 22,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  sectionLetter: {
    fontFamily: FONT_MONO,
    fontSize: 9,
    letterSpacing: 1.5,
    color: C.ink3,
    textTransform: 'uppercase',
    width: 28,
  },
  sectionTitle: {
    fontFamily: FONT_SERIF_BOLD,
    fontSize: 18,
    color: C.ink,
    flex: 1,
  },
  sectionRule: {
    height: 0.6,
    backgroundColor: C.rule,
    marginBottom: 14,
  },

  // ── Body text helpers ──────────────────────────────────────────────
  body: {
    fontSize: 10.5,
    color: C.ink,
    lineHeight: 1.55,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  bulletMark: {
    fontFamily: FONT_MONO,
    color: C.accent,
    width: 14,
    fontSize: 10.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10.5,
    color: C.ink,
    lineHeight: 1.55,
  },

  // ── Score ──────────────────────────────────────────────────────────
  scoreCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 4,
    paddingBottom: 18,
    borderBottomWidth: 0.6,
    borderBottomColor: C.rule,
    marginBottom: 14,
  },
  scoreBig: {
    fontFamily: FONT_SERIF_BOLD,
    fontSize: 72,
    color: C.accent,
    lineHeight: 1,
    marginRight: 4,
  },
  scoreOf: {
    fontFamily: FONT_SANS,
    fontSize: 16,
    color: C.ink3,
    paddingBottom: 10,
    marginRight: 18,
  },
  scoreLabelBlock: {
    flex: 1,
    paddingBottom: 8,
  },
  scoreLabelEyebrow: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: C.ink3,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  scoreLabelText: {
    fontFamily: FONT_SANS_BOLD,
    fontSize: 11,
    color: C.ink,
  },
  scoreBreakRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomWidth: 0.4,
    borderBottomColor: C.rule,
  },
  scoreBreakLabel: {
    flex: 1,
    fontSize: 10,
    color: C.ink,
    fontFamily: FONT_SANS,
  },
  scoreBreakValue: {
    fontFamily: FONT_MONO_BOLD,
    fontSize: 10,
    color: C.accent,
    width: 60,
    textAlign: 'right',
  },

  // ── Card (quick win / opportunity) ─────────────────────────────────
  card: {
    borderTopWidth: 0.6,
    borderTopColor: C.ruleStrong,
    paddingTop: 12,
    paddingBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  cardIndex: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: C.ink3,
    textTransform: 'uppercase',
    width: 36,
  },
  cardTitle: {
    fontFamily: FONT_SANS_BOLD,
    fontSize: 12,
    color: C.ink,
    flex: 1,
    lineHeight: 1.35,
  },
  cardDesc: {
    fontFamily: FONT_SANS,
    fontSize: 10.5,
    color: C.ink2,
    lineHeight: 1.55,
    marginLeft: 36,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 36,
  },
  metaPill: {
    fontFamily: FONT_MONO,
    fontSize: 8,
    letterSpacing: 0.8,
    color: C.ink2,
    textTransform: 'uppercase',
    borderWidth: 0.6,
    borderColor: C.ruleStrong,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },

  // ── Risk ───────────────────────────────────────────────────────────
  riskRow: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 0.6,
    borderTopColor: C.ruleStrong,
  },
  riskSeverityCol: {
    width: 80,
    paddingRight: 12,
  },
  riskSeverityBadge: {
    fontFamily: FONT_MONO_BOLD,
    fontSize: 8.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  riskBody: {
    flex: 1,
  },
  riskFlag: {
    fontFamily: FONT_SANS_BOLD,
    fontSize: 11,
    color: C.ink,
    marginBottom: 4,
    lineHeight: 1.35,
  },
  riskMitigation: {
    fontFamily: FONT_SANS,
    fontSize: 10,
    color: C.ink2,
    lineHeight: 1.55,
  },
  riskMitigationLabel: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: C.ink3,
    textTransform: 'uppercase',
    marginBottom: 2,
  },

  // ── Tool table ─────────────────────────────────────────────────────
  toolHead: {
    flexDirection: 'row',
    borderBottomWidth: 0.6,
    borderBottomColor: C.ink,
    paddingBottom: 5,
    marginBottom: 4,
  },
  toolHeadCell: {
    fontFamily: FONT_MONO,
    fontSize: 8,
    letterSpacing: 1.4,
    color: C.ink2,
    textTransform: 'uppercase',
  },
  toolRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.4,
    borderBottomColor: C.rule,
  },
  toolName: {
    width: 130,
    paddingRight: 10,
    fontFamily: FONT_SANS_BOLD,
    fontSize: 10,
    color: C.ink,
  },
  toolPurpose: {
    flex: 1,
    paddingRight: 10,
    fontSize: 10,
    color: C.ink2,
    lineHeight: 1.5,
  },
  toolCost: {
    width: 80,
    textAlign: 'right',
    fontFamily: FONT_MONO,
    fontSize: 9,
    color: C.accent,
  },

  // ── Directories block ──────────────────────────────────────────────
  directoryBlock: {
    marginTop: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 14,
    borderWidth: 0.6,
    borderColor: C.ruleStrong,
    backgroundColor: C.paper2,
  },
  directoryEyebrow: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: C.ink2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  directoryIntro: {
    fontSize: 9.5,
    color: C.ink2,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  directoryRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  directoryName: {
    width: 130,
    fontFamily: FONT_SANS_BOLD,
    fontSize: 9,
    color: C.accent,
  },
  directoryDesc: {
    flex: 1,
    fontSize: 9,
    color: C.ink2,
    lineHeight: 1.45,
  },

  // ── Financial impact ───────────────────────────────────────────────
  financeBox: {
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 0.8,
    borderColor: C.ink,
  },
  financeEyebrow: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: C.ink2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  financeBig: {
    fontFamily: FONT_SERIF_BOLD,
    fontSize: 40,
    color: C.accent,
    lineHeight: 1,
    marginBottom: 10,
  },
  financeFormula: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    color: C.ink2,
    lineHeight: 1.5,
  },

  // ── 4-day plan ─────────────────────────────────────────────────────
  planRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.4,
    borderBottomColor: C.rule,
  },
  planDay: {
    width: 56,
    fontFamily: FONT_MONO_BOLD,
    fontSize: 9,
    letterSpacing: 1.4,
    color: C.accent,
    textTransform: 'uppercase',
    paddingTop: 1,
  },
  planAction: {
    flex: 1,
    fontSize: 10,
    color: C.ink,
    lineHeight: 1.55,
  },

  // ── Next steps ─────────────────────────────────────────────────────
  nextBlock: {
    marginBottom: 12,
  },
  nextEyebrow: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: C.accent,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  ctaBox: {
    marginTop: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: C.ink,
  },
  ctaText: {
    fontFamily: FONT_SANS,
    fontSize: 11,
    color: C.paper,
    lineHeight: 1.55,
  },

  // ── Footer ─────────────────────────────────────────────────────────
  // @react-pdf renders `fixed` most reliably on a single <Text> per page.
  // We use one Text holding the whole footer line + hairline rule above.
  footer: {
    // NOTE: do NOT set `lineHeight` here — @react-pdf has a bug where any
    // lineHeight on a `fixed render={...}` Text silently drops it from output.
    position: 'absolute',
    bottom: 26,
    left: 56,
    right: 56,
    textAlign: 'center',
    fontFamily: FONT_MONO,
    fontSize: 8,
    color: C.ink3,
  },
  footerRule: {
    position: 'absolute',
    bottom: 40,
    left: 56,
    right: 56,
    height: 0.6,
    backgroundColor: C.rule,
  },
});

function severityStyle(severity: 'low' | 'medium' | 'high') {
  if (severity === 'high') {
    return { color: C.stamp, borderColor: C.stamp, backgroundColor: C.paper };
  }
  if (severity === 'medium') {
    return { color: C.amber, borderColor: C.amber, backgroundColor: C.paper };
  }
  return { color: C.accent, borderColor: C.accent, backgroundColor: C.paper };
}

const SCORE_LABELS: Record<keyof ReportAnalysis['aiReadinessScore']['breakdown'], string> = {
  digitalFoundation: 'Digital foundation',
  processMaturity: 'Process maturity',
  teamReadiness: 'Team readiness',
  dataQuality: 'Data quality',
  leadershipBuyIn: 'Leadership buy-in',
};

function Footer() {
  return (
    <Text
      style={styles.footer}
      fixed
      render={({ pageNumber, totalPages }) =>
        `SnapReport · info@snapaireport.com   ·   Page ${pageNumber} / ${totalPages}`
      }
    />
  );
}

function SectionHead({ letter, title }: { letter: string; title: string }) {
  return (
    <View>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionLetter}>{letter}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionRule} />
    </View>
  );
}

interface ReportPDFProps {
  analysis: ReportAnalysis;
  clientName: string;
}

export function ReportPDF({ analysis, clientName }: ReportPDFProps) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document
      title={`AI Business Assessment — ${clientName}`}
      author="SnapReport"
    >
      {/* ───────── Cover ───────── */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.cover}>
          {/* Top header strip */}
          <View>
            <View style={styles.coverHeader}>
              <Text style={styles.coverEyebrow}>SnapReport · v1</Text>
              <Text style={styles.coverStamp}>Confidential</Text>
            </View>

            <View style={styles.coverMain}>
              <Text style={styles.coverEyebrow}>AI Readiness Report</Text>
              <View style={[styles.coverDivider, { marginTop: 8 }]} />
              <Text style={styles.coverTitle}>AI Business{'\n'}Assessment</Text>
              <Text style={styles.coverSubtitle}>
                A practical, custom-fit look at where AI can save time and unlock
                growth for your business — in the next 30 days, and beyond.
              </Text>
            </View>
          </View>

          {/* Bottom meta block */}
          <View>
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Prepared for</Text>
              <Text style={styles.coverMetaValue}>{clientName}</Text>
            </View>
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Issued</Text>
              <Text style={styles.coverMetaValue}>{today}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => `SnapReport · info@snapaireport.com   ·   Page ${pageNumber} / ${totalPages}`} />
      </Page>

      {/* ───────── Page 2: Summary + Score + Quick wins ───────── */}
      <Page size="LETTER" style={styles.page}>
        {/* A · Executive Summary */}
        <View style={styles.sectionWrap}>
          <SectionHead letter="A ·" title="Executive summary" />
          {analysis.executiveSummary.map((point, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletMark}>—</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* B · AI Readiness Score */}
        <View style={styles.sectionWrap} wrap={false}>
          <SectionHead letter="B ·" title="AI readiness score" />
          <View style={styles.scoreCard}>
            <Text style={styles.scoreBig}>{analysis.aiReadinessScore.overall}</Text>
            <Text style={styles.scoreOf}>/ 100</Text>
            <View style={styles.scoreLabelBlock}>
              <Text style={styles.scoreLabelEyebrow}>Overall</Text>
              <Text style={styles.scoreLabelText}>Readiness index</Text>
            </View>
          </View>
          <View>
            {(Object.keys(SCORE_LABELS) as Array<keyof typeof SCORE_LABELS>).map((key) => (
              <View key={key} style={styles.scoreBreakRow}>
                <Text style={styles.scoreBreakLabel}>{SCORE_LABELS[key]}</Text>
                <Text style={styles.scoreBreakValue}>
                  {analysis.aiReadinessScore.breakdown[key]} / 100
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => `SnapReport · info@snapaireport.com   ·   Page ${pageNumber} / ${totalPages}`} />
      </Page>

      {/* ───────── Page 3: Quick wins + Strategic opportunities ───────── */}
      <Page size="LETTER" style={styles.page}>
        {/* C · Quick Wins */}
        <View style={styles.sectionWrap}>
          <SectionHead letter="C ·" title="Top quick wins" />
          {analysis.quickWins.slice(0, 3).map((win, i) => (
            <View key={i} style={styles.card} wrap={false}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIndex}>QW.{String(i + 1).padStart(2, '0')}</Text>
                <Text style={styles.cardTitle}>{win.title}</Text>
              </View>
              <Text style={styles.cardDesc}>{win.description}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaPill}>Effort · {win.effort}</Text>
                <Text style={styles.metaPill}>Impact · {win.impact}</Text>
                <Text style={styles.metaPill}>Timeline · {win.timeline}</Text>
                <Text style={styles.metaPill}>Cost · {win.estimatedCost}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* D · Strategic Opportunities */}
        <View style={styles.sectionWrap}>
          <SectionHead letter="D ·" title="Strategic opportunities" />
          {analysis.strategicOpportunities.map((opp, i) => (
            <View key={i} style={styles.card} wrap={false}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIndex}>SO.{String(i + 1).padStart(2, '0')}</Text>
                <Text style={styles.cardTitle}>{opp.title}</Text>
              </View>
              <Text style={styles.cardDesc}>{opp.description}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaPill}>ROI · {opp.roiPotential}</Text>
                <Text style={styles.metaPill}>Timeline · {opp.timeline}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => `SnapReport · info@snapaireport.com   ·   Page ${pageNumber} / ${totalPages}`} />
      </Page>

      {/* ───────── Page 4: Risks + Tools ───────── */}
      <Page size="LETTER" style={styles.page}>
        {/* E · Risk Flags */}
        <View style={styles.sectionWrap}>
          <SectionHead letter="E ·" title="Risk flags" />
          {analysis.riskFlags.map((risk, i) => {
            const sev = severityStyle(risk.severity);
            return (
              <View key={i} style={styles.riskRow} wrap={false}>
                <View style={styles.riskSeverityCol}>
                  <Text
                    style={[
                      styles.riskSeverityBadge,
                      { color: sev.color, borderColor: sev.borderColor },
                    ]}
                  >
                    {risk.severity}
                  </Text>
                </View>
                <View style={styles.riskBody}>
                  <Text style={styles.riskFlag}>{risk.flag}</Text>
                  <Text style={styles.riskMitigationLabel}>Mitigation</Text>
                  <Text style={styles.riskMitigation}>{risk.mitigation}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* F · Recommended Tools */}
        <View style={styles.sectionWrap}>
          <SectionHead letter="F ·" title="Recommended tools" />
          <View style={styles.toolHead}>
            <Text style={[styles.toolHeadCell, { width: 130 }]}>Tool</Text>
            <Text style={[styles.toolHeadCell, { flex: 1 }]}>Purpose</Text>
            <Text style={[styles.toolHeadCell, { width: 80, textAlign: 'right' }]}>Cost</Text>
          </View>
          {analysis.recommendedTools.map((tool, i) => (
            <View key={i} style={styles.toolRow} wrap={false}>
              <Text style={styles.toolName}>
                {tool.url ? (
                  <Link src={tool.url} style={{ color: C.accent, textDecoration: 'none' }}>
                    {tool.name} ↗
                  </Link>
                ) : (
                  tool.name
                )}
              </Text>
              <Text style={styles.toolPurpose}>{tool.purpose}</Text>
              <Text style={styles.toolCost}>{tool.cost}</Text>
            </View>
          ))}

          {/* Tool directories — keep together on one page */}
          <View style={styles.directoryBlock} wrap={false}>
            <Text style={styles.directoryEyebrow}>Find more AI tools</Text>
            <Text style={styles.directoryIntro}>
              The AI landscape moves fast. These directories index thousands of
              tools so you can keep an eye on what&apos;s launching:
            </Text>
            {[
              { name: "There's An AI For That", url: 'https://theresanaiforthat.com', desc: 'Largest searchable AI tool index — type a use case, get a sorted list.' },
              { name: 'Futurepedia', url: 'https://www.futurepedia.io', desc: 'Curated AI tools, categorized, with pricing tiers.' },
              { name: 'FutureTools', url: 'https://www.futuretools.io', desc: 'Hand-picked AI tools. Good filters for free-tier finds.' },
            ].map((d) => (
              <View key={d.url} style={styles.directoryRow}>
                <Text style={styles.directoryName}>
                  <Link src={d.url} style={{ color: C.accent, textDecoration: 'none' }}>{d.name} ↗</Link>
                </Text>
                <Text style={styles.directoryDesc}>{d.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => `SnapReport · info@snapaireport.com   ·   Page ${pageNumber} / ${totalPages}`} />
      </Page>

      {/* ───────── Page 5: Financial impact + 4-day plan + Next steps ───────── */}
      <Page size="LETTER" style={styles.page}>
        {/* G · Financial Impact */}
        {analysis.financialImpact && (
          <View style={styles.sectionWrap} wrap={false}>
            <SectionHead letter="G ·" title="Financial impact" />
            <View style={styles.financeBox}>
              <Text style={styles.financeEyebrow}>Net monthly value</Text>
              <Text style={styles.financeBig}>
                ${analysis.financialImpact.netMonthlySavings.toLocaleString('en-US')}
              </Text>
              <Text style={styles.financeFormula}>
                ({analysis.financialImpact.weeklyHoursReclaimed} h/week × 4.33 × ${analysis.financialImpact.hourlyRateAssumption}/hr)
                {'\n'}− ${analysis.financialImpact.monthlyToolCost}/mo tool cost
              </Text>
            </View>
          </View>
        )}

        {/* H · 4-Day Plan */}
        {analysis.quickWinPlan && analysis.quickWinPlan.length > 0 && (
          <View style={styles.sectionWrap}>
            <SectionHead letter="H ·" title="4-day quick-win plan" />
            {analysis.quickWinPlan.map((d) => (
              <View key={d.day} style={styles.planRow} wrap={false}>
                <Text style={styles.planDay}>Day {d.day}</Text>
                <Text style={styles.planAction}>{d.action}</Text>
              </View>
            ))}
          </View>
        )}

        {/* I · Next steps */}
        <View style={styles.sectionWrap}>
          <SectionHead letter="I ·" title="Next steps" />

          <View style={styles.nextBlock}>
            <Text style={styles.nextEyebrow}>This week</Text>
            {analysis.nextSteps.immediate.map((step, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>—</Text>
                <Text style={styles.bulletText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.nextBlock}>
            <Text style={styles.nextEyebrow}>Next 30 days</Text>
            {analysis.nextSteps.thirtyDays.map((step, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>—</Text>
                <Text style={styles.bulletText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.ctaBox} wrap={false}>
            <Text style={styles.ctaText}>{analysis.nextSteps.cta}</Text>
          </View>
        </View>

        <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => `SnapReport · info@snapaireport.com   ·   Page ${pageNumber} / ${totalPages}`} />
      </Page>
    </Document>
  );
}

export default ReportPDF;
