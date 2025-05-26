import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "../styles/Hero.css";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      if (heroRef.current) {
        heroRef.current.style.setProperty('--mouse-x', `${xPos * 20}px`);
        heroRef.current.style.setProperty('--mouse-y', `${yPos * 20}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate floating particles
  const generateParticles = () => {
    return Array.from({ length: 15 }, (_, i) => (
      <div
        key={i}
        className={`particle particle-${i + 1}`}
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${15 + Math.random() * 20}s`
        }}
      />
    ));
  };

  return (
    <section id="hero" className={`hero ${isLoaded ? 'loaded' : ''}`} ref={heroRef}>
      {/* Animated Background */}
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {generateParticles()}
      </div>

      {/* Grid Pattern */}
      <div className="grid-pattern"></div>

      {/* Neural Network Lines */}
      <div className="neural-network">
        <div className="neural-line line-1"></div>
        <div className="neural-line line-2"></div>
        <div className="neural-line line-3"></div>
        <div className="neural-line line-4"></div>
        <div className="neural-node node-1"></div>
        <div className="neural-node node-2"></div>
        <div className="neural-node node-3"></div>
        <div className="neural-node node-4"></div>
        <div className="neural-node node-5"></div>
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="greeting">Hello, I'm</span>
            <span className="name-highlight">Dewa</span>
          </h1>
          
          <div className="typing-container">
            <h2 className="typing-text">
              <Typewriter
                words={[
                  'App Developer 🚀', 
                  'React Enthusiast ⚛️', 
                  'Creative Coder 💡',
                  'UI/UX Designer 🎨',
                  'Tech Innovator 🌟'
                ]}
                loop={0}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h2>
          </div>

          <div className="hero-description">
            <p>
              Crafting digital experiences with cutting-edge technology and creative innovation. 
              Transforming ideas into powerful, user-centric applications.
            </p>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="cta-button primary-cta">
              <span>View Projects</span>
              <div className="button-glow"></div>
              <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            <a href="#contact" className="cta-button secondary-cta">
              <span>Get In Touch</span>
              <div className="button-ripple"></div>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="floating-code">
            <div className="code-line">const developer = "passionate";</div>
            <div className="code-line">function createAmazingApps()</div>
            <div className="code-line">&nbsp;&nbsp;return innovation + creativity;</div>
            <div className="code-line"></div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-text">Scroll Down</div>
        <div className="scroll-line"></div>
        <div className="scroll-dot"></div>
      </div>

      {/* <div className="social-links">
        <a href="https://github.com/wahyualif23014" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
      </div> */}
    </section>
  );
};

export default Hero;