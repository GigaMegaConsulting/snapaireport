/**
 * Lightweight client-side GA4 event tracker.
 *
 * The Analytics component (components/Analytics.tsx) loads gtag.js when
 * NEXT_PUBLIC_GA_ID is set. This helper safely calls `gtag(...)` from any
 * client component without exploding when:
 *   - the env var is missing (no analytics → no-op)
 *   - the code runs on the server (window is undefined → no-op)
 *   - the user has a tracker-blocking extension (gtag is undefined → no-op)
 *
 * Why a wrapper at all? Because forgetting one of those guards is the easy
 * way to ship a regression that 500s on every form interaction. One file,
 * one boundary.
 *
 * Event-naming convention: lowercase snake_case prefixed with the surface
 * (`snapreport_`) so we can tell our events apart from GA's built-ins in
 * Explore reports.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: EventParams,
    ) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  // Strip undefined values so they don't show up as "undefined" string in GA.
  const clean: EventParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) clean[k] = v;
  }

  try {
    window.gtag("event", name, clean);
  } catch {
    // Tracker errors should never break the user-facing flow.
  }
}

// ── Canonical funnel event names ─────────────────────────────────────
// Centralized so typos in callsites become typescript errors, and so
// renaming an event later is one diff.
export const Events = {
  AssessmentStarted: "snapreport_assessment_started",
  AssessmentStepAdvanced: "snapreport_assessment_step_advanced",
  AssessmentSubmitted: "snapreport_assessment_submitted",
  AssessmentSubmitFailed: "snapreport_assessment_submit_failed",
  LocaleSwitched: "snapreport_locale_switched",
} as const;
