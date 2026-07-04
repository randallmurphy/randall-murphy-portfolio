"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { styles } from "../styles";
import { services, type Service } from "../constants";
import { fadeIn } from "../utils/motion";
import { CinematicSection } from "./CinematicSection";
import { toSrc } from "../utils/image";
import { useMechanism } from "./MechanismProvider";

interface ServiceCardProps extends Service {
  index: number;
}

const ServiceCard = memo(({ index, title, icon }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.5 * index, 0.75)}
      onHoverStart={() => {
        setSplineLoaded(true);
        setIsHovered(true);
      }}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full relative group min-h-[320px] rounded-2xl overflow-hidden brutalist-tile liquid-glass shadow-brutal hover:shadow-brutal-neuro hover:border-neuroBlue transition-all duration-300"
    >
    {/* 3D Spline Backdrop (Neural Pop) */}
    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-150 group-hover:scale-100">
      {/* Fallback geometric 3D shape from Spline community mounted lazily */}
      {splineLoaded && <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />}
    </div>

    {/* Content */}
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-pureBlack/40 group-hover:bg-transparent transition-colors duration-500">
      <div className="w-20 h-20 mb-6 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <img
          src={toSrc(icon)}
          alt={title}
          className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        />
      </div>
      <h3 className="text-white text-xl font-bold text-center font-beckman tracking-wider">
        {title}
      </h3>
    </div>
  </motion.div>
  );
});
ServiceCard.displayName = "ServiceCard";

const About = () => {
  const { bentoMode } = useMechanism();
  return (
    <CinematicSection id="about" className="!pt-20 !pb-36 sm:!pb-44">
      <motion.div className="w-full flex flex-col items-center text-center gap-4 mb-8">
        <p className="text-neuroBlue uppercase tracking-wider text-sm font-bold mb-1">The Frequency</p>
        <h2 className="text-5xl md:text-7xl font-mova text-white">Neural Architecture.</h2>
      </motion.div>

      <motion.p
        className="text-white/70 text-lg md:text-xl font-poppins max-w-[55ch] leading-relaxed text-center mx-auto mb-14"
      >
        Full Stack Engineer and mission-driven technologist building production
        AI products at <span className="text-white font-bold">Banyan Labs</span> and{" "}
        <span className="text-white font-bold">Persevere</span> — a
        national non-profit transforming lives through technology careers.
        Currently shipping <span className="text-sageNeon font-bold">JONA</span>{" "}
        (AI workforce intelligence) and <span className="text-electricLavender font-bold">COMPASS</span>{" "}
        (trauma-informed housing platform). U.S. Coast Guard veteran. Certified
        Peer Recovery Specialist. Instructor to developers building futures from
        the inside out.
      </motion.p>

      <div className={`w-full pt-10 pb-16 grid gap-8 ${bentoMode === 'full' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </CinematicSection>
  );
};

export default About;