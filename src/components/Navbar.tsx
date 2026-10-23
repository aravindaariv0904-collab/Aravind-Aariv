import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Send, Sparkles } from 'lucide-react';
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
          <a href="#home" className="navbar-brand">
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
                      className={`nav-link ${isActive ? 'active' : ''}`}
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
              className="btn-resume-header"
              title="Download verified resume PDF"
            >
              <FileDown size={15} />
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="btn-contact-header"
            >
              <Send size={14} />
              <span>Hire Me</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
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

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-in Drawer */}
      <aside
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="drawer-header">
          <div className="drawer-brand">
            <Sparkles size={18} className="text-indigo" />
            <span>{PERSONAL_INFO.shortName}</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="drawer-nav-link"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="drawer-footer">
          <a
            href={PERSONAL_INFO.resumePdfUrl}
            download="Vejandla_Aravind_Aariv_Resume.pdf"
            className="drawer-btn-primary"
            onClick={handleLinkClick}
          >
            <FileDown size={18} />
            <span>Download Verified Resume</span>
          </a>
          <a
            href="#contact"
            className="drawer-btn-secondary"
            onClick={handleLinkClick}
          >
            <Send size={18} />
            <span>Get in Touch</span>
          </a>
        </div>
      </aside>
    </>
  );
};
