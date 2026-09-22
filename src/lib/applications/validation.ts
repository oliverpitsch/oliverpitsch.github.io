import { z } from 'zod';
import { applicationFocuses, applicationLanguages, applicationStatuses } from './types';

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || null);

export const experienceOverrideSchema = z.object({
  org: z.string().min(1),
  priority: z.number().int().min(0),
  hidden: z.boolean(),
  summary: z.string(),
  selectedHighlights: z.array(z.string()),
});

export const applicationInputSchema = z.object({
  company: z.string().trim().min(1, 'Company is required.'),
  role: z.string().trim().min(1, 'Role is required.'),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens.'),
  jobUrl: z
    .union([z.literal(''), z.url('Enter a valid job URL.')])
    .transform((value) => value || null),
  jobDescription: z.string(),
  language: z.enum(applicationLanguages),
  focus: z.enum(applicationFocuses),
  status: z.enum(applicationStatuses),
  headline: optionalText,
  intro: optionalText,
  about: optionalText,
  experienceOverrides: z.array(experienceOverrideSchema),
  highlightedProjects: z.array(z.string()),
  skills: z.array(z.string()),
  coverLetter: optionalText,
});

export type ApplicationInput = z.infer<typeof applicationInputSchema>;
