export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  desc: string;
  tags: string[];
  demo?: string;
  github?: string;
  accentColor: string;
  status: string;
  isFlagship?: boolean;
  metrics?: { label: string; value: string }[];
  caseStudy?: {
    overview: string;
    architecture: string[];
    technicalHighlights: string[];
    modelsOrEngines?: string[];
    challenges: string;
  };
}

export interface SkillItem {
  name: string;
  iconName?: string;
}

export interface SkillCategory {
  group: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  period: string;
  status?: string;
  bullets: string[];
  tags: string[];
}

export interface LeadershipItem {
  title: string;
  status: string;
  startDate: string;
  category: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  badge?: string;
  credentialUrl?: string;
}

export interface ResearchArea {
  title: string;
  description: string;
  keyTopics: string[];
}
