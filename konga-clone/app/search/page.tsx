import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Listing from '@/components/Listing';
import { categories, searchProducts } from '@/lib/data';

export function generateMetadata({ searchParams }: { searchParams: { q?: string } }) {
  return { title: `Search: ${searchParams.q ?? ''} | Konga Clone` };
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? '';
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-site px-2 py-4 md:px-4">
      <Breadcrumbs items={[{ label: 'Search results' }]} />
      <h1 className="mb-4 text-lg font-bold">
        {results.length ? 'Results for' : 'No results for'} <span className="text-konga">&ldquo;{q}&rdquo;</span>
      </h1>
      {results.length ? (
        <Listing key={q} products={results} />
      ) : (
        <div className="rounded bg-white p-8 text-center shadow-card">
          <p className="text-5xl">🔍</p>
          <p className="mt-3 font-semibold">We couldn&apos;t find anything matching your search.</p>
          <p className="text-sm text-konga-muted">Check the spelling or try one of these categories:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="rounded-full border border-konga-line px-3 py-1.5 text-sm hover:border-konga hover:text-konga"
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
