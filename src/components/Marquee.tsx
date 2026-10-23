import React from 'react';

interface MarqueeProps {
  reverse?: boolean;
  className?: string;
}

const MARQUEE_ITEMS = [
  'AI/ML ENGINEERING',
  'GENERATIVE AI & AGENTS',
  'MULTI-AGENT WORKFLOWS',
  'SMART INDIA HACKATHON 2025',
  'BHOORAKSHA (GIS + AI)',
  'QLEARN QUANTUM LAB',
  'ASPIRE LEADERSHIP 2026',
  'KALASALINGAM ACADEMY',
  'SEMANTIC SEARCH & RAG',
  'FULL-STACK AI APPS',
];

export const Marquee: React.FC<MarqueeProps> = ({ reverse = false, className = '' }) => {
  return (
    <div className={`marquee-wrapper ${reverse ? 'marquee-reverse' : ''} ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
