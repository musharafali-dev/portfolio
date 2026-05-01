import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Github = ({size=16}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.2 5.2 0 0 0-1.45-3.8 4.9 4.9 0 0 0-.16-3.7s-1.13-.36-3.68 1.36a12.5 12.5 0 0 0-6.6 0C6.13 2 5 2 5 2a4.9 4.9 0 0 0-.16 3.7A5.2 5.2 0 0 0 3.39 9.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.89 19.7v4.3"/><path d="M8 19c-3 1-4-1-5-1"/></svg>
);

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web', 'Mobile', '3D'];
  const sectionRef = useRef(null);

  const filteredProjects = projects.filter(p => filter === 'All' || p.category.toLowerCase() === filter.toLowerCase());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Fade in section
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
      }}
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-accent-light">Section 02</span>
            <h2 className="mt-2 text-4xl font-heading font-bold text-white md:text-5xl">Selected Works</h2>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 rounded-full border border-white/10 p-1 backdrop-blur-md bg-white/5 w-fit">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg' 
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative h-[400px] w-full [perspective:1000px]">
              
              <div className="absolute inset-0 transition-transform duration-600 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Face */}
                <div 
                  className="absolute inset-0 flex flex-col justify-end rounded-2xl p-6 [backface-visibility:hidden] overflow-hidden"
                  style={{ background: `linear-gradient(to bottom right, #0a0a0f, ${project.color}40)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
                  
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none bg-gradient-to-tr from-white/0 via-white/50 to-white/0 z-10" />

                  <div className="relative z-20">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                         <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase rounded bg-white/10 text-white/80 border border-white/20">
                           {tag}
                         </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">{project.title}</h3>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-surface p-8 text-center backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-muted">{project.description}</p>
                  
                  <div className="flex gap-4 mt-4">
                    <Link to={`/project/${project.id}`} className="flex items-center justify-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-bold transition-transform hover:scale-105">
                      <ExternalLink size={16} /> View Details
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
