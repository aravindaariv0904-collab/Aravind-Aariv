import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Briefcase size={14} className="text-lime" />
            <span>INDUSTRY & LEADERSHIP</span>
          </div>
          <h2 className="section-heading-text">
            Experience & <span className="text-lime">Fellowships</span>
          </h2>
          <p className="section-subheading-text">
            Hands-on machine learning engineering and executive leadership development.
          </p>
        </div>

        <div className="experience-timeline-container">
          {EXPERIENCE.map((item, index) => {
            const isAspire = item.company.includes('Aspire');
            const isCompleted = item.status === 'Completed';

            return (
              <div key={index} className="timeline-card-item">
                <div className="timeline-marker">
                  <div className={`marker-dot ${isCompleted ? 'marker-completed' : 'marker-active'}`}></div>
                  <div className="marker-line"></div>
                </div>

                <div className="timeline-content-card interactive">
                  <div className="timeline-card-header">
                    <div className="timeline-header-left">
                      <div className="timeline-badge-row">
                        <span className="timeline-category-tag">
                          {isAspire ? 'Leadership & Professional Development' : 'Applied AI Engineering'}
                        </span>
                        <span className={`timeline-status-pill ${isCompleted ? 'status-completed' : 'status-in-progress'}`}>
                          {isCompleted ? (
                            <>
                              <CheckCircle2 size={12} />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <span className="pulse-dot-lime"></span>
                              <span>In Progress</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h3 className="timeline-role-title">
                        {isAspire 
                          ? 'Aspire Leadership Programme 2026 — Cohort 4 Fellow'
                          : `${item.title} — ${item.company}`}
                      </h3>

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
                      <Calendar size={13} className="text-lime" />
                      <span className="period-text">{item.period}</span>
                    </div>
                  </div>

                  <ul className="timeline-bullets-list">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="bullet-item">
                        <CheckCircle2 size={15} className="bullet-icon text-lime" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
