import { ResumeData, CardData } from '../types/resume';

export function transformResumeToCards(data: ResumeData): CardData[] {
  const cards: CardData[] = [];

  // Helper to calculate total years of experience
  const calculateTotalExperience = (): string => {
    const allWork = [...(data.work || []), ...(data.past_work || [])];

    // Calculate total duration in milliseconds
    const totalDurationMs = allWork.reduce((total, job) => {
      const start = new Date(job.startDate).getTime();
      const end = job.endDate ? new Date(job.endDate).getTime() : Date.now();
      return total + (end - start);
    }, 0);

    // Convert to years (365.25 days per year to account for leap years)
    const years = totalDurationMs / (1000 * 60 * 60 * 24 * 365.25);
    return `${Math.floor(years)}+ Years Exp.`;
  };

  const dynamicExperience = calculateTotalExperience();

  // 1. Intro Card
  cards.push({
    id: 'intro',
    type: 'INTRO',
    title: 'Hello',
    data: {
      ...data.basics,
      experience: dynamicExperience,
    },
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
  const pastWork = data.past_work || [];
  const oldestPast = pastWork.length > 0
    ? pastWork.reduce((oldest, current) =>
      new Date(current.startDate) < new Date(oldest.startDate) ? current : oldest
    )
    : null;
  const oldestYear = oldestPast ? new Date(oldestPast.startDate).getFullYear() : null;

  data.work.forEach((job, index) => {
    cards.push({
      id: `job-${index}`,
      type: 'EXPERIENCE',
      title: 'Experience',
      data: {
        ...job,
        pastExperience: {
          count: pastWork.length,
          oldestYear,
        },
      },
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
