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
    <CinematicSection id="contact" className="min-h-[80vh] flex justify-center items-center py-20">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 0.8)}
        className="w-full max-w-3xl brutalist-tile liquid-glass rounded-3xl p-10 sm:p-14 border border-electricLavender/30 shadow-[0_0_40px_rgba(180,144,229,0.15)] mx-auto flex justify-center"
      >
        <div className="w-full flex justify-center flex-col items-center">
          <div className="w-full text-center mb-8">
            <p className="text-electricLavender uppercase tracking-wider text-sm font-bold mb-2">Transmission Link</p>
            <h3 className="text-5xl md:text-7xl font-mova text-white mb-2">Contact.</h3>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full mt-4 flex flex-col gap-6 font-poppins"
          >

          <label className="flex flex-col gap-3">
            <span className="text-timberWolf font-medium text-[15px]">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Identify yourself..."
              required
              className="contact-input"
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-timberWolf font-medium text-[15px]">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Direct neural link (email)?"
              required
              className="contact-input"
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-timberWolf font-medium text-[15px]">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Broadcast your signal..."
              required
              className="contact-input resize-none"
            />
          </label>

            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center mt-6
              gap-3 sm:text-[18px] text-[16px] text-pureBlack bg-white
              font-bold font-beckman py-4 px-8 rounded-xl items-center self-center
              hover:bg-electricLavender hover:text-white transition-all duration-300 shadow-brutal hover:shadow-brutal-lavender border border-white
              disabled:opacity-50 disabled:cursor-not-allowed"
              onMouseEnter={() => setSendIcon(toSrc(sendHover))}
              onMouseLeave={() => setSendIcon(toSrc(send))}>
              {loading ? 'Transmitting…' : 'Initialize Sequence'}
              <img
                src={sendIcon}
                alt="send"
                className="sm:w-[24px] sm:h-[24px] w-[20px] h-[20px] object-contain filter invert opacity-80"
              />
            </button>
        </form>
        </div>
      </motion.div>
    </CinematicSection>
  );
};

export default Contact;
