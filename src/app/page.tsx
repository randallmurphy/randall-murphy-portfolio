"use client";

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
} from '@/components';
import { useMechanism } from '@/components/MechanismProvider';
import { motion } from 'framer-motion';

export default function Home() {
  const { bentoMode } = useMechanism();

  return (
    <div className="relative w-full min-h-screen bg-pureBlack selection:bg-neuroBlue selection:text-white-100 transition-colors duration-500">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(74, 144, 226, 0.5)',
            color: '#f4f4f5',
            borderRadius: '16px',
            fontSize: '15px',
            boxShadow: '4px 4px 0px rgba(74, 144, 226, 0.8)'
          },
        }}
        richColors
      />
      
      <NeonPulseTracker />
      <MechanismToggles />
      <Navbar />

      {bentoMode === 'hybrid' ? (
        // HYBRID MODE - Standard scrollytelling sections but individual sections use bento where appropriate
        <div className="w-full flex flex-col gap-[var(--bento-gap)] p-[var(--bento-padding)] transition-all duration-300 pt-28">
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
          
          <div className="w-full brutalist-tile p-4 sm:p-8 border-warmCoral/60 hover:shadow-brutal-coral mb-20">
            <Contact />
          </div>
        </div>
      ) : (
        // FULL BENTO MODE - An asymmetrical CSS Grid treating each component as a tile
        <div className="w-full min-h-screen transition-all duration-300 pt-28 pb-20 p-[var(--bento-padding)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--bento-gap)] auto-rows-min">
            
            {/* HERO TILE (Span 2 cols on Large screens) */}
            <motion.div layout className="col-span-1 md:col-span-2 brutalist-tile liquid-glass p-6 group hover:border-neuroBlue/50 hover:shadow-brutal-neuro">
              <Hero />
            </motion.div>
            
            {/* ABOUT TILE */}
            <motion.div layout className="col-span-1 brutalist-tile p-6 border-sageNeon/30 hover:border-sageNeon hover:shadow-brutal-sage">
              <About />
            </motion.div>
            
            {/* TECH TILE (Spans full width for showcase) */}
            <motion.div layout className="col-span-1 md:col-span-2 xl:col-span-3 brutalist-tile liquid-glass-accent p-6 border-neuroBlue/30 hover:border-neuroBlue hover:shadow-brutal-neuro">
              <Tech />
            </motion.div>
            
            {/* PROJECTS TILE */}
            <motion.div layout className="col-span-1 md:col-span-2 xl:col-span-2 brutalist-tile p-6 border-electricLavender/30 hover:border-electricLavender hover:shadow-brutal-lavender">
              <Projects />
            </motion.div>
            
            {/* EXPERIENCE TILE */}
            <motion.div layout className="col-span-1 brutalist-tile liquid-glass p-6 hover:shadow-brutal">
              <Experience />
            </motion.div>
            
            {/* CONTACT TILE */}
            <motion.div layout className="col-span-1 md:col-span-2 xl:col-span-3 brutalist-tile liquid-glass p-6 border-warmCoral/30 hover:border-warmCoral hover:shadow-brutal-coral">
              <Contact />
            </motion.div>
          </div>
        </div>
      )}
      {/* Footer rendered at the bottom of standard content */}
      <div className="w-full relative z-30 mt-10">
        <Footer />
      </div>
    </div>
  );
}