'use client';

import Link from 'next/link';
import { Minus, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useCart } from '@/components/CartProvider';
import ProductImage from '@/components/ProductImage';
import ProductRail from '@/components/ProductRail';
import Section from '@/components/Section';
import { withTag } from '@/lib/data';
import { naira } from '@/lib/format';

export default function CartPage() {
  const { lines, subtotal, count, setQty, remove } = useCart();
  const savings = lines.reduce((n, l) => n + (l.product.oldPrice ? (l.product.oldPrice - l.product.price) * l.qty : 0), 0);

  return (
    <div className="mx-auto max-w-site px-2 py-4 md:px-4">
      <Breadcrumbs items={[{ label: 'My Cart' }]} />
      <h1 className="mb-4 text-xl font-bold">
        My Cart <span className="text-base font-normal text-konga-muted">({count} item{count === 1 ? '' : 's'})</span>
      </h1>

      {lines.length === 0 ? (
        <div className="rounded bg-white p-10 text-center shadow-card">
          <p className="text-6xl">🛒</p>
          <p className="mt-3 text-lg font-bold">Your cart is empty</p>
          <p className="text-sm text-konga-muted">Browse our categories and discover our best deals!</p>
          <Link href="/" className="mt-5 inline-block rounded bg-konga px-6 py-3 text-sm font-bold text-white hover:bg-konga-dark">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded bg-white shadow-card">
            <div className="hidden grid-cols-[1fr_140px_120px] border-b border-konga-line px-4 py-3 text-xs font-bold uppercase text-konga-muted md:grid">
              <span>Item</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Item Total</span>
            </div>
            {lines.map(({ product: p, qty, slug }) => (
              <div key={slug} className="grid gap-3 border-b border-konga-line p-4 last:border-0 md:grid-cols-[1fr_140px_120px] md:items-center">
                <div className="flex gap-3">
                  <Link href={`/product/${slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded border border-konga-line">
                    <ProductImage product={p} size="sm" />
                  </Link>
                  <div className="min-w-0">
                    <Link href={`/product/${slug}`} className="line-clamp-2 text-sm hover:text-konga">
                      {p.name}
                    </Link>
                    <p className="mt-1 text-xs text-konga-muted">Seller: {p.seller}</p>
                    <p className="mt-1 text-sm font-bold">{naira(p.price)}</p>
                    <button
                      onClick={() => remove(slug)}
                      className="mt-1 flex items-center gap-1 text-xs font-semibold text-konga hover:underline"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-center">
                  <div className="flex items-center rounded border border-konga-line">
                    <button className="p-2 disabled:opacity-40" disabled={qty <= 1} onClick={() => setQty(slug, qty - 1)} aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span className="w-9 text-center text-sm font-bold">{qty}</span>
                    <button className="p-2 disabled:opacity-40" disabled={qty >= p.stock} onClick={() => setQty(slug, qty + 1)} aria-label="Increase">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold md:hidden">{naira(p.price * qty)}</span>
                </div>
                <span className="hidden text-right font-bold md:block">{naira(p.price * qty)}</span>
              </div>
            ))}
          </div>

          <aside className="self-start rounded bg-white p-4 shadow-card lg:sticky lg:top-40">
            <h2 className="mb-3 font-bold">Order Summary</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-konga-muted">Subtotal</dt>
                <dd className="font-semibold">{naira(subtotal)}</dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-konga-green">
                  <dt>You save</dt>
                  <dd className="font-semibold">-{naira(savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-konga-muted">Delivery</dt>
                <dd className="text-xs text-konga-muted">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="mt-3 flex justify-between border-t border-konga-line pt-3 text-base font-black">
              <span>Total</span>
              <span>{naira(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-4 block rounded bg-konga py-3 text-center text-sm font-bold text-white hover:bg-konga-dark"
            >
              Continue to Checkout
            </Link>
            <Link href="/" className="mt-2 block py-2 text-center text-sm font-semibold text-konga hover:underline">
              Continue Shopping
            </Link>
            <p className="mt-3 flex items-center gap-2 text-xs text-konga-muted">
              <ShieldCheck size={16} className="text-konga-green" /> Secure checkout with KongaPay
            </p>
          </aside>
        </div>
      )}

      <Section title="You May Also Like">
        <ProductRail products={withTag('top')} />
      </Section>
    </div>
  );
}
