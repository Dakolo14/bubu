'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product } from '@/lib/data';
import { naira } from '@/lib/format';
import ProductCard, { CardVariant } from './ProductCard';
import Stars from './Stars';
import { KongaNowBadge, OfficialStoreTag } from './Badges';

const priceBands: [string, number, number][] = [
  ['Under ₦20,000', 0, 20000],
  ['₦20,000 – ₦100,000', 20000, 100000],
  ['₦100,000 – ₦500,000', 100000, 500000],
  ['Above ₦500,000', 500000, Infinity],
];

const sorts = {
  popular: 'Most Popular',
  'price-asc': 'Lowest Price',
  'price-desc': 'Highest Price',
  rating: 'Top Rated',
  discount: 'Biggest Discount',
} as const;

type SortKey = keyof typeof sorts;

export default function Listing({ products, variant = 'reviews' }: { products: Product[]; variant?: CardVariant }) {
  const [brandsSel, setBrandsSel] = useState<string[]>([]);
  const [band, setBand] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [express, setExpress] = useState(false);
  const [official, setOfficial] = useState(false);
  const [sort, setSort] = useState<SortKey>('popular');
  const [panel, setPanel] = useState(false);

  const brandList = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);

  const shown = useMemo(() => {
    const list = products.filter(
      (p) =>
        (brandsSel.length === 0 || brandsSel.includes(p.brand)) &&
        (band === null || (p.price >= priceBands[band][1] && p.price < priceBands[band][2])) &&
        p.rating >= minRating &&
        (!express || p.kongaNow) &&
        (!official || p.official),
    );
    const off = (p: Product) => (p.oldPrice ? (p.oldPrice - p.price) / p.oldPrice : 0);
    const cmp: Record<SortKey, (a: Product, b: Product) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      discount: (a, b) => off(b) - off(a),
    };
    return [...list].sort(cmp[sort]);
  }, [products, brandsSel, band, minRating, express, official, sort]);

  const activeCount = brandsSel.length + (band !== null ? 1 : 0) + (minRating ? 1 : 0) + (express ? 1 : 0) + (official ? 1 : 0);
  const reset = () => {
    setBrandsSel([]);
    setBand(null);
    setMinRating(0);
    setExpress(false);
    setOfficial(false);
  };

  const filters = (
    <div className="space-y-5 text-sm">
      <FilterGroup title="Delivery">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="accent-konga" checked={express} onChange={(e) => setExpress(e.target.checked)} />
          <KongaNowBadge small /> <span className="text-xs">Same day</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="accent-konga" checked={official} onChange={(e) => setOfficial(e.target.checked)} />
          <OfficialStoreTag />
        </label>
      </FilterGroup>
      <FilterGroup title="Price">
        {priceBands.map(([label], i) => (
          <label key={label} className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="price" className="accent-konga" checked={band === i} onChange={() => setBand(i)} />
            {label}
          </label>
        ))}
        {band !== null && (
          <button className="text-xs text-konga hover:underline" onClick={() => setBand(null)}>
            Clear price
          </button>
        )}
      </FilterGroup>
      <FilterGroup title="Brand">
        {brandList.map((b) => (
          <label key={b} className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="accent-konga"
              checked={brandsSel.includes(b)}
              onChange={(e) => setBrandsSel((s) => (e.target.checked ? [...s, b] : s.filter((x) => x !== b)))}
            />
            {b}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Customer Rating">
        {[4, 3].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="rating"
              className="accent-konga"
              checked={minRating === r}
              onChange={() => setMinRating(r)}
            />
            <Stars rating={r} /> <span className="text-xs">&amp; above</span>
          </label>
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-[230px_1fr]">
      <aside className="hidden self-start rounded bg-white p-4 shadow-card md:block">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold">Filter</h3>
          {activeCount > 0 && (
            <button className="text-xs text-konga hover:underline" onClick={reset}>
              Clear all
            </button>
          )}
        </div>
        {filters}
      </aside>

      <div>
        <div className="mb-3 flex items-center justify-between gap-2 rounded bg-white px-4 py-2.5 shadow-card">
          <p className="text-sm text-konga-muted">
            <strong className="text-konga-ink">{shown.length}</strong> product{shown.length === 1 ? '' : 's'} found
          </p>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 rounded border border-konga-line px-3 py-1.5 text-sm md:hidden"
              onClick={() => setPanel(true)}
            >
              <SlidersHorizontal size={14} /> Filter{activeCount ? ` (${activeCount})` : ''}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-konga-muted sm:inline">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded border border-konga-line bg-white px-2 py-1.5 text-sm outline-none focus:border-konga"
              >
                {Object.entries(sorts).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {shown.length ? (
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shown.map((p) => (
              <ProductCard key={p.slug} product={p} variant={variant} />
            ))}
          </div>
        ) : (
          <div className="rounded bg-white p-10 text-center shadow-card">
            <p className="text-4xl">🔎</p>
            <p className="mt-2 font-bold">No products match these filters</p>
            <button className="mt-3 rounded bg-konga px-4 py-2 text-sm font-semibold text-white" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
        {shown.length > 0 && (
          <p className="mt-3 text-center text-xs text-konga-muted">
            Prices from {naira(Math.min(...shown.map((p) => p.price)))} to {naira(Math.max(...shown.map((p) => p.price)))}
          </p>
        )}
      </div>

      {panel && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPanel(false)} />
          <div className="absolute bottom-0 max-h-[80vh] w-full overflow-y-auto rounded-t-lg bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">Filter</h3>
              <button onClick={() => setPanel(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            {filters}
            <div className="mt-6 flex gap-2">
              <button className="flex-1 rounded border border-konga py-2.5 text-sm font-semibold text-konga" onClick={reset}>
                Reset
              </button>
              <button className="flex-1 rounded bg-konga py-2.5 text-sm font-semibold text-white" onClick={() => setPanel(false)}>
                Show {shown.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-konga-line pb-4 last:border-0">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-konga-muted">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
