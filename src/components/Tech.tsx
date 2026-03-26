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
    <div className="w-28 h-28 rounded-full" />
  ),
});

const Tech = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="mt-12 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div key={technology.name} className="w-28 h-28">
            <BallCanvas icon={toSrc(technology.icon)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');