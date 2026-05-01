import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const { progress, active, total } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (total === 0 && !active) {
      setDisplayProgress(100);
    } else {
      setDisplayProgress(Math.round(progress));
    }
  }, [progress, active, total]);

  useEffect(() => {
    if (displayProgress === 100) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        onComplete();
      } else {
        const tl = gsap.timeline({
          onComplete: onComplete
        });
        
        tl.to('.preloader-number', {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        })
        .to('.preloader-spinner', {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        }, '<')
        .to('.preloader-overlay', {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut'
        });
      }
    }
  }, [displayProgress, onComplete]);

  return (
    <div className="preloader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f]">
      <div className="preloader-spinner mb-4 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-accent border-r-accent-light"></div>
      <div className="preloader-number text-2xl font-mono text-white">
        {displayProgress}%
      </div>
    </div>
  );
}
