import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  CheckCircle,
  FileCheck2
} from 'lucide-react';
import { PERSONAL_INFO, ABOUT_TEXT } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-cyan" />
            <span>BACKGROUND & VISION</span>
          </div>
          <h2 className="section-heading-text">
            {ABOUT_TEXT.heading}
          </h2>
          <p className="section-subheading-text">
            Architecting technically rigorous AI systems from exploratory algorithms to production deployment.
          </p>
        </div>

        <div className="about-grid-layout">
          {/* Left Column: Personal Verified Card */}
          <div className="about-profile-card">
            <div className="about-card-banner"></div>
            <div className="about-card-body">
              <div className="about-avatar-ring">
                <span className="about-avatar-initials">AA</span>
              </div>
              <h3 className="about-profile-name">{PERSONAL_INFO.name}</h3>
              <p className="about-profile-title">{PERSONAL_INFO.title}</p>

              <div className="about-profile-meta-list">
                <div className="meta-item">
                  <MapPin size={16} className="text-cyan" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="meta-item">
                  <GraduationCap size={16} className="text-violet" />
                  <span>{PERSONAL_INFO.institution} (B.Tech '29)</span>
                </div>
                <div className="meta-item">
                  <Briefcase size={16} className="text-emerald" />
                  <span>AI Intern @ XTRAGRAD (Jul 2026–Present)</span>
                </div>
                <div className="meta-item">
                  <Mail size={16} className="text-amber" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-link">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="about-card-cta">
                <a 
                  href={PERSONAL_INFO.resumePdfUrl} 
                  download="Vejandla_Aravind_Aariv_Resume.pdf"
                  className="btn-about-resume"
                >
                  <FileCheck2 size={16} />
                  <span>Verified Resume PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & Focus Areas */}
          <div className="about-narrative-card">
            <div className="narrative-content">
              {ABOUT_TEXT.paragraphs.map((para, idx) => (
                <p key={idx} className="about-narrative-p">
                  {para}
                </p>
              ))}
            </div>

            <div className="about-focus-block">
              <h4 className="focus-heading">Core Engineering Focus</h4>
              <div className="focus-pills-wrap">
                {ABOUT_TEXT.focusPills.map((pill, i) => (
                  <div key={i} className="focus-pill-item">
                    <CheckCircle size={14} className="text-cyan" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
