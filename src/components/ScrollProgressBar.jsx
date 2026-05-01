import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const progressRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });
  }, []);

  return (
    <div
      ref={progressRef}
      className="fixed left-0 top-0 z-[9998] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-light"
      style={{ willChange: 'transform' }}
    />
  );
}
