import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';
import { EngineeringProfile } from './components/EngineeringProfile';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MagicCursor } from './components/MagicCursor';

// Dynamic lazy import: Three.js chunk loads only when motion is enabled
const ThreeBackground = lazy(() =>
  import('./components/ThreeBackground').then((m) => ({
    default: m.ThreeBackground,
  }))
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [shouldLoadThree, setShouldLoadThree] = useState(false);

  useEffect(() => {
    // Only load Three.js if user does NOT prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      setShouldLoadThree(true);
    }

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Magic Cursor with fluid trailing ring */}
      <MagicCursor />

      {/* Skip to Content for Screen Readers & Keyboard Accessibility */}
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>

      {/* Optimized 3D Background - Loaded only when needed */}
      {shouldLoadThree && (
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      )}

      {/* Global Navigation Header (5 Major Sections + Resume) */}
      <Navbar activeSection={activeSection} />

      {/* Main Content: 5 Primary Architectural Sections */}
      <main id="main">
        {/* Section 1: Home / Hero */}
        <Hero />
        <Marquee />

        <div className="section-divider" />

        {/* Section 2: Featured Work (Squeeze Carousel & Structured Grid) */}
        <Projects />

        <div className="section-divider" />

        {/* Section 3: Engineering Profile (About, Skills, Research, Certifications) */}
        <EngineeringProfile />

        <div className="section-divider" />

        {/* Section 4: Experience & Leadership Timeline */}
        <Experience />
        <Marquee reverse />

        <div className="section-divider" />

        {/* Section 5: Animated Contact & Professional Profile Experience */}
        <Contact />
      </main>

      {/* Standard Footer */}
      <Footer />
    </>
  );
}
