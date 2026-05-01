import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const Github = ({size=20}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.2 5.2 0 0 0-1.45-3.8 4.9 4.9 0 0 0-.16-3.7s-1.13-.36-3.68 1.36a12.5 12.5 0 0 0-6.6 0C6.13 2 5 2 5 2a4.9 4.9 0 0 0-.16 3.7A5.2 5.2 0 0 0 3.39 9.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.89 19.7v4.3"/><path d="M8 19c-3 1-4-1-5-1"/></svg>
);

import { projects } from '../../data/projects';
import { useStore } from '../../core/store/useStore';

export default function ProjectCaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTransitioning, setTheme } = useStore();
  const containerRef = useRef(null);
  
  const project = projects.find(p => p.id.toString() === id);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Initial fade in
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [id]);

  const handleBack = (e) => {
    e.preventDefault();
    setTransitioning(true);
    
    // Fade out before navigating back
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      onComplete: () => {
        setTransitioning(false);
        navigate('/');
      }
    });
  };

  if (!project) return <div className="pt-32 text-center text-white">Project not found.</div>;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0f] text-white pt-24 px-6 pb-24 absolute inset-0 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 mb-12 text-muted hover:text-accent-light transition-colors"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
               <span key={tag} className="px-3 py-1 text-xs font-mono uppercase rounded bg-white/5 border border-white/10 text-accent-light">
                 {tag}
               </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">{project.title}</h1>
          <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        <div className="flex gap-4 mb-16 pb-16 border-b border-white/10">
          <a href={project.liveUrl} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-light px-6 py-3 font-medium text-white transition-transform hover:scale-105">
            <ExternalLink size={18} /> View Live App
          </a>
          <a href={project.githubUrl} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
             GitHub Repo
          </a>
        </div>

        {/* Dynamic Case Study Content (Simulated) */}
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-6">The Problem</h2>
            <p className="text-lg text-muted leading-relaxed">
              In the modern web ecosystem, creating performant 3D experiences that don't isolate users with slow connections is a massive challenge. 
              The goal was to build an architecture that scales smoothly across devices while maintaining a premium aesthetic.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Process & Architecture</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              We implemented a unified WebGL canvas using React Three Fiber, decoupling the 3D rendering context from the HTML DOM overlay.
              This allowed us to use GSAP ScrollTrigger to orchestrate cinematic camera movements without sacrificing accessibility.
            </p>
            <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-muted font-mono text-sm">Architecture Diagram Placeholder</span>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">The Solution & Impact</h2>
            <p className="text-lg text-muted leading-relaxed">
              The final product achieved a perfect 100 Lighthouse score while rendering over 1,500 particles and multiple post-processing passes.
              User engagement increased by 40%, and the bounce rate dropped significantly due to the immersive, zero-layout-shift transitions.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
