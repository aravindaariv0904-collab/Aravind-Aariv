import nodemailer from 'nodemailer';

interface HandlerEvent {
  httpMethod: string;
  path?: string;
  headers: Record<string, string | undefined>;
  body: string | null;
  isBase64Encoded?: boolean;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

/**
 * Escapes characters for safe inclusion in HTML email bodies.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Netlify Serverless Function: contact
 * Secure SMTP email delivery for portfolio visitor inquiries.
 */
export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // 1. Enforce POST HTTP method only
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST',
      },
      body: JSON.stringify({
        ok: false,
        error: 'Method Not Allowed. Only POST requests are permitted.',
      }),
    };
  }

  // 2. Enforce request size limit (max 64 KB)
  if (!event.body || event.body.length > 65536) {
    return {
      statusCode: 413,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        error: 'Payload Too Large. Inquiries must be under 64 KB.',
      }),
    };
  }

  // 3. Parse JSON or URL-encoded payload safely
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(event.body);
  } catch {
    try {
      const params = new URLSearchParams(event.body);
      payload = Object.fromEntries(params.entries());
    } catch {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ok: false,
          error: 'Malformed request payload. Expected JSON or URL-encoded body.',
        }),
      };
    }
  }

  // 4. Honeypot check for spam prevention
  const botField = typeof payload['bot-field'] === 'string' 
    ? payload['bot-field'] 
    : typeof payload.botField === 'string' 
      ? payload.botField 
      : '';

  if (botField.trim() !== '') {
    // Automated bot detected via honeypot trap. Silently accept to thwart bot scrapers.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        message: 'Inquiry received for processing.',
      }),
    };
  }

  // 5. Extract and normalize fields
  const rawName = typeof payload.name === 'string' ? payload.name.trim() : '';
  const rawEmail = typeof payload.email === 'string' ? payload.email.trim() : '';
  const rawSubject = typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const rawMessage = typeof payload.message === 'string' ? payload.message.trim() : '';

  // 6. Server-side validations with strict limits
  if (!rawName) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Your name is required.' }),
    };
  }
  if (rawName.length > 120) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Name must not exceed 120 characters.' }),
    };
  }

  if (!rawEmail) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Your email address is required.' }),
    };
  }
  if (rawEmail.length > 254) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Email address must not exceed 254 characters.' }),
    };
  }

  // RFC 5322 regex validation enforcing valid TLD
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(rawEmail)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Please enter a valid email address with a domain (e.g., name@domain.com).' }),
    };
  }

  if (rawSubject.length > 200) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Subject must not exceed 200 characters.' }),
    };
  }

  if (!rawMessage) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Message content is required.' }),
    };
  }
  if (rawMessage.length < 10) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Message must be at least 10 characters long.' }),
    };
  }
  if (rawMessage.length > 5000) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Message must not exceed 5000 characters.' }),
    };
  }

  // 7. Header Injection Prevention (Strip CRLF from single-line headers)
  const cleanName = rawName.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ');
  const cleanEmail = rawEmail.replace(/[\r\n\t]/g, '').trim();
  const cleanSubject = (rawSubject || 'Portfolio Engineering Collaboration Inquiry')
    .replace(/[\r\n\t]/g, ' ')
    .replace(/\s+/g, ' ');

  // 8. Read SMTP credentials from environment
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpSecure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : smtpPort === 465;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'aariv948@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || (smtpUser ? `"Portfolio Contact" <${smtpUser}>` : `"Portfolio Contact" <${toEmail}>`);

  // Verify SMTP credentials presence
  if (!smtpUser || !smtpPass) {
    console.warn('[Contact Function] SMTP_USER or SMTP_PASS environment variables are not set.');
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        error: 'SMTP email delivery is not configured on this server. Please use the direct email fallback to contact aariv948@gmail.com.',
        missingConfig: true,
      }),
    };
  }

  // 9. Build email content
  const now = new Date();
  const utcTimestamp = now.toUTCString();
  const istTimestamp = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(now);

  const plainTextBody = `
New Portfolio Contact Inquiry
============================================================

Sender:     ${cleanName}
Email:      ${cleanEmail}
Subject:    ${cleanSubject}
Date (UTC): ${utcTimestamp}
Date (IST): ${istTimestamp}

Message Body:
------------------------------------------------------------
${rawMessage}
------------------------------------------------------------

Direct Action:
Reply to this email to respond directly to ${cleanName} at ${cleanEmail}.
============================================================
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #04060c; color: #f1f5f9;">
  <div style="max-width: 620px; margin: 0 auto; background: #0b101e; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #131b2e 0%, #0b101e 100%); padding: 24px 28px; border-bottom: 1px solid #1e293b;">
      <span style="display: inline-block; padding: 4px 10px; background: rgba(163, 230, 53, 0.12); color: #a3e635; font-family: monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; border-radius: 999px; text-transform: uppercase;">
        ⚡ Portfolio Inquiry
      </span>
      <h2 style="margin: 12px 0 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.01em;">
        ${escapeHtml(cleanSubject)}
      </h2>
    </div>

    <!-- Metadata Table -->
    <div style="padding: 24px 28px; background: rgba(15, 23, 42, 0.4); border-bottom: 1px solid #1e293b;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
        <tr>
          <td style="padding: 6px 0; color: #94a3b8; width: 110px; font-weight: 600;">From:</td>
          <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Email:</td>
          <td style="padding: 6px 0;">
            <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #38bdf8; text-decoration: none; font-weight: 500;">
              ${escapeHtml(cleanEmail)}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Timestamp:</td>
          <td style="padding: 6px 0; color: #cbd5e1; font-size: 12.5px; font-family: monospace;">
            ${escapeHtml(istTimestamp)} (IST)
          </td>
        </tr>
      </table>
    </div>

    <!-- Message Content -->
    <div style="padding: 28px;">
      <h3 style="margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #a3e635; font-family: monospace;">
        Message Content
      </h3>
      <div style="background: #060913; padding: 20px; border-radius: 10px; border: 1px solid #1e293b; color: #e2e8f0; font-size: 14.5px; line-height: 1.65; white-space: pre-wrap; word-break: break-word;">
${escapeHtml(rawMessage)}
      </div>

      <!-- Action Button -->
      <div style="margin-top: 24px; text-align: left;">
        <a href="mailto:${escapeHtml(cleanEmail)}?subject=${encodeURIComponent('Re: ' + cleanSubject)}"
           style="display: inline-block; background: #a3e635; color: #04060c; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-size: 13.5px; font-weight: 700; letter-spacing: 0.02em;">
          Reply to ${escapeHtml(cleanName)}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 28px; background: #060913; border-top: 1px solid #1e293b; font-size: 11.5px; color: #64748b; font-family: monospace;">
      Vejandla Aravind Aariv Portfolio · Automated SMTP Service · Recipient: ${escapeHtml(toEmail)}
    </div>
  </div>
</body>
</html>
`.trim();

  // 10. Transmit via Nodemailer
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `[Portfolio Inquiry] ${cleanSubject}`,
      text: plainTextBody,
      html: htmlBody,
    });

    // Avoid logging sensitive contents, log only provider response code/id
    console.log('[Contact Function] Message dispatched via SMTP. Response messageId:', info.messageId);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        message: 'Message submitted successfully and queued for direct delivery.',
      }),
    };
  } catch (err: unknown) {
    const errorObj = err as { code?: string; message?: string };
    console.error('[Contact Function] SMTP delivery failed:', errorObj.code || 'UNKNOWN_SMTP_ERROR');

    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        error: 'Failed to deliver message through SMTP provider. Please try again or use direct email fallback.',
        code: errorObj.code || 'SMTP_DISPATCH_FAILED',
      }),
    };
  }
};

export default handler;
