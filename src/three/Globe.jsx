import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Globe() {
  const globeRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.2;
    }
    
    if (ringRef.current) {
      ringRef.current.scale.x += delta;
      ringRef.current.scale.y += delta;
      ringRef.current.material.opacity = 1 - (ringRef.current.scale.x - 1) * 2;
      
      if (ringRef.current.scale.x > 1.5) {
        ringRef.current.scale.set(1, 1, 1);
        ringRef.current.material.opacity = 1;
      }
    }
  });

  // Calculate position for the pin (e.g., somewhere roughly like NY)
  const lat = 40.7128;
  const lon = -74.0060;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const r = 1.5;
  
  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = (r * Math.sin(phi) * Math.sin(theta));
  const y = (r * Math.cos(phi));

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#7c3aed" wireframe={true} opacity={0.35} transparent={true} />
        
        {/* Location Pin relative to globe */}
        <group position={[x, y, z]} rotation={[Math.PI/2 - phi, theta, 0]}>
           <mesh>
             <sphereGeometry args={[0.04, 16, 16]} />
             <meshBasicMaterial color="#a855f7" />
           </mesh>
           <mesh ref={ringRef} position={[0, 0, 0]}>
             <ringGeometry args={[0.05, 0.08, 32]} />
             <meshBasicMaterial color="#a855f7" transparent opacity={1} side={THREE.DoubleSide} />
           </mesh>
        </group>
      </mesh>
    </group>
  );
}
