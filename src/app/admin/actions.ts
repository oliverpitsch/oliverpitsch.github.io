'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { cv } from '@/lib/cv';
import { products } from '@/lib/products';
import {
  clearAdminSession,
  createAdminSession,
  isAdmin,
  verifyAdminPassword,
} from '@/lib/admin-auth';
import {
  createApplication,
  duplicateApplication,
  setApplicationStatus,
  updateApplication,
} from '@/lib/applications/repository';
import { applicationInputSchema, experienceOverrideSchema } from '@/lib/applications/validation';
import type { ApplicationStatus } from '@/lib/applications/types';
import { importJobDescription, JobImportError } from '@/lib/applications/import-job';

export type ActionState = { error?: string; success?: string };

export type GeneratedDraft = {
  headline: string;
  intro: string;
  about: string;
  experienceOverrides: z.infer<typeof experienceOverrideSchema>[];
  highlightedProjects: string[];
  skills: string[];
  coverLetter: string;
};

export type GenerateState = ActionState & { draft?: GeneratedDraft };
export type JobImportState = ActionState & { description?: string };

function readJson(value: FormDataEntryValue | null, fallback: unknown) {
  try {
    return typeof value === 'string' ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function parseApplication(formData: FormData) {
  return applicationInputSchema.safeParse({
    company: formData.get('company'),
    role: formData.get('role'),
    slug: formData.get('slug'),
    jobUrl: formData.get('jobUrl'),
    jobDescription: formData.get('jobDescription'),
    language: formData.get('language'),
    focus: formData.get('focus'),
    status: formData.get('status'),
    headline: formData.get('headline'),
    intro: formData.get('intro'),
    about: formData.get('about'),
    experienceOverrides: readJson(formData.get('experienceOverrides'), []),
    highlightedProjects: readJson(formData.get('highlightedProjects'), []),
    skills: readJson(formData.get('skills'), []),
    coverLetter: formData.get('coverLetter'),
  });
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Unauthorized');
}

function databaseError(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  return message.includes('unique') || message.includes('duplicate')
    ? 'That public slug is already in use.'
    : 'The application could not be saved.';
}

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get('password') ?? '');
  if (!(await verifyAdminPassword(password))) return { error: 'Incorrect password.' };
  await createAdminSession();
  redirect('/admin/applications');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function createApplicationAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseApplication(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Check the form.' };
  try {
    const application = await createApplication(parsed.data);
    redirect(`/admin/applications/${application.id}`);
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) throw error;
    return { error: databaseError(error) };
  }
}

export async function saveApplicationAction(
  id: string,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseApplication(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Check the form.' };
  try {
    await updateApplication(id, parsed.data);
    revalidatePath('/admin/applications');
    revalidatePath(`/admin/applications/${id}`);
    revalidatePath(`/cv/${parsed.data.slug}`);
    return { success: 'Saved.' };
  } catch (error) {
    return { error: databaseError(error) };
  }
}

export async function duplicateApplicationAction(formData: FormData) {
  await requireAdmin();
  const application = await duplicateApplication(String(formData.get('id')));
  if (application) redirect(`/admin/applications/${application.id}`);
  redirect('/admin/applications');
}

export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  const status = String(formData.get('status')) as ApplicationStatus;
  if (!['Draft', 'Published', 'Archived'].includes(status)) throw new Error('Invalid status');
  await setApplicationStatus(id, status);
  revalidatePath('/admin/applications');
  redirect('/admin/applications');
}

export async function importJobDescriptionAction(
  _state: JobImportState,
  formData: FormData,
): Promise<JobImportState> {
  await requireAdmin();
  const jobUrl = String(formData.get('jobUrl') ?? '').trim();
  if (!jobUrl) return { error: 'Add a job URL first.' };
  try {
    const result = await importJobDescription(jobUrl);
    return {
      description: result.description,
      success: `Imported the job description from ${result.hostname}.`,
    };
  } catch (error) {
    return {
      error:
        error instanceof JobImportError ? error.message : 'The job page could not be imported.',
    };
  }
}

const generatedDraftSchema = z.object({
  headline: z.string(),
  intro: z.string(),
  about: z.string(),
  experienceOverrides: z.array(experienceOverrideSchema),
  highlightedProjects: z.array(z.string()),
  skills: z.array(z.string()),
  coverLetter: z.string(),
});

export async function generateDraftAction(
  _state: GenerateState,
  formData: FormData,
): Promise<GenerateState> {
  await requireAdmin();
  if (!process.env.OPENAI_API_KEY) return { error: 'OPENAI_API_KEY is not configured.' };

  const company = String(formData.get('company') ?? '').trim();
  const role = String(formData.get('role') ?? '').trim();
  const jobDescription = String(formData.get('jobDescription') ?? '').trim();
  const focus = String(formData.get('focus') ?? 'Hybrid');
  const language = String(formData.get('language') ?? 'de');
  if (!company || !role || !jobDescription) {
    return { error: 'Add company, role, and job description before generating.' };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const response = await client.responses.parse({
      model: process.env.OPENAI_MODEL || 'gpt-5-mini',
      instructions: `You draft personalized CV content. Write all editable prose in ${language === 'de' ? 'German' : 'English'}. Use only facts explicitly present in MASTER_CV and VERIFIED_PROJECTS. Never invent or infer achievements, metrics, employers, responsibilities, skills, dates, or tools. Tailor emphasis and wording, not facts. selectedHighlights must be exact verbatim bullets from MASTER_CV. org, project names, and skills must exactly match the supplied data. Format coverLetter as paragraphs: subject line first, greeting second, then the letter body and closing. Do not append the sender's name because the document adds the signature and name. Return an editable draft, never publishing language.`,
      input: JSON.stringify({
        application: { company, role, focus, language, jobDescription },
        MASTER_CV: cv,
        VERIFIED_PROJECTS: products.map(({ name, lead, story }) => ({ name, lead, story })),
      }),
      text: { format: zodTextFormat(generatedDraftSchema, 'personalized_cv_draft') },
    });
    if (!response.output_parsed) return { error: 'The model did not return a usable draft.' };

    const validOrgs = new Map(cv.roles.map((item) => [item.org, item]));
    const validProjects = new Set(products.map((item) => item.name));
    const validSkills = new Set(cv.strengths.map((item) => item.label));
    const draft = response.output_parsed;
    return {
      draft: {
        ...draft,
        experienceOverrides: draft.experienceOverrides
          .filter((item) => validOrgs.has(item.org))
          .map((item) => ({
            ...item,
            summary: '',
            selectedHighlights: item.selectedHighlights.filter((bullet) =>
              validOrgs.get(item.org)?.bullets.includes(bullet),
            ),
          })),
        highlightedProjects: draft.highlightedProjects.filter((name) => validProjects.has(name)),
        skills: draft.skills.filter((name) => validSkills.has(name)),
      },
      success: 'Draft generated. Review every field before saving or publishing.',
    };
  } catch (error) {
    console.error('Application draft generation failed', error);
    return { error: 'Draft generation failed. Try again.' };
  }
}
