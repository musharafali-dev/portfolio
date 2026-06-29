import { create } from 'zustand';

const getInitialTheme = () => {
  const saved = localStorage.getItem('portfolio-theme');
  return saved || 'dark';
};

export const useStore = create((set) => ({
  // Core UI State
  isLoaded: false,
  setIsLoaded: (status) => set({ isLoaded: status }),
  
  // Theme & Mode
  theme: getInitialTheme(), // 'dark' | 'light' | 'matrix' | 'cyberpunk'
  setTheme: (theme) => {
    localStorage.setItem('portfolio-theme', theme);
    set({ theme });
  },
  
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

  // Terminal State
  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  terminalHistory: [],
  addTerminalHistory: (cmd) => set((state) => ({ 
    terminalHistory: [...state.terminalHistory, cmd] 
  })),
  terminalBuffer: [],
  addTerminalBuffer: (lines) => set((state) => ({
    terminalBuffer: [...state.terminalBuffer, ...(Array.isArray(lines) ? lines : [lines])]
  })),
  clearTerminalBuffer: () => set({ terminalBuffer: [] }),
}));

