'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../constants';
import { toSrc } from '../utils/image';
import { CinematicSection } from './CinematicSection';
import { useMechanism } from './MechanismProvider';

function Gallery({ setIndex, index, bentoMode }: {
  setIndex: (index: number) => void;
  index: number;
  bentoMode: string;
}) {
  const isBento = bentoMode === 'full';
  return (
    <div className={`w-full max-w-7xl mx-auto flex flex-col gap-3 lg:flex-row lg:gap-4 px-4 md:px-6 pb-16 pt-10 ${isBento ? 'min-h-[600px]' : 'min-h-[400px]'}`}>
      {projects.map((item, i) => (
        <motion.div
          key={item.id}
          layoutId={item.id}
          className={`cursor-pointer rounded-3xl relative overflow-hidden transition-all ease-[cubic-bezier(0.25, 1, 0.5, 1)] duration-500
            ${index === i ? `w-full lg:flex-[2.5] ${isBento ? 'min-h-[250px]' : 'min-h-[280px]'} max-w-full` : `w-full lg:flex-1 ${isBento ? 'min-h-[80px]' : 'min-h-[160px]'} saturate-50 opacity-70 hover:opacity-100 hover:saturate-100 bg-electricLavender/5`}`}
          onMouseEnter={() => setIndex(i)}
          onClick={() => setIndex(i)}
        >
          {/* Tile Background Image */}
          <img
            className="w-full h-full object-cover transition-transform duration-1000 ease-out pointer-events-none"
            style={{ transform: index === i ? 'scale(1.02)' : 'scale(1)' }}
            src={toSrc(item.image)}
            alt={item.name}
          />

          {/* Active Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-pureBlack/95 via-pureBlack/40 to-transparent flex flex-col justify-end p-6 md:p-8 transition-all duration-500 ${index === i ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0'}`}>
            <h3 className="font-mova text-3xl md:text-5xl text-white tracking-widest drop-shadow-md mb-2">{item.name}</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span key={tag.name} className={`text-[10px] font-bold px-2 py-1 rounded-full border border-white/20 bg-white/5 ${tag.color}`}>
                  {tag.name}
                </span>
              ))}
            </div>

            <p className="font-poppins text-white/80 text-sm md:text-base max-w-[60ch] line-clamp-3 mb-6 hidden md:block">{item.description}</p>
            
            <div className="flex gap-4 mt-auto pt-4">
              {item.repo && (
                <button 
                  onClick={(e) => { e.stopPropagation(); window.open(item.repo, "_blank"); }}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                  Code
                </button>
              )}
              {item.demo && (
                <button 
                  onClick={(e) => { e.stopPropagation(); window.open(item.demo, "_blank"); }}
                  className="px-6 py-3 bg-electricLavender hover:bg-white text-pureBlack text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(180,144,229,0.3)] shadow-brutal-lavender flex items-center justify-center gap-2 border border-electricLavender"
                >
                  Live App
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const { bentoMode } = useMechanism();

  const isBento = bentoMode === 'full';

  return (
    <CinematicSection id="projects" className={`flex flex-col justify-center ${isBento ? '' : 'min-h-[70vh]'}`}>
      <div className="w-full text-center md:text-left mb-6 md:pl-8">
        <p className="text-electricLavender uppercase tracking-wider text-sm font-bold mb-2">The Signal</p>
        <h2 className="text-5xl md:text-7xl font-mova text-white">Transmissions.</h2>
      </div>

      <Gallery
        index={index}
        setIndex={setIndex}
        bentoMode={bentoMode}
      />
    </CinematicSection>
  );
}
