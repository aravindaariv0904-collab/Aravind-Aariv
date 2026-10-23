import type { Project, SkillCategory, ExperienceItem, LeadershipItem, CertificationItem, ResearchArea } from '../types';

export const PERSONAL_INFO = {
  name: 'Vejandla Aravind Aariv',
  shortName: 'Aravind Aariv',
  title: 'AI/ML Engineer | Generative AI & AI Agents | Full-Stack Developer',
  headline: 'Building Intelligent Systems That Solve Real-World Problems.',
  institution: 'Kalasalingam Academy of Research and Education',
  degree: 'B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
  graduationYear: '2029',
  cgpa: '8.73/10',
  location: 'Guntur, Andhra Pradesh, India',
  email: 'aariv948@gmail.com',
  github: 'https://github.com/aravindaariv0904-collab',
  linkedin: 'https://linkedin.com/in/vejandla-aravind-aariv',
  portfolioUrl: 'https://aravind-aariv.netlify.app/',
  resumePdfUrl: '/resume.pdf',
};

export const HERO_HIGHLIGHTS = [
  {
    icon: 'Trophy',
    label: 'SIH 2025 Grand Finale',
    sub: 'Team Lead & Finalist',
  },
  {
    icon: 'Rocket',
    label: 'Aspire Leadership 2026',
    sub: 'Started 21 Oct 2026 (In Progress)',
  },
  {
    icon: 'GraduationCap',
    label: '8.73 / 10 CGPA',
    sub: 'B.Tech CSE (AI & ML) · KARE',
  },
  {
    icon: 'Briefcase',
    label: 'AI Intern @ XTRAGRAD',
    sub: 'Applied AI & Model Deployment',
  },
];

