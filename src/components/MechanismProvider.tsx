"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Density = "spacious" | "compact";
type BentoMode = "hybrid" | "full";

interface MechanismContextType {
  density: Density;
  setDensity: (d: Density) => void;
  reducedMotion: boolean;
  setReducedMotion: (r: boolean) => void;
  bentoMode: BentoMode;
  setBentoMode: (b: BentoMode) => void;
}

const MechanismContext = createContext<MechanismContextType | undefined>(undefined);

export function MechanismProvider({ children }: { children: React.ReactNode }) {
  const [density, setDensity] = useState<Density>("spacious");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [bentoMode, setBentoMode] = useState<BentoMode>("hybrid");

  useEffect(() => {
    // Sync density to document element for global CSS variables
    document.documentElement.setAttribute("data-density", density);
  }, [density]);

  useEffect(() => {
    // Optionally add a motion tag if needed for non-framer animations
    document.documentElement.setAttribute("data-motion", reducedMotion ? "reduce" : "normal");
  }, [reducedMotion]);

  return (
    <MechanismContext.Provider
      value={{
        density,
        setDensity,
        reducedMotion,
        setReducedMotion,
        bentoMode,
        setBentoMode,
      }}
    >
      {children}
    </MechanismContext.Provider>
  );
}

export function useMechanism() {
  const context = useContext(MechanismContext);
  if (!context) {
    throw new Error("useMechanism must be used within a MechanismProvider");
  }
  return context;
}
