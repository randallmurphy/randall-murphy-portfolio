'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../constants';
import { toSrc } from '../utils/image';
import { CinematicSection } from './CinematicSection';

function Gallery({ setIndex, setOpen, index }: {
  setIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
  index: number;
}) {
  return (
    <div className='w-full max-w-7xl mx-auto flex gap-2 md:gap-4 pb-20 pt-10 min-h-[400px]'>
      {projects.map((item, i) => (
        <motion.div
          key={item.id}
          layoutId={item.id}
          className={`cursor-pointer rounded-3xl relative overflow-hidden transition-[width] ease-[cubic-bezier(0.25, 1, 0.5, 1)] duration-500
            ${index === i ? 'w-full md:w-[60vw] lg:w-[800px]' : 'w-[50px] md:w-[60px] lg:w-[80px] grayscale opacity-50 hover:opacity-100 hover:grayscale-0'}`}
          onMouseEnter={() => setIndex(i)}
          onClick={() => {
            setIndex(i);
            setOpen(true);
          }}
        >
          {/* Tile Background Image */}
          <img
            className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
            style={{ transform: index === i ? 'scale(1.05)' : 'scale(1)' }}
            src={toSrc(item.image)}
            alt={item.name}
          />

          {/* Active Overlay (Only shows when accordion panel is expanded) */}
          <div className={`absolute inset-0 bg-gradient-to-t from-pureBlack/90 via-pureBlack/20 to-transparent flex flex-col justify-end p-6 md:p-8 transition-opacity duration-300 ${index === i ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="font-mova text-2xl md:text-4xl text-white tracking-widest drop-shadow-md mb-2">{item.name}</h3>
            <p className="font-poppins text-white/70 text-sm md:text-base max-w-[60ch] line-clamp-2 md:line-clamp-3 mb-4">{item.description}</p>
            <div className="flex gap-2">
              <span className="text-electricLavender font-bold text-xs uppercase tracking-widest">Click to deploy</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <CinematicSection id="projects" className="min-h-[70vh] flex flex-col justify-center overflow-hidden">
      <div className="w-full text-center md:text-left mb-6 pl-4 md:pl-20">
        <p className="text-electricLavender uppercase tracking-wider text-sm font-bold mb-2">The Signal</p>
        <h2 className="text-5xl md:text-7xl font-mova text-white">Transmissions.</h2>
      </div>

      <Gallery
        index={index}
        setIndex={setIndex}
        setOpen={setOpen}
      />
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key='overlay'
            className='bg-pureBlack/80 backdrop-blur-2xl fixed inset-0 z-[200] w-full h-[100svh] flex items-center justify-center p-4 sm:p-10'
            onClick={() => setOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl h-[85vh] flex flex-col md:flex-row relative bg-pureBlack shadow-[0_0_50px_rgba(180,144,229,0.2)] rounded-3xl overflow-hidden border border-electricLavender/20">
              
              {/* Image Hero */}
              <motion.div
                layoutId={projects[index].id}
                className='w-full md:w-[60%] h-64 md:h-full relative overflow-hidden bg-black'
              >
                <img
                  src={toSrc(projects[index].image)}
                  alt={projects[index].name}
                  className='h-full w-full object-cover opacity-80'
                />
              </motion.div>

              {/* Detail Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.2 }}
                className="w-full md:w-[40%] bg-pureBlack p-8 md:p-12 flex flex-col overflow-y-auto scrollbar-hide relative"
              >
                <div className="flex-1">
                  <h1 className='text-3xl lg:text-4xl font-beckman text-white mb-6 uppercase tracking-widest'>{projects[index].name}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {projects[index].tags.map((tag) => (
                      <span key={tag.name} className={`text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 bg-white/5 ${tag.color}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  
                  <p className='text-white/70 text-base md:text-lg leading-relaxed font-poppins mb-10'>
                    {projects[index].description}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex gap-4 mt-auto pt-6 border-t border-white/10">
                  {projects[index].repo && (
                    <button 
                      onClick={() => window.open(projects[index].repo, "_blank")}
                      className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-semibold transition-colors flex items-center justify-center gap-3 border border-white/10"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                      Code
                    </button>
                  )}
                  {projects[index].demo && (
                    <button 
                      onClick={() => window.open(projects[index].demo, "_blank")}
                      className="flex-1 py-4 bg-electricLavender hover:bg-white text-pureBlack font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(180,144,229,0.3)] shadow-brutal-lavender flex items-center justify-center gap-3 border border-electricLavender"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      Live App
                    </button>
                  )}
                </div>

                <button 
                  onClick={() => setOpen(false)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-electricLavender/20 border border-white/10 hover:border-electricLavender rounded-full text-white flex items-center justify-center transition-all z-10"
                >
                  ✕
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CinematicSection>
  );
}
