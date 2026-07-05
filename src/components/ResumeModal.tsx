"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_PATH = "/randall-murphy-resume.pdf";

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-pureBlack/80 backdrop-blur-md p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            key="resume-modal-panel"
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="brutalist-tile liquid-glass border-electricLavender/40 relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-pureBlack/40 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-electricLavender/30 bg-white/5">
                  <svg className="h-5 w-5 text-electricLavender" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <h2 className="font-mova text-xl uppercase tracking-widest text-white md:text-2xl">
                  Resume<span className="text-electricLavender">.</span>pdf
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={RESUME_PATH}
                  download
                  className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-poppins text-sm font-bold text-white transition-colors hover:border-sageNeon hover:text-sageNeon sm:inline-flex"
                >
                  Download
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-electricLavender hover:bg-electricLavender/10"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF viewport */}
            <div className="flex-1 bg-black/40">
              <iframe src={RESUME_PATH} title="Randall Murphy Resume" className="h-full w-full" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ResumeModal;
