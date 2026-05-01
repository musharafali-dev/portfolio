import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const handleHoverStart = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: '#a855f7',
        duration: 0.3
      });
    };

    const handleHoverEnd = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: '#7c3aed',
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll('button, a');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] hidden sm:block">
      <div
        ref={dotRef}
        className="cursor-dot absolute left-0 top-0 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ willChange: 'transform' }}
      ></div>
      <div
        ref={ringRef}
        className="cursor-ring absolute left-0 top-0 h-[28px] w-[28px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        style={{ willChange: 'transform' }}
      ></div>
    </div>
  );
}
