import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import sofaModel from '../../../../assets/models/sofa.glb';

export default function Sofa({ setIsRotate }) {
  function toRadian(deg) {
    return (deg * Math.PI) / 180;
  }
  const group = useRef();
  const { nodes } = useGLTF(sofaModel);
  const count = useRef(0);
  const colors = ['#ff7f71', '#fff870', '#86c975', '#708fff', '#b699ff', '#fcebc2'];
  const [matCap, setMatCap] = useState(colors[0]);

  const option = {
    color: new THREE.Color(matCap),
    emissive: new THREE.Color('#000'),
    roughness: 0.618,
    metalness: 0.135,
    reflectivity: 0.22,
    clearcoat: 0,
    clearcoatRoughness: 0,
  };

  const material = new THREE.MeshPhysicalMaterial(option);
  const legMaterial = new THREE.MeshPhysicalMaterial({
    ...option,
    color: new THREE.Color(colors[5]),
  });

  useEffect(() => {
    const loop = setInterval(() => {
      setIsRotate(false);
      setMatCap(colors[count.current]);
      if (count.current === colors.length - 1) {
        count.current = 0;
      } else {
        count.current += 1;
      }
      return () => {
        clearInterval(loop);
      };
    }, 2000);
  }, []);

  return (
    <group
      ref={group}
      dispose={null}
      scale={1.2}
      rotation={[toRadian(0), -toRadian(120), toRadian(-2)]}
      position={[0, -0.1, 0]}
    >
      <mesh castShadow receiveShadow geometry={nodes.Cube002.geometry} material={legMaterial} />
      <mesh castShadow receiveShadow geometry={nodes.Cube002_1.geometry} material={material} />
    </group>
  );
}
