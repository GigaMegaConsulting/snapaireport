import { renderToBuffer } from '@react-pdf/renderer';
import { ReportPDF } from '@/components/ReportPDF';
import type { ReportAnalysis } from '@/types/report';
import type { Locale } from '@/lib/i18n';

export async function generatePDF(
  analysis: ReportAnalysis,
  clientName: string,
  locale: Locale = 'en',
): Promise<Buffer> {
  return renderToBuffer(
    <ReportPDF analysis={analysis} clientName={clientName} locale={locale} />,
  );
}
