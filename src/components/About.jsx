import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { experience } from '../data/experience';
import { skills } from '../data/skills';
import AvatarCard from '../three/AvatarCard';
import GitHubStats from '../features/github/GitHubStats';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Heading fade up
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        }
      }
    );

    // Timeline items stagger
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    gsap.fromTo(timelineItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out', scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
        }
      }
    );

    // Skills progress bars
    const skillBars = skillsRef.current.querySelectorAll('.skill-bar-progress');
    skillBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: `${targetWidth}%`, duration: 1, ease: 'power3.out', scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
          }
        }
      );
    });

  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">

          {/* Left Column: Timeline */}
          <div>
            <div ref={headingRef}>
              <span className="text-sm font-mono uppercase tracking-widest text-accent-light">Section 01</span>
              <h2 className="mt-2 mb-6 font-heading text-4xl font-bold text-white md:text-5xl">About Me</h2>
              <p className="mb-12 text-lg text-muted">
                Brutally efficient Software Engineering student and Full-Stack Developer with a specialized focus on Blockchain (Solidity) and high-performance web applications. Proven track record in architecting NFT marketplaces and managing end-to-end video production for documentary-style content. I don't just write code; I build scalable systems.
              </p>
            </div>

            <div ref={timelineRef} className="relative pl-8 border-l border-white/10 space-y-12">
              {experience.map((item, idx) => (
                <div key={idx} className="timeline-item relative">
                  <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-[#0a0a0f] border-2 border-accent-light shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <span className="font-mono text-sm text-accent-light">{item.year}</span>
                  <h3 className="mt-1 text-xl font-bold text-white">{item.role}</h3>
                  <p className="text-muted">{item.company} &middot; {item.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Avatar & Skills */}
          <div className="flex flex-col gap-12">

            {/* 3D Profile Picture */}
            <div className="mx-auto w-full max-w-sm aspect-[3/4] rounded-2xl border border-white/10 bg-surface backdrop-blur-sm overflow-hidden relative">
               <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
                  <React.Suspense fallback={null}>
                    <AvatarCard />
                  </React.Suspense>
               </Canvas>
            </div>


            {/* Skills */}
            <div ref={skillsRef} className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {skills.map(skill => (
                  <span key={skill.name} className="px-3 py-1 text-sm font-mono rounded-full bg-white/5 border border-accent/30 text-accent-light">
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                {skills.slice(0, 4).map(skill => (
                  <div key={`bar-${skill.name}`}>
                    <div className="flex justify-between mb-1 text-sm text-white">
                      <span>{skill.name}</span>
                      <span className="font-mono text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="skill-bar-progress h-full bg-gradient-to-r from-accent to-accent-light"
                        data-width={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Phase 4: GitHub Integration */}
        <GitHubStats username="musharafali-dev" />

      </div>
    </section>
  );
}
