export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
  experience: string;
  langs: string[];
}

export interface Work {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  technologies?: string[]; // Added technologies field
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  url: string;
  image?: string;
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Config {
  theme: {
    primary: string;
    secondary: string;
  };
  matchThreshold: number;
}

export interface ResumeData {
  basics: Basics;
  work: Work[];
  past_work?: Work[];
  projects: Project[];
  skills: Skill[];
  config: Config;
}

export type CardType =
  | 'INTRO'
  | 'ABOUT'
  | 'EXPERIENCE'
  | 'PROJECTS'
  | 'SKILLS'
  | 'MATCH';

export interface CardData {
  id: string;
  type: CardType;
  title: string;
  data: any; // Flexible data depending on type
  color?: string;
}
