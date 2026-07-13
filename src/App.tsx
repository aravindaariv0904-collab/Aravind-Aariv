import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'talent-ranker',
    icon: '🧠',
    iconBg: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))',
    title: 'Talent Intelligence Ranker',
    desc: 'AI recruiter cockpit ranking 100K+ candidates using FAISS semantic search & SentenceTransformers with sub-200ms retrieval.',
    tags: ['Python', 'FAISS', 'SentenceTransformers', 'Streamlit'],
    demo: 'https://aravind-aariv-talentranker.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/talent-ranker',
    accentColor: '#6366f1',
  },
  {
    id: 'ai-board',
    icon: '🎨',
    iconBg: 'linear-gradient(135deg,rgba(6,182,212,0.2),rgba(99,102,241,0.2))',
    title: 'AI Smart Whiteboard',
    desc: 'Collaborative Next.js canvas with Fabric.js ink-smoothing, Gemini SSE streaming routes, and real-time AI shape generation.',
    tags: ['Next.js', 'Fabric.js', 'Gemini API', 'Zustand'],
    demo: 'https://aravind-aariv-aiboard.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/ai-board',
    accentColor: '#06b6d4',
  },
  {
    id: 'research-ai',
    icon: '🔬',
    iconBg: 'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(236,72,153,0.2))',
    title: 'ResearchAI NEXUS OS',
    desc: 'Autonomous multi-hop web intelligence engine parsing 50+ sources per query, synthesizing via Gemini into D3 Knowledge Graphs.',
    tags: ['Next.js', 'Gemini API', 'D3.js', 'Context.dev'],
    demo: 'https://aravind-aariv-researchai.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/research-ai',
    accentColor: '#f97316',
  },
  {
    id: 'vision-guard',
    icon: '👁️',
    iconBg: 'linear-gradient(135deg,rgba(239,68,68,0.2),rgba(249,115,22,0.15))',
    title: 'VisionGuard-AI Cam',
    desc: 'Browser-native TensorFlow.js COCO-SSD surveillance dashboard with real-time bounding boxes at <50ms WebGL inference latency.',
    tags: ['React', 'TensorFlow.js', 'Canvas API', 'Vite'],
    demo: 'https://aravind-aariv-visionguardai.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/VisionGuard-AI',
    accentColor: '#ef4444',
  },
  {
    id: 'farm-seeva',
    icon: '🌾',
    iconBg: 'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.15))',
    title: 'Farm Seeva AI Platform',
    desc: 'Multilingual agricultural assistant with Gemini/Claude dual-LLM routing, NPK crop recommendations, and regional language localization.',
    tags: ['Node.js', 'Prisma', 'PostgreSQL', 'React', 'i18n'],
    demo: 'https://aravind-aariv-farmsevva.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/FARMSEVVA',
    accentColor: '#10b981',
  },
  {
    id: 'resume-ai',
    icon: '📄',
    iconBg: 'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(236,72,153,0.15))',
    title: 'AI Resume Analyzer',
    desc: 'Production ATS parser using Gemini structured output to score resumes, detect keyword gaps, and suggest targeted rewrites.',
    tags: ['Python', 'FastAPI', 'Gemini API', 'React'],
    demo: 'https://aravind-aariv-airesumeanalyser.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/AI---RESUME-ANALYSER-',
    accentColor: '#8b5cf6',
  },
  {
    id: 'genius-guide',
    icon: '🎓',
    iconBg: 'linear-gradient(135deg,rgba(217,70,239,0.2),rgba(99,102,241,0.15))',
    title: 'GeniusGuide LMS Monorepo',
    desc: 'Enterprise pnpm monorepo LMS mapping career paths with Prisma RLS multi-tenancy, interview modules, and peer mentorship.',
    tags: ['Next.js', 'PNPM', 'Prisma', 'PostgreSQL'],
    demo: 'https://aravind-aariv-geniusguide.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/-GeniusGuide-',
    accentColor: '#d946ef',
  },
  {
    id: 'project-hub',
    icon: '🏫',
    iconBg: 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(99,102,241,0.15))',
    title: 'ProjectHub Campus Network',
    desc: 'Student hackathon platform with Supabase RLS multi-tenant isolation, GitHub API imports, and real-time Kanban collaboration.',
    tags: ['Next.js', 'Supabase', 'GitHub API', 'TypeScript'],
    demo: 'https://aravind-aariv-projecthub.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/project-hub',
    accentColor: '#3b82f6',
  },
  {
    id: 'echostream',
    icon: '🎵',
    iconBg: 'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(236,72,153,0.2))',
    title: 'EchoStream Music Player',
    desc: 'Spotify-inspired player with JioSaavn API, 60fps Web Audio FFT visualizer, and custom canvas seek timeline rendering.',
    tags: ['React', 'Web Audio API', 'Canvas API', 'Vite'],
    demo: 'https://aravind-aariv-mymusic.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/my-music-',
    accentColor: '#a855f7',
  },
  {
    id: 'split-glass',
    icon: '💸',
    iconBg: 'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(249,115,22,0.15))',
    title: 'SplitGlass Expense Ledger',
    desc: 'Glassmorphic expense splitter using O(N log N) greedy debt simplification, Supabase RLS group isolation, and Framer Motion.',
    tags: ['React', 'Supabase', 'TypeScript', 'Framer Motion'],
    demo: 'https://aravind-aariv-splitglass.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/SplitGlass',
    accentColor: '#f59e0b',
  },
  {
    id: 'worst-ui',
    icon: '⚡',
    iconBg: 'linear-gradient(135deg,rgba(239,68,68,0.2),rgba(245,158,11,0.15))',
    title: 'Anti-Gravity Chaos Game',
    desc: 'Creative anti-UX game with screen shakes, fleeing buttons, inverted controls, retro CRT oscillators, and Web Audio beeps.',
    tags: ['HTML5 Canvas', 'Web Audio', 'CSS', 'VanillaJS'],
    demo: 'https://aravind-aariv-worstui.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/worst-UI',
    accentColor: '#ef4444',
  },
  {
    id: 'python-utils',
    icon: '🐍',
    iconBg: 'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.15))',
    title: 'Python CLI Utilities Console',
    desc: 'Retro CRT web terminal running JS-translated Python utilities — ATM, calculator, expense tracker, and CLI games in the browser.',
    tags: ['Python', 'Pytest', 'HTML Canvas', 'CLI'],
    demo: 'https://aravind-aariv-pythonprojects.netlify.app',
    github: 'https://github.com/aravindaariv0904-collab/python-projects',
    accentColor: '#10b981',
  },
];

