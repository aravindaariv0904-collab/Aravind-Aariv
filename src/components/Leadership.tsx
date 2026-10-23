import React from 'react';
import { Compass, Calendar, CheckCircle, Trophy, Award, Layers } from 'lucide-react';
import { LEADERSHIP, ACHIEVEMENTS } from '../data/portfolioData';

export const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="leadership-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <Compass size={14} className="text-cyan" />
            <span>DEVELOPMENT & RECOGNITION</span>
          </div>
          <h2 className="section-heading-text">
            Leadership & <span className="gradient-text-indigo">Milestones</span>
          </h2>
          <p className="section-subheading-text">
            Professional leadership programs, competitive hackathon distinctions, and academic excellence.
          </p>
        </div>

        {/* Featured Leadership Highlight */}
        <div className="featured-leadership-card">
          <div className="leadership-badge-row">
            <span className="leadership-category-tag">{LEADERSHIP.category}</span>
            <span className="leadership-status-badge in-progress">
              <span className="pulse-dot"></span>
              <span>{LEADERSHIP.status}</span>
            </span>
          </div>

          <div className="leadership-main-header">
            <h3 className="leadership-title">{LEADERSHIP.title}</h3>
            <div className="leadership-date">
              <Calendar size={14} />
              <span>Started {LEADERSHIP.startDate}</span>
            </div>
          </div>

          <p className="leadership-desc">{LEADERSHIP.description}</p>

          <div className="leadership-highlights-grid">
            {LEADERSHIP.highlights.map((hl, idx) => (
              <div key={idx} className="leadership-highlight-item">
                <CheckCircle size={16} className="text-cyan" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid-block">
          <h3 className="achievements-heading">Verified Honors & Academic Distinctions</h3>
          <div className="achievements-cards-grid">
            {ACHIEVEMENTS.map((item, idx) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case 'Trophy': return <Trophy size={22} className="text-amber" />;
                  case 'Compass': return <Compass size={22} className="text-cyan" />;
                  case 'Award': return <Award size={22} className="text-violet" />;
                  default: return <Layers size={22} className="text-emerald" />;
                }
              };

              return (
                <div key={idx} className="achievement-card-item">
                  <div className="achievement-icon-box">
                    {getIcon(item.icon)}
                  </div>
                  <div className="achievement-text-content">
                    <span className="achievement-role-tag">{item.role}</span>
                    <h4 className="achievement-title-text">{item.title}</h4>
                    <p className="achievement-desc-text">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
