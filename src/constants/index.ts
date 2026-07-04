import type { StaticImageData } from 'next/image';

// ─── EXISTING IMPORTS (keep as-is from your original file) ───────────────────
import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  nyeusi,
} from '../assets';

import mern from '../assets/icons/mern.png';
import aws from '../assets/icons/aws.png';
import mongodb from '../assets/tech/mongodb.png';
import bootstrap from '../assets/tech/bootstrap.png';
import material from '../assets/tech/material.png';
import vite from '../assets/tech/vite.png';

import persevere from '../assets/icons/persevere.png';
import ciw from '../assets/icons/ciw.png';
import freecodecamp from '../assets/icons/freecodecamp.png';

import npmCreateMurphyBackend from '../assets/projects/npmCreateMurphyBackend.jpg';
import wealthMap from '../assets/projects/wealthMap.jpg';
import perfectClean from '../assets/projects/perfectClean.jpg';
import todoApp from '../assets/projects/todoApp.jpg';

// ─── NEW LOCAL IMPORTS (assets downloaded via download-assets.sh) ────────────
import banyanlabs  from '../assets/icons/banyanlabs.png';
import typescript  from '../assets/tech/typescript.png';
import nextjs      from '../assets/tech/nextjs.png';
import postgresql  from '../assets/tech/postgresql.png';
import supabase    from '../assets/tech/supabase.png';
import firebase    from '../assets/tech/firebase.png';
import docker      from '../assets/tech/docker.png';
import python      from '../assets/tech/python.png';
import n8n         from '../assets/tech/n8n.png';
import jonaProject     from '../assets/projects/jona.jpg';
import compassProject  from '../assets/projects/compass.jpg';
import nexaraProject   from '../assets/projects/nexara.png';
import homeSourcetn   from '../assets/projects/homesourcetn.jpg';
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  id: string;
  title: string;
}

export interface Service {
  title: string;
  icon: StaticImageData | string;
}

export interface Technology {
  name: string;
  icon: StaticImageData | string;
}

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: ProjectTag[];
  image: StaticImageData | string;
  repo: string;
  demo: string;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: StaticImageData | string;
  iconBg: string;
  date: string;
}

