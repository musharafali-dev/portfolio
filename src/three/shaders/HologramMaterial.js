import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const HologramMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#a855f7'),
    scanlineDensity: 100.0,
    opacity: 0.8
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float scanlineDensity;
    uniform float opacity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      // Create scanlines
      float scanline = sin(vUv.y * scanlineDensity + time * 5.0) * 0.04;
      
      // Edge glow (Fresnel effect)
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = dot(viewDirection, vNormal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);
      
      // Combine color, scanline, and fresnel glow
      vec3 finalColor = color + vec3(scanline) + (color * fresnel * 2.0);
      
      gl_FragColor = vec4(finalColor, opacity * (0.4 + fresnel));
    }
  `
);

extend({ HologramMaterial });

export { HologramMaterial };
