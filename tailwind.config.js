export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: 'rgba(255,255,255,0.04)',
        accent: { 
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)', 
          light: 'rgb(var(--accent-light) / <alpha-value>)' 
        },
        muted: '#94a3b8',
      },
      fontFamily: {
        heading: ["'Space Grotesk'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
      },
    },
  },
}
