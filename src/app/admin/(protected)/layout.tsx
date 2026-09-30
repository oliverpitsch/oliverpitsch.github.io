import Link from 'next/link';
import { redirect } from 'next/navigation';
import Topline from '@/components/layout/Topline';
import { isAdmin } from '@/lib/admin-auth';
import { logoutAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/admin/login');
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Topline />
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/admin/applications" className="font-semibold tracking-[-0.02em]">
            Application studio
          </Link>
          <form action={logoutAction}>
            <button className="rounded-xl px-3 py-2 text-sm font-medium text-ink-muted hover:bg-surface-muted hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
