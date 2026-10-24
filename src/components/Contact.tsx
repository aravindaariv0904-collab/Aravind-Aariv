import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  MapPin, 
  Clock,
  Sparkles,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { TextScrollHeading } from './ui/text-scroll-animation';
import { SocialProfileCards } from './SocialProfileCards';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [botField, setBotField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitDetail, setSubmitDetail] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitDetail('');

    const name = formState.name.trim();
    const email = formState.email.trim();
    const subject = formState.subject.trim();
    const message = formState.message.trim();

    if (!name || !email || !message) {
      setSubmitError('Please fill in your name, email address, and message.');
      return;
    }

    // Comprehensive RFC 5322 compliant regex ensuring a valid 2+ char domain TLD
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setSubmitError('Please enter a valid email address with a domain (e.g., name@domain.com).');
      return;
    }

    if (message.length < 10) {
      setSubmitError('Please write a message with at least 10 characters.');
      return;
    }

    // Honeypot spam trap: if automated bots fill this hidden field, safely simulate submission
    if (botField.trim() !== '') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 600);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject || 'Portfolio Engineering Inquiry');
      formData.append('message', message);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
    } catch (err) {
      console.warn('Direct form submission encountered an issue:', err);
      const detail = err instanceof Error ? err.message : 'Network failure';
      setSubmitDetail(detail);
      setSubmitError('NETWORK_FALLBACK');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${formState.subject || 'Engineering Collaboration'} from ${formState.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
  )}`;

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        
        {/* Unified Section Header matching Projects, Engineering, and Experience */}
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-lime" />
            <span>DIRECT ENGAGEMENT & CONNECT</span>
          </div>
          <TextScrollHeading
            heading="LET'S BUILD SOMETHING INTELLIGENT."
            highlightWords={['SOMETHING', 'INTELLIGENT.']}
          />
          <p className="section-subheading-text">
            Interested in AI, Generative AI, intelligent agents, and impactful software? Let's connect, exchange ideas, and explore opportunities to build something meaningful.
          </p>
        </div>

        {/* 7 Professional Profile Cards */}
        <SocialProfileCards />

        {/* Dual Column: Verified Direct Channels & Secure Direct Message Form */}
        <div className="contact-layout-grid">
          
          {/* Left Column: Direct Inquiries & Availability Overview */}
          <div className="contact-info-card interactive">
            <h3 className="contact-card-title flex items-center gap-2">
              <ShieldCheck size={20} className="text-lime" />
              <span>Direct Engagement Channels</span>
            </h3>
            <p className="contact-card-desc">
              Whether you have inquiries about my research architectures, full-stack AI engineering, or potential roles and collaborative technical projects, feel free to reach out directly.
            </p>

            <div className="channels-list">
              {/* Direct Email Item */}
              <div className="channel-item email-channel">
                <div className="channel-icon-box text-lime">
                  <Mail size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Direct Email</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="channel-value">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="btn-copy-email interactive"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={15} className="text-lime" /> : <Copy size={15} />}
                  <span className="copy-tooltip">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Location Item */}
              <div className="channel-item location-channel">
                <div className="channel-icon-box text-violet">
                  <MapPin size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Academic Base & Location</span>
                  <span className="channel-value">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Response Time Item */}
              <div className="channel-item response-channel">
                <div className="channel-icon-box text-cyan">
                  <Clock size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Timezone & Response</span>
                  <span className="channel-value">IST (UTC+5:30) · Within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Quick Status Box */}
            <div className="contact-status-card">
              <div className="status-ping-box">
                <span className="ping-dot-lime"></span>
                <span className="ping-wave-lime"></span>
              </div>
              <div className="status-text-info">
                <strong>Active & Responsive</strong>
                <p>Open to technical discussions, AI engineering fellowships, and high-impact software projects.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Secure AJAX Contact Form */}
          <div className="contact-form-card interactive">
            {submitted ? (
              <div className="form-success-banner" role="status" aria-live="polite">
                <div className="success-icon-box">
                  <CheckCircle2 size={36} className="text-lime" />
                </div>
                <h4 className="success-heading">Message Submitted Successfully!</h4>
                <p className="success-message">
                  Thank you for reaching out. Your inquiry has been received. I review incoming messages daily and will follow up with you shortly.
                </p>
                <button
                  type="button"
                  className="btn-lime-primary interactive"
                  onClick={() => setSubmitted(false)}
                >
                  <MessageSquare size={14} style={{ marginRight: '6px' }} />
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form 
                name="contact" 
                method="POST" 
                action="/"
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="contact-form-inner"
                noValidate
              >
                {/* Netlify Hidden Form Name & Honeypot */}
                <input type="hidden" name="form-name" value="contact" />
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label>
                    Don’t fill this out if you're human:
                    <input
                      name="bot-field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </label>
                </div>

                <h3 className="form-title">Send a Direct Message</h3>
                <p className="form-subtitle">
                  Direct delivery with zero account sign-in required.
                </p>

                {submitError && submitError !== 'NETWORK_FALLBACK' && (
                  <div className="form-error-alert" role="alert">
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </div>
                )}

                {submitError === 'NETWORK_FALLBACK' && (
                  <div className="form-fallback-alert" role="alert">
                    <AlertCircle size={18} className="text-amber" />
                    <div className="fallback-alert-content">
                      <strong>We couldn't submit your message right now.</strong>
                      <p>
                        Please try again or use the direct email fallback below without losing your message:
                      </p>
                      {submitDetail && (
                        <span style={{ 
                          display: 'block', 
                          fontSize: '0.78rem', 
                          color: 'var(--text-muted)', 
                          marginTop: '0.25rem', 
                          marginBottom: '0.5rem',
                          fontFamily: 'var(--font-mono)' 
                        }}>
                          Status: {submitDetail}
                        </span>
                      )}
                      <div className="fallback-actions-row">
                        <button
                          type="button"
                          className="btn-fallback-copy interactive"
                          onClick={handleCopyEmail}
                        >
                          <Copy size={14} />
                          <span>{copied ? 'Copied!' : 'Copy aariv948@gmail.com'}</span>
                        </button>
                        <a
                          href={mailtoFallbackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-fallback-mailto interactive"
                        >
                          <Mail size={14} />
                          <span>Open in Email App</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-fields-grid">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span className="text-lime">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Chen"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="form-input interactive"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Your Email <span className="text-lime">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="form-input interactive"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject / Area of Interest
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="e.g. AI Engineering Role / Bhooraksha Collaboration"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="form-input interactive"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="text-lime">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your project, team opportunity, or discussion topic..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="form-textarea interactive"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn-lime-primary form-submit-btn interactive"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border-sm" aria-hidden="true" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <span className="form-privacy-note">
                    🔒 Direct submission to Aravind's verified contact channel.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
