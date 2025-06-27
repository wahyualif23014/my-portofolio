import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "../styles/About.css";

const PERSONAL_INFO = {
  name: "Wahyu Alif Ajir Nurdianto (Dewa)",
  title: "Junior Frontend Developer",
  email: "zexvulca@gmail.com",
  phone: "+62 877-4004-1124",
  location: "Semarang, Indonesia",
  school: "Universitas Trunojoyo Madura",
  experience: "2+ Years"
};

const PROFESSIONAL_EXPERIENCE = [
  {
    id: 1,
    title: "Junior Frontend Developer",
    company: "TechCorp Indonesia",
    duration: "2022 - Present",
    description: "Memimpin pengembangan aplikasi web kompleks menggunakan React.js dan Next.js, meningkatkan performa aplikasi hingga 40% dan mengimplementasikan arsitektur micro-frontend.",
    technologies: ["React", "Next.js", "TypeScript", "GraphQL", "AWS"]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd",
    duration: "2021 - 2022",
    description: "Mengembangkan platform e-commerce yang menangani 10,000+ transaksi harian, mengintegrasikan payment gateway dan sistem inventory real-time.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"]
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "StartupTech Jakarta",
    duration: "2020 - 2021",
    description: "Membangun user interface responsif untuk aplikasi fintech, mengoptimalkan SEO dan accessibility, serta mengimplementasikan PWA features.",
    technologies: ["React", "Redux", "Sass", "Webpack", "Jest"]
  },
  {
    id: 4,
    title: "Junior Web Developer",
    company: "Creative Agency",
    duration: "2019 - 2020",
    description: "Mengembangkan website landing pages dan aplikasi web sederhana, mempelajari best practices dalam web development dan kolaborasi tim.",
    technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "PHP"]
  },
  {
    id: 5,
    title: "Freelance Developer",
    company: "Independent",
    duration: "2018 - 2019",
    description: "Menangani berbagai proyek web development untuk UMKM dan startup lokal, membangun portofolio dan networking profesional.",
    technologies: ["WordPress", "React", "Bootstrap", "MySQL", "Git"]
  },
  {
    id: 6,
    title: "Machine Learning Intern",
    company: "Independent", // Or the actual company if it's not truly independent
    duration: "2023 - 2024",
    description: "Handled various web development projects for SMEs and local startups, building a strong portfolio and professional network. Also explored machine learning by developing data-driven applications and participating in relevant research projects.",
    technologies: ["Python", "scikit-learn", "TensorFlow", "Pandas", "NumPy", "React", "Git"]
  }
];

const SKILLS = [
  { id: 1, name: "React.js", level: 95, category: "Frontend" },
  { id: 2, name: "Next.js", level: 90, category: "Frontend" },
  { id: 3, name: "TypeScript", level: 88, category: "Language" },
  { id: 4, name: "Node.js", level: 85, category: "Backend" },
  { id: 5, name: "GraphQL", level: 82, category: "API" },
  { id: 6, name: "AWS", level: 78, category: "Cloud" },
  { id: 7, name: "Docker", level: 75, category: "DevOps" },
  { id: 8, name: "MongoDB", level: 80, category: "Database" }
];

// Custom Hook for Scroll Progress (optimized)
const useScrollProgress = (elementRef) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress relative to the element's visibility in the viewport
      // 0% when element's top is at viewport bottom, 100% when element's bottom is at viewport top
      let progress = 0;
      if (rect.height > 0) {
        progress = ((viewportHeight - rect.top) / (viewportHeight + rect.height)) * 100;
      }
      
      setScrollProgress(Math.min(Math.max(0, progress), 100)); // Clamp between 0 and 100
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also run on mount to set initial progress
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]); // Dependency on elementRef to re-run if it changes

  return scrollProgress;
};

// Custom Hook for Intersection Observer (optimized)
const useIntersectionObserver = (options) => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const elementMap = useRef(new Map()); // Use a Map to store refs by their data-id

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (!id) return; // Ensure data-id exists

          setVisibleElements(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(id);
            } else {
              newSet.delete(id); // Remove when not intersecting to avoid false positives on scroll
            }
            return newSet;
          });
        });
      },
      options // Pass options directly from arguments
    );

    // Observe all currently registered elements
    elementMap.current.forEach(el => {
      if (el) observer.observe(el);
    });

    // Copy the current map for cleanup to avoid stale ref issues
    const elementsForCleanup = Array.from(elementMap.current.values());

    return () => {
      // Unobserve all elements on cleanup using the copied array
      elementsForCleanup.forEach(el => {
        if (el) observer.unobserve(el);
      });
      observer.disconnect(); // Disconnect the observer
    };
  }, [options]); // Re-run if options change

  // Callback to set element ref, memoized
  const setElementRef = useCallback((id) => (el) => {
    if (el) {
      elementMap.current.set(id, el);
    } else {
      elementMap.current.delete(id);
    }
  }, []);

  return { visibleElements, setElementRef };
};

// --- Optimized Child Components ---

// Memoized for performance as it's purely presentational and stable data
const ProfileHeader = React.memo(() => (
  <div className="profile-header">
    <div className="profile-avatar" aria-label="Dewa's Avatar"></div>
    <h1 className="profile-name">{PERSONAL_INFO.name}</h1>
    <p className="profile-title">{PERSONAL_INFO.title}</p>
  </div>
));

