import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
