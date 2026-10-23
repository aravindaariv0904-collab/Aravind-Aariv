import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Award size={14} className="text-lime" />
            <span>CONTINUOUS LEARNING</span>
          </div>
          <h2 className="section-heading-text">
            Technical Certifications & <span className="text-lime">Verified Credentials</span>
          </h2>
          <p className="section-subheading-text">
            Official specializations, cloud skill badges, and verified assessments from Google, Microsoft, IBM, and Deloitte.
          </p>
        </div>

        <div className="certifications-grid">
          {CERTIFICATIONS.map((cert, idx) => (
            <div key={idx} className="cert-card">
              <div className="cert-card-header">
                <div className="cert-icon-wrap">
                  <ShieldCheck size={22} className="text-cyan" />
                </div>
                {cert.badge && <span className="cert-badge-tag">{cert.badge}</span>}
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>

              <div className="cert-footer">
                <CheckCircle2 size={14} className="text-emerald" />
                <span>Verified Credential</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
