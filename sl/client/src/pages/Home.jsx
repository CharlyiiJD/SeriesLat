import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import MainContentLayout from '../components/layout/MainContentLayout';
import Footer from '../components/layout/Footer';

const Home = () => {
  // Esta función asegura que siempre empieces desde arriba al cargar la Home
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#080705] text-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <MainContentLayout />
      <Footer />
    </div>
  );
};

export default Home;