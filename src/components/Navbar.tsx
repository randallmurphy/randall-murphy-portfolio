'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu, logo, logotext } from '../assets';
import { toSrc } from '../utils/image';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = toggle ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [toggle]);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-2 fixed
      top-0 z-20 h-[70px] sm:h-[80px] transition-all duration-300
      ${scrolled
        ? 'bg-night/85 backdrop-blur-md border-b border-white/10 shadow-lg'
        : 'bg-flashWhite sm:opacity-[0.97]'
      }`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}>
          <img
            src={toSrc(logo)}
            alt="logo"
            className="sm:w-[50px] sm:h-[50px] w-[42px] h-[42px] object-contain"
          />
          <img
            src={toSrc(logotext)}
            alt="Randall Murphy"
            className="sm:w-[90px] sm:h-[90px] w-[80px] h-[80px] -ml-[0.6rem] object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="list-none hidden sm:flex flex-row gap-14 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title
                  ? scrolled ? 'text-timberWolf' : 'text-french'
                  : scrolled ? 'text-taupe' : 'text-eerieBlack'
              } hover:text-taupe text-[21px] font-medium font-mova
                uppercase tracking-[3px] cursor-pointer nav-links
                transition-colors duration-200`}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <div className="sm:hidden flex items-center">
          <img
            src={toSrc(menu)}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggle(true)}
          />
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 w-screen h-[100svh] bg-flashWhite z-50 flex flex-col p-6">
            <div className="flex justify-end">
              <img
                src={toSrc(close)}
                alt="close"
                className="w-[22px] h-[22px] object-contain cursor-pointer"
                onClick={() => setToggle(false)}
              />
            </div>
            <ul className="list-none flex flex-col items-start justify-end mt-[10rem] -ml-[35px] gap-0">
              {navLinks.map((nav) => (
                <li
                  id={nav.id}
                  key={nav.id}
                  className={`${
                    active === nav.title ? 'text-french' : 'text-eerieBlack'
                  } text-[88px] font-bold font-arenq
                    uppercase tracking-[1px] cursor-pointer leading-tight`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}>
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
