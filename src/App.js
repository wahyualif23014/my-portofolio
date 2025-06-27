import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/project";
import Footer from "./components/footer";
import ContactPage from "./components/contact"; // Rename or import your Contact component as a Page

function App() {
  return (
    <Router> {/* Wrap your application with BrowserRouter */}
      <Navbar /> {/* Navbar will appear on all pages */}
      <Routes> {/* Define your routes inside Routes */}
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Projects />
          </>
        } />
        {/* New route for the Contact page */}
        <Route path="/contact" element={<ContactPage />} />
        {/* Add routes for other single pages if you create them later */}
      </Routes>
      <Footer /> {/* Footer will appear on all pages */}
    </Router>
  );
}

export default App;