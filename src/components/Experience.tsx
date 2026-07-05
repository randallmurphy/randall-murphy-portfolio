"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences, type Experience as ExperienceType } from "../constants";
import { CinematicSection } from "./CinematicSection";
import { useMechanism } from "./MechanismProvider";
import { toSrc } from "../utils/image";
import ResumeModal from "./ResumeModal";

// The shared Experience type in constants.ts doesn't declare `points`,
// but some entries in the data include it — extend locally rather than
// widening the shared interface or falling back to `any`.
interface ExperienceWithPoints extends ExperienceType {
  points?: string[];
}

// A Custom styles override injected cleanly here for brutalist styles within the external component
const globalTimelineOverrides = `
  .vertical-timeline::before {
    background: rgba(170, 140, 255, 0.2) !important;
  }
`;

const ExperienceCard = ({ experience }: { experience: ExperienceWithPoints }) => {
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
        boxShadow: "0 0 20px rgba(170, 140, 255, 0.2)"
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
  const { bentoMode } = useMechanism();
  const isBento = bentoMode === 'full';
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-hidden");
            entry.target.classList.add("bounce-in");
          } else {
            entry.target.classList.remove("bounce-in");
            entry.target.classList.add("is-hidden");
          }
        });
      },
      { threshold: 0 }
    );
    const elements = document.querySelectorAll(".vertical-timeline-element-content, .vertical-timeline-element-icon");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  return (
    <CinematicSection
      id="experience"
      className={`relative border-white/5 border-t ${isBento ? '' : 'my-12'}`}
      innerClassName={isBento ? 'pt-4 pb-8' : 'pt-24 pb-24'}
    >
      <style>{globalTimelineOverrides}</style>

      <div className={`w-full ${isBento ? 'pt-0 pb-4' : 'pt-10 pb-10'}`}>
        <div className={`w-full text-center flex flex-col items-stretch min-w-0 pointer-events-none ${isBento ? 'mb-6' : 'mb-20'}`}>
          <p className="self-center w-fit text-sageNeon uppercase tracking-widest text-sm font-bold mb-4 bg-sageNeon/10 px-4 py-1 rounded-full border border-sageNeon/20">System Logs</p>
          <h2 className={`font-mova text-center tracking-widest text-white drop-shadow-md break-words ${isBento ? 'text-3xl md:text-4xl' : 'text-5xl md:text-7xl'}`}>
            Career Timeline.
          </h2>
        </div>

        <div className='w-full mt-10 flex flex-col px-4 md:px-6'>
          <VerticalTimeline animate={true} lineColor="rgba(170, 140, 255, 0.2)">
            {(experiences as ExperienceWithPoints[]).map((experience, index: number) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
            
            {/* Resume Element */}
            <VerticalTimelineElement
              contentStyle={{
                background: "rgba(170, 140, 255, 0.1)",
                border: "1px solid rgba(170, 140, 255, 0.3)",
                boxShadow: "0 0 30px rgba(170, 140, 255, 0.1)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: "#fff",
                borderRadius: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
              }}
              contentArrowStyle={{ borderRight: "7px solid rgba(170, 140, 255, 0.3)" }}
              iconStyle={{ 
                background: "#0a0a0a", 
                border: "1px solid rgba(170, 140, 255, 0.4)",
                boxShadow: "0 0 20px rgba(170, 140, 255, 0.3)"
              }}
              icon={
                <div className="relative w-full h-full text-electricLavender">
                  <svg className="absolute inset-0 m-auto w-[55%] h-[55%] stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
              }
            >
              <button
                className="flex justify-between text-white font-bold font-mova items-center py-4 px-6 md:px-8 gap-4 rounded-xl bg-white/5 hover:bg-electricLavender hover:text-black transition duration-300 ease-in-out border border-white/20 hover:border-electricLavender w-full md:w-auto"
                onClick={() => setIsResumeOpen(true)}
              >
                MY RESUME
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </CinematicSection>
  );
}