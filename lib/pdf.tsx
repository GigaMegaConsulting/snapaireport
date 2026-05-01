import ReactPDF from '@react-pdf/renderer';
import { ReportPDF } from '@/components/ReportPDF';
import type { ReportAnalysis } from '@/types/report';

export async function generatePDF(
  analysis: ReportAnalysis,
  clientName: string,
): Promise<Buffer> {
  return ReactPDF.renderToBuffer(<ReportPDF analysis={analysis} clientName={clientName} />);
}
