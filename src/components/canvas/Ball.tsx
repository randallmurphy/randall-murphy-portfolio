'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import type { WebGLRenderer } from 'three';
import {
  Billboard,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from '@react-three/drei';
import Loader from '../Loader';

const Ball = ({ imgUrl, index }: { imgUrl: string; index: number }) => {
  const [decal] = useTexture([imgUrl]);
  const factor = index % 5;
  const speed = 2.0 + factor * 0.15;
  const rotationIntensity = 1.1 + factor * 0.25;
  const floatIntensity = 0.9 + factor * 0.1;
  const initialRotation: [number, number, number] = [
    (index * 0.73) % Math.PI,
    (index * 1.34) % Math.PI,
    (index * 0.47) % Math.PI,
  ];

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <mesh scale={1.05} rotation={initialRotation}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#3d3d3d"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.4}
          metalness={0.25}
        />
      </mesh>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false} position={[0, 0, 1.2]}>
        <mesh scale={1.1} renderOrder={1}>
          <planeGeometry args={[1.1, 1.1]} />
          <meshBasicMaterial map={decal} transparent depthTest={false} depthWrite={false} />
        </mesh>
      </Billboard>
    </Float>
  );
};

const BallCanvas = ({ icon, index }: { icon: string; index: number }) => {
  const glRef = useRef<WebGLRenderer | null>(null);
  // Small/touch screens get a lighter render config — antialiasing + a high pixel
  // ratio on 15 concurrent WebGL contexts is a real battery/frame-rate cost on phones.
  const isLowPowerViewport =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px), (pointer: coarse)').matches;

  useEffect(() => {
    return () => {
      const gl = glRef.current;
      gl?.getContext().getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      frameloop="always"
      gl={{ antialias: !isLowPowerViewport, preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        glRef.current = gl;
        const pixelRatio = Math.min(window.devicePixelRatio, isLowPowerViewport ? 1 : 2);
        gl.setPixelRatio(pixelRatio);
      }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <directionalLight position={[-2, -2, -2]} intensity={0.3} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Ball imgUrl={icon} index={index} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;