import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleSphere = ({ isSpeaking }) => {
  const mountRef = useRef(null);
  const particleSystemRef = useRef(null);
  const pulseRef = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const canvasWidth = window.innerWidth * 0.5; // Imposta a metà larghezza dello schermo
    const canvasHeight = window.innerHeight * 0.5; // Imposta a metà altezza dello schermo
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const radius = 0.5; // Riduci ulteriormente il raggio della sfera

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01, // Riduci ulteriormente la dimensione della particella
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    particleSystemRef.current = particleSystem;
    scene.add(particleSystem);

    camera.position.z = 2.5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotazione costante
      particleSystem.rotation.y += 0.001;

      if (isSpeaking) {
        pulseRef.current += 0.1;
        particlesMaterial.size = 0.01 + Math.sin(pulseRef.current) * 0.004; // Imposta una pulsazione ridotta

        const colors = particleSystem.geometry.attributes.color.array;
        for (let i = 0; i < particleCount; i++) {
          colors[i * 3] = 0.5 + Math.sin(pulseRef.current + i * 0.1) * 0.5;
          colors[i * 3 + 1] = 0.5 + Math.sin(pulseRef.current + i * 0.2) * 0.5;
          colors[i * 3 + 2] = 0.5 + Math.sin(pulseRef.current + i * 0.3) * 0.5;
        }
        particleSystem.geometry.attributes.color.needsUpdate = true;
      } else {
        const colors = particleSystem.geometry.attributes.color.array;
        for (let i = 0; i < particleCount; i++) {
          colors[i * 3] += (1 - colors[i * 3]) * 0.1;
          colors[i * 3 + 1] += (1 - colors[i * 3 + 1]) * 0.1;
          colors[i * 3 + 2] += (1 - colors[i * 3 + 2]) * 0.1;
        }
        particleSystem.geometry.attributes.color.needsUpdate = true;
        
        particlesMaterial.size += (0.01 - particlesMaterial.size) * 0.1;  // Ritorno graduale alla dimensione base
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [isSpeaking]);

  return <div className="particle-container" ref={mountRef} />;
};

export default ParticleSphere;
