'use client';

import { startTransition, useActionState, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  RiAiGenerate2,
  RiArrowDownLine,
  RiArrowLeftLine,
  RiArrowUpLine,
  RiExternalLinkLine,
  RiDownloadLine,
  RiSaveLine,
} from 'react-icons/ri';
import ApplicationDocuments from '@/components/cv/ApplicationDocuments';
import { cv } from '@/lib/cv';
import { products } from '@/lib/products';
import { getHighlightedProjects, mergeCv } from '@/lib/applications/merge';
import {
  applicationFocuses,
  applicationLanguages,
  applicationStatuses,
  type Application,
  type ExperienceOverride,
} from '@/lib/applications/types';
import {
  createApplicationAction,
  generateDraftAction,
  importJobDescriptionAction,
  saveApplicationAction,
  type ActionState,
  type GenerateState,
  type JobImportState,
} from '@/app/admin/actions';

type Props = { application?: Application };

const fieldClass =
  'mt-2 min-h-11 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/10';
const labelClass = 'block text-sm font-medium text-ink';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildExperience(existing: ExperienceOverride[] = []) {
  const byOrg = new Map(existing.map((item) => [item.org, item]));
  return cv.roles
    .map(
      (role, index) =>
        byOrg.get(role.org) ?? {
          org: role.org,
          priority: index,
          hidden: false,
          summary: '',
          selectedHighlights: [...role.bullets],
        },
    )
    .sort((a, b) => a.priority - b.priority)
    .map((item, priority) => ({ ...item, priority }));
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-surface">
      <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-ink-muted">{description}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export default function ApplicationEditor({ application }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [company, setCompany] = useState(application?.company ?? '');
  const [role, setRole] = useState(application?.role ?? '');
  const [slug, setSlug] = useState(application?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(application));
  const [jobUrl, setJobUrl] = useState(application?.jobUrl ?? '');
  const [jobDescription, setJobDescription] = useState(application?.jobDescription ?? '');
  const [language, setLanguage] = useState<Application['language']>(application?.language ?? 'de');
  const [focus, setFocus] = useState<Application['focus']>(application?.focus ?? 'Hybrid');
  const [status, setStatus] = useState<Application['status']>(application?.status ?? 'Draft');
  const [headline, setHeadline] = useState(application?.headline ?? '');
  const [intro, setIntro] = useState(application?.intro ?? '');
  const [about, setAbout] = useState(application?.about ?? '');
  const [coverLetter, setCoverLetter] = useState(application?.coverLetter ?? '');
  const [experience, setExperience] = useState(() =>
    buildExperience(application?.experienceOverrides),
  );
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    application?.highlightedProjects ?? [],
  );
  const [skills, setSkills] = useState<string[]>(
    application?.skills.length ? application.skills : cv.strengths.map((item) => item.label),
  );

  const saveFunction = application
    ? saveApplicationAction.bind(null, application.id)
    : createApplicationAction;
  const [saveState, saveAction, saving] = useActionState<ActionState, FormData>(saveFunction, {});
  async function generateAndApply(previousState: GenerateState, formData: FormData) {
    const result = await generateDraftAction(previousState, formData);
    if (result.draft) {
      const draft = result.draft;
      setHeadline(draft.headline);
      setIntro(draft.intro);
      setAbout(draft.about);
      setCoverLetter(draft.coverLetter);
      setExperience(buildExperience(draft.experienceOverrides));
      setSelectedProjects(draft.highlightedProjects);
      setSkills(draft.skills);
      setStatus('Draft');
    }
    return result;
  }

  const [generateState, generateAction, generating] = useActionState<GenerateState, FormData>(
    generateAndApply,
    {},
  );

  async function importAndApply(previousState: JobImportState, formData: FormData) {
    const result = await importJobDescriptionAction(previousState, formData);
    if (result.description) setJobDescription(result.description);
    return result;
  }

  const [jobImportState, jobImportAction, importingJob] = useActionState<JobImportState, FormData>(
    importAndApply,
    {},
  );

  const previewApplication = useMemo<Application>(
    () => ({
      id: application?.id ?? 'preview',
      slug: slug || 'preview',
      company: company || 'Company',
      role: role || 'Role',
      jobUrl: jobUrl || null,
      jobDescription,
      language,
      focus,
      status,
      headline: headline || null,
      intro: intro || null,
      about: about || null,
      experienceOverrides: experience,
      highlightedProjects: selectedProjects,
      skills,
      coverLetter: coverLetter || null,
      createdAt: application?.createdAt ?? new Date(),
      updatedAt: new Date(),
    }),
    [
      application,
      slug,
      company,
      role,
      jobUrl,
      jobDescription,
      language,
      focus,
      status,
      headline,
      intro,
      about,
      experience,
      selectedProjects,
      skills,
      coverLetter,
    ],
  );

  function updateExperience(org: string, patch: Partial<ExperienceOverride>) {
    setExperience((items) =>
      items.map((item) => (item.org === org ? { ...item, ...patch } : item)),
    );
  }

  function moveExperience(index: number, direction: -1 | 1) {
    setExperience((items) => {
      const target = index + direction;
      if (target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((item, priority) => ({ ...item, priority }));
    });
  }

  function moveSkill(index: number, direction: -1 | 1) {
    setSkills((items) => {
      const target = index + direction;
      if (target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function importJobFromForm() {
    if (!formRef.current || !jobUrl || importingJob) return;
    const formData = new FormData(formRef.current);
    startTransition(() => jobImportAction(formData));
  }

  return (
    <main className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
      <form ref={formRef} action={saveAction}>
        <input type="hidden" name="experienceOverrides" value={JSON.stringify(experience)} />
        <input type="hidden" name="highlightedProjects" value={JSON.stringify(selectedProjects)} />
        <input type="hidden" name="skills" value={JSON.stringify(skills)} />

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/applications"
              className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-ink-muted hover:text-ink"
              aria-label="Back to applications"
            >
              <RiArrowLeftLine />
            </Link>
            <h1 className="text-2xl font-semibold tracking-[-0.03em]">
              {company || (application ? 'Edit application' : 'New application')}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {application && (
              <Link
                href={`/admin/applications/${application.id}/preview`}
                target="_blank"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold hover:border-accent"
              >
                <RiExternalLinkLine /> Preview
              </Link>
            )}
            <button
              formAction={generateAction}
              disabled={generating}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-accent/30 bg-accent-soft px-4 text-sm font-semibold text-accent transition hover:border-accent disabled:opacity-60"
            >
              <RiAiGenerate2 /> {generating ? 'Drafting…' : 'Generate draft'}
            </button>
            <button
              disabled={saving}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-on-accent transition hover:bg-accent-strong disabled:opacity-60"
            >
              <RiSaveLine /> {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        {(saveState.error || generateState.error || jobImportState.error) && (
          <p
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            role="alert"
          >
            {saveState.error || generateState.error || jobImportState.error}
          </p>
        )}
        {(saveState.success || generateState.success || jobImportState.success) && (
          <p
            className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
            role="status"
          >
            {saveState.success || generateState.success || jobImportState.success}
          </p>
        )}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(520px,0.9fr)_minmax(620px,1.1fr)]">
          <div className="space-y-5">
            <Section title="Application" description="The opportunity and its public state.">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Company
                  <input
                    name="company"
                    value={company}
                    onChange={(event) => {
                      setCompany(event.target.value);
                      if (!slugTouched) setSlug(slugify(event.target.value));
                    }}
                    required
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  Role
                  <input
                    name="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  Public slug
                  <input
                    name="slug"
                    value={slug}
                    onChange={(event) => {
                      setSlugTouched(true);
                      setSlug(slugify(event.target.value));
                    }}
                    required
                    className={fieldClass}
                  />
                </label>
                <div className={labelClass}>
                  <label htmlFor="job-url">Job URL</label>
                  <span className="mt-2 flex gap-2">
                    <input
                      id="job-url"
                      name="jobUrl"
                      value={jobUrl}
                      onChange={(event) => setJobUrl(event.target.value)}
                      onBlur={(event) => {
                        if (!jobDescription.trim() && event.relatedTarget?.id !== 'import-job') {
                          importJobFromForm();
                        }
                      }}
                      type="url"
                      placeholder="https://…"
                      className={`${fieldClass} mt-0 min-w-0 flex-1`}
                    />
                    <button
                      id="import-job"
                      type="button"
                      onClick={importJobFromForm}
                      disabled={!jobUrl || importingJob}
                      className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-ink-muted transition-[border-color,color,scale] hover:border-accent hover:text-accent active:scale-[0.96] disabled:opacity-40"
                    >
                      <RiDownloadLine aria-hidden />
                      {importingJob ? 'Importing…' : 'Import'}
                    </button>
                  </span>
                </div>
                <label className={labelClass}>
                  Language
                  <select
                    name="language"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value as Application['language'])}
                    className={fieldClass}
                  >
                    {applicationLanguages.map((item) => (
                      <option key={item} value={item}>
                        {item === 'de' ? 'German' : 'English'}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Focus
                  <select
                    name="focus"
                    value={focus}
                    onChange={(event) => setFocus(event.target.value as Application['focus'])}
                    className={fieldClass}
                  >
                    {applicationFocuses.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Status
                  <select
                    name="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value as Application['status'])}
                    className={fieldClass}
                  >
                    {applicationStatuses.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className={labelClass}>
                Job description
                <textarea
                  name="jobDescription"
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  rows={10}
                  className={fieldClass}
                  placeholder="Paste the complete job description…"
                />
              </label>
            </Section>

            <Section
              title="Positioning"
              description="Tailored language; empty fields inherit from the master CV."
            >
              <label className={labelClass}>
                Headline
                <input
                  name="headline"
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                  className={fieldClass}
                  placeholder={cv.headline}
                />
              </label>
              <label className={labelClass}>
                Short introduction
                <textarea
                  name="intro"
                  value={intro}
                  onChange={(event) => setIntro(event.target.value)}
                  rows={4}
                  className={fieldClass}
                  placeholder={cv.summary}
                />
              </label>
              <label className={labelClass}>
                About
                <textarea
                  name="about"
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  rows={9}
                  className={fieldClass}
                  placeholder="Separate paragraphs with a blank line. Empty inherits the master About section."
                />
              </label>
            </Section>

            <Section
              title="Experience"
              description="Reorder roles, hide irrelevant entries, select verified highlights, or add a tailored summary."
            >
              <div className="space-y-3">
                {experience.map((override, index) => {
                  const masterRole = cv.roles.find((item) => item.org === override.org)!;
                  return (
                    <div
                      key={override.org}
                      className={`rounded-xl border p-4 ${override.hidden ? 'border-line bg-surface-muted opacity-60' : 'border-line bg-canvas/60'}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold">{masterRole.org}</h3>
                          <p className="text-xs text-ink-muted">{masterRole.title}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => moveExperience(index, -1)}
                          disabled={index === 0}
                          className="grid size-8 place-items-center rounded-lg hover:bg-surface-muted disabled:opacity-25"
                          aria-label="Move up"
                        >
                          <RiArrowUpLine />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveExperience(index, 1)}
                          disabled={index === experience.length - 1}
                          className="grid size-8 place-items-center rounded-lg hover:bg-surface-muted disabled:opacity-25"
                          aria-label="Move down"
                        >
                          <RiArrowDownLine />
                        </button>
                        <label className="flex items-center gap-2 text-xs font-semibold">
                          <input
                            type="checkbox"
                            checked={!override.hidden}
                            onChange={(event) =>
                              updateExperience(override.org, { hidden: !event.target.checked })
                            }
                          />{' '}
                          Show
                        </label>
                      </div>
                      {!override.hidden && (
                        <div className="mt-4 space-y-3">
                          <label className={labelClass}>
                            Tailored summary
                            <input
                              value={override.summary}
                              onChange={(event) =>
                                updateExperience(override.org, { summary: event.target.value })
                              }
                              className={fieldClass}
                              placeholder="Optional framing; do not add new facts"
                            />
                          </label>
                          <div>
                            <p className={labelClass}>Verified highlights</p>
                            <div className="mt-2 space-y-2">
                              {masterRole.bullets.map((bullet) => (
                                <label
                                  key={bullet}
                                  className="flex items-start gap-2.5 text-xs leading-5 text-ink-muted"
                                >
                                  <input
                                    type="checkbox"
                                    className="mt-1"
                                    checked={override.selectedHighlights.includes(bullet)}
                                    onChange={(event) =>
                                      updateExperience(override.org, {
                                        selectedHighlights: event.target.checked
                                          ? [...override.selectedHighlights, bullet]
                                          : override.selectedHighlights.filter(
                                              (item) => item !== bullet,
                                            ),
                                      })
                                    }
                                  />
                                  <span>{bullet}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section
              title="Projects & capabilities"
              description="Choose the work and skills most relevant to this role."
            >
              <div>
                <p className={labelClass}>Selected projects</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {products.map((project) => (
                    <label
                      key={project.name}
                      className="flex items-center gap-2 rounded-xl border border-line bg-canvas/60 px-3 py-3 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project.name)}
                        onChange={(event) =>
                          setSelectedProjects(
                            event.target.checked
                              ? [...selectedProjects, project.name]
                              : selectedProjects.filter((item) => item !== project.name),
                          )
                        }
                      />
                      {project.name}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className={labelClass}>Skills in display order</p>
                <div className="mt-2 space-y-2">
                  {skills.map((label, index) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-xl border border-line bg-canvas/60 px-3 py-2"
                    >
                      <span className="flex-1 text-sm font-medium">{label}</span>
                      <button
                        type="button"
                        onClick={() => moveSkill(index, -1)}
                        disabled={index === 0}
                        className="grid size-8 place-items-center rounded-lg hover:bg-surface-muted disabled:opacity-25"
                      >
                        <RiArrowUpLine />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSkill(index, 1)}
                        disabled={index === skills.length - 1}
                        className="grid size-8 place-items-center rounded-lg hover:bg-surface-muted disabled:opacity-25"
                      >
                        <RiArrowDownLine />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSkills((items) => items.filter((item) => item !== label))}
                        className="px-2 text-xs font-semibold text-ink-muted hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                {cv.strengths.some((item) => !skills.includes(item.label)) && (
                  <select
                    className={fieldClass}
                    value=""
                    onChange={(event) =>
                      event.target.value && setSkills((items) => [...items, event.target.value])
                    }
                  >
                    <option value="">Add a capability…</option>
                    {cv.strengths
                      .filter((item) => !skills.includes(item.label))
                      .map((item) => (
                        <option key={item.label}>{item.label}</option>
                      ))}
                  </select>
                )}
              </div>
            </Section>

            <Section
              title={language === 'de' ? 'Anschreiben' : 'Cover Letter'}
              description="A completely custom letter shown next to the CV."
            >
              <label className={labelClass}>
                {language === 'de' ? 'Anschreiben' : 'Cover Letter'}
                <textarea
                  name="coverLetter"
                  value={coverLetter}
                  onChange={(event) => setCoverLetter(event.target.value)}
                  rows={16}
                  className={fieldClass}
                  placeholder="Write or generate the application-specific letter…"
                />
              </label>
            </Section>
          </div>

          <aside className="sticky top-[82px] hidden max-h-[calc(100vh-102px)] overflow-auto rounded-2xl border border-line bg-[#e8ebf2] shadow-card xl:block dark:bg-[#070b13]">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/95 px-4 py-3 backdrop-blur">
              <div>
                <p className="text-sm font-semibold text-ink">Live preview</p>
                <p className="text-xs text-ink-muted">Unsaved changes included</p>
              </div>
              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold">
                {status}
              </span>
            </div>
            <div className="h-[1400px] overflow-hidden">
              <div className="origin-top-left w-[178.57%] scale-[0.56]">
                <ApplicationDocuments
                  profile={mergeCv(previewApplication)}
                  company={company || 'Company'}
                  coverLetter={coverLetter}
                  writtenAt={previewApplication.updatedAt.toISOString()}
                  projects={getHighlightedProjects(selectedProjects, language)}
                  language={language}
                  compact
                />
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}
