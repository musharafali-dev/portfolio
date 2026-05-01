import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0f] py-8 text-center text-muted">
      <div className="mx-auto max-w-7xl px-6 relative">
        <p className="mb-2 font-heading font-medium text-white">Musharraf Ali &middot; 2025</p>
        <p className="text-sm">Built with React &amp; Three.js</p>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110 hover:bg-accent-light"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
    </footer>
  );
}
