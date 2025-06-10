import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/project";
import Footer from "./components/footer";
// import Contact from "./components/contact";


function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Footer />
      {/* <Contact /> */}
    </>
  );
}

export default App;
