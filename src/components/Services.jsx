import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, ExternalLink, ShieldCheck, Code, Globe, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const gigs = [
  {
    id: 1,
    title: 'Smart Contract Development',
    description: 'Custom, highly secure Solidity smart contract development including ERC-20 tokens, ERC-721/1155 NFT collections, staking, and escrow contracts.',
    link: 'https://www.fiverr.com/s/xXvd0wQ',
    badge: 'Solidity & Web3',
    icon: <ShieldCheck className="text-violet-400" size={32} />
  },
  {
    id: 2,
    title: 'Web3 DApp Integration',
    description: 'Connecting secure smart contracts with highly responsive React/Next.js frontends, wallet integrations (MetaMask, WalletConnect), and Ethers.js interfaces.',
    link: 'https://www.fiverr.com/s/Eg30BRe',
    badge: 'DApps & Web3.js',
    icon: <Code className="text-pink-400" size={32} />
  },
  {
    id: 3,
    title: 'Full-Stack Web Development',
    description: 'High-performance corporate websites, SaaS applications, and e-commerce platforms using Next.js App Router, Tailwind CSS, Node.js, and MongoDB.',
    link: 'https://www.fiverr.com/s/Q7eYpw2',
    badge: 'React & Node.js',
    icon: <Globe className="text-blue-400" size={32} />
  },
  {
    id: 4,
    title: 'Video Editing & Production',
    description: 'Engaging, professional video editing for YouTube, Instagram Reels, TikToks, and channel media operations using Adobe Premiere Pro.',
    link: 'https://www.fiverr.com/s/0b79W6A',
    badge: 'Premiere Pro',
    icon: <Film className="text-amber-400" size={32} />
  }
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
      }}
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 bg-transparent relative overflow-hidden">
      {/* Visual background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] opacity-10 blur-[150px] rounded-full bg-[rgb(var(--accent-light))]"></div>

      <div className="mx-auto max-w-7xl">
        
        <div className="mb-16">
          <span className="text-sm font-mono uppercase tracking-widest text-accent-light">Section 03</span>
          <h2 className="mt-2 text-4xl font-heading font-bold text-white md:text-5xl">Freelance Services</h2>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            Hire me on Fiverr for high-performance Web development, secure Solidity blockchain contracts, and digital video production.
          </p>
        </div>

        {/* Gigs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {gigs.map((gig) => (
            <div 
              key={gig.id} 
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-300 hover:border-[rgb(var(--accent-light))]/40 hover:shadow-[0_4px_30px_rgba(var(--accent),0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[rgb(var(--accent-light))]/30 transition-colors">
                    {gig.icon}
                  </div>
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-white/70">
                    {gig.badge}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-white mb-3 group-hover:text-[rgb(var(--accent-light))] transition-colors">
                  {gig.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm mb-8">
                  {gig.description}
                </p>
              </div>

              <a
                href={gig.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3.5 text-sm font-bold text-white transition-all hover:bg-gradient-to-r hover:from-[rgb(var(--accent))] hover:to-[rgb(var(--accent-light))] hover:border-transparent hover:shadow-[0_4px_20px_rgba(var(--accent),0.35)]"
              >
                <ShoppingBag size={16} /> Order on Fiverr <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
