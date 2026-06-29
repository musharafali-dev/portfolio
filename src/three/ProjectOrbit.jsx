import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import { projects } from '../data/projects';
import { useStore } from '../core/store/useStore';

function OrbitCard({ project, index, total, orbitRadius, speedRef }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { setTransitioning } = useStore();
  
  useCursor(hovered);

  // Set card angles evenly around Y-axis
  const angle = (index / total) * Math.PI * 2;

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slow down rotation if hovered
    const currentSpeed = hovered ? 0.05 : 0.25;
    speedRef.current += (currentSpeed - speedRef.current) * 0.1;

    // Update orbit position based on elapsed time and starting angle
    const t = state.clock.getElapsedTime() * speedRef.current * 0.5 + angle;
    ref.current.position.x = Math.sin(t) * orbitRadius;
    ref.current.position.z = Math.cos(t) * orbitRadius;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() + index) * 0.15; // gentle vertical sway

    // Face camera (Billboarding)
    ref.current.lookAt(state.camera.position);

    // Dynamic scaling on hover
    const targetScale = hovered ? 1.15 : 1.0;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setTransitioning(true);

    // Zoom camera directly in front of this clicked card
    const targetCamX = ref.current.position.x * 0.8;
    const targetCamZ = ref.current.position.z * 0.8;
    const targetCamY = ref.current.position.y;

    gsap.to(e.camera.position, {
      x: targetCamX,
      y: targetCamY,
      z: targetCamZ,
      duration: 1.0,
      ease: 'power3.inOut',
      onComplete: () => {
        navigate(`/project/${project.id}`);
        setTransitioning(false);
      }
    });
  };

  return (
    <group 
      ref={ref}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      onClick={handleClick}
    >
      {/* 3D Panel */}
      <mesh>
        <planeGeometry args={[3.0, 2.0]} />
        <meshPhysicalMaterial 
          color={project.color}
          transparent 
          opacity={hovered ? 0.95 : 0.5} 
          roughness={0.15} 
          metalness={0.9}
          clearcoat={1}
          transmission={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Decorative outline border */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.06, 2.06]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : project.color} wireframe transparent opacity={0.6} />
      </mesh>

      {/* Project Title */}
      <Text 
        position={[0, 0.2, 0.1]} 
        fontSize={0.2} 
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkGpu8PNMs46CEc_0hDhiM.woff"
      >
        {project.title}
      </Text>

      {/* Subtitle / Tech Tags */}
      <Text 
        position={[0, -0.2, 0.1]} 
        fontSize={0.11} 
        color="#f8fafc"
        opacity={0.7}
        anchorX="center"
        anchorY="middle"
      >
        {project.tags.join(' | ')}
      </Text>

      {hovered && (
        <Text 
          position={[0, -0.6, 0.1]} 
          fontSize={0.09} 
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          CLICK TO EXPLORE
        </Text>
      )}
    </group>
  );
}

export default function ProjectOrbit() {
  const speedRef = useRef(0.2);
  const orbitRadius = 6.5;

  return (
    <group>
      {projects.map((project, i) => (
        <OrbitCard 
          key={project.id} 
          project={project} 
          index={i} 
          total={projects.length} 
          orbitRadius={orbitRadius}
          speedRef={speedRef}
        />
      ))}
    </group>
  );
}
