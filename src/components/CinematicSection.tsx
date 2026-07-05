"use client";

import { motion } from "framer-motion";
import React from "react";
import { useMechanism } from "./MechanismProvider";

interface CinematicSectionProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}

export const CinematicSection = ({ children, className = "", innerClassName = "", id }: CinematicSectionProps) => {
  const { bentoMode } = useMechanism();
  const isBento = bentoMode === 'full';
  const sectionStyle = id === 'experience' && !isBento ? { paddingTop: '6rem', paddingBottom: '6rem' } : undefined;
  const innerStyle = id === 'experience' && !isBento ? { paddingTop: '3rem', paddingBottom: '3rem' } : undefined;
  
  return (
    <section
      id={id}
      style={sectionStyle}
      className={`w-full flex items-center justify-center overflow-hidden relative z-10 ${isBento ? 'min-h-full py-6 px-4' : 'min-h-[80vh] py-12 px-6 md:py-20 md:px-20'} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        // The footer sits at the very end of the document, so the browser can never
        // scroll it far enough past the "-100px" viewport inset to satisfy whileInView —
        // it would stay stuck at opacity: 0 forever. Animate on mount instead.
        {...(id === 'footer'
          ? { animate: { opacity: 1, scale: 1, y: 0 } }
          : { whileInView: { opacity: 1, scale: 1, y: 0 }, viewport: { once: true, margin: "-100px" } })}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={innerStyle}
        className={`w-full max-w-7xl px-4 md:px-8 flex flex-col items-center justify-center ${isBento ? 'space-y-8' : 'space-y-16'} ${innerClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
};
