import type { NextRequest } from 'next/server';
import { analyzeTranscript } from '@/lib/claude';
import { getAssessment, updateAssessment } from '@/lib/storage';

export const runtime = 'nodejs';

interface AnalyzeBody {
  assessmentId?: string;
  transcript?: string;
  clientName?: string;
  clientEmail?: string;
}

export async function POST(request: NextRequest): Promise<Response> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: 'ANTHROPIC_API_KEY not configured' },
      { status: 503 },
    );
  }

  let body: AnalyzeBody;
  try {
    body = (await request.json()) as AnalyzeBody;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body.assessmentId) {
    const existing = await getAssessment(body.assessmentId);
    if (!existing) {
      return Response.json({ error: 'Assessment not found' }, { status: 404 });
    }
    const transcript = body.transcript ?? existing.transcript;
    if (!transcript) {
      return Response.json({ error: 'No transcript on assessment' }, { status: 400 });
    }
    const analysis = await analyzeTranscript(transcript);
    const updated = await updateAssessment(existing.id, {
      analysis,
      status: 'analyzed',
    });
    return Response.json({ assessmentId: updated.id, analysis }, { status: 200 });
  }

  if (body.transcript) {
    const analysis = await analyzeTranscript(body.transcript);
    return Response.json({ analysis }, { status: 200 });
  }

  return Response.json(
    { error: 'Provide either assessmentId or transcript' },
    { status: 400 },
  );
}
