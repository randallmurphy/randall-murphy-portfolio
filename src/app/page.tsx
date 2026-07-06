"use client";

import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'sonner';
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Projects,
  MechanismToggles,
  NeonPulseTracker,
  Footer,
  ScrollToTop,
} from '@/components';
import { useMechanism } from '@/components/MechanismProvider';
import { motion } from 'framer-motion';

// CSS Grid's `auto` row tracks grow to fit every item's full natural (max-content) height
// regardless of overflow/min-height — that override only suppresses the *minimum*-size phase,
// not max-content growth. So "make this tile match its sibling stack's height, and scroll
// internally if it's taller" can't be done with grid stretch alone; measure the sibling directly.
function useMatchHeight(remountKey: unknown) {
  const sourceRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = sourceRef.current;
    // The source div only exists in the DOM once Full Bento mode is actually showing, so this
    // effect must re-run (via remountKey) when that happens — an empty dep array would only ever
    // see `sourceRef.current === null` from the initial (Hybrid) mount and never attach.
    if (!el) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setHeight(mq.matches ? el.getBoundingClientRect().height : undefined);
    const observer = new ResizeObserver(update);
    observer.observe(el);
    mq.addEventListener('change', update);
    return () => {
      observer.disconnect();
      mq.removeEventListener('change', update);
    };
  }, [remountKey]);

  return { sourceRef, height };
}

export default function Home() {
  const { bentoMode } = useMechanism();
  const { sourceRef: heroTechRef, height: heroTechHeight } = useMatchHeight(bentoMode);
  const { sourceRef: projectsContactRef, height: projectsContactHeight } = useMatchHeight(bentoMode);

  return (
    <div className="relative w-full min-h-screen bg-pureBlack selection:bg-neuroBlue selection:text-white-100 transition-colors duration-500 overflow-x-hidden px-[2%] sm:px-0">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(99, 136, 255, 0.5)',
            color: '#f4f4f5',
            borderRadius: '16px',
            fontSize: '15px',
            boxShadow: '4px 4px 0px rgba(99, 136, 255, 0.8)'
          },
        }}
        richColors
      />
      <ScrollToTop />
      
      <NeonPulseTracker />

      {bentoMode === 'hybrid' ? (
        // HYBRID MODE - Standard scrollytelling sections but individual sections use bento where appropriate
        <div className="w-full flex flex-col gap-[var(--bento-gap)] sm:px-[var(--bento-padding)] transition-all duration-300 pt-28">
          <div className="w-full brutalist-tile liquid-glass p-4 sm:p-8">
            <Hero />
          </div>
          
          <div className="w-full brutalist-tile bg-pureBlack/50 p-4 sm:p-8 border-sageNeon/40 hover:shadow-brutal-sage">
            <About />
          </div>
          
          <div className="w-full brutalist-tile liquid-glass-accent p-4 sm:p-8 border-neuroBlue/60 hover:shadow-brutal-neuro">
            <Tech />
          </div>
          
          <div className="w-full brutalist-tile p-4 sm:p-8 border-electricLavender/40 hover:shadow-brutal-lavender">
            <Projects />
          </div>
          
          <div className="w-full brutalist-tile liquid-glass p-4 sm:p-8">
            <Experience />
          </div>
          
          <div className="w-full brutalist-tile p-4 sm:p-8 border-sageNeon/60 hover:shadow-brutal-sage mb-20">
            <Contact />
          </div>
        </div>
      ) : (
        // FULL BENTO MODE - Two stacked "sections", each a 2-col grid where the stacked-pair
        // side is the wide side. The single tall tile's height is measured (via ResizeObserver,
        // see useMatchHeight above) from its sibling stack and applied as an explicit cap, since
        // CSS Grid's own auto-row sizing can't be made to ignore a tall item's content.
        <div className="w-full min-h-screen transition-all duration-300 pt-28 pb-20 px-[3%] sm:px-[var(--bento-padding)]">
          <div className="flex flex-col gap-[var(--bento-gap)]">

            {/* SECTION A: Hero + Tech (60%) | About (40%, capped to match) */}
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-[var(--bento-gap)] items-start">
              <div ref={heroTechRef} className="flex flex-col gap-[var(--bento-gap)]">
                <motion.div layout className="brutalist-tile liquid-glass p-6 md:p-8 group hover:border-neuroBlue/50 hover:shadow-brutal-neuro">
                  <Hero />
                </motion.div>

                <motion.div layout className="brutalist-tile liquid-glass-accent p-6 md:p-8 border-neuroBlue/30 hover:border-neuroBlue hover:shadow-brutal-neuro">
                  <Tech />
                </motion.div>
              </div>

              <div
                className="overflow-y-auto scrollbar-hide"
                style={heroTechHeight ? { maxHeight: heroTechHeight } : undefined}
              >
                <motion.div layout className="brutalist-tile p-6 md:p-8 border-sageNeon/30 hover:border-sageNeon hover:shadow-brutal-sage">
                  <About />
                </motion.div>
              </div>
            </div>

            {/* SECTION B: Experience (40%, capped to match) | Projects + Contact (60%) */}
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-[var(--bento-gap)] items-start">
              <div
                className="overflow-y-auto scrollbar-hide"
                style={projectsContactHeight ? { maxHeight: projectsContactHeight } : undefined}
              >
                <motion.div layout className="brutalist-tile liquid-glass p-6 md:p-8 hover:shadow-brutal">
                  <Experience />
                </motion.div>
              </div>

              <div ref={projectsContactRef} className="flex flex-col gap-[var(--bento-gap)]">
                <motion.div layout className="brutalist-tile p-6 md:p-8 border-electricLavender/30 hover:border-electricLavender hover:shadow-brutal-lavender">
                  <Projects />
                </motion.div>

                <motion.div layout className="brutalist-tile liquid-glass p-6 md:p-8 border-sageNeon/30 hover:border-sageNeon hover:shadow-brutal-sage">
                  <Contact />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Footer rendered at the bottom of standard content */}
      <div className="w-full relative z-30 mt-20 mb-6">
        <Footer />
      </div>
    </div>
  );
}