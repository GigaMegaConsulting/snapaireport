import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { ReportAnalysis } from '@/types/report';

const COLORS = {
  bg: '#0f172a',
  bgCard: '#1e293b',
  bgCardAlt: '#172033',
  text: '#f8fafc',
  muted: '#94a3b8',
  accent: '#3b82f6',
  accentDim: '#1d4ed8',
  green: '#22c55e',
  yellow: '#eab308',
  red: '#ef4444',
  border: '#334155',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    paddingTop: 48,
    paddingBottom: 64,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  cover: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  coverEyebrow: {
    fontSize: 11,
    color: COLORS.accent,
    letterSpacing: 2,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  coverTitle: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.text,
    marginBottom: 24,
  },
  coverDivider: {
    width: 64,
    height: 3,
    backgroundColor: COLORS.accent,
    marginBottom: 32,
  },
  coverClient: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 6,
  },
  coverDate: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 48,
  },
  coverPreparedBy: {
    fontSize: 11,
    color: COLORS.muted,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionAccent: {
    width: 32,
    height: 2,
    backgroundColor: COLORS.accent,
    marginBottom: 14,
  },
  sectionWrap: {
    marginBottom: 24,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletDot: {
    color: COLORS.accent,
    marginRight: 8,
    fontFamily: 'Helvetica-Bold',
  },
  bulletText: {
    flex: 1,
    color: COLORS.text,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  scoreOverall: {
    fontSize: 64,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.accent,
    marginRight: 16,
  },
  scoreOverallSlash: {
    fontSize: 18,
    color: COLORS.muted,
  },
  scoreLabel: {
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableLabel: {
    flex: 2,
    color: COLORS.text,
  },
  tableValue: {
    flex: 1,
    textAlign: 'right',
    color: COLORS.accent,
    fontFamily: 'Helvetica-Bold',
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  cardDesc: {
    color: COLORS.text,
    marginBottom: 10,
  },
  cardMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaPill: {
    fontSize: 9,
    color: COLORS.muted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 6,
    marginBottom: 4,
  },
  riskCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  riskFlag: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.text,
    marginRight: 8,
  },
  severityBadge: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    color: COLORS.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mitigation: {
    color: COLORS.muted,
    fontSize: 10,
  },
  mitigationLabel: {
    fontFamily: 'Helvetica-Bold',
    color: COLORS.text,
  },
  toolRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  toolName: {
    flex: 2,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.text,
  },
  toolPurpose: {
    flex: 4,
    color: COLORS.text,
    paddingHorizontal: 8,
  },
  toolCost: {
    flex: 1.5,
    color: COLORS.accent,
    textAlign: 'right',
  },
  nextStepsBlock: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
  },
  nextStepsLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  ctaBlock: {
    backgroundColor: COLORS.accent,
    borderRadius: 6,
    padding: 18,
    marginTop: 8,
  },
  ctaText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 8,
    color: COLORS.muted,
    textAlign: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

function severityColor(severity: 'low' | 'medium' | 'high'): string {
  if (severity === 'high') return COLORS.red;
  if (severity === 'medium') return COLORS.yellow;
  return COLORS.green;
}

const SCORE_LABELS: Record<keyof ReportAnalysis['aiReadinessScore']['breakdown'], string> = {
  digitalFoundation: 'Digital Foundation',
  processMaturity: 'Process Maturity',
  teamReadiness: 'Team Readiness',
  dataQuality: 'Data Quality',
  leadershipBuyIn: 'Leadership Buy-In',
};

function Footer() {
  return (
    <Text
      style={styles.footer}
      fixed
      render={({ pageNumber, totalPages }) =>
        `Confidential — SnapReport · info@snapaireport.com   ·   Page ${pageNumber} of ${totalPages}`
      }
    />
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
      {/* Cover */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.cover}>
          <Text style={styles.coverEyebrow}>AI Readiness Report</Text>
          <Text style={styles.coverTitle}>AI Business Assessment</Text>
          <View style={styles.coverDivider} />
          <Text style={styles.coverClient}>Prepared for {clientName}</Text>
          <Text style={styles.coverDate}>{today}</Text>
          <Text style={styles.coverPreparedBy}>SnapReport · snapaireport.com</Text>
        </View>
        <Footer />
      </Page>

      {/* Body */}
      <Page size="LETTER" style={styles.page}>
        {/* 1. Executive Summary */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeader}>1. Executive Summary</Text>
          <View style={styles.sectionAccent} />
          {analysis.executiveSummary.map((point, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* 2. AI Readiness Score */}
        <View style={styles.sectionWrap} wrap={false}>
          <Text style={styles.sectionHeader}>2. AI Readiness Score</Text>
          <View style={styles.sectionAccent} />
          <View style={styles.scoreRow}>
            <Text style={styles.scoreOverall}>
              {analysis.aiReadinessScore.overall}
              <Text style={styles.scoreOverallSlash}>/100</Text>
            </Text>
            <Text style={styles.scoreLabel}>Overall Readiness</Text>
          </View>
          <View style={styles.table}>
            {(Object.keys(SCORE_LABELS) as Array<keyof typeof SCORE_LABELS>).map((key) => (
              <View key={key} style={styles.tableRow}>
                <Text style={styles.tableLabel}>{SCORE_LABELS[key]}</Text>
                <Text style={styles.tableValue}>
                  {analysis.aiReadinessScore.breakdown[key]}/100
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 3. Quick Wins */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeader}>3. Top Quick Wins</Text>
          <View style={styles.sectionAccent} />
          {analysis.quickWins.slice(0, 3).map((win, i) => (
            <View key={i} style={styles.card} wrap={false}>
              <Text style={styles.cardTitle}>{win.title}</Text>
              <Text style={styles.cardDesc}>{win.description}</Text>
              <View style={styles.cardMetaRow}>
                <Text style={styles.metaPill}>Effort: {win.effort}</Text>
                <Text style={styles.metaPill}>Impact: {win.impact}</Text>
                <Text style={styles.metaPill}>Timeline: {win.timeline}</Text>
                <Text style={styles.metaPill}>Cost: {win.estimatedCost}</Text>
              </View>
            </View>
          ))}
        </View>

        <Footer />
      </Page>

      {/* Strategic + Risk + Tools */}
      <Page size="LETTER" style={styles.page}>
        {/* 4. Strategic Opportunities */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeader}>4. Strategic Opportunities</Text>
          <View style={styles.sectionAccent} />
          {analysis.strategicOpportunities.map((opp, i) => (
            <View key={i} style={styles.card} wrap={false}>
              <Text style={styles.cardTitle}>{opp.title}</Text>
              <Text style={styles.cardDesc}>{opp.description}</Text>
              <View style={styles.cardMetaRow}>
                <Text style={styles.metaPill}>ROI: {opp.roiPotential}</Text>
                <Text style={styles.metaPill}>Timeline: {opp.timeline}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 5. Risk Flags */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeader}>5. Risk Flags</Text>
          <View style={styles.sectionAccent} />
          {analysis.riskFlags.map((risk, i) => (
            <View
              key={i}
              style={[styles.riskCard, { borderLeftColor: severityColor(risk.severity) }]}
              wrap={false}
            >
              <View style={styles.riskHeader}>
                <Text style={styles.riskFlag}>{risk.flag}</Text>
                <Text
                  style={[
                    styles.severityBadge,
                    { backgroundColor: severityColor(risk.severity) },
                  ]}
                >
                  {risk.severity}
                </Text>
              </View>
              <Text style={styles.mitigation}>
                <Text style={styles.mitigationLabel}>Mitigation: </Text>
                {risk.mitigation}
              </Text>
            </View>
          ))}
        </View>

        {/* 6. Recommended Tools */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeader}>6. Recommended Tools</Text>
          <View style={styles.sectionAccent} />
          <View style={styles.table}>
            {analysis.recommendedTools.map((tool, i) => (
              <View key={i} style={styles.toolRow} wrap={false}>
                <Text style={styles.toolName}>
                  {tool.url ? (
                    <Link src={tool.url} style={{ color: COLORS.accent, textDecoration: 'none' }}>
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
          </View>

          {/* Explore more — AI tool directories */}
          <View style={{ marginTop: 18, padding: 12, borderColor: COLORS.muted, borderWidth: 0.5, borderRadius: 4 }}>
            <Text style={{ color: COLORS.muted, fontSize: 8, letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' }}>
              Find more AI tools
            </Text>
            <Text style={{ color: COLORS.text, fontSize: 10, marginBottom: 8, lineHeight: 1.5 }}>
              The AI landscape moves fast. These directories index thousands of tools so you can keep an eye on what&apos;s launching:
            </Text>
            {[
              { name: "There's An AI For That", url: 'https://theresanaiforthat.com', desc: 'Largest searchable AI tool index — type a use case, get a sorted list.' },
              { name: 'Futurepedia', url: 'https://www.futurepedia.io', desc: 'Curated AI tools, categorized, with pricing tiers.' },
              { name: 'FutureTools', url: 'https://www.futuretools.io', desc: 'Hand-picked AI tools. Good filters for free-tier finds.' },
            ].map((d) => (
              <View key={d.url} style={{ flexDirection: 'row', marginBottom: 4 }}>
                <Text style={{ width: 110, fontSize: 9, color: COLORS.accent }}>
                  <Link src={d.url} style={{ color: COLORS.accent, textDecoration: 'none' }}>{d.name} ↗</Link>
                </Text>
                <Text style={{ flex: 1, fontSize: 9, color: COLORS.muted, lineHeight: 1.4 }}>{d.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <Footer />
      </Page>

      {/* Financial Impact + 4-day plan + Next Steps */}
      <Page size="LETTER" style={styles.page}>
        {/* Financial Impact */}
        {analysis.financialImpact && (
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionHeader}>7. Financial Impact</Text>
            <View style={styles.sectionAccent} />
            <View style={{ borderColor: COLORS.accent, borderWidth: 1, padding: 14, marginBottom: 8 }}>
              <Text style={{ color: COLORS.muted, fontSize: 8, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
                Net monthly value
              </Text>
              <Text style={{ color: COLORS.text, fontSize: 36, marginBottom: 6 }}>
                ${analysis.financialImpact.netMonthlySavings.toLocaleString('en-US')}
              </Text>
              <Text style={{ color: COLORS.muted, fontSize: 9, lineHeight: 1.5 }}>
                ({analysis.financialImpact.weeklyHoursReclaimed} h/week reclaimed × 4.33 × ${analysis.financialImpact.hourlyRateAssumption}/hr)
                − ${analysis.financialImpact.monthlyToolCost}/mo tool cost
              </Text>
            </View>
          </View>
        )}

        {/* 4-day quick-win plan */}
        {analysis.quickWinPlan && analysis.quickWinPlan.length > 0 && (
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionHeader}>8. 4-Day Quick-Win Plan</Text>
            <View style={styles.sectionAccent} />
            {analysis.quickWinPlan.map((d) => (
              <View key={d.day} style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ width: 60, fontSize: 11, color: COLORS.accent, fontWeight: 700 }}>
                  Day {d.day}
                </Text>
                <Text style={{ flex: 1, fontSize: 10, color: COLORS.text, lineHeight: 1.5 }}>{d.action}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeader}>9. Next Steps</Text>
          <View style={styles.sectionAccent} />

          <View style={styles.nextStepsBlock}>
            <Text style={styles.nextStepsLabel}>This Week</Text>
            {analysis.nextSteps.immediate.map((step, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.nextStepsBlock}>
            <Text style={styles.nextStepsLabel}>Next 30 Days</Text>
            {analysis.nextSteps.thirtyDays.map((step, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.ctaBlock}>
            <Text style={styles.ctaText}>{analysis.nextSteps.cta}</Text>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}

export default ReportPDF;
