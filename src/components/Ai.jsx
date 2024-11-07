import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import GlassDonut from '../components/GlassDonut';

export default function Ai({ isSpeaking }) {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <Canvas style={{ width: '100%', height: '100%', maxWidth:' 100vw' , maxHeight: '100vh' }}>
          <GlassDonut isSpeaking={isSpeaking} />
          <directionalLight intensity={2} position={[0, 2, 3]} />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
}
