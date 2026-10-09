'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [done, setDone] = useState(false);
  const input = 'w-full rounded border border-konga-line px-3 py-2.5 text-sm outline-none focus:border-konga';

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded bg-white p-6 shadow-card">
        <div className="mb-5 text-center">
          <Logo dark />
          <h1 className="mt-3 text-lg font-bold">{mode === 'login' ? 'Login to your account' : 'Create a Konga account'}</h1>
        </div>
        <div className="mb-5 grid grid-cols-2 rounded bg-konga-bg p-1 text-sm font-semibold">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setDone(false);
              }}
              className={`rounded py-2 ${mode === m ? 'bg-white text-konga shadow-card' : 'text-konga-muted'}`}
            >
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>
        {done ? (
          <p className="rounded bg-konga-light p-4 text-center text-sm">
            This is a demo storefront, so no account was created. <Link href="/" className="font-semibold text-konga">Go shopping →</Link>
          </p>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <input required className={input} placeholder="First name" />
                <input required className={input} placeholder="Last name" />
              </div>
            )}
            <input required className={input} placeholder="Email address or phone number" />
            <input required type="password" className={input} placeholder="Password" />
            {mode === 'login' && (
              <a href="#" className="block text-right text-xs font-semibold text-konga hover:underline">
                Forgot password?
              </a>
            )}
            <button className="w-full rounded bg-konga py-3 text-sm font-bold text-white hover:bg-konga-dark">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
