"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";
import { CinematicSection } from "./CinematicSection";
import { toSrc } from "../utils/image";

// A Custom styles override injected cleanly here for brutalist styles within the external component
const globalTimelineOverrides = `
  .vertical-timeline::before {
    background: rgba(180, 144, 229, 0.2) !important;
  }
`;

const ExperienceCard = ({ experience }: { experience: any }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(0, 0, 0, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        color: "#fff",
        borderRadius: "24px",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
      date={experience.date}
      iconStyle={{ 
        background: "#0a0a0a", 
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 0 20px rgba(180, 144, 229, 0.2)"
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={toSrc(experience.icon)}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain drop-shadow-md'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-3xl font-bold font-mova drop-shadow-md'>{experience.title}</h3>
        <p
          className='text-sageNeon text-lg font-semibold font-poppins m-0 tracking-wider'
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-8 list-none space-y-4'>
        {experience.points?.map((point: string, index: number) => (
          <li
            key={`experience-point-${index}`}
            className='text-white/70 text-sm md:text-base font-poppins leading-relaxed flex items-start gap-4'
          >
            <span className="text-electricLavender mt-1 leading-none text-xl">▹</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default function Experience() {
  return (
    <CinematicSection id="experience" className="py-20 min-h-screen relative border-white/5 border-t">
      <style>{globalTimelineOverrides}</style>
      
      <div className="w-full text-center flex flex-col items-center mb-20 pointer-events-none">
        <p className="text-sageNeon uppercase tracking-widest text-sm font-bold mb-4 bg-sageNeon/10 px-4 py-1 rounded-full border border-sageNeon/20">System Logs</p>
        <h2 className='text-5xl md:text-7xl font-mova text-center tracking-widest text-white drop-shadow-md'>
          Career Timeline.
        </h2>
      </div>

      <div className='w-full mt-10 flex flex-col'>
        <VerticalTimeline animate={true} lineColor="rgba(180, 144, 229, 0.2)">
          {experiences.map((experience: any, index: number) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </CinematicSection>
  );
}
