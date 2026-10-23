import React from 'react';
import { Compass, Award, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="journey-section position-relative">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Compass size={14} className="text-lime" />
            <span>ROOTS & ETHOS</span>
          </div>
          <h2 className="section-heading-text">
            Journey & <span className="text-lime">Leadership Ethos</span>
          </h2>
          <p className="section-subheading-text">
            Blending deep cultural grounding, academic discipline, and technical ambition.
          </p>
        </div>

        <div className="journey-grid-layout">
          {/* Left Column: Authentic Cultural Heritage & Journey Shot */}
          <div className="journey-card-visual">
            <div className="journey-image-box">
              <img 
                src="/images/profile/aravind_journey_temple.jpg" 
                alt="Aravind Aariv - Cultural roots & heritage" 
                className="journey-photo"
              />
              <div className="journey-image-tag">
                <ShieldCheck size={16} className="text-lime" />
                <span>Grounding & Discipline</span>
              </div>
            </div>

            <div className="journey-caption-box">
              <h4>Rooted in Purpose, Driven by Curiosity</h4>
              <p>
                From architectural monuments of enduring craftsmanship to cutting-edge neural architectures, I believe true engineering is about longevity, ethical responsibility, and solving human challenges.
              </p>
            </div>
          </div>

          {/* Right Column: Values & Leadership Principles */}
          <div className="journey-values-container">
            <div className="journey-value-card interactive">
              <div className="value-icon-box text-lime">
                <Award size={22} />
              </div>
              <div className="value-info">
                <h3>Technical Rigor First</h3>
                <p>
                  Maintaining a 8.73 CGPA while leading national hackathon teams requires relentless execution. I test rigorously, avoid superficial AI hype, and focus on verifiable systems.
                </p>
              </div>
            </div>

            <div className="journey-value-card interactive">
              <div className="value-icon-box text-cyan">
                <HeartHandshake size={22} />
              </div>
              <div className="value-info">
                <h3>Collaborative Leadership</h3>
                <p>
                  As SIH 2025 Grand Finale Team Lead and an Aspire Leadership Programme 2026 fellow, I prioritize psychological safety, clear task decomposition, and collective momentum.
                </p>
              </div>
            </div>

            <div className="journey-value-card interactive">
              <div className="value-icon-box text-violet">
                <BookOpen size={22} />
              </div>
              <div className="value-info">
                <h3>Continuous Applied Learning</h3>
                <p>
                  Constantly bridging the gap between theoretical machine learning papers and production deployment—from quantum algorithm simulations in QLearn to GIS land conflicts in Bhooraksha.
                </p>
              </div>
            </div>

            {/* Profile Avatar Card */}
            <div className="journey-profile-badge interactive">
              <img 
                src="/images/profile/aravind_avatar_smart.png" 
                alt="Aravind Aariv" 
                className="journey-small-avatar"
              />
              <div className="journey-badge-text">
                <div className="badge-name">{PERSONAL_INFO.name}</div>
                <div className="badge-sub">{PERSONAL_INFO.title}</div>
              </div>
              <div className="badge-status-dot" title="Active & Ready to Build"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
