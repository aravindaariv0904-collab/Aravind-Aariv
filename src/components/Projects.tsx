import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { CaseStudyModal } from './CaseStudyModal';

export const Projects: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'flagship' | 'ai' | 'fullstack'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'flagship') return p.isFlagship;
    if (filter === 'ai') return p.category.includes('AI') || p.category.includes('NLP') || p.category.includes('Vision');
    if (filter === 'fullstack') return p.category.includes('Full-Stack') || p.category.includes('Utilities') || p.category.includes('Collaboration');
    return true;
  });

  const flagshipProjects = filteredProjects.filter(p => p.isFlagship);
  const secondaryProjects = filteredProjects.filter(p => !p.isFlagship);

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
            Featured <span className="text-lime">Systems & Engineering</span> Projects
          </h2>
          <p className="section-subheading-text">
            Production-grade systems, autonomous agent architectures, and verified full-stack applications.
          </p>

          {/* Filter Pills */}
          <div className="project-filter-tabs">
            <button
              type="button"
              className={`filter-tab interactive ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Systems ({PROJECTS.length})
            </button>
            <button
              type="button"
              className={`filter-tab interactive ${filter === 'flagship' ? 'active' : ''}`}
              onClick={() => setFilter('flagship')}
            >
              Flagship Spotlights ({PROJECTS.filter(p => p.isFlagship).length})
            </button>
            <button
              type="button"
              className={`filter-tab interactive ${filter === 'ai' ? 'active' : ''}`}
              onClick={() => setFilter('ai')}
            >
              AI & Agents
            </button>
            <button
              type="button"
              className={`filter-tab interactive ${filter === 'fullstack' ? 'active' : ''}`}
              onClick={() => setFilter('fullstack')}
            >
              Full-Stack & Systems
            </button>
          </div>
        </div>

        {/* ── TIER 1: FLAGSHIP SHOWCASES ── */}
        {flagshipProjects.length > 0 && (
          <div className="flagship-showcase-group">
            <div className="group-title-row">
              <Layers size={18} className="text-lime" />
              <h3>Tier 1 — Flagship Engineering Spotlights</h3>
            </div>

            <div className="flagship-cards-grid">
              {flagshipProjects.map((project) => (
                <div key={project.id} className="flagship-card interactive">
                  <div className="flagship-card-header">
                    <div className="flagship-meta">
                      <span className="project-category-badge">{project.category}</span>
                      <span className="project-status-pill flagship">
                        <CheckCircle2 size={13} className="text-lime" />
                        <span>{project.status}</span>
                      </span>
                    </div>

                    <div className="flagship-title-block">
                      <h4 className="flagship-title">{project.title}</h4>
                      {project.subtitle && <p className="flagship-subtitle">{project.subtitle}</p>}
                    </div>
                  </div>

                  <p className="flagship-desc">{project.desc}</p>

                  {/* Metrics Row */}
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

                  {/* Action Buttons */}
                  <div className="flagship-card-actions">
                    {project.caseStudy && (
                      <button
                        type="button"
                        className="btn-action primary interactive"
                        onClick={() => setSelectedCaseStudy(project)}
                      >
                        <FileText size={16} />
                        <span>View System Case Study</span>
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
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TIER 2: SECONDARY PRODUCTION PLATFORMS ── */}
        {secondaryProjects.length > 0 && (
          <div className="secondary-showcase-group">
            <div className="group-title-row">
              <Cpu size={18} className="text-cyan" />
              <h3>Tier 2 — Production Web & AI Platforms</h3>
            </div>

            <div className="secondary-cards-grid">
              {secondaryProjects.map((project) => (
                <div key={project.id} className="secondary-project-card interactive">
                  <div className="secondary-card-header">
                    <span className="secondary-category">{project.category}</span>
                    <span className="secondary-status-badge">
                      {project.status.includes('Progress') ? (
                        <Clock size={12} className="text-amber" />
                      ) : (
                        <ShieldCheck size={12} className="text-lime" />
                      )}
                      <span>{project.status}</span>
                    </span>
                  </div>

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
              ))}
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
