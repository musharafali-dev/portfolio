import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../core/store/useStore';
import { usePerformance } from '../core/store/PerformanceContext';
import { Terminal as TermIcon, Minimize2, Maximize2, X } from 'lucide-react';
import { analytics } from '../core/utils/analytics';

const COMMANDS = [
  'help', 'whoami', 'skills', 'projects', 'view', 'theme', 'email', 'social', 'download', 'stats', 'clear', 'matrix', 'close', 'weather', 'time', 'minimize'
];

export default function Terminal() {
  const { 
    isTerminalOpen, 
    toggleTerminal, 
    terminalHistory, 
    addTerminalHistory, 
    terminalBuffer, 
    addTerminalBuffer, 
    clearTerminalBuffer,
    theme,
    setTheme
  } = useStore();

  const { fps, tier } = usePerformance() || { fps: 60, tier: 'high' };

  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  
  const bufferEndRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isTerminalOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen, isMinimized]);

  // Handle global key shortcut (Backtick or Ctrl + Backtick)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      }
      if (e.key === 'Escape' && isTerminalOpen) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, toggleTerminal]);

  // Autoscroll buffer
  useEffect(() => {
    if (bufferEndRef.current) {
      bufferEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalBuffer]);

  // Matrix Rain Background Effect in Terminal
  useEffect(() => {
    if (!showMatrixRain || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const columns = Math.floor(width / 16);
    const yPositions = Array(columns).fill(0);

    const matrixEffect = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#22c55e'; // Green text
      ctx.font = '15px monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const text = String.fromCharCode(33 + Math.random() * 93);
        const x = i * 16;
        const y = yPositions[i];
        
        ctx.fillText(text, x, y);
        
        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 16;
        }
      }
    };

    const interval = setInterval(matrixEffect, 30);
    const handleResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [showMatrixRain]);

  // Print initial greeting on first mount
  useEffect(() => {
    if (terminalBuffer.length === 0) {
      addTerminalBuffer([
        '====================================================',
        '   MUSHAFAR DEV CONSOLE CORE SYSTEMS v2.1           ',
        '   TYPE "help" TO SEE AVAILABLE PORTFOLIO COMMANDS  ',
        '====================================================',
        ' '
      ]);
    }
  }, [terminalBuffer, addTerminalBuffer]);

  const executeCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    const parts = cleanCmd.split(' ');
    const command = parts[0];
    const arg = parts.slice(1).join(' ');

    analytics.logEvent('terminal_command', { command });

    addTerminalHistory(cmdText);
    setHistoryIndex(-1);

    // Echo command
    addTerminalBuffer([`> ${cmdText}`]);

    if (!command) return;

    switch (command) {
      case 'help':
        addTerminalBuffer([
          'Available commands:',
          '  whoami          - Display developer information & ASCII signature',
          '  skills          - Render technical skill progress bars',
          '  projects        - List selected works / portfolio index',
          '  view [num]      - View a project case study (e.g. view 1)',
          '  theme [name]    - Set website theme (dark, light, matrix, cyberpunk)',
          '  email           - Open mail client prefilled to developer email',
          '  social          - Expose developer handles',
          '  download        - Trigger Resume CV PDF download',
          '  stats           - Output live FPS and graphics hardware quality',
          '  time            - Display current date and local Gilgit time',
          '  weather         - Output current mountain weather of GB',
          '  matrix          - Toggle background green matrix code stream',
          '  clear           - Wipes developer terminal console logs',
          '  minimize        - Collapses terminal to a floating window bubble',
          '  close           - Exit console session'
        ]);
        break;

      case 'whoami':
        addTerminalBuffer([
          ' ',
          '   __  __           _                       _f     ',
          '  |  \\/  |_   _ ___| |__   __ _ _ __  _ __ (_)     ',
          '  | |\\/| | | | / __| \'_ \\ / _` | \'_ \\| \'__|| |     ',
          '  | |  | | |_| \\__ \\ | | | (_| | |_) | |   | |     ',
          '  |_|  |_|\\__,_|___/_| |_|\\__,_| .__/|_|   |_|     ',
          '                               |_|                 ',
          ' ',
          'NAME: Musharraf Ali',
          'ROLE: Full-Stack Developer & Blockchain Engineer',
          'LOCATION: Gilgit, Pakistan',
          'EDUCATION: BS Software Engineering (Karakoram International University)',
          'BIO: Brutally efficient software architect building high-performance',
          '     WebGL interfaces, Solidity NFT smart contracts, and full-stack utilities.',
          ' '
        ]);
        break;

      case 'skills':
        addTerminalBuffer([
          'React / Next.js     [████████████████████] 95%',
          'Three.js / WebGL    [██████████████████░░] 88%',
          'Node.js / Express   [███████████████████░] 92%',
          'Solidity / Ethereum [█████████████████░░░] 86%',
          'UI / UX Design      [████████████████████] 95%',
          'Video Editing       [████████████████████] 99%'
        ]);
        break;

      case 'projects':
        addTerminalBuffer([
          'Selected Portfolio Projects:',
          '  [1] 3D E-Commerce Configurator (React, Three.js, Node.js)',
          '  [2] AI Dashboard Visualizer (React, Tailwind, Chart.js)',
          '  [3] Globe visualizer (Three.js, GLSL, Vite)',
          '  [4] Mobile Finance App (React Native, Reanimated)',
          '  [5] Portfolio builder SaaS (React, Next.js, Prisma)',
          '  [6] Particle Universe Math Art (WebGL, JavaScript)',
          ' ',
          'Type "view [1-6]" to open details page.'
        ]);
        break;

      case 'view':
        const index = parseInt(arg);
        if (index >= 1 && index <= 6) {
          addTerminalBuffer([`Navigating to Project ${index} Case Study...`]);
          // Direct navigate via router
          window.location.hash = `/project/${index}`;
          toggleTerminal();
        } else {
          addTerminalBuffer(['Error: Project index must be between 1 and 6. E.g. "view 2"']);
        }
        break;

      case 'theme':
        const validThemes = ['dark', 'matrix', 'cyberpunk'];
        if (validThemes.includes(arg)) {
          setTheme(arg);
          addTerminalBuffer([`Theme set to: ${arg.toUpperCase()}`]);
        } else {
          addTerminalBuffer([`Error: Theme must be one of: ${validThemes.join(', ')}`]);
        }
        break;

      case 'email':
        addTerminalBuffer(['Opening default email client...']);
        window.open('mailto:itsmalipk@gmail.com?subject=Portfolio%20Inquiry');
        break;

      case 'social':
        addTerminalBuffer([
          'Social channels:',
          '  GitHub:   github.com/musharafali-dev',
          '  LinkedIn: linkedin.com/in/musharafali',
          '  Email:    itsmalipk@gmail.com'
        ]);
        break;

      case 'download':
        addTerminalBuffer(['Downloading CV.pdf...']);
        const link = document.createElement('a');
        link.href = '/CV.pdf';
        link.download = 'Musharraf_Ali_CV.pdf';
        link.click();
        break;

      case 'stats':
        addTerminalBuffer([
          `GPU Rendering Tier:  ${tier.toUpperCase()}`,
          `Active Frame Rate:   ${fps} FPS`,
          `Connection Bandwidth: ${navigator.connection?.effectiveType || 'N/A'}`
        ]);
        break;

      case 'time':
        const now = new Date();
        addTerminalBuffer([
          `Date: ${now.toLocaleDateString()}`,
          `Time: ${now.toLocaleTimeString()} (PKT, UTC+5)`
        ]);
        break;

      case 'weather':
        addTerminalBuffer([
          'Location: Gilgit-Baltistan, Pakistan (Mountain Region)',
          'Temperature: 22°C (Clear skies)',
          'Wind: 8 km/h NW',
          'Remarks: Perfect weather for high-performance coding.'
        ]);
        break;

      case 'matrix':
        setShowMatrixRain(prev => !prev);
        addTerminalBuffer([showMatrixRain ? 'Matrix rain disabled.' : 'Matrix rain enabled.']);
        break;

      case 'clear':
        clearTerminalBuffer();
        break;

      case 'minimize':
        setIsMinimized(true);
        break;

      case 'close':
        toggleTerminal();
        break;

      default:
        addTerminalBuffer([
          `Command not found: "${command}".`,
          'Type "help" to view the available commands list.'
        ]);
    }
  };

  const handleInputKeyDown = (e) => {
    // Autocomplete on Tab
    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = COMMANDS.filter(c => c.startsWith(inputVal.toLowerCase()));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      } else if (matches.length > 1) {
        addTerminalBuffer([`> ${inputVal}`, matches.join('   ')]);
      }
    }

    // Command History Navigation on ArrowUp / ArrowDown
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? terminalHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(terminalHistory[nextIdx]);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (terminalHistory.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= terminalHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(terminalHistory[nextIdx]);
        }
      }
    }

    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  if (!isTerminalOpen) return null;

  // Render a tiny floating bubble when minimized
  if (isMinimized) {
    return (
      <button 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce"
        title="Open Developer Console"
      >
        <TermIcon size={24} />
      </button>
    );
  }

  const getTerminalColors = () => {
    switch (theme) {
      case 'matrix':
        return 'border-green-500/30 bg-[#022c22]/90 text-green-400 font-mono shadow-[0_0_20px_rgba(34,197,94,0.3)]';
      case 'cyberpunk':
        return 'border-rose-500/30 bg-[#0f051d]/90 text-[#f43f5e] font-mono shadow-[0_0_20px_rgba(244,63,94,0.3)]';
      case 'light':
        return 'border-gray-300 bg-white/95 text-slate-800 font-mono shadow-2xl';
      default:
        return 'border-purple-500/20 bg-slate-950/90 text-slate-200 font-mono shadow-[0_0_20px_rgba(168,85,247,0.25)]';
    }
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div 
        className={`relative flex h-[75vh] w-full max-w-3xl flex-col rounded-xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${getTerminalColors()}`}
        role="terminal"
        aria-label="Developer Console Terminal"
        aria-live="polite"
      >
        {/* Canvas for Matrix code rain */}
        {showMatrixRain && (
          <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none opacity-20" />
        )}

        {/* Scanline CRT simulation */}
        <div className="pointer-events-none absolute inset-0 -z-5 opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs uppercase tracking-wider opacity-60">developer_console.sh</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMinimized(true)}
              className="opacity-60 hover:opacity-100 hover:text-accent-light"
              aria-label="Minimize terminal"
            >
              <Minimize2 size={16} />
            </button>
            <button 
              onClick={toggleTerminal}
              className="opacity-60 hover:opacity-100 text-red-500"
              aria-label="Close terminal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2 text-sm leading-relaxed" data-lenis-prevent="true">
          {terminalBuffer.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">{line}</div>
          ))}
          <div ref={bufferEndRef} />
        </div>

        {/* Input prompt */}
        <div className="flex items-center gap-2 border-t border-white/10 px-6 py-4 bg-white/5 font-mono">
          <span className="text-accent-light opacity-80">{`guest@musharaf.dev:~$`}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent outline-none border-none p-0 text-inherit focus:ring-0"
            aria-label="Terminal command input prompt"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
