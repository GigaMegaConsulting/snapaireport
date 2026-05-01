import { promises as fs } from 'fs';
import path from 'path';
import type { NextRequest } from 'next/server';
import { sendReportEmail } from '@/lib/email';
import { generatePDF } from '@/lib/pdf';
import { getAssessment, updateAssessment } from '@/lib/storage';

export const runtime = 'nodejs';

interface SendBody {
  assessmentId?: string;
}

const PDF_DIR = path.join(process.cwd(), 'data', 'assessments');

async function loadOrGeneratePdf(
  id: string,
  clientName: string,
  analysisFallback: Parameters<typeof generatePDF>[0],
): Promise<Buffer> {
  const pdfPath = path.join(PDF_DIR, `${id}.pdf`);
  try {
    return await fs.readFile(pdfPath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }
  const buf = await generatePDF(analysisFallback, clientName);
  await fs.mkdir(PDF_DIR, { recursive: true });
  await fs.writeFile(pdfPath, buf);
  return buf;
}

export async function POST(request: NextRequest): Promise<Response> {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: 'RESEND_API_KEY not configured' },
      { status: 503 },
    );
  }

  let body: SendBody;
  try {
    body = (await request.json()) as SendBody;
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
  if (!assessment.clientEmail) {
    return Response.json({ error: 'Assessment has no clientEmail' }, { status: 400 });
  }
  if (!assessment.analysis) {
    return Response.json(
      { error: 'Assessment has no analysis yet — run /api/analyze first' },
      { status: 400 },
    );
  }
  if (assessment.status !== 'pdf_generated' && assessment.status !== 'approved') {
    return Response.json(
      {
        error: `Assessment status must be 'pdf_generated' or 'approved' to send (current: ${assessment.status})`,
      },
      { status: 400 },
    );
  }

  const pdfBuffer = await loadOrGeneratePdf(
    assessment.id,
    assessment.clientName,
    assessment.analysis,
  );

  await sendReportEmail({
    to: assessment.clientEmail,
    clientName: assessment.clientName,
    assessmentId: assessment.id,
    pdfBuffer,
  });

  const updated = await updateAssessment(assessment.id, { status: 'sent' });

  return Response.json(
    { success: true, assessmentId: updated.id, status: updated.status },
    { status: 200 },
  );
}
