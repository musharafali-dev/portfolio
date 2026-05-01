import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, InstancedRigidBodies } from '@react-three/rapier';
import * as THREE from 'three';
import { skills } from '../data/skills';

export default function SkillGalaxy() {
  const count = skills.length;
  const instancedMeshRef = useRef();

  // Create initial positions and colors for planets
  const { positions, scales, colors } = useMemo(() => {
    const positions = [];
    const scales = [];
    const colors = [];
    const colorTheme = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 5;
      const angle = (i / count) * Math.PI * 2;
      
      positions.push([
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * radius
      ]);
      
      // Scale based on skill level (78 to 95 mapped to 0.5 to 1.5)
      const scale = (skills[i].level / 100) * 1.5;
      scales.push([scale, scale, scale]);

      // Alternating purple/blue shades
      colorTheme.set(Math.random() > 0.5 ? '#7c3aed' : '#3b82f6').lerp(new THREE.Color('#a855f7'), Math.random());
      colors.push(colorTheme.r, colorTheme.g, colorTheme.b);
    }
    
    return { 
      positions: Float32Array.from(positions.flat()), 
      scales: Float32Array.from(scales.flat()),
      colors: Float32Array.from(colors)
    };
  }, [count]);

  const bodyApi = useRef();

  // Orbital motion using forces
  useFrame((state) => {
    if (!bodyApi.current) return;
    
    // Apply a tangential force to make them orbit the center
    for (let i = 0; i < count; i++) {
      const translation = bodyApi.current.at(i).translation();
      const distance = Math.sqrt(translation.x ** 2 + translation.z ** 2);
      
      // Pull towards center
      const pullStrength = 0.5;
      const pullX = -translation.x * pullStrength;
      const pullZ = -translation.z * pullStrength;
      const pullY = -translation.y * pullStrength * 2; // Keep them on the flat plane
      
      // Tangential velocity (orbit)
      const orbitSpeed = 2.0;
      const tangX = -translation.z * orbitSpeed;
      const tangZ = translation.x * orbitSpeed;

      bodyApi.current.at(i).applyImpulse({ x: pullX + tangX, y: pullY, z: pullZ + tangZ }, true);
    }
  });

  return (
    <group>
      <InstancedRigidBodies
        ref={bodyApi}
        positions={positions}
        scales={scales}
        colliders="ball"
        restitution={0.8}
        linearDamping={4}
        angularDamping={1}
      >
        <instancedMesh ref={instancedMeshRef} args={[null, null, count]} castShadow receiveShadow>
          <sphereGeometry args={[1, 32, 32]}>
            <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
          </sphereGeometry>
          <meshStandardMaterial vertexColors roughness={0.2} metalness={0.8} emissive="#2e1065" emissiveIntensity={0.2} />
        </instancedMesh>
      </InstancedRigidBodies>

      {/* Central Black Hole / Sun */}
      <RigidBody type="fixed" colliders="ball">
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#000000" />
          <mesh scale={1.1}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} wireframe />
          </mesh>
        </mesh>
      </RigidBody>
    </group>
  );
}
