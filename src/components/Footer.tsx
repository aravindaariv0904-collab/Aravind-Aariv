import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content-row">
          <div className="footer-brand-col">
            <span className="footer-brand-name">{PERSONAL_INFO.name}</span>
            <p className="footer-brand-sub font-mono">
              AI/ML Engineer · B.Tech CSE (AI & ML) · KARE University
            </p>
          </div>

          <div className="footer-attribution font-mono">
            <span>Designed & Engineered by {PERSONAL_INFO.shortName}</span>
            <span className="footer-bullet">•</span>
            <span>React 19 & TypeScript</span>
            <span className="footer-bullet">•</span>
            <span>Netlify Edge</span>
          </div>

          <button
            type="button"
            className="btn-scroll-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright font-mono">
            © {new Date().getFullYear()} Vejandla Aravind Aariv. Verified Portfolio.
          </p>
        </div>
      </div>
    </footer>
  );
};
