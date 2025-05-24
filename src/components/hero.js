import React from "react";

const Hero = () => {
  return (
    <section id="hero" style={{
      height: "80vh",
      backgroundColor: "#333",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1>Hello, I'm Wahyu</h1>
      <p>App Developer | React Enthusiast</p>
    </section>
  );
};

export default Hero;