// Memoized for performance
const PersonalInfo = React.memo(() => (
  <div className="personal-info">
    <div className="info-item">
      <span className="info-label">Email:</span>
      <span className="info-value">{PERSONAL_INFO.email}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Phone:</span>
      <span className="info-value">{PERSONAL_INFO.phone}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Location:</span>
      <span className="info-value">{PERSONAL_INFO.location}</span>
    </div>
    <div className="info-item">
      <span className="info-label">School:</span>
      <span className="info-value">{PERSONAL_INFO.school}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Experience:</span>
      <span className="info-value">{PERSONAL_INFO.experience}</span>
    </div>
  </div>
));

// Memoized for performance
const SkillsSection = React.memo(() => {
  const [activeSkill, setActiveSkill] = useState(null);

  // Use useCallback for event handlers
  const handleMouseEnter = useCallback((id) => () => setActiveSkill(id), []);
  const handleMouseLeave = useCallback(() => () => setActiveSkill(null), []);

  return (
    <div className="skills-section">
      <h3 className="skills-title">Core Skills</h3>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div
            key={skill.id}
            className="skill-item"
            onMouseEnter={handleMouseEnter(skill.id)}
            onMouseLeave={handleMouseLeave()}
          >
            <div className="skill-name">{skill.name}</div>
            <div className="skill-level">
              <div
                className="skill-progress"
                style={{
                  width: activeSkill === skill.id ? `${skill.level}%` : '0%'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ExperienceItem itself should be a React.memo component if its props are stable
const ExperienceItem = React.memo(({ experience, isVisible, setRef }) => (
  <div
    ref={setRef(experience.id.toString())} // Pass the ID directly
    data-id={experience.id}
    className={`experience-item ${isVisible ? 'visible' : ''}`}
  >
    <div className="timeline-dot"></div>
    <div className="experience-card">
      <div className="experience-header">
        <h3 className="experience-title">{experience.title}</h3>
        <h4 className="experience-company">{experience.company}</h4>
        <span className="experience-duration">{experience.duration}</span>
      </div>
      <p className="experience-description">{experience.description}</p>
      <div className="technologies">
        {experience.technologies.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
));

// ExperienceSection also memoized
const ExperienceSection = React.memo(({ visibleElements, setElementRef }) => (
  <div className="experience-section">
    <h2 className="section-title">Professional Journey</h2>
    <div className="timeline">
      <div
        className="timeline-progress"
        style={{
          height: `${(visibleElements.size / PROFESSIONAL_EXPERIENCE.length) * 100}%`
        }}
      />
      {PROFESSIONAL_EXPERIENCE.map((exp) => (
        <ExperienceItem
          key={exp.id}
          experience={exp}
          setRef={setElementRef} // Pass the setRef directly
          isVisible={visibleElements.has(exp.id.toString())}
        />
      ))}
    </div>
  </div>
));


// Main component
const About = () => {
  const aboutRef = useRef(null); // Ref for the main About container
  const scrollProgress = useScrollProgress(aboutRef); // Pass ref to custom hook

  const intersectionOptions = useMemo(() => ({
    threshold: 0.2, // Reduced threshold for earlier visibility detection
    rootMargin: "-20% 0px -20% 0px" // More aggressive margin to improve detection
  }), []); // Memoize options to prevent re-creation

  const { visibleElements, setElementRef } = useIntersectionObserver(intersectionOptions);

  return (
    // !!! IMPORTANT: Add id="about" here for Navbar to scroll to it !!!
    <section id="about" className="about-container" ref={aboutRef}>
      {/* Moved FloatingParticles and CyberCables into About.css for fixed positioning directly */}
      <div className="cyber-cables">
        <div className="cable-line cable-line-1"></div>
        <div className="cable-line cable-line-2"></div>
        <div className="cable-line cable-line-3"></div>
        <div className="cable-line cable-line-4"></div>
        {/* Reduced count, use fewer cables if performance is still an issue */}
      </div>
      
      {/* Floating Particles are handled by CSS fixed positioning, less React overhead */}
      <div className="floating-particles-wrapper">
        {Array.from({ length: 15 }, (_, i) => ( // Reduced particle count
          <div
            key={i}
            className={`particle particle-${i + 1}`} // Add unique class for diverse styles
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`, // Increased delay range
              animationDuration: `${10 + Math.random() * 10}s` // Increased duration range
            }}
          />
        ))}
      </div>


      {/* Scroll Progress moved to CSS controlled by a variable */}
      {/* <ScrollProgress progress={scrollProgress} /> */} 
      {/* The scroll progress bar is now a fixed element, let's just make it part of the CSS and update its height via JS (which you already had, but refined) */}
      <div className="scroll-progress-indicator" style={{ height: `${scrollProgress}%` }}></div>


      <div className="about-content">
        <div className="about-header">
          <ProfileHeader />
          <PersonalInfo />
          <SkillsSection />
        </div>

        <div className="about-main">
          <ExperienceSection
            visibleElements={visibleElements}
            setElementRef={setElementRef}
          />
        </div>
      </div>
    </section>
  );
};

export default About;