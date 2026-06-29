import React, { useEffect, useState } from 'react';
import { useStore } from '../core/store/useStore';

export default function AccessibilityManager() {
  const { activeSection, isLoaded } = useStore();
  const [announcement, setAnnouncement] = useState('');

  // 1. Screen Reader Announcements on section transitions
  useEffect(() => {
    if (isLoaded && activeSection) {
      const sectionName = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
      setAnnouncement(`Now viewing: ${sectionName} section`);
    }
  }, [activeSection, isLoaded]);

  // 2. Keyboard accessibility triggers & prefers-reduced-motion listener
  useEffect(() => {
    // Check and watch reduced motion settings
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      console.log(`System reduced-motion preference: ${e.matches}`);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Keyboard helper to navigate sections using Arrow keys when focus is on document body
    const handleKeyDown = (e) => {
      if (document.activeElement !== document.body) return;

      const targetLink = {
        ArrowDown: 'next',
        ArrowUp: 'prev'
      }[e.key];

      if (!targetLink) return;

      e.preventDefault();

      const sections = ['home', 'about', 'projects', 'contact'];
      const currentIdx = sections.indexOf(activeSection);
      let targetIdx = currentIdx;

      if (targetLink === 'next') {
        targetIdx = Math.min(sections.length - 1, currentIdx + 1);
      } else {
        targetIdx = Math.max(0, currentIdx - 1);
      }

      if (targetIdx !== currentIdx) {
        const targetId = sections[targetIdx];
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          setAnnouncement(`Scrolled to ${targetId.toUpperCase()}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection]);

  return (
    // Visually hidden live region for WCAG 2.1 accessibility announcements
    <div 
      className="sr-only absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {announcement}
    </div>
  );
}
