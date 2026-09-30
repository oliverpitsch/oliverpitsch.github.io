'use client';

import { useActionState } from 'react';
import { loginAction, type ActionState } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(loginAction, {});
  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-ink">Admin password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-surface px-4 text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
        />
      </label>
      {state.error && (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <button
        disabled={pending}
        className="min-h-12 w-full rounded-2xl bg-accent px-5 font-semibold text-on-accent transition hover:bg-accent-strong disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
