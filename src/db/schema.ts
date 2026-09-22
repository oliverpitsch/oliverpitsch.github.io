import { sql } from 'drizzle-orm';
import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { ExperienceOverride } from '@/lib/applications/types';

export const applicationFocusEnum = pgEnum('application_focus', [
  'Design',
  'Product',
  'AI Builder',
  'Hybrid',
]);
export const applicationStatusEnum = pgEnum('application_status', [
  'Draft',
  'Published',
  'Archived',
]);
export const applicationLanguageEnum = pgEnum('application_language', ['de', 'en']);

export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  company: text('company').notNull(),
  role: text('role').notNull(),
  jobUrl: text('job_url'),
  jobDescription: text('job_description').notNull().default(''),
  language: applicationLanguageEnum('language').notNull().default('de'),
  focus: applicationFocusEnum('focus').notNull().default('Hybrid'),
  status: applicationStatusEnum('status').notNull().default('Draft'),
  headline: text('headline'),
  intro: text('intro'),
  about: text('about'),
  experienceOverrides: jsonb('experience_overrides')
    .$type<ExperienceOverride[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  highlightedProjects: jsonb('highlighted_projects')
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  skills: jsonb('skills')
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  coverLetter: text('cover_letter'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type ApplicationRow = typeof applications.$inferSelect;
