'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { technologies } from '../constants';
import { textVariant } from '../utils/motion';
import { toSrc } from '../utils/image';

import { useEffect, useState, useRef } from 'react';

const BallCanvas = dynamic(() => import('./canvas/Ball'), {
  ssr: false,
});

// Wrapper to prevent mounting all 13 WebGL contexts instantly or preserving them on soft routes.
const LazyBall = ({ icon }: { icon: string }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMounted(true);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
      {mounted && <BallCanvas icon={icon} />}
    </div>
  );
};

import { CinematicSection } from './CinematicSection';

const Tech = () => {
  return (
    <CinematicSection id="tech" className="min-h-[40vh] py-20 overflow-hidden">
      <motion.div variants={textVariant()} className="w-full text-center mb-16">
        <p className="text-electricLavender uppercase tracking-wider text-sm font-bold mb-2">Systems</p>
        <h2 className="text-4xl md:text-6xl font-mova text-white mb-6">Technologies.</h2>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto flex flex-row flex-wrap justify-center items-center gap-10 sm:gap-14">
        {technologies.map((technology) => (
          <div key={technology.name} className="w-24 h-24 sm:w-28 sm:h-28 liquid-glass rounded-full shadow-[0_0_20px_rgba(180,144,229,0.1)] p-2 relative group">
            <LazyBall icon={toSrc(technology.icon)} />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-pureBlack/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {technology.name}
            </div>
          </div>
        ))}
      </div>
    </CinematicSection>
  );
};

export default Tech;