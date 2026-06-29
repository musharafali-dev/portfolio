import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../core/store/useStore';

export default function Hero() {
  const nameRef = useRef(null);
  const { theme } = useStore();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (nameRef.current) {
      const chars = nameRef.current.innerText.split('');
      nameRef.current.innerText = '';
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        if (char === ' ') span.innerHTML = '&nbsp;';
        nameRef.current.appendChild(span);
      });

      gsap.to(nameRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-20 bg-transparent">
      {/* Background is now rendered globally by SceneManager.jsx */}

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-accent-light">
            PORTFOLIO &middot; 2026
          </p>
          <h1
            ref={nameRef}
            className="mb-4 font-heading text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl"
          >
            Musharraf Ali
          </h1>
          <p className="mb-10 text-xl text-muted sm:text-2xl">
            Full-Stack Developer <span className="text-accent-light">&middot;</span> Blockchain & Smart Contract Engineer <span className="text-accent-light">&middot;</span> UI/UX Designer
          </p>

          <div className="mb-16 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-light px-8 py-4 font-medium text-white transition-transform hover:scale-105"
              aria-label="View Work"
            >
              View Work &rarr;
            </a>
            <a
              href="/CV.pdf"
              download
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              aria-label="Download CV"
            >
              Download CV
            </a>
          </div>

          <div className="flex flex-wrap gap-8 font-mono text-sm text-muted">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">50+</span>
              <span>Projects</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">5yr</span>
              <span>Experience</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">30+</span>
              <span>Clients</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center opacity-50">
        <span className="mb-2 font-mono text-xs uppercase tracking-widest text-white">Scroll</span>
        <div className="h-12 w-[1px] bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-accent-light animate-[scroll-line_2s_ease-in-out_infinite]" />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </section>
  );
}
