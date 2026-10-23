export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  overview: string;
  architecture: string[];
  technicalHighlights: string[];
  modelsOrEngines?: string[];
  challenges: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  image: string;
  imageAlt: string;
  tags: string[];
  accentColor: string;
  status: string;
  isFlagship?: boolean;
  github?: string;
  demo?: string;
  metrics?: ProjectMetric[];
  caseStudy?: ProjectCaseStudy;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'bhooraksha',
    title: 'Bhooraksha',
    subtitle: 'AI-Powered Land Record Digitization and Spatial Validation',
    category: 'AI Engineering | Agentic AI | GIS | Digital Governance',
    desc: 'An AI-powered land-record digitization and validation platform designed to extract structured information from legacy documents, identify inconsistencies, support GIS-based cadastral conflict detection, and route uncertain cases for human review.',
    image: '/images/projects/bhooraksha.jpg',
    imageAlt: 'Bhooraksha Cadastral GIS parcel map and document intelligence pipeline',
    tags: ['FastAPI', 'MuRIL OCR', 'React 18', 'PostGIS', 'Multi-Agent AI', 'GIS'],
    github: 'https://github.com/bhoomi-netra/BHOORAKSHA',
    accentColor: '#10b981',
    status: 'SIH 2025 Grand Finale Implementation',
    isFlagship: true,
    metrics: [
      { label: 'AI Models', value: '10 Neural' },
      { label: 'Role Portals', value: '8 Microfrontends' },
      { label: 'Indic Scripts', value: '18 Native' },
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
    desc: 'An interactive quantum learning platform designed to help learners explore quantum computing concepts through structured learning, visual circuit experimentation, multi-framework simulation, and programming.',
    image: '/images/projects/qlearn.jpg',
    imageAlt: 'QLearn Quantum circuit composer workspace and statevector simulation engine',
    tags: ['Next.js 14', 'TypeScript', 'FastAPI', 'Qiskit 1.0', 'Google Cirq', 'PennyLane'],
    github: 'https://github.com/bhoomi-netra/QLearn',
    accentColor: '#8b5cf6',
    status: 'Verified Working Engine (133/133 Tests Passing)',
    isFlagship: true,
    metrics: [
      { label: 'Test Suite', value: '133/133 Passing' },
      { label: 'Hilbert Space', value: '10 Qubits' },
      { label: 'Statevector Latency', value: '<5ms Real-time' },
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
    desc: 'An AI-assisted candidate ranking and screening application that uses high-dimensional semantic representations and vector retrieval to compare candidate profiles with job requirements objectively.',
    image: '/images/projects/talent-ranker.jpg',
    imageAlt: 'Talent Intelligence Ranker candidate screening dashboard and similarity scoring',
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
    subtitle: 'ATS-Oriented Resume Evaluation & Keyword Gap Detection',
    category: 'Generative AI | NLP | Career Systems',
    desc: 'An AI-powered resume analysis platform designed to extract structured information from resumes, evaluate alignment with job descriptions, identify keyword gaps, and support ATS-oriented resume improvement.',
    image: '/images/projects/resume-ai.jpg',
    imageAlt: 'AI Resume Analyzer document inspection and ATS scoring breakdown',
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
    category: 'Applied AI | Agriculture | Accessibility',
    desc: 'An AI-enabled agriculture platform focused on making agricultural information and crop assistance more accessible through multilingual workflows, disease diagnostics, and farmer-friendly navigation.',
    image: '/images/projects/farm-seeva.jpg',
    imageAlt: 'FARM SEEVA crop health advisory dashboard and diagnostic cards',
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
    category: 'Computer Vision | Explainable AI | AI Safety',
    desc: 'A computer vision application designed to classify image authenticity and explain model predictions through visual interpretability techniques (Grad-CAM heatmaps).',
    image: '/images/projects/vision-guard.jpg',
    imageAlt: 'VisionGuard AI Grad-CAM heatmap visualization and deepfake detection interface',
    tags: ['Python', 'EfficientNet-B0', 'Grad-CAM', 'FastAPI', 'React', 'Docker'],
    demo: 'https://aravind-aariv-visionguardai.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/VisionGuard-AI',
    accentColor: '#ef4444',
    status: 'Production Prototype (~96–97% Validation Acc)',
  },
  {
    id: 'split-glass',
    title: 'SplitGlass Ledger',
    subtitle: 'Algorithmic Shared Expense & Debt Simplification',
    category: 'Software Engineering | Algorithms | Financial Utilities',
    desc: 'A financial utility application designed to simplify shared expenses and minimize outstanding cross-debt transactions using graph-based debt simplification algorithms.',
    image: '/images/projects/split-glass.jpg',
    imageAlt: 'SplitGlass Ledger group expense simplification and settlement graph',
    tags: ['React', 'Supabase RLS', 'TypeScript', 'Framer Motion'],
    demo: 'https://aravind-aariv-splitglass.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/SplitGlass',
    accentColor: '#f59e0b',
    status: 'Live Deployed Application',
  },
  {
    id: 'project-hub',
    title: 'ProjectHub',
    subtitle: 'Student Collaboration & Hackathon Team Platform',
    category: 'Full-Stack Development | Student Collaboration',
    desc: 'A student collaboration platform designed to support project discovery, hackathon team formation, and cross-cohort collaborative development across university programs.',
    image: '/images/projects/project-hub.jpg',
    imageAlt: 'ProjectHub student project directory and hackathon team builder interface',
    tags: ['React 19', 'Vite', 'Supabase RLS', 'TypeScript'],
    github: 'https://github.com/aravindaariv0904-collab/projecthub2',
    accentColor: '#3b82f6',
    status: 'Active Codebase (Demo Deployment In Progress)',
  },
];
