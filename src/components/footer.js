import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Removed direct animated-bg divs from JSX to simplify markup.
          Background animations are now handled purely by CSS pseudo-elements
          or fewer, simpler, fixed elements if necessary.
          Keeping the wrapper div if you want to apply common styles to background effects.
      */}
      <div className="footer-background">
        {/* If you want actual distinct elements, create fewer, simpler ones here */}
        {/* <div className="animated-bg"></div>
        <div className="animated-bg bg-2"></div>
        <div className="animated-bg bg-3"></div> */}
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
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                {/* Ensure the #contact ID exists in your Contact component or a section before the footer */}
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="link-section">
              <h4>Connect</h4>
              <ul>
                {/* Replace with actual social media URLs */}
                <li><a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="mailto:zexvulca@gmail.com">Email</a></li>
              </ul>
            </div>

            <div className="link-section">
              <h4>Services</h4>
              <ul>
                {/* These might link to sections within your projects or about page */}
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
            <p>&copy; {currentYear} Wahyu's Portofolio. All rights reserved.</p>
          </div>
          <div className="footer-meta">
            {/* Replace with actual policy links */}
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">•</span>
            <span className="built-with">Built with React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;