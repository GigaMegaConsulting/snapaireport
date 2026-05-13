"use client";

import { useState } from "react";
import Link from "next/link";

type AnswerKey =
  | "email"
  | "fullName"
  | "businessName"
  | "businessDescription"
  | "yearsOperating"
  | "teamSize"
  | "teamLocation"
  | "operationsWalkthrough"
  | "toolsInUse"
  | "leadSources"
  | "bottlenecks"
  | "priorAiExperience"
  | "techComfortScore"
  | "twelveMonthGoals"
  | "automationWish";

type Answers = Record<AnswerKey, string>;

const INITIAL_ANSWERS: Answers = {
  email: "",
  fullName: "",
  businessName: "",
  businessDescription: "",
  yearsOperating: "",
  teamSize: "",
  teamLocation: "",
  operationsWalkthrough: "",
  toolsInUse: "",
  leadSources: "",
  bottlenecks: "",
  priorAiExperience: "",
  techComfortScore: "7",
  twelveMonthGoals: "",
  automationWish: "",
};

interface StepField {
  key: AnswerKey;
  label: string;
  helper?: string;
  type: "email" | "text" | "textarea" | "slider";
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

interface Step {
  number: string;
  title: string;
  subtitle?: string;
  fields: StepField[];
}

const STEPS: Step[] = [
  {
    number: "00",
    title: "Where should we send your report?",
    subtitle: "We'll email your custom AI Report once it's ready. Takes about 5 minutes — no calls, no follow-up sales.",
    fields: [
      { key: "email", label: "Your email", type: "email", placeholder: "you@yourbusiness.com", required: true },
      { key: "fullName", label: "Your name", type: "text", placeholder: "Jane Smith", required: true },
    ],
  },
  {
    number: "01",
    title: "Tell us about your business",
    fields: [
      { key: "businessName", label: "Business name", type: "text", placeholder: "Acme Plumbing", required: true },
      {
        key: "businessDescription",
        label: "What does your business do?",
        helper: "One or two sentences. Plain language.",
        type: "textarea",
        placeholder: "We're a residential plumbing company serving the Greater Montreal area...",
        required: true,
      },
      { key: "yearsOperating", label: "How long have you been operating?", type: "text", placeholder: "8 years", required: true },
    ],
  },
  {
    number: "02",
    title: "Your team",
    fields: [
      { key: "teamSize", label: "How many people work in the business?", type: "text", placeholder: "12 (including 2 owners)", required: true },
      {
        key: "teamLocation",
        label: "Are they local, remote, or both?",
        type: "text",
        placeholder: "Mostly local — office staff on site, field techs in the field",
        required: true,
      },
    ],
  },
  {
    number: "03",
    title: "How the work flows",
    subtitle: "Walk us through a typical customer journey.",
    fields: [
      {
        key: "operationsWalkthrough",
        label: "From the moment a customer reaches out to when you deliver — what happens?",
        helper: "Stream-of-consciousness is fine. More detail → better report.",
        type: "textarea",
        placeholder: "Customer calls or fills out our website form → we schedule a quote visit → quote → job booked → tech dispatched → invoice sent → follow-up...",
        required: true,
      },
      {
        key: "toolsInUse",
        label: "What software does your team use day-to-day?",
        helper: "CRM, scheduling, email, billing, anything else.",
        type: "textarea",
        placeholder: "QuickBooks for billing, Google Workspace for email, Jobber for scheduling, Excel for tracking...",
        required: true,
      },
    ],
  },
  {
    number: "04",
    title: "Customers and bottlenecks",
    fields: [
      {
        key: "leadSources",
        label: "Where do most of your customers come from right now?",
        type: "textarea",
        placeholder: "About 60% word of mouth, 30% Google search, 10% Facebook ads...",
        required: true,
      },
      {
        key: "bottlenecks",
        label: "What slows you down? Where do you lose the most time?",
        helper: "Be specific — bottlenecks are where AI usually pays off the most.",
        type: "textarea",
        placeholder: "Following up on quotes, billing reconciliation, answering the same customer questions...",
        required: true,
      },
    ],
  },
  {
    number: "05",
    title: "AI experience and goals",
    fields: [
      {
        key: "priorAiExperience",
        label: "Have you tried AI or automation before? What happened?",
        helper: "If not, just say 'none' — that's useful info too.",
        type: "textarea",
        placeholder: "We tried ChatGPT for marketing copy, it was okay but inconsistent. Never tried real automation.",
        required: true,
      },
      {
        key: "techComfortScore",
        label: "How comfortable is your team with new technology?",
        helper: "1 = phobic · 10 = early adopters",
        type: "slider",
        min: 1,
        max: 10,
        required: true,
      },
      {
        key: "twelveMonthGoals",
        label: "What does success look like for you in the next 12 months?",
        type: "textarea",
        placeholder: "Hit $1.5M in revenue, hire 2 more techs, less time chasing paperwork...",
        required: true,
      },
      {
        key: "automationWish",
        label: "If you could automate one thing tomorrow, what would it be?",
        type: "textarea",
        placeholder: "All the back-and-forth scheduling emails with customers.",
        required: true,
      },
    ],
  },
];

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = STEPS.length;
  const isLast = step === totalSteps - 1;
  const currentStep = STEPS[step];
  const progress = ((step + 1) / totalSteps) * 100;

