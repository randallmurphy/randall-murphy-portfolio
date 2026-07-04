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

  // Lock body scroll when the drawer is open
  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [toggle]);

  return (
    <>
      {/* Logo pill + hamburger, stacked top-left on every breakpoint */}
      <div className="fixed top-4 left-4 z-[110] flex flex-col items-start gap-3 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-3 py-3 px-5 rounded-full bg-white/5 backdrop-blur-[32px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-electricLavender/80 to-neuroBlue/80 text-white font-bold text-xl font-mova shadow-lg border border-white/30 backdrop-blur-md">
            RM
          </div>
          <span className="text-white text-[18px] font-medium font-poppins tracking-[2px]">
            IAMMurphy
          </span>
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setToggle(true)}
          className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/5 backdrop-blur-[32px] border border-white/20 hover:border-electricLavender transition-colors duration-300"
        >
          <img
            src={toSrc(menu)}
            alt="menu"
            className="w-[22px] h-[22px] object-contain filter brightness-0 invert opacity-80"
          />
        </button>
      </div>

      {/* Left-side drawer menu */}
      <AnimatePresence>
        {toggle && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[115]"
              onClick={() => setToggle(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 left-0 h-[100svh] w-[82vw] max-w-[380px] bg-pureBlack/90 backdrop-blur-[40px] border-r border-white/10 z-[120] flex flex-col p-8 pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-electricLavender/80 to-neuroBlue/80 text-white font-bold font-mova shadow-lg border border-white/30">
                    RM
                  </div>
                  <span className="text-white text-[16px] font-medium font-poppins tracking-[2px]">
                    IAMMurphy
                  </span>
                </div>
                <img
                  src={toSrc(close)}
                  alt="close"
                  className="w-[26px] h-[26px] object-contain cursor-pointer filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => setToggle(false)}
                />
              </div>

              <ul className="list-none flex flex-col gap-8">
                {navLinks.map((nav, index) => (
                  <motion.li
                    key={nav.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`${active === nav.title ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "text-white/40 hover:text-white"} text-3xl font-bold font-mova uppercase tracking-[2px] transition-all`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;