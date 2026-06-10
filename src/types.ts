/**
 * Types and interfaces for the Internship Diary application.
 */

export interface WeekDetail {
  weekNumber: number;
  title: string;
  items: string[];
  focusPlatform?: string;
  category: 'onboarding' | 'training' | 'operations' | 'dlp' | 'dspm' | 'cloud' | 'analytics' | 'wrap-up';
}

export interface MonthData {
  monthNumber: number;
  title: string;
  theme: string;
  weeks: WeekDetail[];
  color: string; /* Tailwind colors like blue, cyan, purple etc */
}

export interface Technology {
  name: string;
  purpose: string;
  skillsAcquired: string[];
  experienceLevel: number; /* 1-100 */
  color: string;
  category: string;
}

export interface SkillProgress {
  name: string;
  initial: number; /* Month 1 rating */
  peak: number; /* Month 6 rating */
  history: number[]; /* 6 values, one for each month */
  color: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  metric?: string;
  description: string;
  iconName: string;
  category: string;
  technologies: string[];
}
