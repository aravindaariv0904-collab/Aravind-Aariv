import React, { useState } from 'react';
import { 
  FileDown, 
  ArrowRight, 
  Mail, 
  Trophy, 
  Rocket, 
  GraduationCap, 
  Briefcase, 
  Plus 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="hero-banner-three">
      {/* Massive Display Typography In Background */}
      <div className="banner-display-bg" aria-hidden="true">
        <span>AI ENGINEER</span>
      </div>

      <div className="container banner-container">
        <div className="banner-three-grid">
          {/* Left Column: Introduction & Specializations */}
          <div className="banner-three-left">
            <div className="banner-status-pill">
              <span className="status-dot-pulse"></span>
              <span>Available for High-Impact AI/ML & SDE Roles</span>
            </div>

            <h1 className="banner-hero-title">
              Building <span className="text-lime">Intelligent Systems</span> That Solve Real-World Problems.
            </h1>

            <p className="banner-hero-subtitle">
              I'm <strong>{PERSONAL_INFO.shortName}</strong>, a Computer Science & Engineering student at Kalasalingam Academy of Research and Education specializing in Artificial Intelligence and Machine Learning.
            </p>

            {/* Specialization Checklist with Acid Lime Plus Icons */}
            <ul className="banner-checklist">
              <li>
                <span className="checklist-icon"><Plus size={14} /></span>
                <span>Generative AI & Multi-Agent Workflows</span>
              </li>
              <li>
                <span className="checklist-icon"><Plus size={14} /></span>
                <span>Document Intelligence & GIS Conflict Detection</span>
              </li>
              <li>
                <span className="checklist-icon"><Plus size={14} /></span>
                <span>Quantum Algorithm Simulation & Learning</span>
              </li>
              <li>
                <span className="checklist-icon"><Plus size={14} /></span>
                <span>Semantic Search, RAG & Vector Embeddings</span>
              </li>
              <li>
                <span className="checklist-icon"><Plus size={14} /></span>
                <span>Full-Stack AI Application Engineering</span>
              </li>
            </ul>

            {/* High-Impact Action Buttons */}
            <div className="banner-hero-actions">
              <a href="#projects" className="btn-lime-primary interactive">
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </a>

              <a 
                href={PERSONAL_INFO.resumePdfUrl} 
                download="Vejandla_Aravind_Aariv_Resume.pdf"
                className="btn-glass-secondary interactive"
              >
                <FileDown size={18} />
                <span>Resume (PDF)</span>
              </a>

              <a href="#contact" className="btn-outline-pill interactive">
                <Mail size={18} />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Center Column: Editorial Portrait with 3D Depth & Floating Badges */}
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
              {/* Background Glow Ring */}
              <div className="portrait-glow-ring" aria-hidden="true" />

              {/* Main Portrait Container */}
              <div className="portrait-image-card">
                <img 
                  src="/images/profile/aravind_hero_cutout.png" 
                  alt="Vejandla Aravind Aariv"
                  className="portrait-img-cutout"
                  onError={(e) => {
                    // Fallback to studio photo if cutout fails
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/profile/aravind_hero_studio.jpg';
                    target.className = 'portrait-img-studio';
                  }}
                />
              </div>

              {/* Floating Badge 1: SIH Grand Finale Lead */}
              <div className="floating-badge badge-top-left interactive">
                <div className="badge-icon-box text-lime">
                  <Trophy size={16} />
                </div>
                <div className="badge-text-box">
                  <span className="badge-title">SIH 2025</span>
                  <span className="badge-sub">Grand Finale Lead</span>
                </div>
              </div>

              {/* Floating Badge 2: Aspire Leadership Active */}
              <div className="floating-badge badge-top-right interactive">
                <div className="badge-icon-box text-cyan">
                  <Rocket size={16} />
                </div>
                <div className="badge-text-box">
                  <span className="badge-title">Aspire 2026</span>
                  <span className="badge-sub">Cohort In Progress</span>
                </div>
              </div>

              {/* Floating Badge 3: CGPA 8.73/10 */}
              <div className="floating-badge badge-bottom-left interactive">
                <div className="badge-icon-box text-violet">
                  <GraduationCap size={16} />
                </div>
                <div className="badge-text-box">
                  <span className="badge-title">8.73 / 10 CGPA</span>
                  <span className="badge-sub">B.Tech CSE (AI & ML)</span>
                </div>
              </div>

              {/* Floating Badge 4: XTRAGRAD AI Intern */}
              <div className="floating-badge badge-bottom-right interactive">
                <div className="badge-icon-box text-lime">
                  <Briefcase size={16} />
                </div>
                <div className="badge-text-box">
                  <span className="badge-title">XTRAGRAD</span>
                  <span className="badge-sub">AI Intern</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Highlight Cards */}
        <div className="banner-bottom-metrics">
          <div className="metric-strip-card">
            <span className="metric-strip-num">8.73</span>
            <div className="metric-strip-info">
              <h4>Academic CGPA</h4>
              <p>Kalasalingam Academy · Class of 2029</p>
            </div>
          </div>

          <div className="metric-strip-card">
            <span className="metric-strip-num text-lime">SIH '25</span>
            <div className="metric-strip-info">
              <h4>National Finalist</h4>
              <p>Team Lead · Bhooraksha Project</p>
            </div>
          </div>

          <div className="metric-strip-card">
            <span className="metric-strip-num text-cyan">2026</span>
            <div className="metric-strip-info">
              <h4>Aspire Leadership</h4>
              <p>Started 21 Oct 2026 · Active Fellow</p>
            </div>
          </div>

          <div className="metric-strip-card">
            <span className="metric-strip-num">AI/ML</span>
            <div className="metric-strip-info">
              <h4>Applied Engineering</h4>
              <p>LLMs, Agents, RAG & Quantum Labs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