  function updateAnswer(key: AnswerKey, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function stepIsValid(): boolean {
    return currentStep.fields.every((field) => {
      if (!field.required) return true;
      const v = answers[field.key]?.trim();
      if (field.type === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      }
      return v.length > 0;
    });
  }

  async function handleNext() {
    setError(null);
    if (!stepIsValid()) {
      setError("Please fill in the required fields before continuing.");
      return;
    }
    if (!isLast) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server returned ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    setError(null);
    if (step > 0) setStep((s) => s - 1);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper text-ink relative">
        <div className="bp-grid pointer-events-none fixed inset-0 z-0" aria-hidden />
        <div className="relative z-10">
          <Header step="DONE" />
          <main className="mx-auto max-w-2xl px-6 py-24">
            <div className="eyebrow mb-6 flex items-center gap-3">
              <span>§ END · CONFIRMED</span>
              <span className="annotation flex-1" />
            </div>
            <h1 className="serif text-6xl md:text-7xl leading-[1] tracking-tight mb-8">
              You&apos;re all set,{" "}
              <em>{answers.fullName.split(" ")[0] || "friend"}.</em>
            </h1>
            <p className="text-lg text-ink-2 leading-relaxed mb-6">
              Your AI Report is being generated. Check{" "}
              <span className="mono text-ink border-b border-ink">{answers.email}</span> in the next few minutes — it will land with your AI Readiness Score, top quick wins, and tool recommendations specific to{" "}
              <em className="serif">{answers.businessName || "your business"}</em>.
            </p>

            <div className="mt-12 border border-rule bg-paper-2/60 p-8 tick-frame">
              <div className="eyebrow mb-4">What happens next</div>
              <ol className="space-y-3 text-[14px]">
                {[
                  ["01", "Claude reads your answers"],
                  ["02", "Report is drafted and rendered as PDF"],
                  ["03", "Lands in your inbox — usually under 5 minutes"],
                  ["04", "Optional: book a 30-min review with Giga"],
                ].map(([n, t]) => (
                  <li key={n} className="flex items-start gap-4">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mt-1">
                      {n}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Link href="/" className="mt-12 inline-flex items-center gap-2 mono text-[12px] uppercase tracking-[0.12em] text-ink-2 hover:text-ink transition">
              ← Back to home
            </Link>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink relative">
      <div className="bp-grid pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="relative z-10">
        <Header step={`${String(step + 1).padStart(2, "0")} / ${String(totalSteps).padStart(2, "0")}`} />

        {/* Progress rail */}
        <div className="border-b border-rule">
          <div className="mx-auto max-w-3xl px-6 py-3 flex items-center gap-3">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-2">
              § {currentStep.number}
            </span>
            <div className="flex-1 h-px bg-rule relative">
              <div
                className="absolute inset-y-0 left-0 bg-ink transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-2">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Form body */}
        <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <div className="mb-12">
            <div className="eyebrow mb-4">Section · {currentStep.number}</div>
            <h1 className="serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-4">
              {currentStep.title}
            </h1>
            {currentStep.subtitle && (
              <p className="text-ink-2 leading-relaxed max-w-xl">
                {currentStep.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-10">
            {currentStep.fields.map((field, idx) => (
              <FieldRow
                key={field.key}
                index={idx + 1}
                field={field}
                value={answers[field.key]}
                onChange={(v) => updateAnswer(field.key, v)}
              />
            ))}
          </div>

          {error && (
            <div className="mt-10 border border-stamp bg-paper p-4 text-[13px] text-stamp mono">
              {error}
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-rule flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0 || submitting}
              className="mono text-[12px] uppercase tracking-[0.12em] text-ink-2 hover:text-ink transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="btn-ink"
            >
              {submitting ? (
                <>
                  <span>Generating report</span>
                  <span className="mono text-[11px]">…</span>
                </>
              ) : isLast ? (
                <>
                  <span>Generate my report</span>
                  <Arrow />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <Arrow />
                </>
              )}
            </button>
          </div>

          <p className="mt-8 text-center mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            🔒 Private · used only to generate your report
          </p>
        </main>
      </div>
    </div>
  );
}

function Header({ step }: { step: string }) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Mark />
          <span className="serif text-xl">SnapReport</span>
        </Link>
        <span className="mono text-[10px] tracking-[0.18em] text-ink-2 uppercase">
          Step {step}
        </span>
      </div>
    </header>
  );
}

function FieldRow({
  index,
  field,
  value,
  onChange,
}: {
  index: number;
  field: StepField;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `field-${field.key}`;

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          Q{String(index).padStart(2, "0")}
        </span>
        <label htmlFor={id} className="serif text-xl leading-tight text-ink">
          {field.label}
          {field.required && <span className="text-stamp ml-1">*</span>}
        </label>
      </div>
      {field.helper && (
        <p className="text-[13px] text-ink-2 mb-3 italic">{field.helper}</p>
      )}
      {field.type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="field"
        />
      ) : field.type === "slider" ? (
        <div>
          <div className="flex items-center gap-6">
            <input
              id={id}
              type="range"
              min={field.min ?? 1}
              max={field.max ?? 10}
              step={1}
              value={value || String(field.min ?? 1)}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 accent-ink"
              style={{ accentColor: "var(--ink)" }}
            />
            <span className="serif text-4xl text-ink w-12 text-right">
              {value || field.min}
            </span>
          </div>
          <div className="flex justify-between text-[10px] mono uppercase tracking-[0.12em] text-ink-3 mt-3">
            <span>1 · phobic</span>
            <span>10 · early adopter</span>
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="field"
        />
      )}
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
