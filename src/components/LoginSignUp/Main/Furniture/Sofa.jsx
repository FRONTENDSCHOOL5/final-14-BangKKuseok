import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import sofaModel from '../../../../assets/models/sofa.glb';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import beige from '../../../../assets/matcaps/beige.png';
import blue from '../../../../assets/matcaps/blue.png';
import orange from '../../../../assets/matcaps/orange.png';
import green from '../../../../assets/matcaps/green.png';
import yellow from '../../../../assets/matcaps/yellow.png';
import pink from '../../../../assets/matcaps/pink.png';
import Spinner from '../../../common/Spinner/Spinner';

export default function Sofa() {
  const group = useRef();
  const { nodes, materials } = useGLTF(sofaModel);

  function toRadian(deg) {
    return (deg * Math.PI) / 180;
  }

  const [isMain, setIsMain] = useState(true);
  const mainMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ff7f71'),
    emissive: new THREE.Color('#000'),
    roughness: 0.618,
    metalness: 0.135,
    reflectivity: 0.22,
    clearcoat: 0,
    clearcoatRoughness: 0,
  });

  const matCaps = useLoader(TextureLoader, [green, green, yellow, blue, beige, pink, orange]);
  const count = useRef(0);
  const [matCap, setMatCap] = useState();
  useEffect(() => {
    const timeout = setTimeout(() => {
      const loop = setInterval(() => {
        if (count.current > matCaps.length) {
          count.current = 0;
        } else {
          count.current += 1;
        }
        setMatCap(matCaps[count.current]);
        return () => clearInterval(loop);
      }, 2000);
      return () => clearTimeout(timeout);
    }, 2000);
  }, []);

  useEffect(() => {
    const main = setTimeout(() => {
      setIsMain(false);
      return () => clearTimeout(main);
    }, 2000);
  });

  if (!materials) return <Spinner />;
  return (
    <group
      ref={group}
      dispose={null}
      scale={1.2}
      rotation={[toRadian(6), -toRadian(120), toRadian(-2)]}
      position={[0, -0.1, 0]}
    >
      <mesh castShadow receiveShadow geometry={nodes.Cube002.geometry}>
        {matCaps && <meshMatcapMaterial matcap={matCaps[4]} />}
      </mesh>
      {isMain ? (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={mainMaterial}
        />
      ) : (
        <mesh castShadow receiveShadow geometry={nodes.Cube002_1.geometry}>
          {matCap && <meshMatcapMaterial matcap={matCap} />}
        </mesh>
      )}
    </group>
  );
}
