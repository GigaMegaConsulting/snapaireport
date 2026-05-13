"use client";

import { useState } from "react";
import Link from "next/link";
import type { Messages, Locale, NicheKey } from "@/lib/i18n";

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

type FieldErrors = Partial<Record<AnswerKey, string>>;

export function AssessmentForm({
  locale,
  t,
  niche,
}: {
  locale: Locale;
  t: Messages;
  niche?: NicheKey;
}) {
  const STEPS = t.form.steps;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = STEPS.length;
  const isLast = step === totalSteps - 1;
  const currentStep = STEPS[step];
  const progress = ((step + 1) / totalSteps) * 100;

  function updateAnswer(key: AnswerKey, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validateStep(): FieldErrors {
    const errs: FieldErrors = {};
    for (const field of currentStep.fields) {
      if (!field.required) continue;
      const v = answers[field.key as AnswerKey]?.trim() ?? "";
      if (field.type === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          errs[field.key as AnswerKey] = v.length === 0 ? t.form.errors.required : t.form.errors.invalidEmail;
        }
      } else if (v.length === 0) {
        errs[field.key as AnswerKey] = t.form.errors.required;
      }
    }
    return errs;
  }

  async function handleNext() {
    setError(null);
    const errs = validateStep();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setError(t.form.errors.stepInvalid);
      return;
    }
    setFieldErrors({});
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
        body: JSON.stringify({ ...answers, locale, niche }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server returned ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.form.errors.submitFailed);
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    setError(null);
    setFieldErrors({});
    if (step > 0) setStep((s) => s - 1);
  }

  if (submitted) {
    const firstName = answers.fullName.split(" ")[0] || t.form.success.fallbackName;
    return (
      <div className="min-h-screen bg-paper text-ink bp-grid">
        <div>
          <FormHeader locale={locale} t={t} stepLabel="DONE" />
          <main className="mx-auto max-w-2xl px-6 py-24">
            <div className="eyebrow mb-6 flex items-center gap-3">
              <span>{t.form.success.eyebrow}</span>
              <span className="annotation flex-1" />
            </div>
            <h1 className="serif text-6xl md:text-7xl leading-[1] tracking-tight mb-8">
              {t.form.success.headlinePrefix}{" "}
              <em>{firstName}.</em>
            </h1>
            <p className="text-lg text-ink-2 leading-relaxed mb-6">
              {t.form.success.bodyPrefix}{" "}
              <span className="mono text-ink border-b border-ink">{answers.email}</span>{" "}
              {t.form.success.bodySuffix}{" "}
              <em className="serif">{answers.businessName || t.form.success.fallbackBusiness}</em>.
            </p>

            <div className="mt-12 border border-rule bg-paper-2/60 p-8 tick-frame">
              <div className="eyebrow mb-4">{t.form.success.nextHeader}</div>
              <ol className="space-y-3 text-[14px]">
                {t.form.success.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Link href={`/${locale}`} className="mt-12 inline-flex items-center gap-2 mono text-[12px] uppercase tracking-[0.12em] text-ink-2 hover:text-ink transition">
              ← {t.common.cta.backToHome}
            </Link>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      <div>
        <FormHeader
          locale={locale}
          t={t}
          stepLabel={`${String(step + 1).padStart(2, "0")} / ${String(totalSteps).padStart(2, "0")}`}
        />

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

        <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <div className="mb-12">
            <div className="eyebrow mb-4">{t.form.sectionPrefix} · {currentStep.number}</div>
            <h1 className="serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-4">
              {currentStep.title}
            </h1>
            {currentStep.subtitle && (
              <p className="text-ink-2 leading-relaxed max-w-xl">{currentStep.subtitle}</p>
            )}
          </div>

          <div className="space-y-10">
            {currentStep.fields.map((field, idx) => (
              <FieldRow
                key={field.key}
                index={idx + 1}
                field={field}
                value={answers[field.key as AnswerKey]}
                error={fieldErrors[field.key as AnswerKey]}
                onChange={(v) => updateAnswer(field.key as AnswerKey, v)}
                t={t}
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
              {t.form.actions.back}
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="btn-ink"
            >
              {submitting ? (
                <>
                  <span>{t.form.actions.generating}</span>
                  <span className="mono text-[11px]">…</span>
                </>
              ) : isLast ? (
                <>
                  <span>{t.form.actions.generate}</span>
                  <Arrow />
                </>
              ) : (
                <>
                  <span>{t.form.actions.continue}</span>
                  <Arrow />
                </>
              )}
            </button>
          </div>

          <p className="mt-8 text-center mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            {t.common.misc.privateNote}
          </p>
        </main>
      </div>
    </div>
  );
}

function FormHeader({
  locale,
  t,
  stepLabel,
}: {
  locale: Locale;
  t: Messages;
  stepLabel: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Mark />
          <span className="serif text-xl">{t.common.brand}</span>
        </Link>
        <span className="mono text-[10px] tracking-[0.18em] text-ink-2 uppercase">
          {t.common.misc.step} {stepLabel}
        </span>
      </div>
    </header>
  );
}

function FieldRow({
  index,
  field,
  value,
  error,
  onChange,
  t,
}: {
  index: number;
  field: Messages["form"]["steps"][number]["fields"][number];
  value: string;
  error?: string;
  onChange: (v: string) => void;
  t: Messages;
}) {
  const id = `field-${field.key}`;
  const fieldClass = error ? "field field-error" : "field";
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          Q{String(index).padStart(2, "0")}
        </span>
        <label htmlFor={id} className="serif text-xl leading-tight text-ink">
          {field.label}
          {field.required && <span className="text-stamp ml-1">*</span>}
          {!field.required && (
            <span className="ml-2 mono text-[10px] uppercase tracking-[0.12em] text-ink-3 align-middle">
              {t.form.optionalTag}
            </span>
          )}
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
          className={fieldClass}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      ) : field.type === "slider" ? (
        <div>
          <div className="flex items-center gap-6">
            <input
              id={id}
              type="range"
              min={1}
              max={10}
              step={1}
              value={value || "1"}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1"
              style={{ accentColor: "var(--ink)" }}
            />
            <span className="serif text-4xl text-ink w-12 text-right">
              {value || 1}
            </span>
          </div>
          <div className="flex justify-between text-[10px] mono uppercase tracking-[0.12em] text-ink-3 mt-3">
            <span>{t.form.sliderLow}</span>
            <span>{t.form.sliderHigh}</span>
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={fieldClass}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error && (
        <p
          id={errorId}
          className="mt-2 mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--field-error)" }}
        >
          ⚠ {error}
        </p>
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
