import { redirect } from 'next/navigation';
import Topline from '@/components/layout/Topline';
import { isAdmin } from '@/lib/admin-auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin/applications');
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <Topline />
      <div className="mx-auto flex min-h-[calc(100vh-6px)] max-w-md items-center px-6 py-16">
        <section className="w-full rounded-[2rem] border border-line bg-surface p-8 shadow-card">
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">Application studio</h1>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            Create focused CVs and cover letters from the verified master profile.
          </p>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
