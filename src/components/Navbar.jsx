import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, FileText, Binary, Terminal, Sun, Moon, Palette } from 'lucide-react';
import { useStore } from '../core/store/useStore';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const THEMES = ['dark', 'matrix', 'cyberpunk'];

export default function Navbar() {
  const { theme, setTheme, isResumeMode, toggleResumeMode, toggleTerminal } = useStore();
  const [active, setActive] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power2.inOut' });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.inOut' });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const matchingLink = links.find(link => link.href === `#${id}`);
            if (matchingLink) setActive(matchingLink.name);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Theme Cycler
  const cycleTheme = () => {
    const nextIdx = (THEMES.indexOf(theme) + 1) % THEMES.length;
    setTheme(THEMES[nextIdx]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={18} />;
      case 'matrix':
        return <Binary size={18} className="text-green-500" />;
      case 'cyberpunk':
        return <Palette size={18} className="text-rose-500" />;
      default:
        return <Moon size={18} />;
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 z-[5000] w-full border-b px-6 py-4 backdrop-blur-md transition-colors ${
          isResumeMode ? 'border-gray-200 bg-white/80' : 'border-white/[0.06] bg-white/5'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button 
            onClick={() => {
              if (isResumeMode) toggleResumeMode();
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`font-heading text-2xl font-bold tracking-tighter ${isResumeMode ? 'text-slate-900' : 'text-white'}`}
          >
            MA<span className="text-accent-light">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden space-x-6 md:flex items-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  active === link.name 
                    ? (isResumeMode ? 'text-slate-900' : 'text-white')
                    : (isResumeMode ? 'text-slate-500 hover:text-slate-900' : 'text-muted hover:text-white')
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (isResumeMode) toggleResumeMode();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
                {active === link.name && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-accent-light" />
                )}
              </a>
            ))}
            
            <div className="w-[1px] h-4 bg-white/20 mx-2"></div>
            
            {/* Terminal console toggle button */}
            <button 
              onClick={toggleTerminal}
              className={`p-2 rounded-full transition-colors ${isResumeMode ? 'text-slate-500 hover:text-slate-900' : 'text-muted hover:text-white'}`}
              title="Open Terminal Console [ ` ]"
            >
              <Terminal size={18} />
            </button>

            {/* Cycle Themes */}
            <button 
              onClick={cycleTheme}
              className={`p-2 rounded-full transition-colors ${isResumeMode ? 'text-slate-500 hover:text-slate-900' : 'text-muted hover:text-white'}`}
              title={`Cycle Theme (Current: ${theme})`}
            >
              {getThemeIcon()}
            </button>
            
            <button 
              onClick={toggleResumeMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${isResumeMode ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <FileText size={16} /> {isResumeMode ? 'Exit Resume' : 'Resume Mode'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden ${isResumeMode ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[6000] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-64 bg-[#0a0a0f] border-l border-white/10 p-6 shadow-2xl">
          <button className="absolute right-6 top-6 text-white" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
          <div className="mt-16 flex flex-col space-y-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-lg font-medium transition-colors ${
                  active === link.name ? 'text-accent-light' : 'text-muted'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            ))}
            
            <div className="w-full h-[1px] bg-white/10 my-4" />

            <button 
              onClick={() => {
                setIsOpen(false);
                toggleTerminal();
              }}
              className="flex items-center gap-3 text-lg font-medium text-muted hover:text-white"
            >
              <Terminal size={20} /> Terminal Console
            </button>

            <button 
              onClick={() => {
                cycleTheme();
              }}
              className="flex items-center gap-3 text-lg font-medium text-muted hover:text-white"
            >
              {getThemeIcon()} Theme: {theme.toUpperCase()}
            </button>

            <button 
              onClick={() => {
                setIsOpen(false);
                toggleResumeMode();
              }}
              className="flex items-center gap-3 text-lg font-medium text-muted hover:text-white"
            >
              <FileText size={20} /> {isResumeMode ? 'Exit Resume' : 'Resume Mode'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
