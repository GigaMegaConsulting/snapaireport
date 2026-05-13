import { NextRequest, NextResponse } from "next/server";
import { analyzeTranscript } from "@/lib/claude";
import { createAssessment, updateAssessment } from "@/lib/storage";
import { generatePDF } from "@/lib/pdf";
import { sendReportEmail } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

interface FormAnswers {
  email?: string;
  fullName?: string;
  businessName?: string;
  businessDescription?: string;
  yearsOperating?: string;
  teamSize?: string;
  teamLocation?: string;
  operationsWalkthrough?: string;
  toolsInUse?: string;
  leadSources?: string;
  bottlenecks?: string;
  priorAiExperience?: string;
  techComfortScore?: string;
  twelveMonthGoals?: string;
  automationWish?: string;
}

const REQUIRED: (keyof FormAnswers)[] = [
  "email",
  "fullName",
  "businessName",
  "businessDescription",
  "yearsOperating",
  "teamSize",
  "teamLocation",
  "operationsWalkthrough",
  "toolsInUse",
  "leadSources",
  "bottlenecks",
  "priorAiExperience",
  "techComfortScore",
  "twelveMonthGoals",
  "automationWish",
];

function buildTranscript(a: FormAnswers): string {
  // Synthesize a Q&A transcript so the existing Claude prompt
  // (which expects discovery-call transcripts) works unchanged.
  const sections = [
    [
      "Q: What does your business do, and how long have you been operating?",
      `A: ${a.businessName} — ${a.businessDescription} They have been operating for ${a.yearsOperating}.`,
    ],
    [
      "Q: How many employees do you have, and are they local or remote?",
      `A: ${a.teamSize}. ${a.teamLocation}.`,
    ],
    [
      "Q: Walk me through your main day-to-day operations — what happens from when a customer reaches out to when you deliver?",
      `A: ${a.operationsWalkthrough}`,
    ],
    [
      "Q: What software or tools does your team use daily?",
      `A: ${a.toolsInUse}`,
    ],
    [
      "Q: Where do most of your leads or customers come from right now?",
      `A: ${a.leadSources}`,
    ],
    [
      "Q: What are your biggest bottlenecks — the things that slow you down or take too much time?",
      `A: ${a.bottlenecks}`,
    ],
    [
      "Q: Have you tried using AI or automation in your business before? What happened?",
      `A: ${a.priorAiExperience}`,
    ],
    [
      "Q: On a scale of 1–10, how comfortable is your team with new technology?",
      `A: ${a.techComfortScore}/10.`,
    ],
    [
      "Q: What does success look like for you in the next 12 months?",
      `A: ${a.twelveMonthGoals}`,
    ],
    [
      "Q: If you could automate one thing in your business tomorrow, what would it be?",
      `A: ${a.automationWish}`,
    ],
  ];
  return sections.map(([q, ans]) => `${q}\n${ans}`).join("\n\n");
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: FormAnswers;
  try {
    body = (await request.json()) as FormAnswers;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const missing = REQUIRED.filter((k) => !body[k] || String(body[k]).trim() === "");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const clientName = body.fullName!.trim();
  const clientEmail = body.email!.trim();
  const businessType = body.businessName!.trim();

  const transcript = buildTranscript(body);

  // 1. Persist the submission immediately so we never lose answers
  const assessment = await createAssessment({
    clientName,
    clientEmail,
    businessType,
    transcript,
    status: "transcript_received",
  });

  // If Claude isn't configured, return success with a warning — we still have the submission
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        ok: true,
        assessmentId: assessment.id,
        warning:
          "Submission received. Report generation is not yet configured — we'll process this manually and email you shortly.",
      },
      { status: 200 },
    );
  }

  try {
    // 2. Generate the analysis with Claude
    const analysis = await analyzeTranscript(transcript);
    await updateAssessment(assessment.id, { analysis, status: "analyzed" });

    // 3. If Resend isn't configured, stop here — the report exists, surface it manually
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          ok: true,
          assessmentId: assessment.id,
          warning: "Report analyzed but email delivery is not configured — we'll send it manually.",
        },
        { status: 200 },
      );
    }

    // 4. Generate the PDF
    const pdfBuffer = await generatePDF(analysis, clientName);
    await updateAssessment(assessment.id, { status: "pdf_generated" });

    // 5. Send the email with PDF attached
    await sendReportEmail({
      to: clientEmail,
      clientName,
      assessmentId: assessment.id,
      pdfBuffer,
    });
    await updateAssessment(assessment.id, { status: "sent" });

    return NextResponse.json(
      { ok: true, assessmentId: assessment.id, status: "sent" },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[submit-assessment] processing failed:", err);
    // Submission is already saved — return success but log the failure
    return NextResponse.json(
      {
        ok: true,
        assessmentId: assessment.id,
        warning: `Submission received, but report generation hit an error and will be retried manually: ${message}`,
      },
      { status: 200 },
    );
  }
}
