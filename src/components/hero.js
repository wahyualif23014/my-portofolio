import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="fade-in">
          Hello, I'm <span>Dewa</span>
        </h1>
        <h2 className="typing-text">
          <Typewriter
            words={['App Developer 🚀', 'React Enthusiast ⚛️', 'Creative Coder 💡']}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h2>
        <a href="#projects" className="cta-button glow-button">View Projects</a>
      </div>
    </section>
  );
};

export default Hero;
