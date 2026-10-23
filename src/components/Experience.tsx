import React from 'react';
import { 
  Briefcase, 
  Rocket, 
  Trophy, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
} from 'lucide-react';

export const Experience: React.FC = () => {
  // Unified Chronological Timeline Items:
  // 1. Aspire Leadership Programme 2026 (Cohort 4 Fellow, 21 Oct 2026 – Present, In Progress)
  // 2. XTRAGRAD (AI Intern, 1 Jul 2026 – 1 Aug 2026, Completed)
  // 3. Smart India Hackathon 2025 (Grand Finale Team Lead, National Competition & Leadership)

  const timelineEntries = [
    {
      type: 'leadership',
      badgeLabel: 'Leadership Fellowship',
      title: 'Cohort 4 Fellow',
      organization: 'Aspire Leadership Programme 2026',
      period: '21 Oct 2026 – Present',
      status: 'In Progress',
      location: 'Global (Virtual Cohort)',
      icon: <Rocket size={18} className="text-cyan" />,
      bullets: [
        'Selected as a Cohort 4 Fellow in the Aspire Leadership Programme (started 21 October 2026), focusing on cross-functional executive leadership, ethical governance, and strategic execution.',
        'Engaging in intensive leadership masterclasses, strategic problem-solving case studies, and cross-cultural mentorship alongside emerging leaders worldwide.',
        'Synthesizing leadership principles with technical AI systems engineering, agentic architectures, and applied research initiatives.'
      ],
      tags: ['Leadership Development', 'Strategic Problem Solving', 'Ethical Governance', 'Cohort 4 Fellow', 'In Progress']
    },
    {
      type: 'internship',
      badgeLabel: 'AI Engineering Internship',
      title: 'Artificial Intelligence Intern',
      organization: 'XTRAGRAD',
      period: '1 Jul 2026 – 1 Aug 2026',
      status: 'Completed',
      location: 'Remote',
      icon: <Briefcase size={18} className="text-lime" />,
      bullets: [
        'Engineered VisionGuard AI, an explainable image authenticity platform using an EfficientNet-B0 classifier, achieving ~96–97% validation accuracy.',
        'Implemented Grad-CAM explainability heatmaps and a high-throughput FastAPI backend to serve real-time predictions to a modern React frontend.',
        'Containerized the full-stack system with Docker on AWS, integrating PostgreSQL to persist prediction records and audit verification data.',
        'Collaborated with senior ML engineers on model evaluation methodologies, inference benchmarking, and deployment pipelines.'
      ],
      tags: ['Python', 'FastAPI', 'EfficientNet-B0', 'Grad-CAM', 'Docker', 'AWS', 'PostgreSQL', 'Completed']
    },
    {
      type: 'competition',
      badgeLabel: 'National Hackathon Leadership',
      title: 'Grand Finale Team Lead',
      organization: 'Smart India Hackathon 2025',
      period: '2025 – 2026',
      status: 'National Finalist',
      location: 'Ministry of Education, Govt. of India',
      icon: <Trophy size={18} className="text-amber" />,
      bullets: [
        'Directed a multidisciplinary 6-member engineering team through national problem statements on AI-powered land administration and spatial parcel validation.',
        'Architected Bhooraksha: 8 microfrontends, multi-agent document verification neural pipeline (MuRIL Indic NER & OCR), and PostGIS topological intersection calculations.',
        'Presented working end-to-end demonstrations to government evaluators, qualifying for the prestigious Grand Finale stage.'
      ],
      tags: ['Smart India Hackathon', 'Team Lead', 'Bhooraksha', 'Multi-Agent AI', 'PostGIS', 'National Finalist']
    }
  ];

  return (
    <section id="experience" className="experience-timeline-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-lime" />
            <span>CAREER TRAJECTORY & IMPACT</span>
          </div>
          <h2 className="section-heading-text">
            Experience, <span className="text-lime">Leadership & Milestone</span> Timeline
          </h2>
          <p className="section-subheading-text">
            Chronological record of verified industry internships, prestigious leadership fellowships, and national engineering leadership achievements.
          </p>
        </div>

        {/* ── POLISHED CHRONOLOGICAL TIMELINE PATH ── */}
        <div className="timeline-journey-wrapper">
          <div className="timeline-central-spine" aria-hidden="true" />

          <div className="timeline-cards-stream">
            {timelineEntries.map((entry, idx) => {
              const isCurrent = entry.status === 'In Progress';

              return (
                <div 
                  key={idx} 
                  className={`timeline-entry-row interactive ${isCurrent ? 'current-active' : ''}`}
                >
                  {/* Timeline Marker Node */}
                  <div className="timeline-marker-node">
                    <div className="marker-icon-box">
                      {entry.icon}
                    </div>
                    {isCurrent && <span className="marker-live-ping" />}
                  </div>

                  {/* Timeline Content Card */}
                  <div className="timeline-content-card">
                    <div className="timeline-card-header">
                      <div className="timeline-role-info">
                        <div className="timeline-meta-pills">
                          <span className="entry-category-badge">{entry.badgeLabel}</span>
                          <span className={`entry-status-tag ${isCurrent ? 'in-progress' : 'completed'}`}>
                            <CheckCircle2 size={13} />
                            <span>{entry.status}</span>
                          </span>
                        </div>
                        <h3 className="timeline-item-title">{entry.title}</h3>
                        <h4 className="timeline-item-org">{entry.organization}</h4>
                      </div>

                      <div className="timeline-date-block">
                        <span className="timeline-date-range">{entry.period}</span>
                        {entry.location && (
                          <span className="timeline-location-tag">
                            <MapPin size={12} />
                            <span>{entry.location}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bullet Accomplishments */}
                    <ul className="timeline-bullets-list">
                      {entry.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>
                          <span className="bullet-indicator" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="timeline-tags-row">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="tech-badge secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
