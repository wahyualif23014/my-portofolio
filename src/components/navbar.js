import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import "./../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const progressBarRef = useRef(null);
  const location = useLocation(); // Get current location object from React Router

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

  const handleScroll = useCallback(() => {
    // Only update active section based on scroll if we are on the homepage ('/')
    if (location.pathname !== '/') {
      setActiveSection(''); // Clear active section if not on homepage
      setScrolled(true); // Navbar should generally appear 'scrolled' on other pages
      return;
    }

    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.scrollY / scrollHeight) * 100;
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--scroll-progress', `${scrolledPercentage}%`);
    }

    const sections = ['hero', 'about', 'projects']; // Only in-page sections
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
  }, [location.pathname]); // Add location.pathname to dependencies

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount and on route change
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, location.pathname]); // Add location.pathname here too

  const handleNavClick = useCallback((sectionId, isExternalPage = false) => {
    setMenuOpen(false);
    if (isExternalPage) {
      // For external page links, just navigate directly via Link or a plain <a>
      // Link component handles this internally
      return;
    }
    // For in-page section scrolling
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo - now also links to home */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">
            <div className="logo-dot"></div>
            <div className="logo-ring"></div>
          </div>
          <span className="logo-text">
            <span className="logo-highlight">Dewa</span>Portofolio
          </span>
        </Link>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {/* ✨ IMPORTANT FIX: Use Link component for Home to navigate to '/' ✨ */}
          <Link
            to="/" // Link to the root path
            className={location.pathname === '/' && activeSection === 'hero' ? 'active' : ''}
            onClick={() => handleNavClick('hero')} // Still use handleNavClick for potential in-page scroll from '/'
          >
            <span className="nav-number">01</span>
            <span className="nav-text">Home</span>
            <div className="nav-glow"></div>
          </Link>
          <a // These remain <a> tags for in-page scrolling
            href="#about"
            className={location.pathname === '/' && activeSection === 'about' ? 'active' : ''}
            onClick={() => handleNavClick('about')}
          >
            <span className="nav-number">02</span>
            <span className="nav-text">About</span>
            <div className="nav-glow"></div>
          </a>
          <a // These remain <a> tags for in-page scrolling
            href="#projects"
            className={location.pathname === '/' && activeSection === 'projects' ? 'active' : ''}
            onClick={() => handleNavClick('projects')}
          >
            <span className="nav-number">03</span>
            <span className="nav-text">Projects</span>
            <div className="nav-glow"></div>
          </a>
          {/* Contact link uses Link to navigate to new page */}
          <Link
            to="/contact" // Link to the new /contact page
            className={location.pathname === '/contact' ? 'active' : ''}
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            <span className="nav-number">04</span>
            <span className="nav-text">Contact</span>
            <div className="nav-glow"></div>
          </Link>

          {/* CTA Button - also links to new contact page */}
          <div className="navbar-cta">
            <Link to="/contact" className="cta-button" onClick={() => setMenuOpen(false)}>
              <span>Let's Talk</span>
              <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
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