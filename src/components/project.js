import React, { useEffect, useRef } from "react";
import "../styles/project.css";

const Projects = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe section title
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe each project card
    projectsRef.current.forEach((project, index) => {
      if (project) {
        // Add staggered delay
        project.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(project);
      }
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "React Portfolio Website",
      description: "Modern responsive portfolio website built with React and advanced CSS animations",
      tech: ["React", "CSS3", "JavaScript"],
      category: "Web Development"
    },
    {
      title: "Weather App",
      description: "Real-time weather application with beautiful UI and location-based forecasting",
      tech: ["React", "API Integration", "Responsive Design"],
      category: "Mobile App"
    },
    {
      title: "ToDo App",
      description: "Feature-rich task management application with drag & drop functionality",
      tech: ["React", "Local Storage", "Material UI"],
      category: "Productivity"
    },
    {
      title: "Absolute Cinema App",
      description: "luxury and elegance, by providing refreshment to your eyes",
      tech: ["Dart", "Flutter", "Material UI", "Firebase"],
      category: "App Mobile"
    },
    {
      title: "Bookly",
      description: "With the latest technology, books to read become a window to the world.",
      tech: ["PHP", "CSS", "Java script"],
      category: "E-commerce, Web Development"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="section-header" ref={sectionRef}>
          <h2 className="section-title">
            <span className="title-accent">Featured</span> Projects
          </h2>
          <p className="section-subtitle">
            Discover my latest work and creative solutions
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              ref={(el) => (projectsRef.current[index] = el)}
            >
              <div className="project-header">
                <div className="project-category">{project.category}</div>
                <div className="project-number">0{index + 1}</div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="tech-stack">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-footer">
                <button className="project-btn primary">
                  <span>View Project</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="project-btn secondary">
                  <span>Source Code</span>
                </button>
              </div>

              <div className="project-glow"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="bg-elements">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;