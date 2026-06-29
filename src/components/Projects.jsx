import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

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
                    ? 'bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-light))] text-white shadow-[0_4px_12px_rgba(var(--accent),0.25)]' 
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
              
              <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Face */}
                <div 
                  className="absolute inset-0 flex flex-col justify-end rounded-2xl p-6 [backface-visibility:hidden] overflow-hidden transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none"
                >
                  {/* Real Project Image Background */}
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 z-0" 
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                  
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none bg-gradient-to-tr from-white/0 via-white/50 to-white/0 z-20" />

                  <div className="relative z-30">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                         <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase rounded bg-white/20 text-white border border-white/10 backdrop-blur-md">
                           {tag}
                         </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">{project.title}</h3>
                  </div>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-surface p-8 text-center backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)] pointer-events-none group-hover:pointer-events-auto transition-all duration-500"
                >
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center px-4">
                    <Link 
                      to={`/project/${project.id}`} 
                      className="flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 text-white px-4 py-2.5 text-xs font-bold transition-all hover:bg-white/10 hover:border-white/40 flex-1 text-center"
                    >
                      Case Study
                    </Link>
                    <a 
                      href={project.liveUrl || project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center gap-1.5 rounded-full bg-white text-black px-4 py-2.5 text-xs font-bold transition-transform hover:scale-105 flex-1 text-center"
                    >
                      <ExternalLink size={12} /> View Live
                    </a>
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
