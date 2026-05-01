import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export function usePerformanceMonitor() {
  const setPerformanceTier = useStore(state => state.setPerformanceTier);
  const frames = useRef(0);
  const prevTime = useRef(performance.now());
  const checkInterval = 2000; // Check every 2 seconds
  const lowFpsThreshold = 35;
  const consecutiveLowFpsCount = useRef(0);

  useEffect(() => {
    let animationFrameId;

    const checkPerformance = (time) => {
      frames.current++;

      if (time >= prevTime.current + checkInterval) {
        const fps = (frames.current * 1000) / (time - prevTime.current);
        
        if (fps < lowFpsThreshold) {
          consecutiveLowFpsCount.current++;
          if (consecutiveLowFpsCount.current >= 2) {
            // If FPS is low for two consecutive checks (4 seconds total), downgrade
            setPerformanceTier('low');
            console.warn(`[Performance] FPS dropped to ${fps.toFixed(1)}. Switching to low performance tier.`);
            cancelAnimationFrame(animationFrameId); // Stop monitoring after downgrade
            return;
          }
        } else {
          consecutiveLowFpsCount.current = 0;
        }

        prevTime.current = time;
        frames.current = 0;
      }

      animationFrameId = requestAnimationFrame(checkPerformance);
    };

    animationFrameId = requestAnimationFrame(checkPerformance);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [setPerformanceTier]);
}
