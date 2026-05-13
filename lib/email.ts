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
  assessmentId,
  pdfBuffer,
  locale = 'en',
}: SendReportEmailParams): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const t = getMessages(locale).email;

  const bulletsHtml = t.bullets.map((b) => `<li>${b}</li>`).join('');

  const viewOnlineUrl = `https://snapaireport.com/r/${assessmentId}`;
  const viewOnlineLabel = locale === "fr" ? "Voir le rapport en ligne →" : "View the report online →";

  // CTA button: if a Cal.com (or other scheduling) URL is configured via the
  // SNAPAIREPORT_CAL_URL env var, the button becomes a Book-a-call CTA pointing
  // at it. Otherwise we fall back to a "Reply to this email" mailto so there's
  // always an action — useful while the Cal.com handle is still being set up.
  const calUrl = process.env.SNAPAIREPORT_CAL_URL?.trim();
  const ctaHref = calUrl
    ? calUrl
    : 'mailto:info@snapaireport.com?subject=Re:%20My%20SnapReport%20review';
  const ctaLabel = calUrl ? t.ctaBookLabel : t.ctaLabel;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0f172a;">${t.heading}</h1>
      <p>${t.greeting} ${clientName},</p>
      <p>${t.intro}</p>
      <ul>${bulletsHtml}</ul>
      <p><strong>${t.tipPrefix}</strong>${t.tipBody}</p>
      <p style="margin-top: 24px;">
        <a href="${viewOnlineUrl}" style="color: #1a4d3a; font-weight: 600;">${viewOnlineLabel}</a>
      </p>
      <p style="margin-top: 24px;">
        <a href="${ctaHref}" style="background: #1a4d3a; color: #faf8f1; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          ${ctaLabel}
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

  // Sender uses info@snapaireport.com (forwarded to the project owner via Namecheap).
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
