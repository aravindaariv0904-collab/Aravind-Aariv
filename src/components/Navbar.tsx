import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#journey', label: 'Journey' },
    { href: '#experience', label: 'Experience' },
    { href: '#leadership', label: 'Leadership' },
    { href: '#skills', label: 'Tech Stack' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#research', label: 'Exploration' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#home" className="navbar-brand interactive">
            <span className="brand-dot" />
            <span className="brand-text">{PERSONAL_INFO.shortName}</span>
            <span className="brand-badge">AI/ML</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav-link interactive ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="navbar-actions">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Vejandla_Aravind_Aariv_Resume.pdf"
              className="btn-resume-header interactive"
              title="Download verified resume PDF"
            >
              <FileDown size={15} />
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="btn-contact-header interactive"
            >
              <Send size={14} />
              <span>Hire Me</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle interactive"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-header">
          <div className="mobile-brand">
            <span className="brand-dot" />
            <span className="brand-text">{PERSONAL_INFO.shortName}</span>
          </div>
          <button
            type="button"
            className="mobile-drawer-close interactive"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`mobile-nav-link interactive ${isActive ? 'active' : ''}`}
                    onClick={handleLinkClick}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="active-dot" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href={PERSONAL_INFO.resumePdfUrl}
            download="Vejandla_Aravind_Aariv_Resume.pdf"
            className="btn-mobile-resume interactive"
            onClick={handleLinkClick}
          >
            <FileDown size={16} />
            <span>Download Resume PDF</span>
          </a>

          <a
            href="#contact"
            className="btn-mobile-contact interactive"
            onClick={handleLinkClick}
          >
            <Send size={16} />
            <span>Get in Touch</span>
          </a>
        </div>
      </aside>
    </>
  );
};
