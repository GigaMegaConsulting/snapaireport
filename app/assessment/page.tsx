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
  title: string;
  subtitle?: string;
  fields: StepField[];
}

const STEPS: Step[] = [
  {
    title: "Where should we send your report?",
    subtitle: "We'll email your custom SnapReport once it's ready. Takes about 5 minutes — no calls, no follow-up sales.",
    fields: [
      { key: "email", label: "Your email", type: "email", placeholder: "you@yourbusiness.com", required: true },
      { key: "fullName", label: "Your name", type: "text", placeholder: "Jane Smith", required: true },
    ],
  },
  {
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
    title: "How the work flows",
    subtitle: "Walk us through a typical customer journey.",
    fields: [
      {
        key: "operationsWalkthrough",
        label: "From the moment a customer reaches out to when you deliver — what happens?",
        helper: "Just stream-of-consciousness is fine. The more detail, the better the report.",
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
        helper: "Be specific — the bottlenecks are where AI usually pays off the most.",
        type: "textarea",
        placeholder: "Following up on quotes takes hours, billing reconciliation, answering the same customer questions...",
        required: true,
      },
    ],
  },
  {
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
        helper: "1 = phobic, 10 = early adopters",
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
    // Submit
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-10 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-white mb-4">You&apos;re all set, {answers.fullName.split(" ")[0] || "there"}.</h1>
          <p className="text-lg text-slate-300 mb-2">
            Your SnapReport is being generated right now.
          </p>
          <p className="text-slate-400 mb-8">
            Check <span className="text-blue-300 font-medium">{answers.email}</span> in the next few minutes — the report
            will land in your inbox with your AI Readiness Score, top quick wins, and tool recommendations specific to{" "}
            {answers.businessName || "your business"}.
          </p>
          <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4 text-left text-sm text-slate-400 mb-8">
            <p className="font-semibold text-slate-200 mb-2">What happens next:</p>
            <ul className="space-y-1.5">
              <li>1. We analyze your answers with Claude AI</li>
              <li>2. We generate your personalized SnapReport (PDF)</li>
              <li>3. It lands in your inbox — usually within 5 minutes</li>
              <li>4. Optional: book a 30-min review call to plan implementation</li>
            </ul>
          </div>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            SnapReport
          </Link>
          <div className="text-sm text-slate-400">
            Step {step + 1} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Form */}
      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentStep.title}</h1>
          {currentStep.subtitle && (
            <p className="text-slate-400 mb-8">{currentStep.subtitle}</p>
          )}

          <div className="space-y-6 mt-6">
            {currentStep.fields.map((field) => (
              <FieldRow
                key={field.key}
                field={field}
                value={answers[field.key]}
                onChange={(v) => updateAnswer(field.key, v)}
              />
            ))}
          </div>

          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0 || submitting}
              className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-sm"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 text-white font-semibold transition shadow-lg shadow-blue-600/20"
            >
              {submitting ? "Generating your report…" : isLast ? "Generate my SnapReport →" : "Continue →"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          🔒 Your answers are private. We use them only to generate your report.
        </p>
      </main>
    </div>
  );
}

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: StepField;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `field-${field.key}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-200 mb-2">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {field.helper && <p className="text-xs text-slate-500 mb-2">{field.helper}</p>}
      {field.type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="w-full bg-slate-900/60 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-lg px-4 py-3 text-white placeholder:text-slate-600 transition"
        />
      ) : field.type === "slider" ? (
        <div>
          <div className="flex items-center gap-4">
            <input
              id={id}
              type="range"
              min={field.min ?? 1}
              max={field.max ?? 10}
              step={1}
              value={value || String(field.min ?? 1)}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 accent-blue-500"
            />
            <div className="w-12 text-center text-2xl font-bold text-blue-400">{value || field.min}</div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>1 — phobic</span>
            <span>10 — early adopters</span>
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full bg-slate-900/60 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-lg px-4 py-3 text-white placeholder:text-slate-600 transition"
        />
      )}
    </div>
  );
}
