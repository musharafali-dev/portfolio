import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../core/store/useStore';

export default function AvatarCard() {
  const meshRef = useRef(null);
  const texture = useTexture('/profile.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  const { viewport } = useThree();
  const { theme } = useStore();
  const accentLight = theme === 'matrix' ? '#22c55e' : '#a855f7';

  useEffect(() => {
    if (texture && texture.image) {
      const imageAspect = texture.image.width / texture.image.height;
      const planeAspect = viewport.width / viewport.height;
      
      if (imageAspect > planeAspect) {
        // Image is wider
        const scale = planeAspect / imageAspect;
        texture.repeat.set(scale, 1);
        texture.offset.set((1 - scale) / 2, 0);
      } else {
        // Image is taller
        const scale = imageAspect / planeAspect;
        texture.repeat.set(1, scale);
        texture.offset.set(0, (1 - scale) / 2);
      }
      texture.needsUpdate = true;
    }
  }, [texture, viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    // Subtle tilt based on mouse position
    const targetRotX = mouseY * 0.15;
    const targetRotY = mouseX * 0.15;
    
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.1;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} color={accentLight} intensity={2} />
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={meshRef}>
          {/* Multiply by 1.15 so the edges don't show when it tilts */}
          <planeGeometry args={[viewport.width * 1.15, viewport.height * 1.15]} />
          <meshStandardMaterial map={texture} roughness={0.4} metalness={0.1} />
        </mesh>
      </Float>
    </>
  );
}
