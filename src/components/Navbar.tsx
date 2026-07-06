"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../constants";
import { close, menu } from "../assets";
import { toSrc } from "../utils/image";

const Navbar = ({ inline }: { inline?: boolean }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [toggle]);

  return (
    <div className={`${inline ? 'absolute top-4 left-4' : 'fixed top-4 left-4'} z-[110] pointer-events-none flex flex-col gap-4`}>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="pointer-events-auto relative flex w-full max-w-[11.5rem] xs:max-w-[16rem] sm:max-w-[20rem] flex-col gap-3 overflow-visible rounded-[1.25rem] border border-white/15 bg-void/78 px-3 py-3 sm:px-4 sm:py-4 sm:mb-6 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-[20px]"
      >
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="z-10 flex items-center gap-2 sm:gap-3"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-electric via-violet to-mint text-[0.7rem] sm:text-sm font-semibold uppercase tracking-[0.28em] text-white shadow-[0_0_24px_rgba(99,136,255,0.24)]">
              RM
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[0.62rem] xs:text-[0.72rem] sm:text-[0.82rem] font-semibold uppercase tracking-[0.08em] xs:tracking-[0.18em] sm:tracking-[0.32em] text-white/90">
                Randall Murphy
              </span>
              <span className="mt-1 text-[0.52rem] xs:text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.06em] xs:tracking-[0.14em] sm:tracking-[0.26em] text-mint/80">
                Full Stack Engineer
              </span>
            </div>
          </Link>

          {/* hamburger removed from inside nav; rendered below so it sits outside and under the logo block */}
        </div>

        <AnimatePresence>
          {toggle && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="absolute left-0 top-[calc(100%+1.5rem)] z-20 flex w-max min-w-[12rem] flex-col justify-center gap-4 rounded-[1.25rem] border border-white/15 bg-void/95 px-6 py-6 min-h-[8rem] shadow-[0_24px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              >
                <nav className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                  {navLinks.map((nav) => (
                    <a
                      key={nav.id}
                      href={`#${nav.id}`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                      className={`block text-[1rem] w-full text-center font-semibold uppercase tracking-[0.3em] transition ${active === nav.title ? "text-white" : "text-white/65 hover:text-white"}`}
                    >
                      {nav.title}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
        </AnimatePresence>
      </motion.nav>
      {/* Hamburger button placed outside and below the navbar block so it sits independently on the hero */}
      <div className="pointer-events-auto ml-[10px]">
        <button
          type="button"
          onClick={() => setToggle((s) => !s)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
          aria-label={toggle ? "Close navigation" : "Open navigation"}
        >
          <img src={toSrc(toggle ? close : menu)} alt={toggle ? "close" : "menu"} className="h-5 w-5 object-contain brightness-0 invert" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
