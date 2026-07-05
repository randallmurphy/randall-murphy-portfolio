'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { slideIn } from '../utils/motion';
import { send, sendHover } from '../assets';
import { toSrc } from '../utils/image';
import { CinematicSection } from './CinematicSection';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: '', email: '', message: '' };

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [sendIcon, setSendIcon] = useState(toSrc(send));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      emailjs
        .send(
          'service_2myowh4',
          'template_qaf5k0l',
          {
            from_name: form.name,
            to_name: 'Randall Murphy',
            from_email: form.email,
            to_email: 'rmurphy@perseverenow.org',
            message: form.message,
          },
          'sj7B23g4uy2J23Ir1'
        )
        .then(() => {
          setLoading(false);
          if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) window.navigator.vibrate([10, 30, 10]);
          toast.success('Transmission successful. Awaiting neurological response.', {
            duration: 5000,
          });
          setForm(EMPTY_FORM);
        })
        .catch((error: unknown) => {
          setLoading(false);
          console.error(error);
          if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) window.navigator.vibrate([50, 50, 50]);
          toast.error('Signal degraded. The grid is rejecting our packet.', {
            duration: 5000,
          });
        });
    },
    [form]
  );

  return (
    <CinematicSection id="contact" className="min-h-[80vh] flex justify-center items-center py-28 my-10">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 0.8)}
        className="w-full max-w-[1000px] mx-auto"
      >
        <div className="w-full grid gap-12 p-6 sm:p-8">
          <div className="text-center">
            <p className="text-electricLavender uppercase tracking-[0.35em] text-xs font-bold mb-2">Transmission Link</p>
            <h3 className="text-5xl md:text-7xl font-mova text-white mb-2">Contact.</h3>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
              Send a short message and I&apos;ll reply as soon as the system reboots.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full grid gap-6 font-poppins"
          >
            <label className="grid gap-2 text-left text-white">
              <span className="text-[0.72rem] uppercase tracking-[0.35em] text-electricLavender font-semibold">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Identify yourself..."
                required
                className="contact-input w-full h-14 bg-transparent"
              />
            </label>

            <label className="grid gap-2 text-left text-white">
              <span className="text-[0.72rem] uppercase tracking-[0.35em] text-electricLavender font-semibold">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Direct neural link (email)?"
                required
                className="contact-input w-full h-14 bg-transparent"
              />
            </label>

            <label className="grid gap-2 text-left text-white">
              <span className="text-[0.72rem] uppercase tracking-[0.35em] text-electricLavender font-semibold">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Broadcast your signal..."
                required
                className="contact-input w-full min-h-[240px] resize-none bg-transparent"
              />
            </label>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center items-center gap-3 sm:text-[18px] text-[16px] text-pureBlack bg-white font-bold font-beckman py-4 px-10 rounded-full hover:bg-electricLavender hover:text-white transition-all duration-300 shadow-brutal hover:shadow-brutal-lavender border border-white disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseEnter={() => setSendIcon(toSrc(sendHover))}
                onMouseLeave={() => setSendIcon(toSrc(send))}
              >
                {loading ? 'Transmitting…' : 'Initialize Sequence'}
                <img
                  src={sendIcon}
                  alt="send"
                  className="sm:w-[24px] sm:h-[24px] w-[20px] h-[20px] object-contain filter invert opacity-80"
                />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </CinematicSection>
  );
};

export default Contact;
