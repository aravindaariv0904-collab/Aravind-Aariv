import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  CheckCircle,
  FileCheck2,
  Terminal,
  Quote
} from 'lucide-react';
import { PERSONAL_INFO, ABOUT_TEXT } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section position-relative">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-lime" />
            <span>BACKGROUND & VISION</span>
          </div>
          <h2 className="section-heading-text">
            About <span className="text-lime">Me</span>
          </h2>
          <p className="section-subheading-text">
            Architecting technically rigorous AI systems from exploratory algorithms to production deployment.
          </p>
        </div>

        <div className="about-grid-layout">
          {/* Left Column: Editorial Cinematic Photo Card */}
          <div className="about-editorial-visual">
            <div className="about-photo-wrapper">
              <img 
                src="/images/profile/aravind_about_cinematic.jpg" 
                alt="Aravind Aariv - AI Engineer & Researcher" 
                className="about-cinematic-img"
              />
              <div className="about-photo-overlay"></div>
              
              {/* Floating Quote Badge */}
              <div className="about-photo-quote">
                <Quote size={20} className="text-lime quote-icon" />
                <p>
                  "Building reliable AI systems that turn high-order mathematical concepts into practical, impactful software."
                </p>
                <span className="quote-author">— Aravind Aariv</span>
              </div>
            </div>

            {/* Quick Stats Pill Strip */}
            <div className="about-meta-strip">
              <div className="meta-strip-item">
                <MapPin size={16} className="text-lime" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="meta-strip-item">
                <GraduationCap size={16} className="text-cyan" />
                <span>Kalasalingam (CGPA 8.73)</span>
              </div>
              <div className="meta-strip-item">
                <Briefcase size={16} className="text-lime" />
                <span>AI Intern @ XTRAGRAD</span>
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
              <h4 className="focus-heading">
                <Terminal size={18} className="text-lime" />
                <span>Core Engineering Focus</span>
              </h4>
              <div className="focus-pills-wrap">
                {ABOUT_TEXT.focusPills.map((pill, i) => (
                  <div key={i} className="focus-pill-item interactive">
                    <CheckCircle size={14} className="text-lime" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Callout Bar */}
            <div className="about-resume-callout">
              <div className="callout-info">
                <strong>Looking for detailed technical credentials?</strong>
                <p>Review academic transcripts, certifications, and project repositories.</p>
              </div>
              <a 
                href={PERSONAL_INFO.resumePdfUrl} 
                download="Vejandla_Aravind_Aariv_Resume.pdf"
                className="btn-lime-primary interactive"
              >
                <FileCheck2 size={16} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
