import React from 'react';
import { Microscope, ArrowUpRight, BookOpen } from 'lucide-react';
import { RESEARCH_AREAS } from '../data/portfolioData';

export const ResearchInterests: React.FC = () => {
  return (
    <section id="research" className="research-section">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Microscope size={14} className="text-cyan" />
            <span>APPLIED RESEARCH & INVESTIGATION</span>
          </div>
          <h2 className="section-heading-text">
            Areas of <span className="gradient-text-indigo">Technical Exploration</span>
          </h2>
          <p className="section-subheading-text">
            Ongoing research vectors, theoretical investigations, and algorithmic experimentation.
          </p>
        </div>

        <div className="research-grid">
          {RESEARCH_AREAS.map((area, idx) => (
            <div key={idx} className="research-card">
              <div className="research-card-header">
                <div className="research-num font-mono">0{idx + 1}</div>
                <BookOpen size={18} className="text-cyan" />
              </div>

              <h3 className="research-title">{area.title}</h3>
              <p className="research-desc">{area.description}</p>

              <div className="research-topics-wrap">
                {area.keyTopics.map((topic, tIdx) => (
                  <span key={tIdx} className="research-topic-pill">
                    <ArrowUpRight size={12} className="text-indigo" />
                    <span>{topic}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
