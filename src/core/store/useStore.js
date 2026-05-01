import { create } from 'zustand';

export const useStore = create((set) => ({
  // Core UI State
  isLoaded: false,
  setIsLoaded: (status) => set({ isLoaded: status }),
  
  // Theme & Mode
  theme: 'dark', // 'dark' | 'light' | 'matrix'
  setTheme: (theme) => set({ theme }),
  
  isResumeMode: false,
  toggleResumeMode: () => set((state) => ({ isResumeMode: !state.isResumeMode })),
  
  // Scroll & Navigation
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  
  // Performance Tiering
  performanceTier: 'high', // 'high' | 'low'
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
  
  // Transitions
  isTransitioning: false,
  setTransitioning: (status) => set({ isTransitioning: status }),
}));
