import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { experience } from '../data/experience';
import { skills } from '../data/skills';
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
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-transparent">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">

          {/* Left Column: Timeline */}
          <div>
            <div ref={headingRef}>
              <span className="text-sm font-mono uppercase tracking-widest text-accent-light">Section 01</span>
              <h2 className="mt-2 mb-6 font-heading text-4xl font-bold text-white md:text-5xl">About Me</h2>
              <p className="mb-12 text-lg text-muted">
                Software Engineering student and Blockchain Developer with hands-on experience in Ethereum smart contract development, decentralized applications (DApps), full-stack web development, and database management. Skilled in Solidity, JavaScript, Python, C++, MongoDB, MySQL, and Web3 technologies. Experienced in building secure blockchain solutions, responsive web applications, and SEO-driven digital platforms.
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

          {/* Right Column: Premium Profile Picture Frame & Skills */}
          <div className="flex flex-col gap-12">

            {/* Glassmorphic Profile Picture Frame */}
            <div className="mx-auto w-full max-w-sm aspect-[3/4] rounded-2xl border border-white/15 bg-white/5 p-2.5 backdrop-blur-md shadow-2xl relative group overflow-hidden transition-all duration-500 hover:border-accent-light/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
               <img 
                 src="/profile.jpg" 
                 alt="Musharraf Ali" 
                 className="w-full h-full object-cover rounded-xl transition-transform duration-750 group-hover:scale-[1.04]" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
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

        {/* Live GitHub activity */}
        <GitHubStats username="musharafali-dev" />

      </div>
    </section>
  );
}
