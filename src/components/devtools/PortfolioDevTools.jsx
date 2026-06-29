import React, { useState } from 'react';
import { useStore } from '../../core/store/useStore';
import { usePerformance } from '../../core/store/PerformanceContext';
import { analytics } from '../../core/utils/analytics';
import { Settings, BarChart2, Eye, RefreshCw, Layers } from 'lucide-react';

export default function PortfolioDevTools() {
  const { theme, setTheme, activeSection, performanceTier, setPerformanceTier } = useStore();
  const { fps, tier } = usePerformance() || { fps: 60, tier: 'high' };
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('performance');

  const logs = analytics.getLogs();

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur-md transition-all hover:scale-105"
        title="Open DevTools Panel"
      >
        <Settings size={18} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex h-96 w-80 flex-col rounded-xl border border-white/10 bg-slate-950/90 p-4 font-mono text-xs text-slate-300 shadow-2xl backdrop-blur-md">
      
      {/* DevTools Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <span className="font-bold text-accent-light flex items-center gap-1.5">
          <Settings size={14} /> PORTFOLIO DEVTOOLS
        </span>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-500 hover:text-white"
        >
          [hide]
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2 mb-2 text-[10px]">
        {[
          { id: 'performance', label: 'PERF', icon: <BarChart2 size={10} /> },
          { id: 'state', label: 'STATE', icon: <Layers size={10} /> },
          { id: 'logs', label: 'LOGS', icon: <Eye size={10} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              activeTab === tab.id ? 'bg-accent text-white' : 'bg-white/5 hover:bg-white/10 text-slate-400'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {activeTab === 'performance' && (
          <div className="space-y-2.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>FPS Rate:</span>
              <span className={`font-bold ${fps >= 50 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                {fps} FPS
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>Active GPU Tier:</span>
              <span className="font-bold text-accent-light">{tier.toUpperCase()}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500">Override Render Quality:</span>
              <div className="flex gap-1">
                {['high', 'medium', 'low', 'fallback'].map(t => (
                  <button
                    key={t}
                    onClick={() => setPerformanceTier(t)}
                    className={`flex-1 py-1 rounded border text-[9px] ${
                      performanceTier === t ? 'border-accent bg-accent/20 text-white' : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'state' && (
          <div className="space-y-2">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>Active Section:</span>
              <span className="text-white font-bold">{activeSection.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>Active Theme:</span>
              <span className="text-white font-bold">{theme.toUpperCase()}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500">Force Global Theme:</span>
              <div className="flex flex-wrap gap-1">
                {['dark', 'light', 'matrix', 'cyberpunk'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-2 py-1 rounded border text-[9px] ${
                      theme === t ? 'border-accent bg-accent/20 text-white' : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-500">Recent User Events:</span>
              <button 
                onClick={() => {
                  analytics.clearLogs();
                  window.location.reload();
                }}
                className="text-red-400 hover:underline flex items-center gap-0.5"
              >
                <RefreshCw size={8} /> clear
              </button>
            </div>
            {logs.length === 0 ? (
              <div className="text-slate-600 text-center py-4">No events logged yet.</div>
            ) : (
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {logs.slice().reverse().map((log, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-1 font-mono">
                    <span className="text-green-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
                    <span className="text-white">{log.name}</span>
                    {log.data && Object.keys(log.data).length > 0 && (
                      <span className="text-slate-500 block pl-2">{JSON.stringify(log.data)}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
