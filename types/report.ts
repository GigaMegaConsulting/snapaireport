export interface Assessment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  businessType?: string;
  callId?: string;
  transcript: string;
  analysis?: ReportAnalysis;
  status: 'transcript_received' | 'analyzed' | 'approved' | 'pdf_generated' | 'sent';
  createdAt: string;
  updatedAt: string;
}

export interface ReportAnalysis {
  executiveSummary: string[];
  aiReadinessScore: {
    overall: number;
    breakdown: {
      digitalFoundation: number;
      processMaturity: number;
      teamReadiness: number;
      dataQuality: number;
      leadershipBuyIn: number;
    };
  };
  quickWins: Array<{
    title: string;
    description: string;
    effort: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    timeline: string;
    estimatedCost: string;
  }>;
  strategicOpportunities: Array<{
    title: string;
    description: string;
    roiPotential: string;
    timeline: string;
  }>;
  riskFlags: Array<{
    flag: string;
    severity: 'low' | 'medium' | 'high';
    mitigation: string;
  }>;
  recommendedTools: Array<{
    name: string;
    purpose: string;
    cost: string;
    url?: string;
  }>;
  nextSteps: {
    immediate: string[];
    thirtyDays: string[];
    cta: string;
  };
  /** Concrete time + dollar value of implementing the report's quick wins. */
  financialImpact?: {
    /** Hours per week the team would reclaim if all quick wins shipped. */
    weeklyHoursReclaimed: number;
    /** Blended hourly rate the calculation assumes (defaults to $100). */
    hourlyRateAssumption: number;
    /** Monthly cost of the recommended tools (sum of quickWins + tools). */
    monthlyToolCost: number;
    /** Net monthly value: (weeklyHours × 4.33 × rate) − toolCost. */
    netMonthlySavings: number;
  };
  /** Tactical 4-day plan: one specific action per day, just-do-this simple. */
  quickWinPlan?: Array<{ day: number; action: string }>;
}
