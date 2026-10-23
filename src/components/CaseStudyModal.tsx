import React, { useEffect } from 'react';
import { X, Layers, Cpu, ShieldCheck, AlertCircle } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !project.caseStudy) return null;

  const { caseStudy } = project;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-category-tag">{project.category}</span>
            <span className="modal-status-badge">{project.status}</span>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 id="modal-project-title" className="modal-title">
            {project.title}
          </h2>
          <p className="modal-subtitle">{project.subtitle}</p>

          <div className="modal-section">
            <h3 className="modal-section-title">
              <Layers size={17} className="text-cyan" />
              <span>System Architecture & Overview</span>
            </h3>
            <p className="modal-overview-text">{caseStudy.overview}</p>
            <ul className="modal-architecture-list">
              {caseStudy.architecture.map((item, idx) => (
                <li key={idx} className="architecture-item">
                  <div className="item-bullet"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {caseStudy.modelsOrEngines && (
            <div className="modal-section">
              <h3 className="modal-section-title">
                <Cpu size={17} className="text-violet" />
                <span>Specialized AI Models & Computation Engines</span>
              </h3>
              <div className="modal-models-grid">
                {caseStudy.modelsOrEngines.map((m, idx) => (
                  <div key={idx} className="model-chip">
                    <span className="model-chip-dot"></span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-section">
            <h3 className="modal-section-title">
              <ShieldCheck size={17} className="text-emerald" />
              <span>Key Technical Highlights</span>
            </h3>
            <ul className="modal-highlights-list">
              {caseStudy.technicalHighlights.map((hl, idx) => (
                <li key={idx} className="highlight-list-item">
                  <span className="check-mark">✓</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">
              <AlertCircle size={17} className="text-amber" />
              <span>Engineering Challenges Overcome</span>
            </h3>
            <p className="modal-challenges-text">{caseStudy.challenges}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="modal-action-btn github"
            >
              <GithubIcon size={17} />
              <span>Inspect Repository Code</span>
            </a>
          )}
          <button 
            type="button" 
            className="modal-action-btn close"
            onClick={onClose}
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
};
