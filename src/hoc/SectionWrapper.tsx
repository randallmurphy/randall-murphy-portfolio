'use client';

import { type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
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
        className="section-padding max-w-7xl mx-auto relative z-0 w-full">
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    );
  }

  return HOC;
};

export default SectionWrapper;