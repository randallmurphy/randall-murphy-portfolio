"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const NeonPulseTracker = () => {
  const { scrollYProgress } = useScroll();
  
  // Spring physics for smooth drawing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Convert scroll progress (0 to 1) to dash offset (pathLength to 0)
  // We'll use pathLength scaling directly for better SVG support
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[1]">
       <svg
        className="w-full h-full opacity-30"
        viewBox="0 0 1000 2000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid Path */}
        <path
          d="M 500 0 V 400 H 200 V 800 H 800 V 1200 H 500 V 2000"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="4"
        />
        
        {/* Glow/Pulse Path */}
        <motion.path
          d="M 500 0 V 400 H 200 V 800 H 800 V 1200 H 500 V 2000"
          stroke="#85e0a3" /* sageNeon */
          strokeWidth="4"
          style={{ pathLength }}
          className="drop-shadow-[0_0_10px_#85e0a3]"
        />
      </svg>
    </div>
  );
};
