import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../core/store/useStore';

export default function ParticleField() {
  const pointsRef = useRef(null);
  const { theme } = useStore();
  const accentLight = theme === 'matrix' ? '#22c55e' : '#a855f7';

  const particlesCount = 1500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [particlesCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;

    // Mouse parallax effect
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    pointsRef.current.position.x += (mouseX * 0.5 - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (mouseY * 0.5 - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color={accentLight} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}
