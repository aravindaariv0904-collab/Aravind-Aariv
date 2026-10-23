import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { GithubIcon } from '../Icons';
import { cn } from '@/lib/utils';
import type { FeaturedProject } from '@/data/featured-projects';

export interface CarouselSqueezeProps {
  projects: FeaturedProject[];
  defaultActiveIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  height?: string | number;
  className?: string;
  onSelectProject?: (project: FeaturedProject) => void;
  onOpenCaseStudy?: (project: FeaturedProject) => void;
}

export const CarouselSqueeze: React.FC<CarouselSqueezeProps> = ({
  projects = [],
  defaultActiveIndex = 0,
  autoPlay = false,
  autoPlayInterval = 5000,
  height = '460px',
  className,
  onSelectProject,
  onOpenCaseStudy,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, Math.min(defaultActiveIndex, projects.length - 1))
  );
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const total = projects.length;

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (index: number) => {
    if (index === activeIndex || index < 0 || index >= total) return;
    setActiveIndex(index);
    if (onSelectProject) {
      onSelectProject(projects[index]);
    }
  };

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    }
  };

  // Autoplay handler
  useEffect(() => {
    if (!isPlaying || isHovered || isReducedMotion || total <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, isReducedMotion, autoPlayInterval, goToNext, total]);

  // Handle empty state gracefully
  if (!projects || projects.length === 0) {
    return (
      <div className="squeeze-empty-state">
        <p>No featured projects available.</p>
      </div>
    );
  }

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <div 
      className={cn('carousel-squeeze-root', className)}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected Engineering Projects Carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── TOP SQUEEZE SLATS TRACK ── */}
      <div 
        className={cn('squeeze-viewport', isReducedMotion && 'reduced-motion')}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div className="squeeze-panels-track">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={project.id}
                role="tab"
                id={`squeeze-panel-${project.id}`}
                aria-selected={isActive}
                aria-controls={`squeeze-panel-content-${project.id}`}
                tabIndex={0}
                className={cn(
                  'squeeze-panel interactive',
                  isActive ? 'panel-expanded' : 'panel-slat',
                  isReducedMotion && 'no-transition'
                )}
                onClick={() => handleSelect(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(idx);
                  }
                }}
                style={{
                  borderColor: isActive ? project.accentColor : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Panel Hero Artwork */}
                <div className="squeeze-panel-bg">
                  <img
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    className="squeeze-panel-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  <div 
                    className="squeeze-gradient-overlay" 
                    style={{
                      background: isActive 
                        ? 'linear-gradient(to top, rgba(10, 11, 15, 0.94) 0%, rgba(10, 11, 15, 0.45) 50%, rgba(10, 11, 15, 0.2) 100%)'
                        : 'linear-gradient(to top, rgba(10, 11, 15, 0.9) 0%, rgba(10, 11, 15, 0.6) 100%)'
                    }}
                  />
                </div>

                {/* Narrow Slat View: Vertical Title & Category Bar */}
                {!isActive && (
                  <div className="slat-vertical-label">
                    <span className="slat-index">0{idx + 1}</span>
                    <span className="slat-title">{project.title}</span>
                    <span 
                      className="slat-dot" 
                      style={{ backgroundColor: project.accentColor }} 
                    />
                  </div>
                )}

                {/* Expanded Panel Overlay Info */}
                {isActive && (
                  <div className="expanded-panel-overlay">
                    <div className="expanded-top-badges">
                      <span className="expanded-category-badge">
                        {project.category.split('|')[0].trim()}
                      </span>
                      <span className="expanded-status-badge">
                        {project.status.includes('Progress') ? (
                          <Clock size={12} className="text-amber" />
                        ) : (
                          <CheckCircle2 size={12} style={{ color: project.accentColor }} />
                        )}
                        <span>{project.status}</span>
                      </span>
                    </div>

                    <div className="expanded-bottom-banner">
                      <span className="expanded-counter">
                        Project 0{idx + 1} / 0{total}
                      </span>
                      <h3 className="expanded-title">{project.title}</h3>
                      <p className="expanded-subtitle">{project.subtitle}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CAROUSEL TOOLBAR CONTROLS ── */}
      <div className="squeeze-controls-bar">
        {/* Navigation Arrows */}
        <div className="squeeze-nav-arrows">
          <button
            type="button"
            className="squeeze-arrow-btn interactive"
            onClick={goToPrev}
            aria-label="Previous project"
            title="Previous project (Left Arrow)"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="squeeze-pagination-text">
            <strong>0{activeIndex + 1}</strong> / 0{total}
          </span>

          <button
            type="button"
            className="squeeze-arrow-btn interactive"
            onClick={goToNext}
            aria-label="Next project"
            title="Next project (Right Arrow)"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Squeeze Indicator Dots */}
        <div className="squeeze-indicators-track" role="tablist" aria-label="Project thumbnails">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Jump to ${p.title}`}
              className={cn(
                'squeeze-dot-btn interactive',
                i === activeIndex && 'active'
              )}
              onClick={() => handleSelect(i)}
            >
              <span className="sr-only">{p.title}</span>
            </button>
          ))}
        </div>

        {/* Optional Autoplay Toggle */}
        {autoPlay && (
          <button
            type="button"
            className="squeeze-autoplay-toggle interactive"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
      </div>

      {/* ── ACTIVE PROJECT DETAILED PRESENTATION (Beneath Squeeze Panels) ── */}
      <div 
        id={`squeeze-panel-content-${activeProject.id}`}
        className="squeeze-detail-card"
        role="tabpanel"
        aria-labelledby={`squeeze-panel-${activeProject.id}`}
      >
        <div className="squeeze-detail-header">
          <div className="squeeze-detail-titles">
            <div className="squeeze-meta-row">
              <span className="project-category-badge">{activeProject.category}</span>
              <span className="squeeze-status-pill">
                <ShieldCheck size={13} style={{ color: activeProject.accentColor }} />
                <span>{activeProject.status}</span>
              </span>
            </div>

            <h3 className="squeeze-active-title">{activeProject.title}</h3>
            {activeProject.subtitle && (
              <h4 className="squeeze-active-subtitle">{activeProject.subtitle}</h4>
            )}
          </div>

          {/* Action Buttons */}
          <div className="squeeze-actions-group">
            {activeProject.demo && (
              <a
                href={activeProject.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-action live interactive"
              >
                <ExternalLink size={16} />
                <span>View Live Demo</span>
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
                <span>View on GitHub</span>
              </a>
            )}

            {activeProject.caseStudy && onOpenCaseStudy && (
              <button
                type="button"
                className="btn-action primary interactive"
                onClick={() => onOpenCaseStudy(activeProject)}
              >
                <FileText size={16} />
                <span>View System Case Study</span>
              </button>
            )}
          </div>
        </div>

        <p className="squeeze-detail-desc">{activeProject.desc}</p>

        {/* Verified Metrics Strip */}
        {activeProject.metrics && activeProject.metrics.length > 0 && (
          <div className="squeeze-metrics-grid">
            {activeProject.metrics.map((m, mIdx) => (
              <div key={mIdx} className="squeeze-metric-box">
                <span className="squeeze-metric-value">{m.value}</span>
                <span className="squeeze-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Verified Technology Stack Badges */}
        <div className="project-tags-wrap">
          {activeProject.tags.map((tag) => (
            <span key={tag} className="tech-badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
