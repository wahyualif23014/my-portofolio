import React, { useState, useEffect, useCallback, useRef } from "react";
// You might need to import Link from 'react-router-dom' if you use it for internal links
// import { Link } from 'react-router-dom';
import "./../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const progressBarRef = useRef(null);

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.scrollY / scrollHeight) * 100;
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--scroll-progress', `${scrolledPercentage}%`);
    }

    // For single-page sections, keep finding active section
    const sections = ['hero', 'about', 'projects']; // 'contact' is now a separate page
    let foundActiveSection = 'hero';

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.6) {
          foundActiveSection = section;
          break;
        }
      }
    }
    setActiveSection(foundActiveSection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = useCallback((sectionId) => {
    setMenuOpen(false);
    // This logic is now only for in-page section scrolling
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-icon">
            <div className="logo-dot"></div>
            <div className="logo-ring"></div>
          </div>
          <span className="logo-text">
            <span className="logo-highlight">Dewa</span>Portofolio
          </span>
        </div>

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
            <span className="nav-number">03</span>
            <span className="nav-text">Projects</span>
            <div className="nav-glow"></div>
          </a>
          {/* ✨ IMPORTANT FIX: Change href to the new page path for Contact ✨ */}
          {/* Remove activeSection check and onClick handler for this link if it's a new page */}
          <a
            href="/contact" // This will navigate to the new /contact page
            className={window.location.pathname === '/contact' ? 'active' : ''} // Set active if on contact page
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            <span className="nav-number">04</span>
            <span className="nav-text">Contact</span>
            <div className="nav-glow"></div>
          </a>

          {/* CTA Button */}
          <div className="navbar-cta">
            <a href="/contact" className="cta-button" onClick={() => setMenuOpen(false)}> {/* Link to new page */}
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

      <div className="scroll-progress">
        <div className="progress-bar" ref={progressBarRef}></div>
      </div>

      <div className="navbar-bg-effects">
        <div className="nav-particle nav-particle-1"></div>
        <div className="nav-particle nav-particle-2"></div>
      </div>
    </nav>
  );
};

export default Navbar;