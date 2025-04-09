import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import Footer from './shared/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <Footer />
    </div>
  );
};

export default Home;
