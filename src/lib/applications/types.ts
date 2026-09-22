import type { CvRole, CvStrength } from '@/lib/cv';

export const applicationFocuses = ['Design', 'Product', 'AI Builder', 'Hybrid'] as const;
export const applicationStatuses = ['Draft', 'Published', 'Archived'] as const;
export const applicationLanguages = ['de', 'en'] as const;

export type ApplicationFocus = (typeof applicationFocuses)[number];
export type ApplicationStatus = (typeof applicationStatuses)[number];
export type ApplicationLanguage = (typeof applicationLanguages)[number];

export type ExperienceOverride = {
  org: string;
  priority: number;
  hidden: boolean;
  summary: string;
  selectedHighlights: string[];
};

export type ApplicationContent = {
  headline: string | null;
  intro: string | null;
  about: string | null;
  experienceOverrides: ExperienceOverride[];
  highlightedProjects: string[];
  skills: string[];
  coverLetter: string | null;
};

export type Application = ApplicationContent & {
  id: string;
  slug: string;
  company: string;
  role: string;
  jobUrl: string | null;
  jobDescription: string;
  language: ApplicationLanguage;
  focus: ApplicationFocus;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type PersonalizedCv = {
  headline: string;
  summary: string;
  about: string[];
  roles: CvRole[];
  strengths: CvStrength[];
};
