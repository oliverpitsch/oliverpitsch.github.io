import { asc, desc, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { applications, type ApplicationRow } from '@/db/schema';
import type { Application } from './types';
import type { ApplicationInput } from './validation';

function fromRow(row: ApplicationRow): Application {
  return row;
}

export async function listApplications() {
  const rows = await getDb().select().from(applications).orderBy(desc(applications.updatedAt));
  return rows.map(fromRow);
}

export async function getApplication(id: string) {
  const [row] = await getDb().select().from(applications).where(eq(applications.id, id)).limit(1);
  return row ? fromRow(row) : null;
}

export async function getPublishedApplication(slug: string) {
  const [row] = await getDb()
    .select()
    .from(applications)
    .where(eq(applications.slug, slug))
    .orderBy(asc(applications.createdAt))
    .limit(1);
  return row?.status === 'Published' ? fromRow(row) : null;
}

export async function createApplication(input: ApplicationInput) {
  const [row] = await getDb()
    .insert(applications)
    .values({ ...input, status: 'Draft' })
    .returning();
  return fromRow(row);
}

export async function updateApplication(id: string, input: ApplicationInput) {
  const [row] = await getDb()
    .update(applications)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(applications.id, id))
    .returning();
  return row ? fromRow(row) : null;
}

export async function duplicateApplication(id: string) {
  const source = await getApplication(id);
  if (!source) return null;
  const [row] = await getDb()
    .insert(applications)
    .values({
      company: `${source.company} copy`,
      role: source.role,
      jobUrl: source.jobUrl,
      jobDescription: source.jobDescription,
      language: source.language,
      focus: source.focus,
      slug: `${source.slug}-copy-${Date.now().toString().slice(-5)}`,
      status: 'Draft',
      headline: source.headline,
      intro: source.intro,
      about: source.about,
      experienceOverrides: source.experienceOverrides,
      highlightedProjects: source.highlightedProjects,
      skills: source.skills,
      coverLetter: source.coverLetter,
    })
    .returning();
  return fromRow(row);
}

export async function setApplicationStatus(id: string, status: Application['status']) {
  await getDb()
    .update(applications)
    .set({ status, updatedAt: new Date() })
    .where(eq(applications.id, id));
}