export const navLinks: NavLink[] = [
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

// ─── SERVICES ────────────────────────────────────────────────────────────────
const services: Service[] = [
  { title: 'Full-Stack MERN / Next.js',       icon: frontend },
  { title: 'Cloud & DevOps (AWS)',             icon: aws },
  { title: 'AI & Automation',                 icon: backend },
  { title: 'Database Architecture',           icon: mern },
  { title: 'UI/UX & Accessible Design',       icon: ux },
  { title: 'TypeScript & Quality Assurance',  icon: prototyping },
];

// ─── TECHNOLOGIES (3D BALL ICONS) ────────────────────────────────────────────
const technologies: Technology[] = [
  { name: 'TypeScript',     icon: typescript },
  { name: 'React JS',       icon: reactjs },
  { name: 'Next.js',        icon: nextjs },
  { name: 'Node JS',        icon: nodejs },
  { name: 'PostgreSQL',     icon: postgresql },
  { name: 'MongoDB',        icon: mongodb },
  { name: 'Supabase',       icon: supabase },
  { name: 'Firebase',       icon: firebase },
  { name: 'AWS',            icon: aws },
  { name: 'Docker',         icon: docker },
  { name: 'Tailwind CSS',   icon: tailwind },
  { name: 'n8n Automation', icon: n8n },
  { name: 'Python',         icon: python },
  { name: 'Redux Toolkit',  icon: redux },
  { name: 'Git',            icon: git },
];

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
const experiences: Experience[] = [
  {
    title: 'Full Stack Developer — JONA & COMPASS',
    company_name: 'Banyan Labs (via Persevere)',
    icon: banyanlabs,
    iconBg: '#1A1A2E',
    date: 'Oct 2025 - Present',
  },
  {
    title: 'Full Stack MERN Web Dev Instructor Assistant',
    company_name: 'Persevere Community (Cohorts 14 & 16 + Incarcerated Students)',
    icon: persevere,
    iconBg: '#0A74DA',
    date: 'Jan 2025 - Present',
  },
  {
    title: 'Full Stack MERN Developer',
    company_name: 'Persevere Community',
    icon: persevere,
    iconBg: '#0A74DA',
    date: 'Jan 2023 - Present',
  },
  {
    title: 'AWS Solutions Architect in Training',
    company_name: 'Self-Directed Learning',
    icon: aws,
    iconBg: '#FF9900',
    date: 'Sep 2023 - Present',
  },
  {
    title: 'CIW JavaScript Specialist Candidate',
    company_name: 'Self-Study / Exam Prep',
    icon: ciw,
    iconBg: '#0080FF',
    date: 'Jul 2024 - Present',
  },
  {
    title: 'Certified Full Stack Developer',
    company_name: 'FreeCodeCamp',
    icon: freecodecamp,
    iconBg: '#006400',
    date: 'Completed Aug 2024',
  },
];

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 'project-1',
    name: 'JONA — Job Oportunity and Next Step Action Workforce Intelligence',
    description:
      "AI-powered career platform built at Banyan Labs. Scores every job opportunity 0–100 against a participant's skills, resume, certifications, and career goals. Powering real employment outcomes for underserved communities.",
    tags: [
      { name: 'next.js',    color: 'blue-text-gradient' },
      { name: 'typescript', color: 'green-text-gradient' },
      { name: 'AI / RAG',   color: 'pink-text-gradient' },
    ],
    image: jonaProject,
    repo: '',
    demo: 'https://jona.careers',
  },
  {
    id: 'project-2',
    name: 'NEXARA Banyan Labs — Agentic Onboarding Portal',
    description:
      "UI/UX optimization and dev contributions on Banyan Labs' production Onboarding Portal. Built on Next.js 16 + React 19 with Firebase, drag-and-drop workflows, PDF generation, and Zod-validated forms — handling OJT applications and participant referrals across staging and production environments.",
    tags: [
      { name: 'next.js 16',  color: 'blue-text-gradient' },
      { name: 'firebase',    color: 'green-text-gradient' },
      { name: 'typescript',  color: 'pink-text-gradient' },
    ],
    image: nexaraProject,
    repo: 'https://github.com/Banyan-Labs/banyan-onboarding-portal',
    demo: 'https://banyan-onboarding-portal--banyan-labs-training.us-east4.hosted.app/welcome',
  },
  {
    id: 'project-3',
    name: 'COMPASS — Transitional Housing OS',
    description:
      'Trauma-informed digital ecosystem for transitional housing programs. Mutual accountability, real-time coaching, and predictive risk alerts — built on radical transparency, not surveillance. Navigation, not control.',
    tags: [
      { name: 'next.js',    color: 'blue-text-gradient' },
      { name: 'supabase',   color: 'green-text-gradient' },
      { name: 'postgresql', color: 'pink-text-gradient' },
    ],
    image: compassProject,
    repo: '',
    demo: 'https://banyanlabs.io/products/compass',
  },
  {
    id: 'project-5',
    name: 'HommeSourcetn',
    description:
      'HomeSource - Your Path to Sustainable Homeownership in East Tennessee',
    tags: [
      { name: 'react',    color: 'blue-text-gradient' },
      { name: 'rest api', color: 'green-text-gradient' },
      { name: 'scss',     color: 'pink-text-gradient' },
    ],
    image: homeSourcetn,
    repo: 'https://github.com/Banyan-Labs/homesource',
    demo: 'https://homesource--hset-website.us-east4.hosted.app/',
  },
  {
    id: 'project-4',
    name: 'create-murphy-backend',
    description:
      '⚡ npm package for rapid backend scaffolding — Express + Mongoose production-ready structure in seconds. Built out of real frustration with repetitive setup.',
    tags: [
      { name: 'node.js',  color: 'blue-text-gradient' },
      { name: 'express',  color: 'green-text-gradient' },
      { name: 'mongodb',  color: 'pink-text-gradient' },
    ],
    image: npmCreateMurphyBackend,
    repo: 'https://github.com/randallmurphy/create-murphy-backend',
    demo: 'https://www.npmjs.com/package/create-murphy-backend',
  },
  
  {
    id: 'project-6',
    name: 'TodoApp',
    description:
      'A clean, stylish task manager for organizing daily work — built with Next.js and Supabase.',
    tags: [
      { name: 'next.js',  color: 'blue-text-gradient' },
      { name: 'supabase', color: 'green-text-gradient' },
      { name: 'css',      color: 'pink-text-gradient' },
    ],
    image: todoApp,
    repo: 'https://github.com/randallmurphy/todoApp',
    demo: 'https://todo.randalmurphy.com/',
  },
  // {
  //   id: 'project-7',
  //   name: 'Nyeusi Fest Site',
  //   description:
  //     'Demo concert website for a music festival — immersive, animated, and built to feel alive.',
  //   tags: [
  //     { name: 'react', color: 'blue-text-gradient' },
  //     { name: 'css',   color: 'green-text-gradient' },
  //     { name: 'vite',  color: 'pink-text-gradient' },
  //   ],
  //   image: nyeusi,
  //   repo: 'https://github.com/shaqdeff/Nyeusi-Fest-Site',
  //   demo: 'https://shaqdeff.github.io/Nyeusi-Fest-Site/',
  // },
];

export { services, technologies, experiences, projects };