import { ResumeData, CardData } from '../types/resume';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';
import React from 'react';

export function transformResumeToCards(data: ResumeData): CardData[] {
  const cards: CardData[] = [];

  // 1. Intro Card
  cards.push({
    id: 'intro',
    type: 'INTRO',
    title: 'Hello',
    data: data.basics,
    color: 'bg-white dark:bg-zinc-900',
  });

  // 2. About Card
  cards.push({
    id: 'about',
    type: 'ABOUT',
    title: 'About Me',
    data: data.basics,
    color: 'bg-indigo-50 dark:bg-indigo-900/10',
  });

  // 3. Experience Cards (one per job)
  data.work.forEach((job, index) => {
    cards.push({
      id: `job-${index}`,
      type: 'EXPERIENCE',
      title: 'Experience',
      data: job,
    });
  });

  // 4. Project Cards (one per project)
  data.projects.forEach((project, index) => {
    cards.push({
      id: `project-${index}`,
      type: 'PROJECTS',
      title: 'Project',
      data: project,
    });
  });

  // 5. Skills Card
  cards.push({
    id: 'skills',
    type: 'SKILLS',
    title: 'Skills',
    data: data.skills,
  });

  // 6. Match Card (Final)
  cards.push({
    id: 'match',
    type: 'MATCH',
    title: "It's a Match!",
    data: {
      links: [
        {
          name: 'Email',
          url: `mailto:${data.basics.email}`,
          icon: <Mail className="w-6 h-6 text-red-500" />,
        },
        {
          name: 'LinkedIn',
          url: data.basics.profiles.find(p => p.network === 'LinkedIn')?.url || '#',
          icon: <Linkedin className="w-6 h-6 text-blue-600" />,
        },
        {
          name: 'GitHub',
          url: data.basics.profiles.find(p => p.network === 'GitHub')?.url || '#',
          icon: <Github className="w-6 h-6 text-gray-800 dark:text-white" />,
        },
        {
          name: 'Resume',
          url: '/Profile.pdf', // Assuming PDF is at root
          icon: <FileText className="w-6 h-6 text-indigo-600" />,
        }
      ]
    },
  });

  return cards;
}
