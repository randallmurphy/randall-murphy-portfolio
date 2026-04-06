"use client";

import { motion } from "framer-motion";
import React from "react";

interface CinematicSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const CinematicSection = ({ children, className = "", id }: CinematicSectionProps) => (
  <section id={id} className={`min-h-[80vh] w-full flex items-center justify-center p-6 md:p-20 overflow-hidden relative z-10 ${className}`}>
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // elegant ease-out
      className="w-full max-w-7xl flex flex-col items-center justify-center space-y-12"
    >
      {children}
    </motion.div>
  </section>
);
