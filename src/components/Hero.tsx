import React from 'react';
import { 
  FileDown, 
  ArrowRight, 
  Mail, 
  Trophy, 
  Rocket, 
  GraduationCap, 
  Briefcase, 
  Terminal, 
  CheckCircle2, 
  Activity, 
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Positioning & CTAs */}
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="status-indicator-ping">
                <span className="ping-dot"></span>
                <span className="ping-ring"></span>
              </span>
              <span>Available for High-Impact AI/ML & SDE Roles</span>
            </div>

            <h1 className="hero-headline">
              Building <span className="gradient-text-indigo">Intelligent Systems</span> That Solve Real-World Problems.
            </h1>

            <div className="hero-role-badge">
              <Cpu size={16} className="text-cyan" />
              <span>{PERSONAL_INFO.title}</span>
            </div>

            <p className="hero-bio">
              I'm <strong>{PERSONAL_INFO.shortName}</strong>, a Computer Science and Engineering student at Kalasalingam Academy of Research and Education specializing in Artificial Intelligence and Machine Learning. I build AI-powered applications, intelligent agents, and full-stack systems, combining Generative AI, semantic search, and software engineering to turn ideas into practical solutions.
            </p>

            <p className="hero-subbio">
              As a Smart India Hackathon 2025 Grand Finale team lead and an Artificial Intelligence Intern at XTRAGRAD, I'm focused on developing reliable AI systems, exploring applied research, and building technology that creates meaningful impact.
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-action-buttons">
              <a href="#projects" className="btn-hero-primary">
                <span>Explore My Projects</span>
                <ArrowRight size={17} />
              </a>

              <a 
                href={PERSONAL_INFO.resumePdfUrl} 
                download="Vejandla_Aravind_Aariv_Resume.pdf"
                className="btn-hero-resume"
              >
                <FileDown size={17} />
                <span>Download Resume</span>
              </a>

              <a href="#contact" className="btn-hero-outline">
                <Mail size={17} />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* 4 Professional Highlights Grid */}
            <div className="hero-highlights-container">
              <div className="highlight-metric-card">
                <div className="highlight-icon-box text-amber">
                  <Trophy size={20} />
                </div>
                <div className="highlight-metric-text">
                  <span className="metric-title">SIH 2025 Grand Finale</span>
                  <span className="metric-detail">Team Lead · National Finalist</span>
                </div>
              </div>

              <div className="highlight-metric-card">
                <div className="highlight-icon-box text-cyan">
                  <Rocket size={20} />
                </div>
                <div className="highlight-metric-text">
                  <span className="metric-title">Aspire Leadership 2026</span>
                  <span className="metric-detail">Started 21 Oct 2026 (In Progress)</span>
                </div>
              </div>

              <div className="highlight-metric-card">
                <div className="highlight-icon-box text-violet">
                  <GraduationCap size={20} />
                </div>
                <div className="highlight-metric-text">
                  <span className="metric-title">CGPA 8.73 / 10.0</span>
                  <span className="metric-detail">B.Tech CSE (AI & ML) · KARE</span>
                </div>
              </div>

              <div className="highlight-metric-card">
                <div className="highlight-icon-box text-emerald">
                  <Briefcase size={20} />
                </div>
                <div className="highlight-metric-text">
                  <span className="metric-title">AI Intern — XTRAGRAD</span>
                  <span className="metric-detail">Jul 2026–Present · ML Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Engineering Telemetry Terminal */}
          <div className="hero-telemetry-panel">
            <div className="telemetry-terminal-card">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="terminal-title">
                  <Terminal size={14} className="text-cyan" />
                  <span>aariv@engineer-core: ~/systems-telemetry</span>
                </div>
                <div className="terminal-live-badge">
                  <Activity size={12} className="pulse-icon text-emerald" />
                  <span>LIVE</span>
                </div>
              </div>

              <div className="terminal-body font-mono">
                <div className="terminal-line prompt">
                  <span className="prompt-symbol">$</span>
                  <span className="prompt-cmd">verify-systems --architecture=all</span>
                </div>

                <div className="telemetry-stat-row">
                  <div className="stat-label">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Bhooraksha (SIH Grand Finale)</span>
                  </div>
                  <span className="stat-badge emerald">10 AI Models · 8 Portals · 18 Indic Langs</span>
                </div>

                <div className="telemetry-stat-row">
                  <div className="stat-label">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>QLearn Quantum Studio</span>
                  </div>
                  <span className="stat-badge violet">133/133 Unit Tests · &lt;5ms Simulation</span>
                </div>

                <div className="telemetry-stat-row">
                  <div className="stat-label">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Talent Intelligence Ranker</span>
                  </div>
                  <span className="stat-badge cyan">FAISS Vector Search · Sub-200ms</span>
                </div>

                <div className="telemetry-stat-row">
                  <div className="stat-label">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>VisionGuard AI (XTRAGRAD)</span>
                  </div>
                  <span className="stat-badge amber">EfficientNet-B0 · ~96–97% Validation</span>
                </div>

                <div className="terminal-divider"></div>

                <div className="terminal-line output text-slate-300">
                  <span className="text-cyan">&gt; Active Focus:</span> Agentic Workflows · RAG Systems · Full-Stack AI
                </div>
                <div className="terminal-line output text-slate-400">
                  <span className="text-indigo">&gt; Candidate Contact:</span> {PERSONAL_INFO.email}
                </div>
              </div>

              <div className="terminal-footer">
                <div className="terminal-footer-chip">
                  <span>Stack:</span>
                  <span className="text-indigo">Python · Next.js · FastAPI · FAISS · PyTorch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
