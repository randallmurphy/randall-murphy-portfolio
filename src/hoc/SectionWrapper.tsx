'use client';

import { type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';

const SectionWrapper = <T extends object>(
  Component: ComponentType<T>,
  idName: string
) => {
  function HOC(props: T) {
    return (
      <motion.section
        variants={staggerContainer(0, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="w-full relative z-0">
        <div
          className="max-w-7xl mx-auto relative"
          style={{
            paddingLeft: 'clamp(1.5rem, 8vw, 6rem)',
            paddingRight: 'clamp(1.5rem, 8vw, 6rem)',
            paddingTop: '4rem',
            paddingBottom: '4rem',
          }}>
          <span className="hash-span" id={idName}>
            &nbsp;
          </span>
          <Component {...props} />
        </div>
      </motion.section>
    );
  }

  return HOC;
};

export default SectionWrapper;