export const ABOUT_TEXT = {
  heading: 'About Me',
  paragraphs: [
    "I'm an AI/ML-focused Computer Science and Engineering student interested in building intelligent applications that combine Generative AI, machine learning, agentic workflows, and full-stack engineering.",
    "My experience spans semantic search, AI-powered resume analysis, image authenticity detection, and AI-driven application development. I enjoy working across the development lifecycle, from designing system architectures and implementing backend services to building user interfaces and deploying applications.",
    "As a team lead at the Smart India Hackathon 2025 Grand Finale, I gained experience working on complex problem statements and coordinating technical development.",
    "I am also participating in the Aspire Leadership Programme 2026, which began on 21 October 2026, to further develop my leadership and professional capabilities.",
    "My current focus is on building technically rigorous AI systems, improving my engineering practices, and exploring opportunities in AI engineering, software development, and applied research.",
  ],
  focusPills: [
    'Agentic AI & Multi-Agent Workflows',
    'Generative AI & LLM Orchestration',
    'FAISS Semantic Search & Embeddings',
    'Full-Stack Next.js & FastAPI Architecture',
    'GIS & Spatial Parcel Analysis',
    'Quantum Algorithm Simulation',
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'bhooraksha',
    title: 'Bhooraksha',
    subtitle: 'AI-Powered Land Record Digitization and Validation',
    category: 'AI Engineering | Agentic AI | GIS | Digital Governance',
    desc: 'An AI-powered platform concept and implementation effort focused on digitizing historical land records, extracting structured information, validating records, and identifying potential inconsistencies for human review.',
    tags: ['FastAPI', 'MuRIL OCR', 'React 18', 'PostGIS', 'Multi-Agent AI', 'GIS'],
    github: 'https://github.com/bhoomi-netra/BHOORAKSHA',
    accentColor: '#10b981',
    status: 'SIH 2025 Grand Finale Implementation',
    isFlagship: true,
    metrics: [
      { label: 'AI Models', value: '10' },
      { label: 'Role Portals', value: '8 Microfrontends' },
      { label: 'Indic Languages', value: '18 Native' },
      { label: 'Spatial Engine', value: 'PostGIS Overlap' },
    ],
    caseStudy: {
      overview: 'Bhooraksha modernizes statewide government land administration by eliminating document forgery, fraudulent dual-registrations, cadastral boundary overlap, and multi-year mutation delays using automated document intelligence and geospatial validation.',
      architecture: [
        '8 Role-Specific Micro-Frontends: Strictly separated by statutory revenue hierarchy (Citizen, DEO/Patwari, Verifier/Girdawar, Legal Advisor, GIS Surveyor, Revenue Admin/Tehsildar, CCLA Admin).',
        'Multi-Agent Neural Pipeline: Asynchronous AI workers verifying scan quality, extracting bilingual entity fields, cross-referencing 30-year title deeds against court caveats, and verifying polygon parcels.',
        'Cryptographic Section-40 Audit Trail: Immutable append-only ledger with SHA-256 block digests recording all officer transitions and mutation dispatches.',
        'Cadastral GIS Engine: Vector parcel mapping, ULPIN centroid calculation, and millimeter-level polygon intersection detection.',
      ],
      technicalHighlights: [
        'AI-assisted document processing and information extraction.',
        'Record validation and inconsistency detection.',
        'GIS-based spatial analysis and parcel overlap calculation.',
        'Human-in-the-loop verification dashboards.',
        'Secure record management and cryptographic auditability.',
      ],
      modelsOrEngines: [
        'Chitrapathak Multimodal OCR',
        'MuRIL Indic Named-Entity Recognition',
        'LexBhoomi Statutory Rule Engine',
        'BhooNaksha Cadastral Georeferencer',
      ],
      challenges: 'Handling degraded 50-year-old physical revenue documents, supporting 18 official Indian regional scripts without font corruption, and performing millisecond-level PostGIS topological polygon intersection checks across dense rural land boundaries.',
    },
  },
  {
    id: 'qlearn',
    title: 'QLearn',
    subtitle: 'Quantum Algorithm Learning and Experimentation Platform',
    category: 'Quantum Computing | Educational Technology | Full-Stack Development',
    desc: 'An interactive quantum learning platform designed to help learners explore quantum computing concepts through structured learning, circuit experimentation, simulation, and programming.',
    tags: ['Next.js 14', 'TypeScript', 'FastAPI', 'Qiskit 1.0', 'Google Cirq', 'PennyLane'],
    github: 'https://github.com/bhoomi-netra/QLearn',
    accentColor: '#8b5cf6',
    status: 'Verified Working Engine (133/133 Tests Passing)',
    isFlagship: true,
    metrics: [
      { label: 'Test Suite', value: '133/133 Passing' },
      { label: 'Hilbert Space', value: '10 Qubits' },
      { label: 'Statevector Latency', value: '<5ms Sub-millisecond' },
      { label: 'Frameworks', value: 'Qiskit · Cirq · PennyLane' },
    ],
    caseStudy: {
      overview: 'QLearn is an interactive scientific quantum laboratory built for researchers and students, combining adaptive cognitive tutoring, Socratic AI mentorship, visual circuit synthesis, and parametric hypothesis testing without requiring expensive physical QPU time.',
      architecture: [
        'In-Process TypeScript Statevector Engine: Real-time analytical matrix operations on complex Hilbert spaces (C^(2^N)) up to 10 qubits with sub-5ms simulation latency.',
        'Python Quantum Microservice: FastAPI server integrating IBM Qiskit 1.x, Google Cirq, and Xanadu PennyLane for hardware transpilation and pulse-level noise modeling.',
        'Interactive Drag-and-Drop Gate Canvas: Visual circuit composer rendering phase disks, statevector probabilities, and interactive 3D Bloch sphere projections.',
      ],
      technicalHighlights: [
        'Quantum circuit experimentation and visual composition.',
        'Multi-framework quantum simulation (Statevector, Density Matrix, Noise).',
        'Interactive learning workflows with Socratic AI assistance.',
        'Rigorous automated verification with 133 unit and integration tests.',
      ],
      modelsOrEngines: [
        'IBM Qiskit 1.x Transpiler',
        'Google Cirq Circuit Synthesizer',
        'Xanadu PennyLane Variational Engine',
        'In-memory Complex Matrix Simulator',
      ],
      challenges: 'Simulating exponential 2^N statevectors efficiently in browser memory while maintaining numerical stability for complex unitary matrix transformations and tensor products.',
    },
  },
  {
    id: 'talent-ranker',
    title: 'Talent Intelligence Ranker',
    subtitle: 'AI-Powered Semantic Candidate Screening Engine',
    category: 'Generative AI Applications | Semantic Search | NLP',
    desc: 'An intelligent candidate-ranking application that uses semantic representations and vector retrieval to compare candidate profiles with job requirements.',
    tags: ['Python', 'FAISS', 'Sentence Transformers', 'Streamlit', 'Pandas', 'NumPy'],
    demo: 'https://aravind-aariv-talentranker.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/talent-ranker',
    accentColor: '#6366f1',
    status: 'Live Deployed System',
    isFlagship: true,
    metrics: [
      { label: 'Retrieval Speed', value: '<200ms' },
      { label: 'Vector Index', value: 'FAISS Flat' },
      { label: 'Embeddings', value: 'all-MiniLM-L6-v2' },
    ],
  },
  {
    id: 'resume-ai',
    title: 'AI Resume Analyzer',
    subtitle: 'ATS-Oriented Resume Evaluation & Gap Detection',
    category: 'Generative AI | Full-Stack Development',
    desc: 'An AI-powered resume analysis application designed to extract structured information from resumes, evaluate alignment with job descriptions, identify keyword gaps, and support ATS-oriented resume improvement.',
    tags: ['Python', 'FastAPI', 'Gemini API', 'React', 'Docker'],
    demo: 'https://aravind-aariv-airesumeanalyser.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/AI---RESUME-ANALYSER-',
    accentColor: '#06b6d4',
    status: 'Live Deployed Application',
  },
  {
    id: 'farm-seeva',
    title: 'FARM SEEVA',
    subtitle: 'AI-Enabled Agriculture & Crop Advisory Platform',
    category: 'Applied AI | Agriculture | Full-Stack Development',
    desc: 'An AI-enabled agriculture platform focused on making agricultural information and assistance more accessible through software-based workflows and AI integration.',
    tags: ['Node.js', 'Prisma', 'PostgreSQL', 'React', 'Gemini API', 'i18n'],
    demo: 'https://aravind-aariv-farmsevva.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/FARMSEVVA',
    accentColor: '#10b981',
    status: 'Live Deployed Application',
  },
  {
    id: 'vision-guard',
    title: 'VisionGuard AI',
    subtitle: 'Explainable Image Authenticity & Deepfake Classifier',
    category: 'Computer Vision | Explainable AI',
    desc: 'A computer vision application designed to classify image authenticity and explain model predictions through visual interpretability techniques.',
    tags: ['Python', 'EfficientNet-B0', 'Grad-CAM', 'FastAPI', 'React', 'Tailwind CSS', 'Docker'],
    demo: 'https://aravind-aariv-visionguardai.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/VisionGuard-AI',
    accentColor: '#ef4444',
    status: 'Production Prototype (~96–97% Validation Acc)',
  },
  {
    id: 'split-glass',
    title: 'SplitGlass Ledger',
    subtitle: 'Algorithmic Shared Expense & Debt Simplification',
    category: 'Full-Stack Development | Algorithms | Financial Utilities',
    desc: 'A financial utility application designed to simplify shared expenses and reduce outstanding balances using algorithmic debt simplification.',
    tags: ['React', 'Supabase RLS', 'TypeScript', 'Framer Motion'],
    demo: 'https://aravind-aariv-splitglass.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/SplitGlass',
    accentColor: '#f59e0b',
    status: 'Live Deployed Application',
  },
  {
    id: 'project-hub',
    title: 'ProjectHub',
    subtitle: 'Student Collaboration & Hackathon Platform',
    category: 'Full-Stack Development | Student Collaboration',
    desc: 'A student collaboration platform designed to support project discovery, team formation, and collaborative development across university cohorts.',
    tags: ['React 19', 'Vite', 'Supabase RLS', 'TypeScript'],
    github: 'https://github.com/aravindaariv0904-collab/projecthub2',
    accentColor: '#3b82f6',
    status: 'Active Codebase (Demo Deployment In Progress)',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Artificial Intelligence Intern',
    company: 'XTRAGRAD',
    location: 'Remote',
    period: 'July 2026 – Present',
    status: 'Current Role',
    bullets: [
      'Engineered VisionGuard AI, an explainable image authenticity platform using an EfficientNet-B0 classifier, achieving ~96–97% validation accuracy.',
      'Implemented Grad-CAM explainability heatmaps and a high-throughput FastAPI backend to serve real-time predictions to a modern React frontend.',
      'Containerized the full-stack system with Docker on AWS, integrating PostgreSQL to persist prediction records and audit verification data.',
      'Collaborated with senior ML engineers on model evaluation methodologies, inference benchmarking, and deployment pipelines.',
    ],
    tags: ['Python', 'FastAPI', 'EfficientNet-B0', 'Grad-CAM', 'Docker', 'AWS', 'PostgreSQL'],
  },
  {
    title: 'Team Lead — Smart India Hackathon 2025',
    company: 'Ministry of Education, Government of India',
    location: 'National Grand Finale',
    period: 'December 2025',
    bullets: [
      'Led a multidisciplinary 6-member engineering team through a complex national-level problem statement to the Grand Finale stage.',
      'Directed full-cycle system architecture for Bhooraksha: conceptualized multi-agent verification pipelines, GIS parcel boundaries, and 18-language localized interfaces.',
      'Selected among the top ~300 finalist teams nationwide from a competitive pool of 50,000+ student registrations.',
    ],
    tags: ['Team Leadership', 'Agentic AI', 'System Architecture', 'FastAPI', 'National Finalist'],
  },
];

