import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../core/store/useStore';
import gsap from 'gsap';

export default function CameraRig() {
  const { scrollProgress, activeSection } = useStore();
  const groupRef = useRef();

  useFrame((state, delta) => {
    // 1. Base Camera Z-Depth Movement based on Scroll (Cinematic Drive)
    // As we scroll from 0 to 1, we move the camera deeper into the scene
    const targetZ = gsap.utils.interpolate(10, -50, scrollProgress);
    
    // Smoothly interpolate Z
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;

    // 2. Subtle Mouse Sway (Parallax)
    const targetX = state.pointer.x * 2;
    const targetY = state.pointer.y * 1.5;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;

    // 3. Optional: Dynamic Rotation based on active section
    // E.g., if we are in 'projects', maybe we look slightly down
    let rotX = 0;
    if (activeSection === 'projects') rotX = -0.1;
    if (activeSection === 'contact') rotX = 0.1;

    state.camera.rotation.x += (rotX - state.camera.rotation.x) * 0.05;
  });

  return <group ref={groupRef} />;
}
