import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Clock,
  LayoutGrid,
  SlidersHorizontal
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { FEATURED_PROJECTS } from '@/data/featured-projects';
import { CarouselSqueeze } from '@/components/ui/carousel-squeeze';
import { CaseStudyModal } from './CaseStudyModal';
import type { Project } from '../types';

export const Projects: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'squeeze' | 'grid'>('squeeze');

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setViewMode('grid');
    }
  }, []);

  const flagshipProjects = FEATURED_PROJECTS.filter(p => p.isFlagship);
  const secondaryProjects = FEATURED_PROJECTS.filter(p => !p.isFlagship);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-lime" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="section-heading-text">
            Selected <span className="text-lime">Engineering</span> Projects
          </h2>
          <p className="section-subheading-text">
            Practical experimentation and production architectures across AI systems, intelligent agents, and full-stack software engineering.
          </p>

          {/* View Mode Switcher: Squeeze Carousel vs Structured Grid */}
          <div className="project-view-controls" role="toolbar" aria-label="Project showcase view options">
            <button
              type="button"
              className={`view-mode-btn interactive ${viewMode === 'squeeze' ? 'active' : ''}`}
              onClick={() => setViewMode('squeeze')}
              aria-pressed={viewMode === 'squeeze'}
            >
              <SlidersHorizontal size={16} />
              <span>Squeeze Carousel</span>
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
          </div>
        </div>

        {/* ── MODE 1: SQUEEZE CAROUSEL (PRIMARY INTERACTIVE EXPERIENCE) ── */}
        {viewMode === 'squeeze' ? (
          <div className="squeeze-showcase-wrapper">
            <CarouselSqueeze
              projects={FEATURED_PROJECTS}
              onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj as unknown as Project)}
            />
          </div>
        ) : (
          /* ── MODE 2: STRUCTURED GRID (ACCESSIBLE FULL DOSSIER) ── */
          <div className="structured-grid-wrapper">
            {/* Tier 1: Flagships */}
            <div className="flagship-showcase-group">
              <div className="group-title-row">
                <Layers size={18} className="text-lime" />
                <h3>Flagship AI & Scientific Systems</h3>
              </div>

              <div className="flagship-cards-grid">
                {flagshipProjects.map((project) => (
                  <div key={project.id} className="flagship-card interactive">
                    <div className="card-artwork-banner">
                      <img 
                        src={project.image} 
                        alt={project.imageAlt || project.title} 
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
                            onClick={() => setSelectedCaseStudy(project as unknown as Project)}
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
            </div>

            {/* Tier 2: Secondary Platforms */}
            <div className="secondary-showcase-group">
              <div className="group-title-row">
                <Cpu size={18} className="text-cyan" />
                <h3>Engineered Platforms & Applications</h3>
              </div>

              <div className="secondary-cards-grid">
                {secondaryProjects.map((project) => (
                  <div key={project.id} className="secondary-project-card interactive">
                    <div className="secondary-img-wrapper">
                      <img 
                        src={project.image} 
                        alt={project.imageAlt || project.title} 
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
        )}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
