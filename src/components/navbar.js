import React, { useState, useEffect } from "react";
import "./../styles/Navbar.css";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <div className="logo-dot"></div>
            <div className="logo-ring"></div>
          </div>
          <span className="logo-text">
            <span className="logo-highlight">Dewa</span>Portofolio
          </span>
        </div>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a 
            href="#hero" 
            className={activeSection === 'hero' ? 'active' : ''}
            onClick={() => handleNavClick('hero')}
          >
            <span className="nav-number">01</span>
            <span className="nav-text">Home</span>
            <div className="nav-glow"></div>
          </a>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={() => handleNavClick('about')}
          >
            <span className="nav-number">02</span>
            <span className="nav-text">About</span>
            <div className="nav-glow"></div>
          </a>
          <a 
            href="#projects" 
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={() => handleNavClick('projects')}
          >
            <span className="nav-number">02</span>
            <span className="nav-text">Projects</span>
            <div className="nav-glow"></div>
          </a>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={() => handleNavClick('contact')}
          >
            <span className="nav-number">03</span>
            <span className="nav-text">Contact</span>
            <div className="nav-glow"></div>
          </a>

          {/* CTA Button */}
          <div className="navbar-cta">
            <a href="#contact" className="cta-button" onClick={() => handleNavClick('contact')}>
              <span>Let's Talk</span>
              <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <div className="hamburger-glow"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="scroll-progress">
        <div className="progress-bar"></div>
      </div>

      {/* Background Elements */}
      <div className="navbar-bg-effects">
        <div className="nav-particle nav-particle-1"></div>
        <div className="nav-particle nav-particle-2"></div>
        <div className="nav-particle nav-particle-3"></div>
      </div>
    </nav>
  );
};

export default Navbar;