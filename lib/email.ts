import { Resend } from 'resend';
import { getMessages, type Locale } from '@/lib/i18n';

interface SendReportEmailParams {
  to: string;
  clientName: string;
  assessmentId: string;
  pdfBuffer: Buffer;
  locale?: Locale;
}

export async function sendReportEmail({
  to,
  clientName,
  pdfBuffer,
  locale = 'en',
}: SendReportEmailParams): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const t = getMessages(locale).email;

  const bulletsHtml = t.bullets.map((b) => `<li>${b}</li>`).join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0f172a;">${t.heading}</h1>
      <p>${t.greeting} ${clientName},</p>
      <p>${t.intro}</p>
      <ul>${bulletsHtml}</ul>
      <p><strong>${t.tipPrefix}</strong>${t.tipBody}</p>
      <p style="margin-top: 32px;">
        <a href="https://cal.com/gigamega/ai-assessment" style="background: #1a4d3a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          ${t.ctaLabel}
        </a>
      </p>
      <p style="margin-top: 24px; color: #64748b; font-size: 14px;">
        ${t.closing}<br><br>
        &mdash; ${t.signature}<br>
        SnapReport · snapaireport.com<br>
        ${t.sigCompany}
      </p>
    </div>
  `;

  // Sender uses info@snapaireport.com (forwarded to hello@gigamega.ca via Namecheap).
  const fromAddress =
    process.env.RESEND_FROM ?? 'SnapReport <info@snapaireport.com>';

  const result = await resend.emails.send({
    from: fromAddress,
    replyTo: t.sigEmail,
    to,
    subject: t.subject,
    html,
    attachments: [
      {
        filename: `SnapReport-${clientName.replace(/\s+/g, '-')}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }
}
