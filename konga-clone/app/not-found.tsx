import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-7xl font-black text-konga">404</p>
      <h1 className="mt-2 text-xl font-bold">Oops! We can&apos;t find that page.</h1>
      <p className="mt-1 text-sm text-konga-muted">It may have been moved or is no longer available.</p>
      <Link href="/" className="mt-6 inline-block rounded bg-konga px-6 py-3 text-sm font-bold text-white">
        Back to Homepage
      </Link>
    </div>
  );
}
