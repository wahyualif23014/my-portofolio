import React, { useEffect, useRef, useState } from "react";
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
    "id": 6,
    "title": "Machine Learning Intern",
    "company": "Independent",
    "duration": "2023 - 2024",
    "description": "Handled various web development projects for SMEs and local startups, building a strong portfolio and professional network. Also explored machine learning by developing data-driven applications and participating in relevant research projects.",
    "technologies": ["Python", "scikit-learn", "TensorFlow", "Pandas", "NumPy", "React", "Git"]
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

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

const useIntersectionObserver = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const elementRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting && id) {
            setVisibleElements(prev => new Set([...prev, id]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px"
      }
    );

    const currentRefs = elementRefs.current;
    currentRefs.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      currentRefs.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const setElementRef = (index) => (el) => {
    elementRefs.current[index] = el;
  };

  return { visibleElements, setElementRef };
};

// Component parts for better organization
const FloatingParticles = () => (
  <div className="floating-particles">
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${4 + Math.random() * 4}s`
        }}
      />
    ))}
  </div>
);

const ProfileHeader = () => (
  <div className="profile-header">
    <div className="profile-avatar"></div>
    <h1 className="profile-name">{PERSONAL_INFO.name}</h1>
    <p className="profile-title">{PERSONAL_INFO.title}</p>
  </div>
);

const PersonalInfo = () => (
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
);

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <div className="skills-section">
      <h3 className="skills-title">Core Skills</h3>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div
            key={skill.id}
            className="skill-item"
            onMouseEnter={() => setActiveSkill(skill.id)}
            onMouseLeave={() => setActiveSkill(null)}
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
};

const ExperienceItem = ({ experience, isVisible, setRef, index }) => (
  <div
    ref={setRef}
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
);

const ExperienceSection = ({ visibleElements, setElementRef }) => (
  <div className="experience-section">
    <h2 className="section-title">Professional Journey</h2>
    <div className="timeline">
      <div
        className="timeline-progress"
        style={{
          height: `${(visibleElements.size / PROFESSIONAL_EXPERIENCE.length) * 100}%`
        }}
      />
      {PROFESSIONAL_EXPERIENCE.map((exp, index) => (
        <ExperienceItem
          key={exp.id}
          experience={exp}
          index={index}
          setRef={setElementRef(index)}
          isVisible={visibleElements.has(exp.id.toString())}
        />
      ))}
    </div>
  </div>
);

const ScrollProgress = ({ progress }) => (
  <div className="scroll-progress">
    <div
      className="scroll-progress-bar"
      style={{ height: `${progress}%` }}
    />
  </div>
);

// Main component
const About = () => {
  const scrollProgress = useScrollProgress();
  const { visibleElements, setElementRef } = useIntersectionObserver();

  return (
    <div className="about-container">
      <FloatingParticles />
      <ScrollProgress progress={scrollProgress} />
      
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
    </div>
  );
};

export default About;