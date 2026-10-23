import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Briefcase size={14} className="text-cyan" />
            <span>INDUSTRY & LEADERSHIP</span>
          </div>
          <h2 className="section-heading-text">
            Work Experience & <span className="gradient-text-indigo">Engineering Roles</span>
          </h2>
          <p className="section-subheading-text">
            Hands-on production machine learning engineering and high-stakes national hackathon team leadership.
          </p>
        </div>

        <div className="experience-timeline-container">
          {EXPERIENCE.map((item, index) => (
            <div key={index} className="timeline-card-item">
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>

              <div className="timeline-content-card">
                <div className="timeline-card-header">
                  <div>
                    <h3 className="timeline-role-title">{item.title}</h3>
                    <div className="timeline-company-row">
                      <span className="company-name">{item.company}</span>
                      {item.location && (
                        <span className="company-location">
                          <MapPin size={13} />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="timeline-period-badge">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <ul className="timeline-bullets-list">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="bullet-item">
                      <CheckCircle2 size={15} className="bullet-icon text-cyan" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="timeline-tags-wrap">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tech-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
