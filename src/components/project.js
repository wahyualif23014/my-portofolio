import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "../styles/project.css";

const PROJECTS_DATA = [
  {
    title: "React Portfolio Website",
    description: "Modern responsive portfolio website built with React and advanced CSS animations.",
    tech: ["React", "CSS3", "JavaScript"],
    category: "Web Development",
    // Add dummy links for demonstration. Replace with actual URLs.
    viewLink: "#",
    sourceLink: "#"
  },
  {
    title: "Weather App",
    description: "Real-time weather application with beautiful UI and location-based forecasting.",
    tech: ["React", "API Integration", "Responsive Design"],
    category: "Mobile App",
    viewLink: "#",
    sourceLink: "#"
  },
  {
    title: "ToDo App",
    description: "Feature-rich task management application with drag & drop functionality.",
    tech: ["React", "Local Storage", "Material UI"],
    category: "Productivity",
    viewLink: "#",
    sourceLink: "#"
  },
  {
    title: "Absolute Cinema App",
    description: "Luxury and elegance, by providing refreshment to your eyes.",
    tech: ["Dart", "Flutter", "Material UI", "Firebase"],
    category: "App Mobile",
    viewLink: "#",
    sourceLink: "#"
  },
  {
    title: "Bookly",
    description: "With the latest technology, books to read become a window to the world.",
    tech: ["PHP", "CSS", "JavaScript"], // Corrected 'Java script'
    category: "E-commerce, Web Development",
    viewLink: "#",
    sourceLink: "#"
  },
  {
    title: "List Money", // Corrected 'List money' to 'List Money' for consistency
    description: "With the latest technology, managing your finances becomes a breeze.",
    tech: ["Dart", "Bloc", "Firebase", "Supabase"],
    category: "Productivity, App Mobile",
    viewLink: "#",
    sourceLink: "#"
  }
];

const Projects = () => {
  const sectionHeaderRef = useRef(null); // Renamed for clarity
  const projectCardsRefs = useRef([]); // Renamed for clarity

  // Memoize Intersection Observer options
  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Keep this to trigger slightly before full visibility
  }), []);

  // Use a single IntersectionObserver instance
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // Unobserve once animated to save resources
        }
      });
    }, observerOptions);

    // Observe section title
    if (sectionHeaderRef.current) {
      observer.observe(sectionHeaderRef.current);
    }

    // Observe each project card
    projectCardsRefs.current.forEach((project) => { // No need for index here in observation loop
      if (project) {
        observer.observe(project);
      }
    });

    return () => observer.disconnect(); // Clean up observer
  }, [observerOptions]); // Dependency array includes memoized options

  // Callback ref for dynamically assigning refs to project cards
  // This is more robust than `ref={(el) => (projectsRef.current[index] = el)}`
  const setProjectCardRef = useCallback((el) => {
    if (el && !projectCardsRefs.current.includes(el)) {
      projectCardsRefs.current.push(el);
    }
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="section-header" ref={sectionHeaderRef}>
          <h2 className="section-title">
            <span className="title-accent">Featured</span> Projects
          </h2>
          <p className="section-subtitle">
            Discover my latest work and creative solutions
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={index} // Consider using a unique ID from project data if available
              className={`project-card project-card-${index % 2 === 0 ? 'even' : 'odd'}`} // Apply classes for staggered animations
              ref={setProjectCardRef} // Use the callback ref
              style={{ transitionDelay: `${index * 0.15}s` }} // Apply staggered delay here
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
                <a href={project.viewLink} target="_blank" rel="noopener noreferrer" className="project-btn primary">
                  <span>View Project</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="project-btn secondary">
                  <span>Source Code</span>
                </a>
              </div>

              {/* Removed .project-glow to simplify hover effects, can be replaced by direct box-shadow/background changes */}
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements - Simplified and optimized */}
      <div className="bg-elements">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          {/* Removed shape-3 to reduce animated elements */}
        </div>
      </div>
    </section>
  );
};

export default Projects;