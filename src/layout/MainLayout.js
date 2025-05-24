import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh', padding: '2rem' }}>{children}</main>
    <Footer />
  </>
);

export default MainLayout;
