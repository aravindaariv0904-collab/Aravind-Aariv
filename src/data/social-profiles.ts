export interface SocialProfile {
  id: string;
  name: string;
  badgeLabel: string;
  description: string;
  actionLabel: string;
  url: string;
  iconType: 'linkedin' | 'github' | 'discord' | 'email' | 'portfolio' | 'credly' | 'google-dev';
  isConfigured: boolean;
  isExternal: boolean;
  statusText?: string;
  copyValue?: string;
  copyTooltip?: string;
  accentColor: string;
  ariaLabel: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    badgeLabel: 'Professional Network',
    description: 'Professional profile, engineering achievements, and career trajectory.',
    actionLabel: 'Connect professionally',
    url: 'https://linkedin.com/in/vejandla-aravind-aariv',
    iconType: 'linkedin',
    isConfigured: true,
    isExternal: true,
    statusText: 'vejandla-aravind-aariv',
    accentColor: '#38bdf8',
    ariaLabel: 'Open LinkedIn profile of Vejandla Aravind Aariv in a new tab',
  },
  {
    id: 'github',
    name: 'GitHub',
    badgeLabel: 'Open Source & Code',
    description: 'Explore repositories, AI systems, agent architectures, and open code.',
    actionLabel: 'Explore repositories',
    url: 'https://github.com/aravindaariv0904-collab',
    iconType: 'github',
    isConfigured: true,
    isExternal: true,
    statusText: 'aravindaariv0904-collab',
    accentColor: '#a3e635',
    ariaLabel: 'Open GitHub repositories of Aravind Aariv in a new tab',
  },
  {
    id: 'discord',
    name: 'Discord',
    badgeLabel: 'Developer Community',
    description: 'Connect and collaborate with the developer community in real time.',
    actionLabel: 'Connect on Discord',
    url: 'https://discord.com',
    iconType: 'discord',
    isConfigured: true,
    isExternal: false,
    copyValue: 'aravind_aariv_00729',
    copyTooltip: 'Copy Discord tag',
    statusText: 'aravind_aariv_00729',
    accentColor: '#818cf8',
    ariaLabel: 'Copy Discord handle aravind_aariv_00729 or connect on Discord',
  },
  {
    id: 'email',
    name: 'Email',
    badgeLabel: 'Direct Communications',
    description: 'Reach out directly about AI engineering roles, projects, or technical collaboration.',
    actionLabel: 'Send an email',
    url: 'mailto:aariv948@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Aravind%20Aariv',
    iconType: 'email',
    isConfigured: true,
    isExternal: false,
    copyValue: 'aariv948@gmail.com',
    copyTooltip: 'Copy email address',
    statusText: 'aariv948@gmail.com',
    accentColor: '#34d399',
    ariaLabel: 'Send an email to aariv948@gmail.com or copy address',
  },
  {
    id: 'portfolio',
    name: 'Interactive Portfolio',
    badgeLabel: 'Live Experience',
    description: 'Explore engineering projects, interactive 3D orbit, and technical timeline.',
    actionLabel: 'Explore portfolio',
    url: '#home',
    iconType: 'portfolio',
    isConfigured: true,
    isExternal: false,
    statusText: 'aravind-aariv.netlify.app',
    accentColor: '#c084fc',
    ariaLabel: 'Return to portfolio top and explore projects',
  },
  {
    id: 'credly',
    name: 'Credly',
    badgeLabel: 'Verified Badges',
    description: 'Explore verified credentials, industry badges, and verified certifications.',
    actionLabel: 'View credentials',
    url: 'https://www.credly.com/users/aravind-aariv-vejandla',
    iconType: 'credly',
    isConfigured: true,
    isExternal: true,
    statusText: 'credly.com/users/aravind-aariv-vejandla',
    accentColor: '#f97316',
    ariaLabel: 'Open Credly verified credentials for Vejandla Aravind Aariv in a new tab',
  },
  {
    id: 'google-dev',
    name: 'Google Developer Profile',
    badgeLabel: 'Google Developer Ecosystem',
    description: 'Explore developer activities, Google Cloud skill badges, and learning credentials.',
    actionLabel: 'View developer profile',
    url: 'https://g.dev/Aravindaariv',
    iconType: 'google-dev',
    isConfigured: true,
    isExternal: true,
    statusText: 'g.dev/Aravindaariv',
    accentColor: '#60a5fa',
    ariaLabel: 'Open Google Developer Profile g.dev/Aravindaariv in a new tab',
  },
];
