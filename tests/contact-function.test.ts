import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { handler } from '../netlify/functions/contact.ts';

describe('Netlify Contact Serverless Function (SMTP Delivery)', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_SECURE;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('HTTP Method & Payload Size Guardrails', () => {
    it('should reject GET requests with 405 Method Not Allowed', async () => {
      const res = await handler({
        httpMethod: 'GET',
        headers: {},
        body: null,
      });

      assert.equal(res.statusCode, 405);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, false);
      assert.match(data.error, /Method Not Allowed/i);
      assert.equal(res.headers?.Allow, 'POST');
    });

    it('should reject PUT / DELETE requests with 405', async () => {
      const res = await handler({
        httpMethod: 'PUT',
        headers: {},
        body: JSON.stringify({ name: 'Test' }),
      });

      assert.equal(res.statusCode, 405);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, false);
    });

    it('should reject empty request bodies with 413 Payload Too Large', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: null,
      });

      assert.equal(res.statusCode, 413);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, false);
      assert.match(data.error, /Payload Too Large/i);
    });

    it('should reject payloads exceeding 64 KB with 413', async () => {
      const giantMessage = 'A'.repeat(66000);
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({ message: giantMessage }),
      });

      assert.equal(res.statusCode, 413);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, false);
    });
  });

  describe('Spam Honeypot Verification', () => {
    it('should silently return 200 without sending email if bot-field is populated', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          'bot-field': 'spambot_trap_value',
          name: 'Bot Spammer',
          email: 'spammer@bot.org',
          message: 'Buy cheap watches now!',
        }),
      });

      assert.equal(res.statusCode, 200);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, true);
      assert.match(data.message, /Inquiry received/i);
    });

    it('should silently return 200 if camelCase botField is populated', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          botField: 'sneaky-bot',
          name: 'Bot Spammer',
          email: 'spammer@bot.org',
          message: 'Buy crypto now!',
        }),
      });

      assert.equal(res.statusCode, 200);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, true);
    });
  });

  describe('Server-Side Input Validation', () => {
    it('should reject missing name', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          name: '',
          email: 'visitor@example.com',
          message: 'Hello! Interested in collaborating.',
        }),
      });

      assert.equal(res.statusCode, 400);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, false);
      assert.match(data.error, /name is required/i);
    });

    it('should reject names longer than 120 characters', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          name: 'A'.repeat(121),
          email: 'visitor@example.com',
          message: 'Hello! Interested in collaborating.',
        }),
      });

      assert.equal(res.statusCode, 400);
      const data = JSON.parse(res.body);
      assert.match(data.error, /Name must not exceed 120 characters/i);
    });

    it('should reject missing email', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          name: 'Alex Johnson',
          email: '',
          message: 'Hello! Interested in collaborating.',
        }),
      });

      assert.equal(res.statusCode, 400);
      const data = JSON.parse(res.body);
      assert.match(data.error, /email address is required/i);
    });

    it('should reject emails with single-character TLDs or invalid format', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          name: 'Alex Johnson',
          email: 'visitor@company.c', // invalid 1-letter TLD
          message: 'Hello! Interested in collaborating.',
        }),
      });

      assert.equal(res.statusCode, 400);
      const data = JSON.parse(res.body);
      assert.match(data.error, /valid email address with a domain/i);
    });

    it('should reject messages shorter than 10 characters', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          name: 'Alex Johnson',
          email: 'alex@example.com',
          message: 'Hi', // too short
        }),
      });

      assert.equal(res.statusCode, 400);
      const data = JSON.parse(res.body);
      assert.match(data.error, /at least 10 characters long/i);
    });

    it('should reject messages exceeding 5000 characters', async () => {
      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          name: 'Alex Johnson',
          email: 'alex@example.com',
          message: 'Z'.repeat(5001),
        }),
      });

      assert.equal(res.statusCode, 400);
      const data = JSON.parse(res.body);
      assert.match(data.error, /must not exceed 5000 characters/i);
    });
  });

  describe('Missing SMTP Credentials Graceful Degradation', () => {
    it('should return 503 with fallback guidance if SMTP credentials are missing in env', async () => {
      delete process.env.SMTP_USER;
      delete process.env.SMTP_PASS;

      const res = await handler({
        httpMethod: 'POST',
        headers: {},
        body: JSON.stringify({
          name: 'Jane Smith',
          email: 'jane@enterprise.org',
          subject: 'AI Agent Architecture',
          message: 'Would love to discuss your portfolio projects and modern architecture.',
        }),
      });

      assert.equal(res.statusCode, 503);
      const data = JSON.parse(res.body);
      assert.equal(data.ok, false);
      assert.equal(data.missingConfig, true);
      assert.match(data.error, /SMTP email delivery is not configured on this server/i);
      assert.match(data.error, /aariv948@gmail\.com/);
    });
  });

  describe('Mocked SMTP Delivery and Header Sanitization', () => {
    it('should sanitize CRLF header injections and deliver email safely', async () => {
      process.env.SMTP_USER = 'mock_sender@gmail.com';
      process.env.SMTP_PASS = 'mock_secret_app_password_16ch';
      process.env.SMTP_HOST = 'smtp.gmail.com';
      process.env.SMTP_PORT = '465';
      process.env.CONTACT_TO_EMAIL = 'aariv948@gmail.com';

      let capturedMailOptions: any = null;
      let capturedTransporterConfig: any = null;

      // Mock nodemailer
      const originalCreateTransport = nodemailer.createTransport;
      (nodemailer as any).createTransport = (config: any) => {
        capturedTransporterConfig = config;
        return {
          sendMail: async (mailOptions: any) => {
            capturedMailOptions = mailOptions;
            return {
              messageId: '<mock-message-id-12345@smtp.gmail.com>',
              response: '250 2.0.0 OK queued',
            };
          },
        };
      };

      try {
        const maliciousPayload = {
          name: 'Hacker\r\nBcc: evil@darkweb.org\r\n',
          email: 'visitor@company.com\r\n',
          subject: 'Legit Subject\r\nCc: spam@victim.com',
          message: '<script>alert("xss")</script>\nLet\'s discuss AI models & APIs & "more"!',
        };

        const res = await handler({
          httpMethod: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(maliciousPayload),
        });

        assert.equal(res.statusCode, 200);
        const data = JSON.parse(res.body);
        assert.equal(data.ok, true);
        assert.match(data.message, /Message submitted successfully/i);

        // Verify transporter security configuration
        assert.equal(capturedTransporterConfig.host, 'smtp.gmail.com');
        assert.equal(capturedTransporterConfig.port, 465);
        assert.equal(capturedTransporterConfig.secure, true);
        assert.equal(capturedTransporterConfig.tls?.rejectUnauthorized, true);
        assert.equal(capturedTransporterConfig.auth?.user, 'mock_sender@gmail.com');
        assert.equal(capturedTransporterConfig.auth?.pass, 'mock_secret_app_password_16ch');

        // Verify header injection sanitization
        assert.ok(capturedMailOptions);
        assert.equal(capturedMailOptions.to, 'aariv948@gmail.com');
        assert.doesNotMatch(capturedMailOptions.subject, /[\r\n]/);
        assert.match(capturedMailOptions.subject, /\[Portfolio Inquiry\] Legit Subject Cc: spam@victim\.com/);
        assert.doesNotMatch(capturedMailOptions.replyTo, /[\r\n]/);
        assert.equal(capturedMailOptions.replyTo, '"Hacker Bcc: evil@darkweb.org" <visitor@company.com>');

        // Verify HTML escaping prevents XSS injection in email client
        assert.ok(capturedMailOptions.html.includes('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'));
        assert.ok(!capturedMailOptions.html.includes('<script>'));
      } finally {
        (nodemailer as any).createTransport = originalCreateTransport;
      }
    });

    it('should return 502 Bad Gateway if SMTP provider rejects the credentials/connection', async () => {
      process.env.SMTP_USER = 'aariv948@gmail.com';
      process.env.SMTP_PASS = 'invalid_password';

      const originalCreateTransport = nodemailer.createTransport;
      (nodemailer as any).createTransport = () => {
        return {
          sendMail: async () => {
            const err: any = new Error('Invalid login: 535-5.7.8 Username and Password not accepted');
            err.code = 'EAUTH';
            throw err;
          },
        };
      };

      try {
        const res = await handler({
          httpMethod: 'POST',
          headers: {},
          body: JSON.stringify({
            name: 'Valid User',
            email: 'user@example.com',
            message: 'Hello! Testing error propagation from SMTP provider.',
          }),
        });

        assert.equal(res.statusCode, 502);
        const data = JSON.parse(res.body);
        assert.equal(data.ok, false);
        assert.equal(data.code, 'EAUTH');
        assert.match(data.error, /Failed to deliver message through SMTP provider/i);
      } finally {
        (nodemailer as any).createTransport = originalCreateTransport;
      }
    });
  });
});
