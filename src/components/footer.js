import React from "react";
import "../styles/Footer.css"; // Adjust the path as necessary

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="animated-bg"></div>
        <div className="animated-bg bg-2"></div>
        <div className="animated-bg bg-3"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="brand-name">Wahyu's Portfolio</h3>
            <p className="brand-tagline">Crafting Digital Experiences</p>
          </div>
          
          <div className="footer-links">
            <div className="link-section">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="link-section">
              <h4>Connect</h4>
              <ul>
                <li><a href="#linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="#github" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="#twitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="mailto:hello@wahyu.dev">Email</a></li>
              </ul>
            </div>
            
            <div className="link-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#web-development">Web Development</a></li>
                <li><a href="#ui-design">UI/UX Design</a></li>
                <li><a href="#consulting">Consulting</a></li>
                <li><a href="#maintenance">Maintenance</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} Wahyu's Portfolio. All rights reserved.</p>
          </div>
          <div className="footer-meta">
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">•</span>
            <span className="built-with">Built with React & ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;