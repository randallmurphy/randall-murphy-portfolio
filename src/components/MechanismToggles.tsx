"use client";

import React from "react";
import { useMechanism } from "./MechanismProvider";
import { motion } from "framer-motion";

export const MechanismToggles = () => {
  const { density, setDensity, reducedMotion, setReducedMotion, bentoMode, setBentoMode } = useMechanism();

  // Tactile feedback on click
  const handleTactileClick = () => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-24 right-4 z-[100] flex flex-col gap-3 liquid-glass p-3 rounded-2xl"
    >
      {/* Density Toggle */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-neuroBlue font-bold">Density</span>
        <div className="flex bg-jet/50 rounded-full p-1 border border-white/5">
          <button
            onClick={() => { handleTactileClick(); setDensity("spacious"); }}
            className={`px-3 py-1 text-xs rounded-full transition-all ${density === "spacious" ? "bg-neuroBlue text-white shadow-brutal-neuro border border-white/20 font-bold" : "text-white/50 hover:text-white"}`}
          >
            Spacious
          </button>
          <button
            onClick={() => { handleTactileClick(); setDensity("compact"); }}
            className={`px-3 py-1 text-xs rounded-full transition-all ${density === "compact" ? "bg-neuroBlue text-white shadow-brutal-neuro border border-white/20 font-bold" : "text-white/50 hover:text-white"}`}
          >
            Compact
          </button>
        </div>
      </div>

      {/* Grid Mode Toggle */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-warmCoral font-bold">Layout</span>
        <div className="flex bg-jet/50 rounded-full p-1 border border-white/5">
          <button
            onClick={() => { handleTactileClick(); setBentoMode("hybrid"); }}
            className={`px-3 py-1 text-xs rounded-full transition-all ${bentoMode === "hybrid" ? "bg-warmCoral text-pureBlack shadow-brutal-coral border border-white/20 font-bold" : "text-white/50 hover:text-white"}`}
          >
            Hybrid
          </button>
          <button
            onClick={() => { handleTactileClick(); setBentoMode("full"); }}
            className={`px-3 py-1 text-xs rounded-full transition-all ${bentoMode === "full" ? "bg-warmCoral text-pureBlack shadow-brutal-coral border border-white/20 font-bold" : "text-white/50 hover:text-white"}`}
          >
            Full Bento
          </button>
        </div>
      </div>

      {/* Motion Toggle */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-sageNeon font-bold">Motion</span>
        <div className="flex bg-jet/50 rounded-full p-1 border border-white/5">
          <button
            onClick={() => { handleTactileClick(); setReducedMotion(false); }}
            className={`px-3 py-1 text-xs rounded-full transition-all ${!reducedMotion ? "bg-sageNeon text-pureBlack shadow-brutal-sage border border-white/20 font-bold" : "text-white/50 hover:text-white"}`}
          >
            Fluid
          </button>
          <button
            onClick={() => { handleTactileClick(); setReducedMotion(true); }}
            className={`px-3 py-1 text-xs rounded-full transition-all ${reducedMotion ? "bg-sageNeon text-pureBlack shadow-brutal-sage border border-white/20 font-bold" : "text-white/50 hover:text-white"}`}
          >
            Chill
          </button>
        </div>
      </div>
    </motion.div>
  );
};