const SKILLS = [
  { group: 'Languages', items: [
    { icon: '🐍', name: 'Python' },
    { icon: '📘', name: 'TypeScript' },
    { icon: '🟨', name: 'JavaScript' },
    { icon: '©️', name: 'C' },
    { icon: '🗄️', name: 'SQL' },
  ]},
  { group: 'Frontend', items: [
    { icon: '⚛️', name: 'React' },
    { icon: '▲', name: 'Next.js' },
    { icon: '💨', name: 'Tailwind CSS' },
    { icon: '⚡', name: 'Vite' },
    { icon: '🎭', name: 'Framer Motion' },
  ]},
  { group: 'Backend & Data', items: [
    { icon: '🚀', name: 'FastAPI' },
    { icon: '🟢', name: 'Node.js' },
    { icon: '🐘', name: 'PostgreSQL' },
    { icon: '🔺', name: 'Supabase' },
    { icon: '🔷', name: 'Prisma ORM' },
  ]},
  { group: 'AI & ML', items: [
    { icon: '🧠', name: 'Gemini API' },
    { icon: '🤖', name: 'Claude API' },
    { icon: '🔍', name: 'FAISS' },
    { icon: '📊', name: 'TF.js' },
    { icon: '💡', name: 'Prompt Eng.' },
  ]},
  { group: 'Cloud & DevOps', items: [
    { icon: '☁️', name: 'AWS' },
    { icon: '🐳', name: 'Docker' },
    { icon: '🌐', name: 'Netlify' },
    { icon: '▲', name: 'Vercel' },
    { icon: '🐙', name: 'GitHub' },
  ]},
];

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Smart India Hackathon 2025 — Grand Finale', desc: 'Team Lead. One of ~300 finalists selected nationwide from 50,000+ registrations. Ministry of Education, Govt. of India.' },
  { icon: '⭐', title: '8.82 CGPA — Top Academic Percentile', desc: 'Consistent high academic performer across 6 semesters in B.Tech CSE (AI & ML) at KARE University.' },
  { icon: '🚀', title: '13 Production Repositories Deployed', desc: 'Fully audited, refactored, tested, and deployed every personal project to Netlify with live demo URLs.' },
  { icon: '💼', title: 'AI Intern — Xtragrad Pvt. Ltd.', desc: 'Selected for flagship AI engineering internship cohort, contributing to production ML systems and deployments.' },
];

