import { ResumeData, CardData } from '../types/resume';

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

  // 5. Skills Card (Moved before Projects or after, user didn't specify order but logical flow)
  cards.push({
    id: 'skills',
    type: 'SKILLS',
    title: 'Skills',
    data: data.skills,
  });

  return cards;
}
