import React, { useState } from 'react';
import { 
  FileDown, 
  ArrowRight, 
  Mail, 
  Trophy, 
  Rocket, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Network
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeOrbitNode, setActiveOrbitNode] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setActiveOrbitNode(null);
  };

  const orbitNodes = [
    { label: 'Bhooraksha', category: 'GIS & Multi-Agent AI', angle: 0, color: 'var(--color-lime)' },
    { label: 'QLearn', category: 'Quantum Simulation', angle: 90, color: 'var(--color-violet)' },
    { label: 'Talent Ranker', category: 'FAISS Semantic Search', angle: 180, color: 'var(--color-indigo)' },
    { label: 'VisionGuard', category: 'Explainable Computer Vision', angle: 270, color: 'var(--color-cyan)' },
  ];

  return (
    <section id="home" className="hero-banner-three">
      {/* Background Ambience Typography */}
      <div className="banner-display-bg" aria-hidden="true">
        <span>AI SYSTEMS</span>
      </div>

      <div className="container banner-container">
        <div className="banner-three-grid">
          {/* Left Column: Introduction, Identity & Actions */}
          <div className="banner-three-left">
            <div className="banner-status-pill">
              <span className="status-dot-pulse"></span>
              <span>AI/ML Engineering & Software Architecture</span>
            </div>

            <h1 className="banner-hero-title">
              Building <span className="text-lime">Intelligent Systems</span> for Real-World Problems.
            </h1>

            <p className="banner-hero-subtitle">
              I'm <strong>{PERSONAL_INFO.shortName}</strong>, a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning.
            </p>

            <p className="banner-hero-body">
              I build AI-powered applications, intelligent agents, semantic search systems, and full-stack products, combining machine learning with practical software engineering. My work spans applied AI, computer vision, Generative AI, and experimental learning platforms.
            </p>

            {/* Credential Indicators: Concise, Accurate, Restrained */}
            <div className="hero-credentials-row" role="list" aria-label="Key Credentials">
              <span className="credential-pill" role="listitem">
                <Cpu size={14} className="text-lime" />
                <span>AI/ML Engineering</span>
              </span>
              <span className="credential-pill" role="listitem">
                <Trophy size={14} className="text-amber" />
                <span>SIH 2025 Grand Finale Team Lead</span>
              </span>
              <span className="credential-pill" role="listitem">
                <GraduationCap size={14} className="text-violet" />
                <span>B.Tech CSE (AI & ML)</span>
              </span>
              <span className="credential-pill" role="listitem">
                <Rocket size={14} className="text-cyan" />
                <span>Aspire Leadership '26 Fellow</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="banner-hero-actions">
              <a href="#projects" className="btn-lime-primary interactive">
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </a>

              <a 
                href={PERSONAL_INFO.resumePdfUrl} 
                download="Vejandla_Aravind_Aariv_Resume.pdf"
                className="btn-glass-secondary interactive"
                title="Download verified resume PDF"
              >
                <FileDown size={18} />
                <span>Download Resume</span>
              </a>

              <a href="#contact" className="btn-outline-pill interactive">
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Distinctive 3D Connected AI Systems Visual */}
          <div 
            className="banner-three-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="portrait-stage-wrapper"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              {/* Outer Orbital Ring with Connected Nodes */}
              <div className="hero-3d-orbit-system" aria-hidden="true">
                <div className="orbit-track ring-1" />
                <div className="orbit-track ring-2" />
                <div className="orbit-signal-pulse" />

                {/* 4 Connected System Nodes */}
                {orbitNodes.map((node, index) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 185;
                  const y = Math.sin(rad) * 185;
                  const isHovered = activeOrbitNode === index;

                  return (
                    <div
                      key={node.label}
                      className={`orbit-system-node node-${index} ${isHovered ? 'active' : ''}`}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        borderColor: node.color,
                      }}
                      onMouseEnter={() => setActiveOrbitNode(index)}
                      onMouseLeave={() => setActiveOrbitNode(null)}
                    >
                      <span className="node-dot" style={{ backgroundColor: node.color }} />
                      <div className="node-tooltip">
                        <strong>{node.label}</strong>
                        <small>{node.category}</small>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Glowing Atmosphere */}
              <div className="portrait-glow-ring" aria-hidden="true" />

              {/* Main Portrait Card with Subtle Depth */}
              <div className="portrait-image-card">
                <img 
                  src="/images/profile/aravind_hero_cutout.png" 
                  alt="Vejandla Aravind Aariv - AI & ML Engineer"
                  className="portrait-img-cutout"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/profile/aravind_hero_studio.jpg';
                    target.className = 'portrait-img-studio';
                  }}
                />
              </div>

              {/* Desktop Safe Floating Badges (Anchored to perimeter, zero face occlusion) */}
              <div className="desktop-floating-badges" aria-hidden="false">
                <div className="floating-badge badge-top-left interactive">
                  <div className="badge-icon-box text-lime">
                    <Trophy size={16} />
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-title">SIH 2025</span>
                    <span className="badge-sub">Grand Finale Team Lead</span>
                  </div>
                </div>

                <div className="floating-badge badge-top-right interactive">
                  <div className="badge-icon-box text-cyan">
                    <Rocket size={16} />
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-title">Aspire 2026</span>
                    <span className="badge-sub">Cohort 4 Fellow · In Progress</span>
                  </div>
                </div>

                <div className="floating-badge badge-bottom-left interactive">
                  <div className="badge-icon-box text-violet">
                    <GraduationCap size={16} />
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-title">8.73 / 10 CGPA</span>
                    <span className="badge-sub">B.Tech CSE (AI & ML)</span>
                  </div>
                </div>

                <div className="floating-badge badge-bottom-right interactive">
                  <div className="badge-icon-box text-lime">
                    <Briefcase size={16} />
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-title">XTRAGRAD</span>
                    <span className="badge-sub">AI Intern · Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Dedicated Badge Grid (Guarantees zero overlap on small viewports) */}
            <div className="mobile-badges-grid">
              <div className="mobile-badge-card interactive">
                <Trophy size={16} className="text-lime" />
                <div className="mobile-badge-text">
                  <span className="title">SIH 2025</span>
                  <span className="sub">Grand Finale Team Lead</span>
                </div>
              </div>
              <div className="mobile-badge-card interactive">
                <Rocket size={16} className="text-cyan" />
                <div className="mobile-badge-text">
                  <span className="title">Aspire 2026</span>
                  <span className="sub">Cohort 4 Fellow (In Progress)</span>
                </div>
              </div>
              <div className="mobile-badge-card interactive">
                <GraduationCap size={16} className="text-violet" />
                <div className="mobile-badge-text">
                  <span className="title">8.73 CGPA</span>
                  <span className="sub">B.Tech CSE (AI & ML)</span>
                </div>
              </div>
              <div className="mobile-badge-card interactive">
                <Briefcase size={16} className="text-lime" />
                <div className="mobile-badge-text">
                  <span className="title">XTRAGRAD</span>
                  <span className="sub">AI Intern (Completed)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── UNIFIED KPI STATS ROW (Truthful, Animated Entrance, High Contrast) ── */}
        <div className="banner-bottom-metrics" role="region" aria-label="Key Performance Indicators">
          <div className="metric-strip-card interactive">
            <div className="metric-header-row">
              <GraduationCap size={18} className="text-violet" />
              <span className="metric-strip-num">8.73</span>
            </div>
            <div className="metric-strip-info">
              <h4>Academic CGPA</h4>
              <p>B.Tech CSE (AI & ML) · Kalasalingam Academy</p>
            </div>
          </div>

          <div className="metric-strip-card interactive">
            <div className="metric-header-row">
              <Trophy size={18} className="text-lime" />
              <span className="metric-strip-num text-lime">SIH '25</span>
            </div>
            <div className="metric-strip-info">
              <h4>Grand Finale Lead</h4>
              <p>National Finalist · Bhooraksha Land Governance</p>
            </div>
          </div>

          <div className="metric-strip-card interactive">
            <div className="metric-header-row">
              <Network size={18} className="text-cyan" />
              <span className="metric-strip-num text-cyan">8+</span>
            </div>
            <div className="metric-strip-info">
              <h4>Engineered Systems</h4>
              <p>AI, Multi-Agent & Full-Stack Architectures</p>
            </div>
          </div>

          <div className="metric-strip-card interactive">
            <div className="metric-header-row">
              <Rocket size={18} className="text-lime" />
              <span className="metric-strip-num text-lime">Cohort 4</span>
            </div>
            <div className="metric-strip-info">
              <h4>Aspire Leadership Fellow</h4>
              <p>21 Oct 2026 – Present (In Progress)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
