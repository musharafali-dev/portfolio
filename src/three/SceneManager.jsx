import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

import { useStore } from '../core/store/useStore';
import CameraRig from './CameraRig';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';
import Globe from './Globe';
import AvatarCard from './AvatarCard';
import SkillGalaxy from './SkillGalaxy';
import ProjectPanels from './ProjectPanels';

// We'll lazy load physics heavy components or distinct scenes later
// For now, we compose the unified world

export default function SceneManager() {
  const performanceTier = useStore(state => state.performanceTier);
  const theme = useStore(state => state.theme);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={performanceTier === 'high' ? [1, 2] : 1}
      gl={{ antialias: performanceTier === 'high', powerPreference: 'high-performance' }}
      className="fixed inset-0 -z-10"
      style={{ background: theme === 'light' ? '#f8fafc' : '#0a0a0f' }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        
        {/* Environment & Lighting */}
        <ambientLight intensity={theme === 'light' ? 1.0 : 0.5} />
        <pointLight position={[10, 10, 10]} color={theme === 'matrix' ? '#22c55e' : '#a855f7'} intensity={2} />
        
        {/* Phase 3: Physics Universe */}
        <Physics gravity={[0, 0, 0]}>
          <group position={[0, 0, 0]}>
            <ParticleField />
            <group position={[3, 0, -2]}>
              <FloatingGeometry />
            </group>
          </group>

          {/* Place other components deep in Z-space */}
          <group position={[-5, 0, -15]}>
            <AvatarCard />
          </group>
          
          <group position={[5, 0, -15]}>
            <SkillGalaxy />
          </group>

          <group position={[0, 0, -25]}>
            <ProjectPanels />
          </group>

          <group position={[0, -2, -35]}>
            <Globe />
          </group>
        </Physics>

        {/* Post Processing */}
        {performanceTier === 'high' && (
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={theme === 'matrix' ? 2.0 : 1.2} 
            />
            <Noise opacity={0.05} />
          </EffectComposer>
        )}

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
