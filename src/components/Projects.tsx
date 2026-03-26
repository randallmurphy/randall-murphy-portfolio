'use client';

import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { github, pineapple, pineappleHover } from '../assets';
import { projects, type Project } from '../constants';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { toSrc } from '../utils/image';

interface ProjectCardProps extends Project {
  index: number;
  active: string;
  handleClick: (id: string) => void;
}

const ProjectCard = memo(({
  id,
  name,
  description,
  image,
  repo,
  demo,
  index,
  active,
  handleClick,
}: ProjectCardProps) => {
  const [demoIcon, setDemoIcon] = useState(toSrc(pineapple));

  const isActive = active === id;

  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${
        isActive ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px]
      h-[420px] cursor-pointer card-shadow
      transition-all duration-500 ease-in-out`}
      onClick={() => handleClick(id)}>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-jetLight opacity-50 rounded-[24px]" />

      {/* Project image */}
      <img
        src={toSrc(image)}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover rounded-[24px]"
        loading="lazy"
      />

      {/* Collapsed: rotated title */}
      {!isActive ? (
        <div className="flex items-center justify-start pr-[4.5rem]">
          <h3
            className="font-extrabold font-beckman uppercase w-[200px] h-[30px]
            whitespace-nowrap sm:text-[27px] text-[18px] text-timberWolf tracking-[1px]
            absolute z-20 lg:bottom-[7rem] lg:rotate-[-90deg] lg:origin-[0,0]
            leading-none">
            {name}
          </h3>
        </div>
      ) : (
        /* Expanded: full info panel */
        <div
          className="absolute bottom-0 p-8 w-full flex flex-col
          bg-[rgba(122,122,122,0.5)] rounded-b-[24px] z-20
          backdrop-blur-sm">

          {/* GitHub link */}
          <div className="absolute top-3 right-3">
            <div
              role="button"
              tabIndex={0}
              aria-label="View source code"
              onClick={(e) => {
                e.stopPropagation();
                if (repo) window.open(repo, '_blank');
              }}
              onKeyDown={(e) => e.key === 'Enter' && repo && window.open(repo, '_blank')}
              className="bg-night w-10 h-10 sm:w-11 sm:h-11 rounded-full
                flex justify-center items-center cursor-pointer opacity-90
                hover:opacity-100 hover:scale-110 transition-all duration-200">
              <img
                src={toSrc(github)}
                alt="source code"
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
          </div>

          <h2
            className="font-bold sm:text-[32px] text-[24px]
            text-timberWolf uppercase font-beckman sm:mt-0 -mt-[1rem]">
            {name}
          </h2>
          <p
            className="text-silver sm:text-[14px] text-[12px]
            max-w-3xl sm:leading-[24px] leading-[18px]
            font-poppins tracking-[1px] mt-1">
            {description}
          </p>

          <button
            className="live-demo flex justify-between items-center
            sm:text-[16px] text-[14px] text-timberWolf
            font-bold font-beckman py-5 pl-2 pr-3
            whitespace-nowrap gap-1 sm:w-[138px] sm:h-[50px]
            w-[125px] h-[46px] rounded-[10px] glassmorphism
            sm:mt-[22px] mt-[16px] hover:bg-battleGray
            hover:text-eerieBlack transition duration-200 ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              if (demo) window.open(demo, '_blank');
            }}
            onMouseEnter={() => setDemoIcon(toSrc(pineappleHover))}
            onMouseLeave={() => setDemoIcon(toSrc(pineapple))}>
            <img
              src={demoIcon}
              alt="live demo"
              className="sm:w-[34px] sm:h-[34px] w-[30px] h-[30px] object-contain"
            />
            LIVE DEMO
          </button>
        </div>
      )}
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  const [active, setActive] = useState('project-2');

  const handleClick = useCallback((id: string) => setActive(id), []);

  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Case Studies</p>
        <h2 className={styles.sectionHeadTextLight}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
          These projects detail my hands-on expertise, turning ideas into
          real-world solutions. Each includes a concise overview, direct links
          to live demos, and full code repositories. They showcase my ability to
          tackle complex challenges, adapt seamlessly across diverse
          technologies, and deliver results with precision, efficiency, and a
          creative edge.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              {...project}
              active={active}
              handleClick={handleClick}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Projects, 'projects');
