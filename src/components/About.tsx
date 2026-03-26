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
    variants={fadeIn('up', 'spring', 0.15 * index, 0.5)}
    whileHover={{ y: -6, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    className="w-full xs:w-[220px] sm:w-[230px] md:w-[240px]
               card-gradient p-[1px] rounded-[20px] shadow-card
               will-change-transform">
    <div
      className="rounded-[20px] py-7 px-8
      min-h-[260px] sm:min-h-[280px]
      flex justify-evenly items-center flex-col
      glass-card-service gap-3">
      <div className="w-[72px] h-[72px] flex items-center justify-center
                      rounded-full glass-icon-ring">
        <img
          src={toSrc(icon)}
          alt={title}
          className="w-12 h-12 object-contain"
          loading="lazy"
        />
      </div>
      <h3 className="text-timberWolf text-[16px] sm:text-[17px] font-bold text-center leading-snug px-1">
        {title}
      </h3>
    </div>
  </motion.div>
));
ServiceCard.displayName = 'ServiceCard';

const About = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div variants={textVariant()} className="w-full">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 0.8)}
        className="mt-5 text-taupe text-[16px] sm:text-[18px]
          max-w-3xl leading-[30px] mx-auto text-center">
        I&apos;m a versatile Full Stack Developer with a strong foundation in
        backend development and DevOps, specializing in the MERN stack. I design
        and deliver scalable, reliable, and efficient web applications that solve
        real business problems. My expertise spans modern JavaScript frameworks,
        cloud infrastructure, and continuous integration, empowering teams to
        ship quality software faster. Always hungry to innovate, I bring both
        technical skill and a growth mindset to every project, making me the
        go-to partner for companies ready to level up their digital presence.
      </motion.p>

      <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-8 w-full">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
