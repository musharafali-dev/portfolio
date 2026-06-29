import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

import { useStore } from '../core/store/useStore';
import { usePerformance } from '../core/store/PerformanceContext';
import CameraRig from './CameraRig';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';
import Globe from './Globe';
import AvatarCard from './AvatarCard';
import SkillGalaxy from './SkillGalaxy';
import ProjectOrbit from './ProjectOrbit';

export default function SceneManager() {
  const theme = useStore(state => state.theme);
  const { tier } = usePerformance() || { tier: 'high' };
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Throttle calculations when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (tier === 'fallback') {
    return null; // Fall back completely to 2D HTML/CSS mode
  }

  // Dynamic colors based on themes
  const getLightingColor = () => {
    switch (theme) {
      case 'matrix':
        return '#22c55e'; // Green
      case 'cyberpunk':
        return '#f43f5e'; // Rose/Neon red
      case 'light':
        return '#3b82f6'; // Blue
      default:
        return '#a855f7'; // Purple (dark mode default)
    }
  };

  const getBackgroundColor = () => {
    switch (theme) {
      case 'light':
        return '#f8fafc';
      case 'matrix':
        return '#022c22'; // Very deep forest green
      case 'cyberpunk':
        return '#0f051d'; // Retro deep indigo
      default:
        return '#0a0a0f';
    }
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={tier === 'high' ? [1, 2] : 1}
      gl={{ 
        antialias: tier === 'high' || tier === 'medium', 
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true
      }}
      className="fixed inset-0 -z-10"
      style={{ 
        background: getBackgroundColor(),
        pointerEvents: 'auto' // Allow pointer interaction for clicking project panels
      }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        
        <ambientLight intensity={theme === 'light' ? 1.2 : 0.6} />
        <pointLight position={[10, 10, 10]} color={getLightingColor()} intensity={2.5} />
        
        {/* Render elements and physics calculation if tab is visible */}
        {isTabVisible && (
          <Physics gravity={[0, 0, 0]}>
            <group position={[0, 0, 0]}>
              <ParticleField />
              <group position={[3, 0, -2]}>
                <FloatingGeometry />
              </group>
            </group>

            {/* Layout structures along the scroll Z-path */}
            <group position={[-3, 0, -12]}>
              <AvatarCard />
            </group>
            
            <group position={[3.5, 0, -18]}>
              <SkillGalaxy />
            </group>

            <group position={[0, 0, -28]}>
              <ProjectOrbit />
            </group>

            <group position={[0, -2.2, -38]}>
              <Globe />
            </group>
          </Physics>
        )}

        {/* Post Processing: Enable only on High Performance tier */}
        {tier === 'high' && isTabVisible && (
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={theme === 'matrix' ? 0.1 : 0.25} 
              mipmapBlur 
              intensity={theme === 'matrix' || theme === 'cyberpunk' ? 2.2 : 1.4} 
            />
            <Noise opacity={0.03} />
          </EffectComposer>
        )}

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
