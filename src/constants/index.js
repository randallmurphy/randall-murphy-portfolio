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

import mern from '../assets/icons/mern.png'
import aws from '../assets/icons/aws.png'
import mongodb from '../assets/tech/mongodb.png'
import bootstrap from '../assets/tech/bootstrap.png'
import material from '../assets/tech/material.png'
import vite from '../assets/tech/vite.png'

import persevere from '../assets/icons/persevere.png'
import ciw from '../assets/icons/ciw.png'
import freecodecamp from '../assets/icons/freecodecamp.png'
import npmCreateMurphyBackend from '../assets/projects/npmCreateMurphyBackend.jpg'
import wealthMap from '../assets/projects/wealthMap.jpg'
import perfectClean from '../assets/projects/perfectClean.jpg'   
import todoApp from '../assets/projects/perfectClean.jpg'   


export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Frontend Developer ',
    icon: frontend,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'UI/UX Design',
    icon: ux,
  },
  {
    title: 'MERN stack developer',
    icon: mern,
  },
  {
    title: 'CIW jS specialist',
    icon: prototyping,
  },
  {
    title: 'AWS solutions architect',
    icon: aws,
  }
  
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'Bootstrap',
    icon: bootstrap,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  
  {
    name: 'mui',
    icon: material,
  },
  {
    name: 'mongodb',
    icon: mongodb,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'vite',
    icon: vite,
  },
  // {
  //   name: 'docker',
  //   icon: docker,
  // },
];

const experiences = [
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
    title: 'Full Stack MERN Web Development Instructor Assistant',
    company_name: 'Persevere Community (Cohorts 14 & 16 + Incarcerated Students)',
    icon: persevere,
    iconBg: '#0A74DA',
    date: 'Jan 2025 - Present',
  },
  {
    title: 'Certified Full Stack Developer',
    company_name: 'FreeCodeCamp',
    icon: freecodecamp,
    iconBg: '#006400',  // FreeCodeCamp green
    date: 'Completed Aug 2024',
  },
];


const projects = [
  {
    id: 'project-1',
    name: 'create-murphy-backend',
    description: '💻 Rapid backend scaffolding — Express + Mongoose in seconds.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'express',
        color: 'pink-text-gradient',
      },
    ],
    image: npmCreateMurphyBackend,
    repo: 'https://github.com/randallmurphy/create-murphy-backend',
    demo: 'https://www.npmjs.com/package/create-murphy-backend',
  },
  {
    id: 'project-2',
    name: 'wealthMap',
    description:
      'cash flow budgeting app inc/expense asset/liab.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: wealthMap,
    repo: 'https://github.com/randallmurphy/wealthMap',
    demo: 'https://shaqdeff.github.io/Leaderboard/',
  },
  {
    id: 'project-3',
    name: 'perfect cleaning',
    description: 'make a wish upon a star',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: perfectClean,
    repo: 'https://github.com/randallmurphy/perfect-cleaning-',
    demo: 'perfectcleaning.com',
  },
  {
    id: 'project-4',
    name: 'TodoApp',
    description: `A stylish task app to organize your daily todos!`,
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: todoApp,
    repo: 'https://github.com/randallmurphy/todoApp',
    demo: 'https://todo.randalmurphy.com/',
  },
  {
    id: 'project-5',
    name: 'Nyeusi Fest Site',
    description:
      'This is a demo concert website for a music festival called Nyeusi.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: nyeusi,
    repo: 'https://github.com/shaqdeff/Nyeusi-Fest-Site',
    demo: 'https://shaqdeff.github.io/Nyeusi-Fest-Site/',
  },
];

export { services, technologies, experiences, projects };
