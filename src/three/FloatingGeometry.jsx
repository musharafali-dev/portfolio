import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../core/store/useStore';
import './shaders/HologramMaterial';

export default function FloatingGeometry() {
  const groupRef = useRef(null);
  const { theme } = useStore();
  const color = theme === 'matrix' ? '#22c55e' : '#a855f7';

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    groupRef.current.rotation.x += (mouseY * 0.5 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.05;

    // Update hologram uniform
    if (groupRef.current.children[0].material.time !== undefined) {
      groupRef.current.children[0].material.time = t;
      groupRef.current.children[1].material.time = t;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[1.4, 1]} />
          <hologramMaterial color={color} scanlineDensity={100.0} opacity={0.6} transparent depthWrite={false} />
        </mesh>
        <mesh scale={0.9}>
          <icosahedronGeometry args={[1.4, 1]} />
          <hologramMaterial color={color} scanlineDensity={50.0} opacity={1.0} transparent depthWrite={false} />
        </mesh>
      </group>
    </Float>
  );
}
