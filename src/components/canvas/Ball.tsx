'use client';

import { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from '@react-three/drei';
import Loader from '../Loader';

interface BallProps {
  imgUrl: string;
}

const Ball = memo(({ imgUrl }: BallProps) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.8}>
      {/* Multi-light rig for 3D depth */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 2, 2]} intensity={0.9} castShadow />
      <directionalLight position={[-2, -1, -1]} intensity={0.25} color="#6688cc" />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, -3, -2]} intensity={0.15} color="#334466" />

      <mesh castShadow receiveShadow scale={2.6}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#3a3a4a"
          metalness={0.25}
          roughness={0.45}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
});
Ball.displayName = 'Ball';

interface BallCanvasProps {
  icon: string;
}

const BallCanvas = ({ icon }: BallCanvasProps) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      shadows
      gl={{
        preserveDrawingBuffer: true,
        antialias: false,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 5], fov: 42 }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
