import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import { projects } from '../data/projects';
import { useStore } from '../core/store/useStore';

function Panel({ project, index, total }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { setTransitioning } = useStore();
  useCursor(hovered);

  // Position them in a curved layout or a grid
  const x = (index % 3) * 4 - 4;
  const y = Math.floor(index / 3) * -3 + 1.5;

  useFrame((state) => {
    // Gentle floating animation
    const t = state.clock.getElapsedTime();
    ref.current.position.y = y + Math.sin(t + index) * 0.1;
    
    // Hover scale
    const targetScale = hovered ? 1.05 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setTransitioning(true);
    
    // Zoom camera into this panel
    gsap.to(e.camera.position, {
      x: ref.current.position.x,
      y: ref.current.position.y,
      z: ref.current.position.z + 2, // zoom very close
      duration: 0.8,
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
      position={[x, y, 0]} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      onClick={handleClick}
    >
      {/* Glass Panel Base */}
      <mesh>
        <planeGeometry args={[3.5, 2.5]} />
        <meshPhysicalMaterial 
          color={project.color}
          transparent 
          opacity={hovered ? 0.8 : 0.4} 
          roughness={0.2} 
          metalness={0.8}
          clearcoat={1}
          transmission={0.5}
        />
      </mesh>
      
      {/* Title */}
      <Text 
        position={[0, 0, 0.1]} 
        fontSize={0.25} 
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkGpu8PNMs46CEc_0hDhiM.woff"
      >
        {project.title}
      </Text>
      
      {/* Subtitle / Category */}
      <Text 
        position={[0, -0.4, 0.1]} 
        fontSize={0.12} 
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        {project.category.toUpperCase()}
      </Text>
      
      {/* Click prompt */}
      {hovered && (
        <Text 
          position={[0, -0.8, 0.1]} 
          fontSize={0.1} 
          color="#ffffff"
          anchorX="center"
        >
          CLICK TO EXPLORE
        </Text>
      )}
    </group>
  );
}

export default function ProjectPanels() {
  return (
    <group>
      {projects.map((project, i) => (
        <Panel key={project.id} project={project} index={i} total={projects.length} />
      ))}
    </group>
  );
}
