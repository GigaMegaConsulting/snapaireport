import { Resend } from 'resend';

interface SendReportEmailParams {
  to: string;
  clientName: string;
  assessmentId: string;
  pdfBuffer: Buffer;
}

export async function sendReportEmail({
  to,
  clientName,
  pdfBuffer,
}: SendReportEmailParams): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0f172a;">Your AI Business Assessment is Ready</h1>
      <p>Hi ${clientName},</p>
      <p>Thank you for completing your AI readiness call. Your personalized assessment report is attached to this email.</p>
      <p>The report covers:</p>
      <ul>
        <li>Your AI Readiness Score</li>
        <li>Top 3 Quick Wins you can implement in 30 days</li>
        <li>Strategic AI opportunities for 6&ndash;12 months</li>
        <li>Specific tool recommendations with pricing</li>
        <li>Risk flags and how to address them</li>
      </ul>
      <p>I recommend reviewing the Quick Wins section first &mdash; those are the high-ROI, low-effort moves you can start this week.</p>
      <p style="margin-top: 32px;">
        <a href="https://cal.com/gigamega/ai-assessment" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Book Your Review Call &rarr;
        </a>
      </p>
      <p style="margin-top: 24px; color: #64748b; font-size: 14px;">
        On the call, we'll walk through the report together and identify which opportunity to tackle first. Most clients leave with a clear 90-day AI roadmap.<br><br>
        &mdash; Giga<br>
        SnapReport · snapaireport.com<br>
        Giga Mega Consulting Inc.
      </p>
    </div>
  `;

  // Sender uses info@snapaireport.com (forwarded to hello@gigamega.ca via Namecheap).
  // Domain must be verified in Resend (DKIM/SPF/DMARC records in Namecheap) before delivery works.
  const fromAddress = process.env.RESEND_FROM ?? 'SnapReport <info@snapaireport.com>';

  const result = await resend.emails.send({
    from: fromAddress,
    replyTo: 'info@snapaireport.com',
    to,
    subject: 'Your AI Business Assessment Report',
    html,
    attachments: [
      {
        filename: `AI-Assessment-${clientName.replace(/\s+/g, '-')}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }
}
