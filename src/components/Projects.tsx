import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Clock,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Orbit as OrbitIcon
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { CaseStudyModal } from './CaseStudyModal';

export const Projects: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [activeFlagshipIndex, setActiveFlagshipIndex] = useState(0);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
  const [orbitAngle, setOrbitAngle] = useState(0);

  const flagshipProjects = PROJECTS.filter(p => p.isFlagship);
  const secondaryProjects = PROJECTS.filter(p => !p.isFlagship);

  const orbitIntervalRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsOrbitPaused(true);
      setViewMode('grid');
    }
  }, []);

  // Continuous slow orbital rotation (1 degree every 60ms ~ 360 deg in ~21 seconds)
  useEffect(() => {
    if (isOrbitPaused || viewMode !== 'orbit') {
      if (orbitIntervalRef.current) clearInterval(orbitIntervalRef.current);
      return;
    }

    orbitIntervalRef.current = window.setInterval(() => {
      setOrbitAngle((prev) => (prev + 0.35) % 360);
    }, 50);

    return () => {
      if (orbitIntervalRef.current) clearInterval(orbitIntervalRef.current);
    };
  }, [isOrbitPaused, viewMode]);

  const handleNext = () => {
    setActiveFlagshipIndex((prev) => (prev + 1) % flagshipProjects.length);
  };

  const handlePrev = () => {
    setActiveFlagshipIndex((prev) => (prev - 1 + flagshipProjects.length) % flagshipProjects.length);
  };

  const activeProject = flagshipProjects[activeFlagshipIndex] || flagshipProjects[0];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-lime" />
            <span>ENGINEERED SYSTEMS & AI ARCHITECTURES</span>
          </div>
          <h2 className="section-heading-text">
            Featured <span className="text-lime">Work & Systems</span> Showcase
          </h2>
          <p className="section-subheading-text">
            Verified production systems, autonomous multi-agent pipelines, and scientific computing architectures.
          </p>

          {/* Controls: Orbit vs Grid Switcher */}
          <div className="project-view-controls" role="toolbar" aria-label="Project showcase view options">
            <button
              type="button"
              className={`view-mode-btn interactive ${viewMode === 'orbit' ? 'active' : ''}`}
              onClick={() => setViewMode('orbit')}
              aria-pressed={viewMode === 'orbit'}
            >
              <OrbitIcon size={16} />
              <span>3D Circular Orbit</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn interactive ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid size={16} />
              <span>Structured Grid</span>
            </button>
            {viewMode === 'orbit' && (
              <button
                type="button"
                className="orbit-pause-toggle interactive"
                onClick={() => setIsOrbitPaused(!isOrbitPaused)}
                aria-label={isOrbitPaused ? "Resume continuous orbit" : "Pause orbit rotation"}
                title={isOrbitPaused ? "Resume continuous orbit" : "Pause orbit rotation"}
              >
                {isOrbitPaused ? <Play size={14} /> : <Pause size={14} />}
                <span>{isOrbitPaused ? 'Resume Orbit' : 'Pause Orbit'}</span>
              </button>
            )}
          </div>
        </div>

        {/* ── TIER 1: SIGNATURE 3D CIRCULAR SHOWCASE ── */}
        <div className="flagship-showcase-container">
          <div className="group-title-row">
            <Layers size={18} className="text-lime" />
            <span className="group-badge">Flagship Systems</span>
            <span className="group-counter">3 Systems Evaluated</span>
          </div>

          {viewMode === 'orbit' ? (
            <div 
              className="signature-3d-orbit-wrapper"
              onMouseEnter={() => setIsOrbitPaused(true)}
              onMouseLeave={() => setIsOrbitPaused(false)}
            >
              {/* Desktop 3D Orbital Stage */}
              <div className="orbit-stage-viewport">
                {/* Orbital Ring Background Tracks */}
                <div className="orbit-3d-rings" aria-hidden="true">
                  <div className="ring-ellipse ring-outer" />
                  <div className="ring-ellipse ring-middle" />
                  <div className="ring-ellipse ring-inner" />
                </div>

                {/* Central 3D Focal Core: Holographic AI Core */}
                <div className="central-3d-focal-core">
                  <div className="core-sphere-pulse" />
                  <div className="core-inner-glyph">
                    <Cpu size={32} className="text-lime" />
                  </div>
                  <div className="core-ring-spin" />
                  <span className="core-label">AI ENGINE</span>
                </div>

                {/* 3 Circular Satellite Cards on Orbit */}
                <div className="orbit-satellites-container">
                  {flagshipProjects.map((project, idx) => {
                    // Angular position: distributed evenly (120 deg apart) + orbital rotation angle
                    const baseAngle = (idx * 360) / flagshipProjects.length;
                    const currentAngle = (baseAngle + orbitAngle) % 360;
                    const rad = (currentAngle * Math.PI) / 180;

                    // Elliptical orbit: radiusX = 260px, radiusY = 120px with perspective
                    const x = Math.cos(rad) * 260;
                    const y = Math.sin(rad) * 110;
                    // Calculate depth (z-index and scale based on y position)
                    const normalizedY = (y + 110) / 220; // 0 (top/back) to 1 (bottom/front)
                    const scale = 0.82 + normalizedY * 0.32; // 0.82 to 1.14
                    const opacity = 0.65 + normalizedY * 0.35;
                    const zIndex = Math.round(normalizedY * 20);
                    const isSelected = activeFlagshipIndex === idx;

                    return (
                      <div
                        key={project.id}
                        className={`orbit-satellite-card interactive ${isSelected ? 'active-focal' : ''}`}
                        style={{
                          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                          zIndex: isSelected ? 30 : zIndex,
                          opacity: isSelected ? 1 : opacity,
                        }}
                        onClick={() => setActiveFlagshipIndex(idx)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setActiveFlagshipIndex(idx);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        aria-label={`Select ${project.title}`}
                      >
                        <div className="satellite-img-container">
                          <img 
                            src={project.image || '/images/profile/aravind_about_cinematic.jpg'} 
                            alt={project.title} 
                            className="satellite-thumbnail"
                            loading="lazy"
                          />
                          <div className="satellite-overlay-glow" style={{ borderColor: project.accentColor }} />
                        </div>
                        <div className="satellite-info-panel">
                          <span className="satellite-category">{project.category.split('|')[0]}</span>
                          <h4 className="satellite-title">{project.title}</h4>
                          <span className="satellite-status-dot" style={{ backgroundColor: project.accentColor }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Orbital Navigation Controls */}
              <div className="orbit-nav-toolbar">
                <button
                  type="button"
                  className="orbit-nav-btn interactive"
                  onClick={handlePrev}
                  aria-label="Previous project in orbit"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>

                <div className="orbit-pagination-indicators">
                  {flagshipProjects.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`orbit-indicator-dot interactive ${activeFlagshipIndex === i ? 'active' : ''}`}
                      onClick={() => setActiveFlagshipIndex(i)}
                      aria-label={`Jump to ${p.title}`}
                    >
                      <span className="sr-only">{p.title}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="orbit-nav-btn interactive"
                  onClick={handleNext}
                  aria-label="Next project in orbit"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Active Project Detailed Spotlight Card */}
              <div className="focal-spotlight-card">
                <div className="spotlight-left-column">
                  <div className="spotlight-img-frame">
                    <img 
                      src={activeProject.image || '/images/profile/aravind_about_cinematic.jpg'} 
                      alt={activeProject.title} 
                      className="spotlight-artwork"
                    />
                    <div className="spotlight-badge-floating">
                      <CheckCircle2 size={14} className="text-lime" />
                      <span>{activeProject.status}</span>
                    </div>
                  </div>
                </div>

                <div className="spotlight-right-column">
                  <div className="spotlight-category-row">
                    <span className="project-category-badge">{activeProject.category}</span>
                    <span className="spotlight-status-label">{activeProject.status}</span>
                  </div>

                  <h3 className="spotlight-title">{activeProject.title}</h3>
                  {activeProject.subtitle && (
                    <p className="spotlight-subtitle">{activeProject.subtitle}</p>
                  )}

                  <p className="spotlight-description">{activeProject.desc}</p>

                  {/* Verified Metrics Row */}
                  {activeProject.metrics && (
                    <div className="spotlight-metrics-row">
                      {activeProject.metrics.map((m, idx) => (
                        <div key={idx} className="spotlight-metric-item">
                          <span className="val">{m.value}</span>
                          <span className="lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="project-tags-wrap">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="spotlight-actions-row">
                    {activeProject.caseStudy && (
                      <button
                        type="button"
                        className="btn-action primary interactive"
                        onClick={() => setSelectedCaseStudy(activeProject)}
                      >
                        <FileText size={16} />
                        <span>View System Case Study</span>
                      </button>
                    )}

                    {activeProject.demo && (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action live interactive"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action code interactive"
                      >
                        <GithubIcon size={16} />
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Accessible Grid View of Flagship Projects */
            <div className="flagship-cards-grid">
              {flagshipProjects.map((project) => (
                <div key={project.id} className="flagship-card interactive">
                  <div className="card-artwork-banner">
                    <img 
                      src={project.image || '/images/profile/aravind_about_cinematic.jpg'} 
                      alt={project.title} 
                      className="flagship-artwork-img"
                      loading="lazy"
                    />
                    <span className="project-status-pill flagship">
                      <CheckCircle2 size={13} className="text-lime" />
                      <span>{project.status}</span>
                    </span>
                  </div>

                  <div className="flagship-card-body">
                    <span className="project-category-badge">{project.category}</span>
                    <h4 className="flagship-title">{project.title}</h4>
                    {project.subtitle && <p className="flagship-subtitle">{project.subtitle}</p>}
                    <p className="flagship-desc">{project.desc}</p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flagship-metrics-grid">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="metric-box">
                            <span className="metric-val">{m.value}</span>
                            <span className="metric-lbl">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="project-tags-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tech-badge">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flagship-card-actions">
                      {project.caseStudy && (
                        <button
                          type="button"
                          className="btn-action primary interactive"
                          onClick={() => setSelectedCaseStudy(project)}
                        >
                          <FileText size={16} />
                          <span>View Case Study</span>
                        </button>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-action live interactive"
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-action code interactive"
                        >
                          <GithubIcon size={16} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── TIER 2: SECONDARY PRODUCTION PLATFORMS ── */}
        <div className="secondary-showcase-group">
          <div className="group-title-row">
            <Cpu size={18} className="text-cyan" />
            <span className="group-badge secondary">Engineered Platforms</span>
            <span className="group-counter">5 Additional Systems</span>
          </div>

          <div className="secondary-cards-grid">
            {secondaryProjects.map((project) => (
              <div key={project.id} className="secondary-project-card interactive">
                {/* Project Image Header */}
                <div className="secondary-img-wrapper">
                  <img 
                    src={project.image || '/images/profile/aravind_about_cinematic.jpg'} 
                    alt={project.title} 
                    className="secondary-project-thumb"
                    loading="lazy"
                  />
                  <span className="secondary-status-badge">
                    {project.status.includes('Progress') ? (
                      <Clock size={12} className="text-amber" />
                    ) : (
                      <ShieldCheck size={12} className="text-lime" />
                    )}
                    <span>{project.status}</span>
                  </span>
                </div>

                <div className="secondary-card-content">
                  <span className="secondary-category">{project.category}</span>
                  <h4 className="secondary-title">{project.title}</h4>
                  {project.subtitle && <p className="secondary-subtitle">{project.subtitle}</p>}
                  <p className="secondary-desc">{project.desc}</p>

                  <div className="project-tags-wrap">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-badge secondary">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="secondary-actions">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary-action live interactive"
                      >
                        <ExternalLink size={15} />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary-action code interactive"
                      >
                        <GithubIcon size={15} />
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