export const LEADERSHIP: LeadershipItem = {
  title: 'Aspire Leadership Programme 2026',
  status: 'In Progress',
  startDate: '21 October 2026',
  category: 'Leadership Development | Professional Growth',
  description: 'Participating in the Aspire Leadership Programme 2026 as part of ongoing professional and leadership development alongside technical AI engineering and academic work.',
  highlights: [
    'Began on 21 October 2026 as an ongoing professional growth milestone.',
    'Focus on executive decision-making, ethical leadership, team collaboration, and communication skills.',
    'Integrating leadership methodologies with technical systems engineering and research initiatives.',
  ],
};

export const ACHIEVEMENTS = [
  {
    icon: 'Trophy',
    title: 'Smart India Hackathon 2025 — Grand Finale',
    role: 'Team Lead',
    desc: 'Led a multidisciplinary student team through a national-level problem statement to the Grand Finale stage evaluated by the Ministry of Education, Government of India.',
  },
  {
    icon: 'Compass',
    title: 'Aspire Leadership Programme 2026',
    role: 'Participant (Started 21 Oct 2026)',
    desc: 'Selected for intensive leadership and professional development programme focusing on cross-functional leadership and strategic problem solving.',
  },
  {
    icon: 'Award',
    title: 'Academic Achievement — 8.73 / 10 CGPA',
    role: 'Top Academic Percentile',
    desc: 'Consistent high academic performance across semesters in B.Tech CSE (AI & ML) at Kalasalingam Academy of Research and Education.',
  },
  {
    icon: 'Layers',
    title: 'National Hackathon Engagements',
    role: 'Competitor & Builder',
    desc: 'Participated in Bharatiya Antariksh Hackathon (BAH) 2026 and Coastal Innovation Hackathon (CIH) 2026 with applied AI solutions.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud (Skill Badge)',
    badge: 'Skill Badge',
  },
  {
    title: 'Generative AI Agents: Transform Your Organization',
    issuer: 'Google',
    badge: 'Specialization',
  },
  {
    title: 'AI + Sustainability Virtual Internship',
    issuer: 'IBM SkillsBuild',
    badge: 'Virtual Internship',
  },
  {
    title: 'Generate Reports with AI Research Agents',
    issuer: 'Microsoft Applied Skills',
    badge: 'Applied Skills Credential',
  },
  {
    title: 'Python Programming',
    issuer: 'CodeChef',
    badge: 'Verified Assessment',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte',
    badge: 'Job Simulation Certificate',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    group: 'Programming Languages',
    items: [
      { name: 'Python' },
      { name: 'C' },
      { name: 'SQL' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
    ],
  },
  {
    group: 'AI & Machine Learning',
    items: [
      { name: 'Generative AI' },
      { name: 'Large Language Models' },
      { name: 'AI Agents' },
      { name: 'RAG' },
      { name: 'Prompt Engineering' },
      { name: 'Machine Learning' },
      { name: 'Semantic Search' },
      { name: 'Embeddings' },
    ],
  },
  {
    group: 'Frameworks & Full-Stack',
    items: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'FastAPI' },
      { name: 'Streamlit' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    group: 'Data & Backend Systems',
    items: [
      { name: 'PostgreSQL' },
      { name: 'Supabase' },
      { name: 'FAISS' },
      { name: 'Prisma' },
    ],
  },
  {
    group: 'Cloud & Developer Tools',
    items: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'Vercel' },
      { name: 'Netlify' },
    ],
  },
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    title: 'Agentic AI and Multi-Agent Systems',
    description: 'Investigating autonomous multi-agent task decomposition, inter-agent consensus protocols, tool-calling frameworks, and asynchronous workflow execution.',
    keyTopics: ['Agent Orchestration', 'Tool Calling', 'Hierarchical Planning', 'Context Boundaries'],
  },
  {
    title: 'Generative AI Applications & RAG',
    description: 'Designing production-grade retrieval-augmented generation pipelines, structured JSON output validation, and dual-LLM routing mechanisms.',
    keyTopics: ['Dense Vector Retrieval', 'Hybrid Search', 'Context Window Optimization', 'Structured Output'],
  },
  {
    title: 'Semantic Search & Vector Retrieval',
    description: 'Benchmarking approximate nearest neighbor indices (FAISS, HNSW) for sub-millisecond similarity lookups over high-dimensional vector embeddings.',
    keyTopics: ['FAISS Indexing', 'SentenceTransformers', 'Cosine Similarity', 'Embedding Compression'],
  },
  {
    title: 'Computer Vision & Explainable AI',
    description: 'Applying visual interpretability techniques (Grad-CAM, saliency maps) to deep convolutional and vision-transformer architectures for verifiable authenticity detection.',
    keyTopics: ['Grad-CAM', 'EfficientNet', 'Authenticity Classification', 'Model Interpretability'],
  },
  {
    title: 'AI-Assisted Document Processing',
    description: 'Extracting structured data from degraded, multilingual scanned historical documents using Indic OCR, named-entity recognition, and rule-based validation.',
    keyTopics: ['Multilingual OCR', 'MuRIL NER', 'Spatial Document Layout', 'Human-in-the-Loop'],
  },
  {
    title: 'Quantum Computing Education & Simulation',
    description: 'Exploring pedagogical simulation architectures for quantum statevectors, Bloch sphere visualizations, and pulse-level noise modeling.',
    keyTopics: ['Hilbert Space Matrix Math', 'Qiskit Transpilation', 'Circuit Synthesis', 'Statevector Analysis'],
  },
];
