import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Leadership } from './components/Leadership';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { ResearchInterests } from './components/ResearchInterests';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

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
      {/* Skip to Content for Screen Readers & Keyboard Users */}
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>

      {/* Optimized 3D Background - Loaded only when needed */}
      {shouldLoadThree && (
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      )}

      {/* Global Navigation Header */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main">
        <Hero />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Leadership />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Certifications />
        <div className="section-divider" />
        <ResearchInterests />
        <div className="section-divider" />
        <Contact />
      </main>

      {/* Standard Footer */}
      <Footer />
    </>
  );
}
