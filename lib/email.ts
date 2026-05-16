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
  //
  // When the Cal.com URL is set, we also prefill three fields via query params
  // so the customer lands on a booking page already populated:
  //   - name           (Cal.com built-in)
  //   - email          (Cal.com built-in)
  //   - assessment-id  (custom field; identifier must match in Cal.com setup,
  //                     with "Disable input if the URL identifier is prefilled"
  //                     turned ON so the field is locked.)
  const calUrl = process.env.SNAPAIREPORT_CAL_URL?.trim();
  const ctaHref = calUrl
    ? (() => {
        const params = new URLSearchParams({
          name: clientName,
          email: to,
          'assessment-id': assessmentId,
        });
        return `${calUrl}${calUrl.includes('?') ? '&' : '?'}${params.toString()}`;
      })()
    : 'mailto:info@snapaireport.com?subject=Re:%20My%20SnapReport%20review';
  const ctaLabel = calUrl ? t.ctaBookLabel : t.ctaLabel;

  // HTML version — kept simple so Gmail doesn't classify it as Promotions.
  // Heavy styling + green CTA buttons + bullet lists are well-known promo
  // signals. We keep one mild CTA button and otherwise lean on plain text.
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.55;">
      <p>${t.greeting} ${clientName},</p>
      <p>${t.intro}</p>
      <p>What's in your report:</p>
      <ul style="padding-left: 20px;">${bulletsHtml}</ul>
      <p>${t.tipPrefix}${t.tipBody}</p>
      <p style="margin-top: 20px;">
        <a href="${viewOnlineUrl}" style="color: #1a4d3a;">${viewOnlineLabel}</a>
      </p>
      <p style="margin-top: 12px;">
        <a href="${ctaHref}" style="display: inline-block; padding: 10px 18px; background: #1a4d3a; color: #faf8f1; text-decoration: none; border-radius: 4px;">${ctaLabel}</a>
      </p>
      <p style="margin-top: 24px; color: #525252; font-size: 14px;">
        ${t.closing}<br><br>
        &mdash; ${t.signature}<br>
        SnapReport &middot; snapaireport.com
      </p>
    </div>
  `;

  // Plaintext alternative — biggest single lever for landing in Primary
  // instead of Promotions. Gmail strongly favours multipart/alternative
  // emails over HTML-only.
  const text = [
    `${t.greeting} ${clientName},`,
    '',
    t.intro,
    '',
    "What's in your report:",
    ...t.bullets.map((b) => `  - ${b}`),
    '',
    `${t.tipPrefix}${t.tipBody}`,
    '',
    `${viewOnlineLabel.replace(/[→]/g, '->').replace(/\s*->\s*$/, '')}: ${viewOnlineUrl}`,
    `${ctaLabel.replace(/[→]/g, '->').replace(/\s*->\s*$/, '')}: ${ctaHref}`,
    '',
    t.closing,
    '',
    `— ${t.signature}`,
    'SnapReport · snapaireport.com',
  ].join('\n');

  // Sender uses info@snapaireport.com (forwarded to the project owner via Namecheap).
  const fromAddress =
    process.env.RESEND_FROM ?? 'SnapReport <info@snapaireport.com>';

  const result = await resend.emails.send({
    from: fromAddress,
    replyTo: t.sigEmail,
    to,
    subject: t.subject,
    html,
    text,
    // Help inbox providers classify this as transactional, not bulk marketing.
    // We don't have a real unsubscribe endpoint yet — the mailto reaches us.
    headers: {
      'List-Unsubscribe': '<mailto:info@snapaireport.com?subject=Unsubscribe>',
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
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
