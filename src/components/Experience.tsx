'use client';

import { useState, memo } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences, type Experience as ExperienceType } from '../constants';
import { SectionWrapper } from '../hoc';
import { download, downloadHover, resume } from '../assets';
import { textVariant } from '../utils/motion';
import { toSrc } from '../utils/image';

interface ExperienceCardProps {
  experience: ExperienceType;
}

const ExperienceCard = memo(({ experience }: ExperienceCardProps) => (
  <VerticalTimelineElement
    contentStyle={{
      background: 'rgba(234, 234, 236, 0.82)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      color: '#292929',
      border: '1px solid rgba(255,255,255,0.55)',
      borderRadius: '20px',
      boxShadow: `
        0 12px 40px rgba(0,0,0,0.14),
        inset 0 1px 0 rgba(255,255,255,0.7),
        0 0 0 1px rgba(0,0,0,0.04)
      `,
      padding: '1.5rem 2rem',
    }}
    contentArrowStyle={{
      borderRight: '7px solid rgba(234,234,236,0.82)',
    }}
    date={
      <h3 className="text-dim text-[16px] sm:text-[18px] font-bold font-beckman px-1">
        {experience.date}
      </h3>
    }
    iconStyle={{
      background: experience.iconBg,
      boxShadow: `
        0 0 0 4px rgba(255,255,255,0.35),
        0 4px 20px rgba(0,0,0,0.25),
        0 0 24px rgba(255,255,255,0.08)
      `,
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={toSrc(experience.icon)}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
          loading="lazy"
        />
      </div>
    }>
    <div>
      <h3 className="text-jetLight text-[20px] sm:text-[24px] font-bold font-beckman tracking-[1.5px] leading-snug">
        {experience.title}
      </h3>
      <p
        className="text-taupe text-[18px] sm:text-[20px] font-semibold font-overcameBold tracking-[1px] mt-1"
        style={{ margin: '4px 0 0' }}>
        {experience.company_name}
      </p>
    </div>
  </VerticalTimelineElement>
));
ExperienceCard.displayName = 'ExperienceCard';

const Experience = () => {
  const [iconSrc, setIconSrc] = useState<string>(toSrc(download));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} sm:pl-16 pl-[2rem]`}>
          What I&apos;ve done so far
        </p>
        <h2 className={`${styles.sectionHeadText} sm:pl-16 pl-[2rem]`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-16 sm:mt-20 flex flex-col">
        <VerticalTimeline className="vertical-timeline-custom-line" animate>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}

          {/* Resume download card */}
          <VerticalTimelineElement
            contentStyle={{
              background: 'rgba(234, 234, 236, 0.82)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              color: '#292929',
              border: '1px solid rgba(255,255,255,0.55)',
              borderRadius: '20px',
              boxShadow: `
                0 12px 40px rgba(0,0,0,0.14),
                inset 0 1px 0 rgba(255,255,255,0.7)
              `,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.5rem 2rem',
            }}
            contentArrowStyle={{
              borderRight: '7px solid rgba(234,234,236,0.82)',
            }}
            iconStyle={{
              background: '#333333',
              boxShadow: `
                0 0 0 4px rgba(255,255,255,0.25),
                0 4px 20px rgba(0,0,0,0.3)
              `,
            }}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                <img
                  src={toSrc(resume)}
                  alt="resume"
                  className="w-[45%] h-[45%] object-contain"
                  loading="lazy"
                />
              </div>
            }>
            <button
              className="live-demo flex justify-between items-center gap-2
              sm:text-[18px] text-[14px] text-timberWolf
              font-bold font-beckman py-4 px-4
              whitespace-nowrap sm:w-[148px] sm:h-[54px]
              w-[130px] h-[46px] rounded-[12px] bg-jetLight
              hover:bg-battleGray hover:text-eerieBlack
              transition-all duration-200 ease-out
              shadow-md hover:shadow-lg"
              onClick={() => window.open('/Randall_Murphy_Resume.pdf', '_blank')}
              onMouseEnter={() => setIconSrc(toSrc(downloadHover))}
              onMouseLeave={() => setIconSrc(toSrc(download))}>
              MY RESUME
              <img
                src={iconSrc}
                alt="download"
                className="sm:w-[26px] sm:h-[26px] w-[22px] h-[22px] object-contain"
              />
            </button>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
