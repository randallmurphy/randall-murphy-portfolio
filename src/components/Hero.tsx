'use client';

import { motion } from 'framer-motion';
import { styles } from '../styles';
import { shaq, bwmap, worldmap } from '../assets';
import { toSrc } from '../utils/image';

const Hero = () => {
  return (
    <>
      {/* Background maps */}
      <div className="absolute top-0 left-0 z-0 h-[100svh] w-screen pointer-events-none">
        <img
          src={toSrc(bwmap)}
          alt=""
          aria-hidden="true"
          className="w-full h-full sm:block hidden object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 z-0 h-[100svh] w-screen pointer-events-none">
        <img
          src={toSrc(worldmap)}
          alt=""
          aria-hidden="true"
          className="w-full h-full sm:hidden block object-cover"
        />
      </div>

      <section className="relative w-full h-[100svh] overflow-hidden sm:bg-hero bg-hero-mobile">

        {/* Mobile: vertical dot + line decoration */}
        <div className="absolute top-[150px] left-5 z-10 sm:hidden flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-[#0a0a0a]" />
          <div className="w-1 h-40 bw-gradient" />
        </div>

        {/* ── Text content ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className={`
            absolute z-10
            top-[130px] xs:top-[140px] sm:top-[190px] lg:top-[155px] xl:top-[210px] 2xl:top-[240px]
            left-6 sm:left-16
            lg:left-[max(4rem,calc(50vw_-_38rem))]
            w-[calc(100vw_-_3rem)] xs:w-[340px] sm:w-[460px] md:w-[500px] lg:w-[540px] xl:w-[600px]
          `}
        >
          <h1
            className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase`}>
            Hi, IAM{' '}
            <br />
            <span
              className="sm:text-battleGray sm:text-[90px]
              text-eerieBlack text-[50px] font-mova
              font-extrabold uppercase">
              RANDALL
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-eerieBlack`}>
            A results-driven Full Stack Developer specializing in backend
            systems and DevOps, with deep expertise in the MERN stack. I build
            scalable, maintainable, and high-performance web applications that
            drive business growth and elevate user experiences.
          </p>
        </motion.div>

        {/* ── Personal photo ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="absolute bottom-0 z-10
            right-0
            sm:right-[1vw] md:right-[3vw] lg:right-[4vw] xl:right-[7vw] 2xl:right-[11vw]"
        >
          <img
            src={toSrc(shaq)}
            alt="Randall Murphy"
            className="
              h-[56vh] xs:h-[60vh] sm:h-[82vh] md:h-[76vh] lg:h-[88vh] xl:h-[92vh]
              w-auto object-contain object-bottom
              max-w-none
            "
          />
        </motion.div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute xs:bottom-10 bottom-8 w-full
          flex justify-center items-center z-10">
          <a href="#about" aria-label="Scroll to about section">
            <div
              className="w-[35px] h-[64px] rounded-3xl border-4
              border-french border-dim flex
              justify-center items-start p-2
              hover:border-taupe transition-colors duration-300">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
