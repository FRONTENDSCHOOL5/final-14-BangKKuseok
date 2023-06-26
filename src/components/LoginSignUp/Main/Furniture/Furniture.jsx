import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sofa from './Sofa';

export default function Furniture() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <spotLight intensity={2} angle={0.1} penumbra={1} position={[10, -15, -5]} castShadow />
          <directionalLight />
          <Sofa />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
    </>
  );
}
