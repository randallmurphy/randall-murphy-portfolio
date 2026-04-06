"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../constants";
import { close, menu } from "../assets";
import { toSrc } from "../utils/image";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [toggle]);

  return (
    <div className="fixed top-4 left-0 w-full flex justify-center z-[110] px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`flex items-center justify-between w-full max-w-5xl py-3 px-6 sm:px-10 rounded-3xl transition-all duration-500 overflow-hidden relative pointer-events-auto bg-pureBlack/60 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-electricLavender/40`}
      >
        {/* Animated Blob behind navbar content (always visible) */}
        <motion.div 
          animate={{ 
            x: ["0%", "100%", "0%"],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-50%] left-[-20%] w-[150px] h-[150px] bg-neuroBlue/20 rounded-full blur-[40px] -z-10"
        />

        <Link
          href="/"
          className="flex items-center gap-3 z-10"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-pureBlack font-bold text-xl font-mova">
            RM
          </div>
          <span className="text-white text-[18px] font-bold font-poppins tracking-[2px] hidden sm:block">
            IAMMurphy
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="list-none hidden sm:flex flex-row gap-8 mt-1 z-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title
                  ? "text-white"
                  : "text-white/60"
              } hover:text-white text-[16px] font-medium font-poppins
                tracking-[1px] cursor-pointer nav-links
                transition-colors duration-200`}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <div className="sm:hidden flex items-center z-10">
          <img
            src={toSrc(menu)}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer filter brightness-0 invert"
            onClick={() => setToggle(true)}
          />
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed inset-0 w-screen h-[100svh] bg-pureBlack/90 backdrop-blur-3xl z-[120] flex flex-col p-6 pointer-events-auto">
            
            <div className="flex justify-end p-4">
              <img
                src={toSrc(close)}
                alt="close"
                className="w-[28px] h-[28px] object-contain cursor-pointer filter brightness-0 invert"
                onClick={() => setToggle(false)}
              />
            </div>
            
            <ul className="list-none flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((nav, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  id={nav.id}
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-neuroBlue" : "text-white"
                  } text-[48px] font-bold font-mova
                    uppercase tracking-[2px] cursor-pointer leading-tight`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}>
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
