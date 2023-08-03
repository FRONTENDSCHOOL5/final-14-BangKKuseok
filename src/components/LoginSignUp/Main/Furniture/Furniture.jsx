import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sofa from './Sofa';

export default function Furniture({ setIsRotate }) {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.2} angle={0.1} penumbra={1} position={[15, 20, 0]} castShadow />
          <directionalLight />
          <Sofa setIsRotate={setIsRotate} />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
    </>
  );
}
