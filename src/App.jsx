import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useStore } from './core/store/useStore';
import { usePerformanceMonitor } from './core/hooks/usePerformanceMonitor';
import ErrorBoundary from './core/utils/ErrorBoundary';

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
import SceneManager from './three/SceneManager';
import Terminal from './components/Terminal';
import PortfolioDevTools from './components/devtools/PortfolioDevTools';
import AccessibilityManager from './components/AccessibilityManager';
import { useScrollAnimation } from './core/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

// Home page layout combining all sections (now overlaying transparently on background canvas)
function Home() {
  return (
    <>
      <main className="relative z-10 bg-transparent">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10 bg-transparent">
        <Footer />
      </div>
    </>
  );
}

function App() {
  const { isLoaded, setIsLoaded, setScrollProgress, isResumeMode, theme } = useStore();
  
  // Initialize scroll tracking section triggers
  useScrollAnimation();

  useEffect(() => {
    // Dynamic body classes based on theme selection
    document.body.classList.remove('theme-matrix', 'theme-cyberpunk', 'theme-light');
    if (theme !== 'dark') {
      document.body.classList.add(`theme-${theme}`);
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
    <ErrorBoundary>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      {/* 3D Global viewport manager */}
      {!isResumeMode && <SceneManager />}

      <CustomCursor />
      <AccessibilityManager />
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

      {/* Retro CLI modal console */}
      <Terminal />

      {/* Dev profiling visualizer (loaded only in dev environments) */}
      {import.meta.env.DEV && <PortfolioDevTools />}
    </ErrorBoundary>
  );
}

export default App;
