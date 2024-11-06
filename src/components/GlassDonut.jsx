// src/components/GlassDonut.js
import { useGLTF, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import './GlassDonut.css'



export default function GlassDonut({ isSpeaking }) {
  const { nodes } = useGLTF('/medias/torrus.glb');
  const { viewport } = useThree();
  const torus = useRef(null);

  // Rotazione continua
  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.x += 0.005;
    }
  });
  const [chromaticAberration, setChromaticAberration] = useState(0);

   // Effetto cromatico: se lo stato isSpeaking è true, aumenta la cromatic aberration
   useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setChromaticAberration(prev => Math.min(prev + 0.02, 1)); // Incrementa fino a 1
      }, 50); // Aggiorna ogni 50ms
      return () => clearInterval(interval); // Pulizia quando il chatbot non parla più
    } else {
      setChromaticAberration(0); // Reset della cromatic aberration quando non parla
    }
  }, [isSpeaking]);

  // // Impostazioni del materiale per l'effetto vetro
  // const materialProps = useControls({
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0, min: 0, max: 1, step: 0.1 },
  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },
  //   ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
  //   chromaticAberration: { value: 0.02, min: 0, max: 1 },
  //   backside: { value: true },
  // });
  // Animazione continua del torus
  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.x += 0.02;
    }
  });

  return (
    <>
   
   <Text
        position={[0, 0, -1]}
        fontSize={1.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        className={isSpeaking ? 'pulseText' : ''}
      >
        Let's party
      </Text>


<mesh ref={torus} geometry={nodes.Torus002.geometry} scale={viewport.width / 1.5}>
        <MeshTransmissionMaterial
          thickness={0.2} // Spessore
          roughness={0}   // Superficie liscia
          transmission={1} // Trasmissione (effetto vetro)
          ior={1.2} // Indice di rifrazione
          chromaticAberration={chromaticAberration} // La cromatic aberration cambia dinamicamente
          backside={true} // Rende il materiale visibile da entrambi i lati
        />
      </mesh>
    </>

  );
}
