'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import Stars from './Stars';

const sampleReviews = [
  { name: 'Chinedu O.', text: 'Exactly as described. Delivery to Lekki took 2 days. Very satisfied.', stars: 5 },
  { name: 'Aisha B.', text: 'Good value for money. Packaging could be better but the item works fine.', stars: 4 },
  { name: 'Tunde A.', text: 'Original product, I confirmed the serial number. Will buy again from Konga.', stars: 5 },
];

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const tabs = [
    ['desc', 'Product Description'],
    ['specs', 'Specifications'],
    ['reviews', `Reviews (${product.reviews})`],
  ] as const;

  return (
    <div className="mt-5 rounded bg-white shadow-card">
      <div className="no-scrollbar flex overflow-x-auto border-b border-konga-line">
        {tabs.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`shrink-0 border-b-2 px-5 py-3 text-sm font-semibold ${
              tab === k ? 'border-konga text-konga' : 'border-transparent text-konga-muted hover:text-konga-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-5 text-sm leading-6">
        {tab === 'desc' && (
          <div className="space-y-3">
            <p>
              The <strong>{product.name}</strong> by {product.brand} combines quality and value. Shop it on Konga with
              confidence: every order is covered by our authentic items policy and 7-day return window.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'specs' && (
          <table className="w-full max-w-lg text-left">
            <tbody>
              {[
                ['Brand', product.brand],
                ['Model', product.name.split(' ').slice(0, 4).join(' ')],
                ['SKU', product.slug.slice(0, 12).toUpperCase().replace(/-/g, '')],
                ['Seller', product.seller],
                ['Warranty', '1 year manufacturer warranty'],
                ['Weight', '1.2 kg'],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-konga-line">
                  <th className="w-40 py-2 font-semibold text-konga-muted">{k}</th>
                  <td className="py-2">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 'reviews' && (
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <div className="text-center">
              <p className="text-5xl font-black">{product.rating.toFixed(1)}</p>
              <div className="mt-1 flex justify-center">
                <Stars rating={product.rating} size={16} />
              </div>
              <p className="mt-1 text-xs text-konga-muted">{product.reviews} verified ratings</p>
            </div>
            <ul className="divide-y divide-konga-line">
              {sampleReviews.map((r) => (
                <li key={r.name} className="py-3">
                  <Stars rating={r.stars} />
                  <p className="mt-1">{r.text}</p>
                  <p className="mt-1 text-xs text-konga-muted">by {r.name} · Verified purchase</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
