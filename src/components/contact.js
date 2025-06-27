import React, { useEffect, useRef, useCallback } from 'react';
import './../styles/Contact.css';

const Contact = () => {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const particlesRef = useRef([]);

  // Use a single Intersection Observer for all entrance animations
  const handleIntersection = useCallback((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    particlesRef.current.forEach(particle => {
      if (particle) observer.observe(particle);
    });

    return () => observer.disconnect();
  }, [handleIntersection]);

  const setParticleRef = useCallback((el) => {
    if (el && !particlesRef.current.includes(el)) {
      particlesRef.current.push(el);
    }
  }, []);


  return (
    <section id="contact-page" className="contact-page"> {/* Changed ID to distinguish from in-page section */}
      <div className="background-pattern"></div>
      <div className="background-grid"></div>

      <div className="main-content">
        <div className="contact-card">
          <div className="header">
            <h2 className="title">Get In Touch</h2>
            <p className="subtitle">Feel free to reach out for collaborations or just a friendly hello!</p>
          </div>

          <div className="contact-form" ref={formRef}>
            {/* IMPORTANT: Replace "YOUR_FORM_ID" with your actual Formspree form ID */}
            {/* You can get a Formspree ID by signing up at formspree.io */}
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
                <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>

          <div className="contact-info" ref={infoRef}>
            <h3>Contact Information</h3>
            <p>Email: <a href="mailto:zexvulca@gmail.com">zexvulca@gmail.com</a></p>
            <p>Phone: <a href="tel:+6287740041124">+62 877-4004-1124</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/wahyu-alif-ajir-nurdianto/" target="_blank" rel="noopener noreferrer">linkedin.com/in/wahyu-alif-ajir-nurdianto/</a></p>
            <p>GitHub: <a href="https://github.com/wahyualif23014" target="_blank" rel="noopener noreferrer">github.com/wahyualif23014</a></p>
          </div>
        </div>
      </div>

      <div className="contact-bg-effects">
        {/* Render fewer particles for performance */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`contact-particle contact-particle-${i + 1}`}
            ref={setParticleRef}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`, // Slower, more varied delay
              animationDuration: `${12 + Math.random() * 8}s` // Slower, more varied duration
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Contact;