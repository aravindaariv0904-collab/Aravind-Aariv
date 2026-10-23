import React, { useState } from 'react';
import { 
  Mail, 
  Globe, 
  Send, 
  FileDown, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    // Construct mailto URL as reliable direct fallback
    const mailSubject = encodeURIComponent(
      `[Portfolio Inquiry] ${formState.subject || 'Engineering Collaboration'} from ${formState.name}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailSubject}&body=${mailBody}`;
    setSubmitted(true);
    setError('');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-cyan" />
            <span>DIRECT ENGAGEMENT</span>
          </div>
          <h2 className="section-heading-text">
            Let's Build Something <span className="gradient-text-indigo">Meaningful</span>
          </h2>
          <p className="section-subheading-text">
            I'm interested in AI engineering, software development, applied research, technical collaboration, and opportunities to build practical AI-powered systems.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Left Column: Direct Verified Channels */}
          <div className="contact-info-card">
            <h3 className="contact-card-title">Verified Contact Channels</h3>
            <p className="contact-card-desc">
              Whether you have an inquiry about my research platforms, an internship opportunity, or technical collaboration, feel free to reach out directly.
            </p>

            <div className="channels-list">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="channel-item email"
              >
                <div className="channel-icon-box">
                  <Mail size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Direct Email</span>
                  <span className="channel-value">{PERSONAL_INFO.email}</span>
                </div>
              </a>

              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="channel-item linkedin"
              >
                <div className="channel-icon-box">
                  <LinkedinIcon size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">LinkedIn Profile</span>
                  <span className="channel-value">vejandla-aravind-aariv</span>
                </div>
              </a>

              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer" 
                className="channel-item github"
              >
                <div className="channel-icon-box">
                  <GithubIcon size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">GitHub Workspace</span>
                  <span className="channel-value">aravindaariv0904-collab</span>
                </div>
              </a>

              <a 
                href={PERSONAL_INFO.portfolioUrl} 
                className="channel-item web"
              >
                <div className="channel-icon-box">
                  <Globe size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Production Deployment</span>
                  <span className="channel-value">aravind-aariv.netlify.app</span>
                </div>
              </a>
            </div>

            <div className="contact-resume-block">
              <a 
                href={PERSONAL_INFO.resumePdfUrl} 
                download="Vejandla_Aravind_Aariv_Resume.pdf"
                className="btn-contact-resume"
              >
                <FileDown size={18} />
                <span>Download Canonical Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="contact-form-card">
            <h3 className="contact-card-title">Send a Direct Technical Message</h3>
            <p className="contact-card-desc">
              Submitting launches your email client pre-filled with this inquiry for immediate delivery.
            </p>

            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 size={32} className="text-emerald" />
                <h4 className="success-title">Draft Initialized!</h4>
                <p className="success-desc">
                  Your default mail client has opened with your inquiry addressed to <strong>{PERSONAL_INFO.email}</strong>.
                </p>
                <button
                  type="button"
                  className="btn-reset-form"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
                {error && (
                  <div className="form-error-banner">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-row dual">
                  <div className="form-field">
                    <label htmlFor="name" className="field-label">
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sarah Jenkins"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="field-label">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="e.g. s.jenkins@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject" className="field-label">
                    Subject / Discussion Topic
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="form-input"
                    placeholder="e.g. SDE / AI Engineer Internship Opportunity"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="field-label">
                    Message Details *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="form-textarea"
                    placeholder="Describe your project, role opportunity, or technical collaboration..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn-submit-inquiry">
                  <Send size={16} />
                  <span>Send Technical Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
