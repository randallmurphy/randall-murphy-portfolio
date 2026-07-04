'use client';

import { motion } from 'framer-motion';
import { technologies } from '../constants';
import { textVariant } from '../utils/motion';
import { toSrc } from '../utils/image';
import BallCanvas from './canvas/Ball';

import { useEffect, useState, useRef } from 'react';

/**
 * Only mount the WebGL canvas when the element is actually in view and stay
 * dormant otherwise. This keeps the browser from creating a large burst of
 * Three.js contexts when the Tech section first renders.
 */
const LazyBall = ({ icon, index }: { icon: string; index: number }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasMounted) {
          setHasMounted(true);
        }
      },
      { rootMargin: '250px 0px', threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMounted]);

  return (
    <div ref={ref} className="w-full h-full block overflow-hidden rounded-full">
      {hasMounted ? (
        <BallCanvas icon={icon} index={index} />
      ) : (
        <div className="h-full w-full rounded-full border border-white/10 bg-white/5" />
      )}
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
        {technologies.map((technology, index) => (
          <div key={technology.name} className="w-24 h-24 sm:w-28 sm:h-28 bg-black/20 rounded-full shadow-[0_0_20px_rgba(180,144,229,0.1)] p-1.5 relative group overflow-hidden">
            <LazyBall icon={toSrc(technology.icon)} index={index} />
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