import { promises as fs } from 'fs';
import path from 'path';
import type { NextRequest } from 'next/server';
import { generatePDF } from '@/lib/pdf';
import { getAssessment, updateAssessment } from '@/lib/storage';

export const runtime = 'nodejs';

interface GenerateBody {
  assessmentId?: string;
}

const PDF_DIR = path.join(process.cwd(), 'data', 'assessments');

export async function POST(request: NextRequest): Promise<Response> {
  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.assessmentId) {
    return Response.json({ error: 'assessmentId required' }, { status: 400 });
  }

  const assessment = await getAssessment(body.assessmentId);
  if (!assessment) {
    return Response.json({ error: 'Assessment not found' }, { status: 404 });
  }
  if (!assessment.analysis) {
    return Response.json(
      { error: 'Assessment has no analysis yet — run /api/analyze first' },
      { status: 400 },
    );
  }

  const pdfBuffer = await generatePDF(assessment.analysis, assessment.clientName);
  await fs.mkdir(PDF_DIR, { recursive: true });
  const pdfPath = path.join(PDF_DIR, `${assessment.id}.pdf`);
  await fs.writeFile(pdfPath, pdfBuffer);

  await updateAssessment(assessment.id, { status: 'pdf_generated' });

  return Response.json(
    { success: true, assessmentId: assessment.id, bytes: pdfBuffer.length },
    { status: 200 },
  );
}
