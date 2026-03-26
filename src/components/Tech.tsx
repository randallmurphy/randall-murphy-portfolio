'use client';

import { Suspense, memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import { toSrc } from '../utils/image';

const BallCanvas = dynamic(() => import('./canvas/Ball'), {
  ssr: false,
  loading: () => (
    <div className="w-28 h-28 rounded-full bg-jetLight animate-pulse" />
  ),
});

const TechBall = memo(({ name, icon }: { name: string; icon: string }) => (
  <div className="w-28 h-28" title={name}>
    <Suspense
      fallback={<div className="w-28 h-28 rounded-full bg-jetLight animate-pulse" />}>
      <BallCanvas icon={icon} />
    </Suspense>
  </div>
));
TechBall.displayName = 'TechBall';

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology) => (
          <TechBall
            key={technology.name}
            name={technology.name}
            icon={toSrc(technology.icon)}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, '');
