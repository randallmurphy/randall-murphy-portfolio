"use client";

import { motion } from "framer-motion";
import { styles } from "../styles";
import { shaq } from "../assets";
import { toSrc } from "../utils/image";
import { CinematicSection } from "./CinematicSection";

const Hero = () => {
  return (
    <CinematicSection id="hero" className="sm:mt-0 mt-16 pb-0">
      <div className="w-full flex flex-col md:flex-row items-center justify-between h-full relative z-10 gap-10">
        
        {/* ── Text content ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="w-full md:w-1/2 flex flex-col items-start justify-center"
        >
          <div className="flex gap-4 items-center mb-6">
            <div className="w-16 h-1 bg-electricLavender" />
            <h2 className="text-sageNeon uppercase tracking-widest font-bold text-sm">System Architect</h2>
          </div>
          
          <h1 className="text-white font-poppins uppercase text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 drop-shadow-md">
            Hi, IAM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neuroBlue to-electricLavender font-mova font-extrabold text-[70px] sm:text-[90px] lg:text-[110px] leading-[0.9]">
              RANDALL
            </span>
          </h1>

          <p className="mt-2 text-white/80 text-lg md:text-xl font-poppins max-w-[60ch] leading-relaxed">
            A results-driven Full Stack Developer specializing in backend systems and DevOps, with deep expertise in the MERN stack. I build scalable, maintainable, and high-performance applications that drive business growth and elevate user experiences.
          </p>
        </motion.div>

        {/* ── Personal photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end items-end h-[50vh] md:h-[80vh] relative pt-10"
        >
          <img
            src={toSrc(shaq)}
            alt="Randall Murphy"
            className="h-full w-auto object-contain object-bottom relative z-10 max-h-[85vh] drop-shadow-2xl mix-blend-screen"
          />
        </motion.div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 w-full flex justify-center items-center z-20">
        <a href="#about" aria-label="Scroll to about section">
          <div className="w-[35px] h-[64px] rounded-3xl border border-white/20 flex justify-center items-start p-2 hover:border-electricLavender transition-colors duration-300 bg-pureBlack/50 backdrop-blur-md">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-electricLavender mb-1 shadow-[0_0_10px_#b490e5]"
            />
          </div>
        </a>
      </div>
    </CinematicSection>
  );
};

export default Hero;
