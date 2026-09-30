import Link from 'next/link';
import { RiAddLine, RiArrowRightUpLine, RiFileCopyLine } from 'react-icons/ri';
import { listApplications } from '@/lib/applications/repository';
import { duplicateApplicationAction, setStatusAction } from '../../actions';

export const dynamic = 'force-dynamic';

const statusClasses = {
  Draft: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  Published: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  Archived: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export default async function ApplicationsPage() {
  const applications = await listApplications();
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-semibold tracking-[-0.04em]">Applications</h1>
          <p className="mt-3 text-ink-muted">One master CV, focused for each opportunity.</p>
        </div>
        <Link
          href="/admin/applications/new"
          className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-accent px-5 font-semibold text-on-accent transition hover:-translate-y-0.5 hover:bg-accent-strong"
        >
          <RiAddLine /> New application
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
        {applications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold">No applications yet</p>
            <p className="mt-2 text-sm text-ink-muted">
              Create the first draft from a job description.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line">
            {applications.map((application) => (
              <article
                key={application.id}
                className="grid gap-4 px-5 py-5 transition hover:bg-surface-muted/60 md:grid-cols-[1.3fr_1fr_auto] md:items-center sm:px-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-ink">{application.company}</h2>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses[application.status]}`}
                    >
                      {application.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">
                    {application.role} · {application.focus} ·{' '}
                    {application.language === 'de' ? 'German' : 'English'}
                  </p>
                </div>
                <div className="text-sm text-ink-muted">
                  <p>pitsch.me/cv/{application.slug}</p>
                  <p className="mt-1 text-xs">
                    Updated{' '}
                    {application.updatedAt.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-1">
                  {application.status !== 'Archived' && (
                    <form action={setStatusAction}>
                      <input type="hidden" name="id" value={application.id} />
                      <input
                        type="hidden"
                        name="status"
                        value={application.status === 'Published' ? 'Draft' : 'Published'}
                      />
                      <button className="rounded-xl px-3 py-2.5 text-xs font-semibold text-ink-muted hover:bg-surface-muted">
                        {application.status === 'Published' ? 'Unpublish' : 'Publish'}
                      </button>
                    </form>
                  )}
                  <form action={duplicateApplicationAction}>
                    <input type="hidden" name="id" value={application.id} />
                    <button
                      title="Duplicate"
                      className="grid size-10 place-items-center rounded-xl text-ink-muted hover:bg-accent-soft hover:text-accent"
                    >
                      <RiFileCopyLine />
                    </button>
                  </form>
                  {application.status === 'Published' && (
                    <a
                      href={`/cv/${application.slug}`}
                      target="_blank"
                      title="Open live CV"
                      className="grid size-10 place-items-center rounded-xl text-ink-muted hover:bg-accent-soft hover:text-accent"
                    >
                      <RiArrowRightUpLine />
                    </a>
                  )}
                  <Link
                    href={`/admin/applications/${application.id}`}
                    className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-canvas"
                  >
                    Edit
                  </Link>
                  <form action={setStatusAction}>
                    <input type="hidden" name="id" value={application.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={application.status === 'Archived' ? 'Draft' : 'Archived'}
                    />
                    <button className="rounded-xl px-3 py-2.5 text-xs font-semibold text-ink-muted hover:bg-surface-muted">
                      {application.status === 'Archived' ? 'Restore' : 'Archive'}
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
