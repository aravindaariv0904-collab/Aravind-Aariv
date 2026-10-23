import React, { useState } from 'react';
import { 
  User, 
  Code, 
  Brain, 
  Bot, 
  Layout, 
  Database, 
  Cloud, 
  Compass, 
  Award, 
  GraduationCap, 
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  ABOUT_TEXT, 
  SKILL_CATEGORIES, 
  RESEARCH_AREAS, 
  CERTIFICATIONS 
} from '../data/portfolioData';

export const EngineeringProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'research' | 'certifications'>('skills');

  // Category Icon Resolver
  const getCategoryIcon = (groupName: string) => {
    switch (groupName) {
      case 'Programming':
        return <Code size={18} className="text-lime" />;
      case 'AI & Machine Learning':
        return <Brain size={18} className="text-violet" />;
      case 'Generative AI & AI Agents':
        return <Bot size={18} className="text-cyan" />;
      case 'Frontend Development':
        return <Layout size={18} className="text-amber" />;
      case 'Backend & Databases':
        return <Database size={18} className="text-indigo" />;
      case 'Cloud, Deployment & Developer Tools':
        return <Cloud size={18} className="text-lime" />;
      default:
        return <Code size={18} className="text-lime" />;
    }
  };

  return (
    <section id="engineering" className="engineering-profile-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <User size={14} className="text-lime" />
            <span>FOUNDATIONS & CAPABILITIES</span>
          </div>
          <h2 className="section-heading-text">
            Engineering <span className="text-lime">Profile & Technical</span> Architecture
          </h2>
          <p className="section-subheading-text">
            Core computer science principles, practical engineering domains, applied research interests, and verified credentials.
          </p>
        </div>

        {/* ── PART 1: COMPACT ABOUT & ACADEMIC DOSSIER ── */}
        <div className="profile-about-card interactive">
          <div className="profile-about-grid">
            {/* Left: Authentic Studio Portrait Framing */}
            <div className="profile-portrait-wrap">
              <div className="profile-img-frame">
                <img 
                  src="/images/profile/aravind_about_cinematic.jpg" 
                  alt="Vejandla Aravind Aariv"
                  className="profile-portrait-img"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/profile/aravind_hero_studio.jpg';
                  }}
                />
                <div className="profile-badge-overlay">
                  <GraduationCap size={15} className="text-lime" />
                  <span>Class of 2029</span>
                </div>
              </div>
            </div>

            {/* Right: Concise Academic Narrative & Focus Areas */}
            <div className="profile-narrative-wrap">
              <div className="academic-badge-row">
                <span className="academic-institution-tag">
                  {PERSONAL_INFO.institution}
                </span>
                <span className="academic-degree-tag">
                  B.Tech CSE (AI & ML) · CGPA 8.73/10
                </span>
              </div>

              <h3 className="profile-bio-headline">
                Principled Engineering Meets Autonomous Intelligence
              </h3>

              <div className="profile-bio-paragraphs">
                <p>
                  As a Computer Science and Engineering student specializing in AI & ML, I focus on building resilient software architectures that connect statistical intelligence with deterministic production engineering.
                </p>
                <p>
                  My engineering methodology emphasizes rigorous type safety, modular microservices, vector search indexing, and multi-agent coordination. Through leading our Smart India Hackathon 2025 team and participating in the Aspire Leadership Programme 2026, I combine technical discipline with collaborative project leadership.
                </p>
              </div>

              {/* Verified Focus Pills */}
              <div className="profile-focus-pills-row">
                {ABOUT_TEXT.focusPills.map((pill, idx) => (
                  <span key={idx} className="focus-pill">
                    <CheckCircle2 size={13} className="text-lime" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PART 2: INTERACTIVE DOSSIER TABS (Skills, Research, Certifications) ── */}
        <div className="engineering-tabs-container">
          <div className="engineering-tabs-bar" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'skills'}
              className={`profile-tab-btn interactive ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <Code size={16} />
              <span>Technical Expertise ({SKILL_CATEGORIES.length} Domains)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'research'}
              className={`profile-tab-btn interactive ${activeTab === 'research' ? 'active' : ''}`}
              onClick={() => setActiveTab('research')}
            >
              <Compass size={16} />
              <span>Research Interests ({RESEARCH_AREAS.length} Areas)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'certifications'}
              className={`profile-tab-btn interactive ${activeTab === 'certifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('certifications')}
            >
              <Award size={16} />
              <span>Verified Certifications ({CERTIFICATIONS.length})</span>
            </button>
          </div>

          {/* TAB 1: TECHNICAL EXPERTISE (6 Verified Groups, No Arbitrary Percentages) */}
          {activeTab === 'skills' && (
            <div className="skills-domains-grid" role="tabpanel">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.group} className="skill-domain-card interactive">
                  <div className="domain-card-header">
                    <div className="domain-icon-box">
                      {getCategoryIcon(cat.group)}
                    </div>
                    <h4 className="domain-title">{cat.group}</h4>
                  </div>
                  <div className="domain-chips-wrap">
                    {cat.items.map((skill) => (
                      <span key={skill.name} className="tech-chip interactive">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: RESEARCH INTERESTS (Distinct from completed projects) */}
          {activeTab === 'research' && (
            <div className="research-areas-grid" role="tabpanel">
              {RESEARCH_AREAS.map((area, idx) => (
                <div key={idx} className="research-card interactive">
                  <div className="research-header">
                    <span className="research-idx">0{idx + 1}</span>
                    <span className="research-badge">Active Investigation</span>
                  </div>
                  <h4 className="research-title">{area.title}</h4>
                  <p className="research-desc">{area.description}</p>
                  <div className="research-topics-wrap">
                    {area.keyTopics.map((topic, i) => (
                      <span key={i} className="research-topic-chip">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: VERIFIED CERTIFICATIONS (Compact credential cards with issuers) */}
          {activeTab === 'certifications' && (
            <div className="certifications-cards-grid" role="tabpanel">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="cert-item-card interactive">
                  <div className="cert-card-top">
                    <FileCheck size={20} className="text-lime" />
                    <span className="cert-badge-pill">{cert.badge}</span>
                  </div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-issuer">Issued by <strong>{cert.issuer}</strong></p>
                  <div className="cert-verified-row">
                    <CheckCircle2 size={13} className="text-lime" />
                    <span>Verified Credential</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
