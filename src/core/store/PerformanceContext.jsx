import React, { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext(null);

export function usePerformance() {
  return useContext(PerformanceContext);
}

export function PerformanceProvider({ children }) {
  const [tier, setTier] = useState('high'); // 'high' | 'medium' | 'low' | 'fallback'
  const [webglSupported, setWebglSupported] = useState(true);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    // 1. Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setTier('fallback');
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      setTier('fallback');
      return;
    }

    // 2. Hardware characteristics
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4; // GB (Chrome/Edge only)
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    if (isMobile) {
      if (cores < 4 || memory < 3) {
        setTier('low');
      } else {
        setTier('medium');
      }
    } else {
      if (cores >= 8 && memory >= 8) {
        setTier('high');
      } else if (cores >= 4 && memory >= 4) {
        setTier('medium');
      } else {
        setTier('low');
      }
    }

    // 3. FPS Monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const checkFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
        setFps(currentFps);
        
        // Dynamically demote performance tier if FPS stays too low
        if (currentFps < 25) {
          setTier(prev => {
            if (prev === 'high') return 'medium';
            if (prev === 'medium') return 'low';
            return prev;
          });
        }
        
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(checkFps);
    };

    animId = requestAnimationFrame(checkFps);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <PerformanceContext.Provider value={{ tier, setTier, webglSupported, fps }}>
      {children}
    </PerformanceContext.Provider>
  );
}
