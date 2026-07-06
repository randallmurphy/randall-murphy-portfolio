"use client";

import React, { useState } from "react";
import { useMechanism } from "./MechanismProvider";

export const MechanismToggles = ({ inline }: { inline?: boolean }) => {
  const { density, setDensity, reducedMotion, setReducedMotion, bentoMode, setBentoMode } = useMechanism();
  const [open, setOpen] = useState(false);

  // Tactile feedback on click
  const handleTactileClick = () => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  return (
    <div className={`${inline ? 'absolute top-4 right-4' : 'fixed top-4 right-4'} z-[130] flex flex-col items-end gap-3`}>
      {/* Mobile trigger — full panel is always visible at sm and above */}
      <button
        type="button"
        onClick={() => { handleTactileClick(); setOpen((s) => !s); }}
        className="sm:hidden inline-flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
        aria-label={open ? "Close display settings" : "Open display settings"}
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="4" y1="6" x2="20" y2="6" />
          <circle cx="15" cy="6" r="2" fill="currentColor" stroke="none" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <circle cx="9" cy="12" r="2" fill="currentColor" stroke="none" />
          <line x1="4" y1="18" x2="20" y2="18" />
          <circle cx="17" cy="18" r="2" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {/* Panel: toggled by the trigger above on mobile, always visible from sm up */}
      <div className={`${open ? "flex" : "hidden"} sm:flex flex-col gap-3 liquid-glass p-3 rounded-2xl`}>
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
      </div>
    </div>
  );
};
