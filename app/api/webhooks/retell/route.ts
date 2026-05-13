import { execSync } from 'child_process';
import type { NextRequest } from 'next/server';
import { analyzeTranscript } from '@/lib/claude';
import { createAssessment, updateAssessment } from '@/lib/storage';
import type { Assessment } from '@/types/report';

export const runtime = 'nodejs';

interface RetellUtterance {
  role?: string;
  speaker?: string;
  content?: string;
  text?: string;
  message?: string;
}

interface RetellCallPayload {
  call_id?: string;
  transcript?: string;
  transcript_object?: RetellUtterance[];
  metadata?: Record<string, unknown>;
}

interface RetellWebhookBody {
  event?: string;
  call?: RetellCallPayload;
  // Some Retell payloads put fields at the top level
  call_id?: string;
  transcript?: string;
  transcript_object?: RetellUtterance[];
  metadata?: Record<string, unknown>;
}

function buildTranscript(call: RetellCallPayload): string {
  if (Array.isArray(call.transcript_object) && call.transcript_object.length > 0) {
    return call.transcript_object
      .map((u) => {
        const speaker = u.role ?? u.speaker ?? 'Speaker';
        const text = u.content ?? u.text ?? u.message ?? '';
        return `${speaker}: ${text}`;
      })
      .filter((line) => line.trim() !== '' && !line.endsWith(': '))
      .join('\n');
  }
  return (call.transcript ?? '').trim();
}

function pickString(meta: Record<string, unknown> | undefined, ...keys: string[]): string | undefined {
  if (!meta) return undefined;
  for (const k of keys) {
    const v = meta[k];
    if (typeof v === 'string' && v.trim() !== '') return v.trim();
  }
  return undefined;
}

function postSlack(message: string): void {
  try {
    execSync(
      `openclaw message send --channel slack --target 'channel:C0B08HRFA75' --message ${JSON.stringify(message)}`,
      { stdio: 'pipe' },
    );
  } catch (err) {
    console.error('[retell webhook] Slack notify failed:', err);
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: RetellWebhookBody;
  try {
    body = (await request.json()) as RetellWebhookBody;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const call: RetellCallPayload = body.call ?? {
    call_id: body.call_id,
    transcript: body.transcript,
    transcript_object: body.transcript_object,
    metadata: body.metadata,
  };

  const transcript = buildTranscript(call);
  if (!transcript) {
    return Response.json({ error: 'No transcript in payload' }, { status: 400 });
  }

  const meta = call.metadata;
  const clientName = pickString(meta, 'clientName', 'client_name', 'name') ?? 'Unknown Client';
  const clientEmail = pickString(meta, 'clientEmail', 'client_email', 'email') ?? '';
  const clientPhone = pickString(meta, 'clientPhone', 'client_phone', 'phone');
  const businessType = pickString(meta, 'businessType', 'business_type');

  const assessment: Assessment = await createAssessment({
    clientName,
    clientEmail,
    clientPhone,
    businessType,
    callId: call.call_id,
    transcript,
    status: 'transcript_received',
  });

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        ok: true,
        assessmentId: assessment.id,
        warning: 'ANTHROPIC_API_KEY not configured — transcript stored but not analyzed',
      },
      { status: 200 },
    );
  }

  try {
    const analysis = await analyzeTranscript(transcript);
    await updateAssessment(assessment.id, {
      analysis,
      status: 'analyzed',
    });

    const summary = analysis.executiveSummary[0] ?? '(no summary)';
    const score = analysis.aiReadinessScore.overall;
    const topWin = analysis.quickWins[0]?.title ?? '(no quick wins)';
    const slackMsg = [
      `:bell: New AI assessment ready for review`,
      `*Client:* ${assessment.clientName} (${assessment.clientEmail || 'no email'})`,
      `*Business snapshot:* ${summary}`,
      `*AI readiness score:* ${score}/100`,
      `*Top quick win:* ${topWin}`,
      `*Assessment ID:* \`${assessment.id}\``,
      `Reply \`approve ${assessment.id}\` to generate and send the PDF report to ${assessment.clientEmail || '<missing email>'}.`,
    ].join('\n');
    postSlack(slackMsg);

    return Response.json({ ok: true, assessmentId: assessment.id, status: 'analyzed' }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[retell webhook] analysis failed:', err);
    return Response.json(
      { ok: true, assessmentId: assessment.id, warning: `Analysis failed: ${message}` },
      { status: 200 },
    );
  }
}
