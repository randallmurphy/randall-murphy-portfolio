'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services, type Service } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { toSrc } from '../utils/image';

interface ServiceCardProps extends Service {
  index: number;
}

const ServiceCard = memo(({ index, title, icon }: ServiceCardProps) => (
  <motion.div
    variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
    className="xs:w-[250px] w-full card-gradient p-[1px] rounded-[20px] shadow-card">
    <div
      options={{ max: 45, scale: 1, speed: 450 }}
      className="bg-jetLight rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
      <img
        src={toSrc(icon)}
        alt={title}
        className="w-16 h-16 object-contain"
      />
      <h3 className="text-taupe text-[18px] font-bold text-center">
        {title}
      </h3>
    </div>
  </motion.div>
));
ServiceCard.displayName = 'ServiceCard';

const About = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
        Full Stack Engineer and mission-driven technologist building production
        AI products at{' '}
        <span className="text-eerieBlack font-semibold">Banyan Labs</span> and{' '}
        <span className="text-eerieBlack font-semibold">Persevere</span> — a
        national non-profit transforming lives through technology careers.
        Currently shipping{' '}
        <span className="text-eerieBlack font-semibold">JONA</span> (AI
        workforce intelligence) and{' '}
        <span className="text-eerieBlack font-semibold">COMPASS</span>{' '}
        (trauma-informed housing platform). U.S. Coast Guard veteran. Certified
        Peer Recovery Specialist. Instructor to developers building futures from
        the inside out.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');