import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useStore } from './core/store/useStore';
import { usePerformanceMonitor } from './core/hooks/usePerformanceMonitor';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import ResumeViewer from './features/resume/ResumeViewer';
import ProjectCaseStudy from './features/projects/ProjectCaseStudy';

gsap.registerPlugin(ScrollTrigger);

// Home page layout combining all sections
function Home() {
  return (
    <>
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}

function App() {
  const { isLoaded, setIsLoaded, setScrollProgress, isResumeMode, theme } = useStore();
  
  useEffect(() => {
    if (theme === 'matrix') {
      document.body.classList.add('theme-matrix');
    } else {
      document.body.classList.remove('theme-matrix');
    }
  }, [theme]);
  
  // Start performance monitoring
  usePerformanceMonitor();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      setScrollProgress(e.progress); // Pass 0-1 progress to store for CameraRig
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, [setIsLoaded, setScrollProgress]);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      
      {/* 2D Fallback Mode */}
      <ResumeViewer />

      {!isResumeMode && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectCaseStudy />} />
        </Routes>
      )}
    </>
  );
}

export default App;
