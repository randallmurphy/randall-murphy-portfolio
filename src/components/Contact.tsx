'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { send, sendHover } from '../assets';
import { toSrc } from '../utils/image';

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
          toast.success('Message sent! I\'ll get back to you soon.', {
            duration: 5000,
          });
          setForm(EMPTY_FORM);
        })
        .catch((error: unknown) => {
          setLoading(false);
          console.error(error);
          toast.error('Something went wrong. Please try again.', {
            duration: 5000,
          });
        });
    },
    [form]
  );

  return (
    <div className="flex justify-center overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 0.8)}
        className="w-full max-w-2xl contact-glass rounded-2xl p-8 sm:p-10">

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadTextLight}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-10 flex flex-col gap-5 font-poppins">

          <label className="flex flex-col gap-3">
            <span className="text-timberWolf font-medium text-[15px]">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
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
              placeholder="What's your email?"
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
              placeholder="What's your message?"
              required
              className="contact-input resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="live-demo flex justify-center items-center
            sm:gap-4 gap-3 sm:text-[20px] text-[16px] text-timberWolf
            font-bold font-beckman py-4 mt-2
            whitespace-nowrap sm:w-[130px] sm:h-[50px]
            w-[110px] h-[46px] rounded-[12px]
            contact-btn-submit
            hover:bg-battleGray hover:text-eerieBlack
            transition-all duration-200 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed"
            onMouseEnter={() => setSendIcon(toSrc(sendHover))}
            onMouseLeave={() => setSendIcon(toSrc(send))}>
            {loading ? 'Sending…' : 'Send'}
            <img
              src={sendIcon}
              alt="send"
              className="sm:w-[24px] sm:h-[24px] w-[20px] h-[20px] object-contain"
            />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
