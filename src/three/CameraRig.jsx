import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../core/store/useStore';
import gsap from 'gsap';

export default function CameraRig() {
  const { scrollProgress } = useStore();
  const groupRef = useRef();

  useFrame((state) => {
    // Coordinate path for camera movement on scroll
    // scrollProgress goes from 0.0 (top) to 1.0 (bottom)
    
    // Z positions for key frames:
    // 0%   (Home)    -> Z = 6
    // 33%  (About)   -> Z = -6
    // 66%  (Projects)-> Z = -21
    // 100% (Contact) -> Z = -32.5
    
    let targetZ = 6;
    let targetX = 0;
    let targetY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    if (scrollProgress <= 0.33) {
      // Home to About transition
      const t = scrollProgress / 0.33;
      targetZ = gsap.utils.interpolate(6, -6, t);
      targetX = gsap.utils.interpolate(0, -0.6, t); // Look slightly right by offsetting camera to the left
      targetY = gsap.utils.interpolate(0, 0, t);
    } else if (scrollProgress <= 0.66) {
      // About to Projects transition
      const t = (scrollProgress - 0.33) / 0.33;
      targetZ = gsap.utils.interpolate(-6, -21, t);
      targetX = gsap.utils.interpolate(-0.6, 0, t); // Center camera back for project panels
      targetY = gsap.utils.interpolate(0, 0, t);
    } else {
      // Projects to Contact transition
      const t = (scrollProgress - 0.66) / 0.34;
      targetZ = gsap.utils.interpolate(-21, -32.5, t);
      targetX = gsap.utils.interpolate(0, 0, t);
      targetY = gsap.utils.interpolate(0, -0.4, t); // Focus lower on the globe
      targetRotX = gsap.utils.interpolate(0, 0.1, t); // Look slightly down
    }

    // Smooth camera movements with linear interpolation
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.08;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.08;

    // Mouse parallax offset (based on active viewport mouse pointer position)
    const mouseParallaxX = state.pointer.x * 0.8;
    const mouseParallaxY = state.pointer.y * 0.6;

    state.camera.position.x += (mouseParallaxX - state.camera.position.x) * 0.03;
    state.camera.position.y += (mouseParallaxY - state.camera.position.y) * 0.03;

    // Subtle pitch/yaw rotation updates
    state.camera.rotation.x += (targetRotX - state.camera.rotation.x) * 0.05;
    state.camera.rotation.y += (targetRotY - state.camera.rotation.y) * 0.05;
  });

  return <group ref={groupRef} />;
}