// ─────────────────────────────────────────────
//  THREE.JS BACKGROUND
// ─────────────────────────────────────────────
function ThreeBackground() {
  const mountRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    // Particle geometry
    const count = 2200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#818cf8'),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Connection lines between nearby particles
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const threshold = 120;
    const maxLines = 600;
    let lineCount = 0;

    for (let i = 0; i < count && lineCount < maxLines; i++) {
      for (let j = i + 1; j < count && lineCount < maxLines; j++) {
        const dx = positions[i*3] - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < threshold) {
          linePositions.push(
            positions[i*3], positions[i*3+1], positions[i*3+2],
            positions[j*3], positions[j*3+1], positions[j*3+2]
          );
          const alpha = 1 - dist / threshold;
          lineColors.push(0.38*alpha, 0.40*alpha, 0.95*alpha, 0.54*alpha, 0.36*alpha, 0.98*alpha);
          lineCount++;
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.18 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Sprite texture for particles
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 32; spriteCanvas.height = 32;
    const ctx = spriteCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);

    const mat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      map: spriteTex,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      points.rotation.x = t * 0.018 + mouseY * 0.05;
      points.rotation.y = t * 0.025 + mouseX * 0.05;
      lines.rotation.x = points.rotation.x;
      lines.rotation.y = points.rotation.y;

      camera.position.x += (mouseX * 30 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 20 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={mountRef} id="three-canvas" />;
}

// ─────────────────────────────────────────────
//  TILT CARD
// ─────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = -((y - cy) / cy) * 10;
    const rotY = ((x - cx) / cx) * 10;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    const inner = card.querySelector('.project-card-shine') as HTMLElement;
    if (inner) {
      inner.style.setProperty('--mouse-x', `${px}%`);
      inner.style.setProperty('--mouse-y', `${py}%`);
    }
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  };

  const handleMouseEnter = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transition = 'transform 0.1s linear, border-color 0.4s, box-shadow 0.4s';
  };

  return (
    <div className={`project-tilt-wrapper ${className}`}>
      <div
        ref={ref}
        className="project-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SCROLL FADE
// ─────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const heroRef = useFadeUp();
  const aboutRef = useFadeUp();
  const projectsRef = useFadeUp();
  const skillsRef = useFadeUp();
  const expRef = useFadeUp();
  const achRef = useFadeUp();
  const connectRef = useFadeUp();

  return (
    <>
      <ThreeBackground />

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="#home" className="navbar-logo">Aravind Aariv</a>
        <ul className="navbar-links">
          {['home','about','projects','skills','experience','connect'].map(s => (
            <li key={s}>
              <a
                href={`#${s}`}
                style={{ color: activeSection === s ? 'var(--text)' : undefined }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:aravindaariv0904@gmail.com"
              className="navbar-cta"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section id="home">
        <div className="container">
          <div className="hero-inner">

            {/* Left */}
            <div ref={heroRef} className="fade-up">
              <div className="hero-badge">Available for Internships</div>

              <h1 className="hero-title">
                Aravind Aariv<br />
                <span className="gradient-text">AI Engineer &</span>
                <span className="gradient-text">Full-Stack Architect</span>
              </h1>

              <p className="hero-desc">
                B.Tech CSE (AI & ML) student at KARE University · 8.82 CGPA · SIH 2025 Grand Finalist.
                Building production-grade AI systems — LLM pipelines, FAISS semantic search, Next.js applications, and ML-powered tools — ready for MNC internships.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  <span>⚡</span> View Projects
                </a>
                <a href="https://aravind-aariv.netlify.app" target="_blank" rel="noreferrer" className="btn-outline">
                  <span>🌐</span> Portfolio
                </a>
                <a href="mailto:aravindaariv0904@gmail.com" className="btn-outline">
                  <span>✉️</span> Contact
                </a>
              </div>

              <div className="hero-stats">
                <div className="hero-stat-item">
                  <div className="hero-stat-number">13+</div>
                  <div className="hero-stat-label">Live Projects</div>
                </div>
                <div className="hero-stat-item">
                  <div className="hero-stat-number">8.82</div>
                  <div className="hero-stat-label">CGPA</div>
                </div>
                <div className="hero-stat-item">
                  <div className="hero-stat-number">SIH '25</div>
                  <div className="hero-stat-label">Grand Finalist</div>
                </div>
              </div>
            </div>

            {/* Right — 3D Floating Card */}
            <div className="hero-3d-panel">
              <div className="hero-orb hero-orb-1" />
              <div className="hero-orb hero-orb-2" />
              <div className="hero-orb hero-orb-3" />
              <div className="hero-3d-card">
                <div className="hero-card-face">
                  <div className="card-badge">🟢 AI ENGINEER</div>
                  <div>
                    <div className="card-name">Aravind Aariv</div>
                    <div className="card-role">Principal AI Engineer · Full-Stack Architect</div>
                  </div>
                  <div className="card-skills">
                    <span className="card-skill-pill indigo">Gemini API</span>
                    <span className="card-skill-pill violet">FAISS</span>
                    <span className="card-skill-pill pink">Next.js</span>
                    <span className="card-skill-pill cyan">TensorFlow.js</span>
                    <span className="card-skill-pill emerald">FastAPI</span>
                    <span className="card-skill-pill indigo">Supabase</span>
                    <span className="card-skill-pill violet">Prisma</span>
                    <span className="card-skill-pill pink">Claude API</span>
                  </div>
                  <div className="card-metrics">
                    <div className="card-metric">
                      <div className="card-metric-val">13+</div>
                      <div className="card-metric-label">Projects Live</div>
                    </div>
                    <div className="card-metric">
                      <div className="card-metric-val">100K+</div>
                      <div className="card-metric-label">Records Indexed</div>
                    </div>
                    <div className="card-metric">
                      <div className="card-metric-val">8.82</div>
                      <div className="card-metric-label">CGPA</div>
                    </div>
                    <div className="card-metric">
                      <div className="card-metric-val">SIH '25</div>
                      <div className="card-metric-label">Finalist</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about">
        <div className="container">
          <div className="section-header">
            <div className="section-label">ABOUT ME</div>
            <h2 className="section-title">Engineering <span>intelligent systems</span> for the real world</h2>
          </div>
          <div ref={aboutRef} className="about-grid fade-up">

            {/* Profile Card */}
            <div className="about-card">
              <div className="about-avatar">AA</div>
              <div className="about-name">Aravind Aariv Vejandla</div>
              <div className="about-role">AI Engineer · Full-Stack Developer · SIH 2025 Grand Finalist</div>
              <ul className="about-info-list">
                <li className="about-info-item">
                  <span className="about-info-icon">📍</span>
                  Guntur, Andhra Pradesh, India
                </li>
                <li className="about-info-item">
                  <span className="about-info-icon">🎓</span>
                  B.Tech CSE (AI & ML) · KARE University · 8.82 CGPA
                </li>
                <li className="about-info-item">
                  <span className="about-info-icon">💼</span>
                  AI Intern @ Xtragrad Pvt. Ltd. · Jul 2026–Present
                </li>
                <li className="about-info-item">
                  <span className="about-info-icon">✉️</span>
                  aravindaariv0904@gmail.com
                </li>
                <li className="about-info-item">
                  <span className="about-info-icon">🌐</span>
                  <a href="https://aravind-aariv.netlify.app" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>aravind-aariv.netlify.app</a>
                </li>
              </ul>
            </div>

            {/* Content */}
            <div className="about-content">
              <h3>Turning <span>cutting-edge AI research</span> into production systems</h3>
              <p>
                I'm a B.Tech Computer Science & Engineering (AI & ML) student passionate about building intelligent systems that solve real problems at scale. My work spans LLM orchestration, vector search engines, real-time collaborative tools, and full-stack AI products.
              </p>
              <p>
                With a 8.82 CGPA and hands-on production experience, I've architected and deployed 13 live projects — from FAISS-powered candidate screening engines to browser-native TensorFlow.js surveillance dashboards. I led a multidisciplinary team to the <strong style={{ color: 'var(--text)' }}>Smart India Hackathon 2025 Grand Finale</strong>, evaluated by India's Ministry of Education.
              </p>
              <p>
                Currently interning at <strong style={{ color: 'var(--violet)' }}>Xtragrad Pvt. Ltd.</strong> as an AI Engineer, building and deploying production ML features. Actively seeking high-impact SDE/AI Engineer internships at product-first MNC companies.
              </p>
              <div className="about-highlights">
                <div className="highlight-chip"><span className="highlight-chip-icon">🧠</span> LLM & Multi-Agent Systems</div>
                <div className="highlight-chip"><span className="highlight-chip-icon">🔍</span> FAISS Vector Search</div>
                <div className="highlight-chip"><span className="highlight-chip-icon">⚡</span> Next.js App Router</div>
                <div className="highlight-chip"><span className="highlight-chip-icon">🌾</span> Multilingual AI Products</div>
                <div className="highlight-chip"><span className="highlight-chip-icon">🔐</span> Supabase RLS Security</div>
                <div className="highlight-chip"><span className="highlight-chip-icon">👁️</span> Browser-Native ML</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════ */}
      <section id="projects">
        <div className="container">
          <div className="section-header">
            <div className="section-label">PROJECTS</div>
            <h2 className="section-title">Production-grade <span>AI systems & tools</span></h2>
          </div>
          <div ref={projectsRef} className="projects-grid fade-up">
            {PROJECTS.map((proj) => (
              <TiltCard key={proj.id}>
                <div className="project-card-shine" />

                <div className="project-card-header">
                  <div className="project-icon-wrapper" style={{ background: proj.iconBg }}>
                    {proj.icon}
                  </div>
                  <div className="project-links">
                    <a href={proj.demo} target="_blank" rel="noreferrer" className="project-link-btn" title="Live Demo">🚀</a>
                    <a href={proj.github} target="_blank" rel="noreferrer" className="project-link-btn" title="GitHub">⌨️</a>
                  </div>
                </div>

                <div className="project-card-body">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="project-tags">
                    {proj.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>

                <div className="project-card-footer">
                  <a href={proj.demo} target="_blank" rel="noreferrer" className="project-btn-demo">
                    ↗ Live Demo
                  </a>
                  <a href={proj.github} target="_blank" rel="noreferrer" className="project-btn-code">
                    GitHub
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════
          TECH STACK
      ══════════════════════════════════════════ */}
      <section id="skills">
        <div className="container">
          <div className="section-header">
            <div className="section-label">TECH STACK</div>
            <h2 className="section-title">Tools & <span>technologies</span> I master</h2>
          </div>
          <div ref={skillsRef} className="fade-up">
            {SKILLS.map(group => (
              <div key={group.group}>
                <div className="skills-category-title">{group.group}</div>
                <div className="skills-grid">
                  {group.items.map(skill => (
                    <div key={skill.name} className="skill-card">
                      <span className="skill-icon">{skill.icon}</span>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════════ */}
      <section id="experience">
        <div className="container">
          <div className="section-header">
            <div className="section-label">EXPERIENCE</div>
            <h2 className="section-title">Where I've <span>built & shipped</span></h2>
          </div>
          <div ref={expRef} className="experience-timeline fade-up">

            <div className="exp-item">
              <div className="exp-dot" />
              <div className="exp-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-title">Artificial Intelligence Intern</div>
                    <div className="exp-company">Xtragrad Pvt. Ltd.</div>
                  </div>
                  <div className="exp-date">Jul 2026 – Present</div>
                </div>
                <ul className="exp-bullets">
                  <li>Developing and testing AI-powered application features using Python and modern ML frameworks including TensorFlow and Scikit-learn</li>
                  <li>Building data preprocessing pipelines and inference workflows for intelligent automation systems with measurable performance benchmarks</li>
                  <li>Collaborating with senior ML engineers to iterate on model architecture, prompting strategies, and evaluation metrics</li>
                  <li>Gaining hands-on exposure to AI deployment infrastructure, API integration patterns, and real-world MLOps best practices</li>
                </ul>
                <div className="exp-tags">
                  {['Python', 'Machine Learning', 'TensorFlow', 'FastAPI', 'AI APIs', 'Data Engineering'].map(t => (
                    <span key={t} className="exp-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="exp-item">
              <div className="exp-dot" />
              <div className="exp-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-title">Team Lead — Smart India Hackathon 2025</div>
                    <div className="exp-company">Ministry of Education, Government of India</div>
                  </div>
                  <div className="exp-date">Dec 2025</div>
                </div>
                <ul className="exp-bullets">
                  <li>Led a multidisciplinary 6-member team to design and develop an AI-powered solution for a national-level problem statement</li>
                  <li>Managed full project execution — technical development, architecture decisions, and final stage presentation at Grand Finale</li>
                  <li>Selected as one of ~300 finalist teams from 50,000+ registrations across the country</li>
                </ul>
                <div className="exp-tags">
                  {['Python', 'Generative AI', 'Team Leadership', 'Product Engineering', 'National Competition'].map(t => (
                    <span key={t} className="exp-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════
          ACHIEVEMENTS
      ══════════════════════════════════════════ */}
      <section id="achievements">
        <div className="container">
          <div className="section-header">
            <div className="section-label">ACHIEVEMENTS</div>
            <h2 className="section-title">Recognition & <span>milestones</span></h2>
          </div>
          <div ref={achRef} className="achievements-grid fade-up">
            {ACHIEVEMENTS.map(a => (
              <div key={a.title} className="achievement-card">
                <div className="achievement-icon-box">{a.icon}</div>
                <div>
                  <div className="achievement-title">{a.title}</div>
                  <div className="achievement-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════
          CONNECT
      ══════════════════════════════════════════ */}
      <section id="connect">
        <div className="container">
          <div ref={connectRef} className="connect-inner fade-up">
            <div className="connect-title">
              Let's build something <span>extraordinary together</span>
            </div>
            <p className="connect-desc">
              Open to SDE, AI Engineer, and ML Engineer internships at MNC companies. Let's talk about how I can contribute to your team.
            </p>
            <div className="connect-links">
              <a href="mailto:aravindaariv0904@gmail.com" className="connect-link primary">✉️ Send Email</a>
              <a href="https://linkedin.com/in/vejanda-aravind-aariv-4bb641379" target="_blank" rel="noreferrer" className="connect-link secondary">💼 LinkedIn</a>
              <a href="https://github.com/aravindaariv0904-collab" target="_blank" rel="noreferrer" className="connect-link secondary">⌨️ GitHub</a>
              <a href="https://www.instagram.com/aravindaariv/" target="_blank" rel="noreferrer" className="connect-link secondary">📸 Instagram</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <p className="footer-text">
            Built by <span>Aravind Aariv Vejandla</span> · Deployed on <span>Netlify</span> · All 13 projects live at <span>aravind-aariv.netlify.app</span>
          </p>
        </div>
      </footer>
    </>
  );
}
