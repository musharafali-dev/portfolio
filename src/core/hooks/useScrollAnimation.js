import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const { setActiveSection } = useStore();

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];

    sections.forEach((sectionId) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setActiveSection(sectionId);
        },
        onEnterBack: () => {
          setActiveSection(sectionId);
        }
      });
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setActiveSection]);
}
