import type { Config } from 'tailwindcss';

/**
 * NOTE ON THIS FILE vs globals.css
 * ─────────────────────────────────
 * This project imports Tailwind v4 (`@import "tailwindcss"`) and defines its
 * real design tokens via the `@theme` block in globals.css — that CSS file
 * is the source of truth Tailwind actually reads at build time in v4.
 *
 * This tailwind.config.ts is the legacy v3-style config format. Tailwind v4
 * will only use it if globals.css explicitly references it via `@config
 * "../tailwind.config.ts";` at the top of the file. If that line isn't
 * present, this file currently does nothing and can be deleted safely.
 *
 * It's filled in completely below and kept in sync with globals.css in case
 * you (a) add the `@config` reference, (b) use this file for editor
 * tooling/IntelliSense, or (c) migrate back to v3 later. If you're not sure
 * whether it's wired up, check the top of globals.css for `@config`.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── Original template tokens ──
        primary: '#050816',
        secondary: '#aaa6c3',
        tertiary: '#151030',
        'black-100': '#100d25',
        'black-200': '#090325',
        'white-100': '#f3f3f3',
        flashWhite: '#f4f4f6',
        platinum: '#e6e6e9',
        platinumLight: '#f4f4f5',
        timberWolf: '#d4d4d8',
        taupe: '#9999a1',
        silver: '#d6d6d6',
        dim: '#66666e',
        battleGray: '#858585',
        french: '#b5b5ba',
        night: '#141414',
        jet: '#292929',
        jetLight: '#333333',
        jetGray: '#6d6d74',
        richBlack: '#2e2e2e',
        eerieBlack: '#1f1f1f',
        onyx: '#5b5b5b',
        cream: '#FFF8F1',
        cocoa: '#3C2F2F',
        coral: '#E76F51',
        softOrange: '#F4A261',
        goldMustard: '#D69E2E',
        burntOrange: '#C05621',
        rosewood: '#65000B',
        desertSand: '#EDC9AF',

        // ── Neuro-Inclusive Neon Palette (retuned to Liquid Brutalism hues,
        //     matches globals.css @theme values exactly) ──
        pureBlack: '#000000',
        neuroBlue: '#6388FF',
        warmCoral: '#FF7E67', // legacy/off-palette, avoid for new work
        sageNeon: '#78FFC8',
        electricLavender: '#AA8CFF',

        // ── Liquid Brutalism palette (canonical) ──
        void: '#08080F',
        ink: '#0F0E1A',
        deepIndigo: '#231E5A',
        electric: '#6388FF',
        violet: '#AA8CFF',
        mint: '#78FFC8',
        mintBright: '#DCFFEB',
      },
      boxShadow: {
        card: '0px 35px 120px -15px #1f1f1f',
        cardLight: '0px 19px 38px #eaeaec, 0px 15px 12px #eaeaec',
        brutal: '8px 8px 0px rgba(255, 255, 255, 1)',
        'brutal-neuro': '8px 8px 0px #6388FF',
        'brutal-coral': '8px 8px 0px #FF7E67',
        'brutal-sage': '8px 8px 0px #78FFC8',
        'brutal-lavender': '8px 8px 0px #AA8CFF',
        'brutal-mint': '8px 8px 0px #78FFC8',
        'brutal-electric': '8px 8px 0px #6388FF',
        'brutal-violet': '8px 8px 0px #AA8CFF',
      },
      screens: {
        xxs: '350px',
        xs: '450px',
        sm: '640px',
        md: '768px',
        xmd: '900px',
        lg: '1025px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1800px',
      },
      backgroundImage: {
        about:
          'linear-gradient(165deg, rgba(8,8,15,0.97) 0%, rgba(35,30,90,0.85) 100%)',
        experience:
          "linear-gradient(135deg, rgba(8,8,15,0.85) 55%, rgba(99,136,255,0.18) 100%), url('/assets/backgrounds/white-abstract.png')",
        experienceLight:
          'linear-gradient(137deg, rgba(35,30,90,0.55) 55%, rgba(8,8,15,0.92) 100%)',
        hero:
          'radial-gradient(circle at 75% 30%, rgba(99,136,255,0.22) 0%, transparent 45%), linear-gradient(135deg, rgba(8,8,15,0.98) 45%, rgba(35,30,90,0.75) 100%)',
        'hero-mobile':
          'linear-gradient(160deg, rgba(8,8,15,0.98) 45%, rgba(35,30,90,0.85) 100%)',
        tech: "linear-gradient(165deg, rgba(8,8,15,0.88) 0%, rgba(35,30,90,0.8) 100%), url('/assets/backgrounds/nairobi.png')",
        'text-gradient':
          'linear-gradient(135deg, #6388FF 0%, #AA8CFF 60%, #78FFC8 100%)',
      },
      fontFamily: {
        arenq: ['Arenq'],
        beckman: ['Beckman'],
        mova: ['Mova'],
        overcameBold: ['Overcame Bold'],
        overcameOutline: ['Overcame Outline'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;