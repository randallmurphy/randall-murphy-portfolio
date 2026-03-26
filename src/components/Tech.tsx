'use client';

import { Suspense, memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { toSrc } from '../utils/image';

const BallCanvas = dynamic(() => import('./canvas/Ball'), {
  ssr: false,
  loading: () => (
    <div className="w-28 h-28 rounded-full ball-skeleton" />
  ),
});

const TechBall = memo(({ name, icon }: { name: string; icon: string }) => (
  <motion.div
    variants={fadeIn('up', 'spring', 0, 0.4)}
    whileHover={{ scale: 1.1, y: -4 }}
    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
    className="w-24 h-24 sm:w-28 sm:h-28 will-change-transform"
    title={name}>
    <Suspense fallback={<div className="w-full h-full rounded-full ball-skeleton" />}>
      <BallCanvas icon={icon} />
    </Suspense>
  </motion.div>
));
TechBall.displayName = 'TechBall';

const Tech = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div variants={textVariant()} className="w-full">
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-12 sm:mt-14 w-full">
        {technologies.map((technology) => (
          <TechBall
            key={technology.name}
            name={technology.name}
            icon={toSrc(technology.icon)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');
