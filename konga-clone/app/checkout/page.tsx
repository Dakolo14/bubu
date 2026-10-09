'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import ProductImage from '@/components/ProductImage';
import { naira } from '@/lib/format';
import { newOrderId, newPaymentRef, saveOrder } from '@/lib/orders';

const states = ['Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Kano', 'Enugu', 'Delta', 'Ogun', 'Kaduna', 'Anambra'];
const payments = [
  { id: 'kongapay', label: 'KongaPay', note: 'Extra 5% off' },
  { id: 'card', label: 'Debit / Credit Card', note: 'Verve, Mastercard, Visa' },
  { id: 'transfer', label: 'Bank Transfer', note: 'Instant confirmation' },
  { id: 'pod', label: 'Pay on Delivery', note: 'Lagos & Abuja only' },
];

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [method, setMethod] = useState<'door' | 'pickup'>('door');
  const [payment, setPayment] = useState('kongapay');
  const router = useRouter();

  const delivery = method === 'pickup' || subtotal >= 50000 ? 0 : 2500;
  const promo = payment === 'kongapay' ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + delivery - promo;

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-3 text-xl font-bold">Your cart is empty</h1>
        <Link href="/" className="mt-5 inline-block rounded bg-konga px-6 py-3 text-sm font-bold text-white">
          Start Shopping
        </Link>
      </div>
    );
  }

  const input = 'w-full rounded border border-konga-line px-3 py-2.5 text-sm outline-none focus:border-konga';

  return (
    <div className="mx-auto max-w-site px-2 py-4 md:px-4">
      <h1 className="mb-4 text-xl font-bold">Checkout</h1>
      <form
        className="grid gap-4 lg:grid-cols-[1fr_340px]"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const get = (k: string) => String(f.get(k) ?? '').trim();
          const id = newOrderId();
          saveOrder({
            id,
            placedAt: new Date().toISOString(),
            customer: { name: `${get('first')} ${get('last')}`, phone: get('phone'), email: get('email') },
            address: [get('street'), get('city'), get('state')].filter(Boolean).join(', '),
            deliveryMethod: method === 'door' ? 'Door Delivery' : 'Pickup Station',
            paymentMethod: payments.find((p) => p.id === payment)!.label,
            paymentRef: newPaymentRef(),
            lines: lines.map((l) => ({ slug: l.slug, qty: l.qty, price: l.product.price, oldPrice: l.product.oldPrice })),
            shipping: delivery,
            discount: promo,
          });
          clear();
          router.push(`/order-success/${id}`);
        }}
      >
        <div className="space-y-4">
          <fieldset className="rounded bg-white p-5 shadow-card">
            <legend className="sr-only">Delivery address</legend>
            <h2 className="mb-4 font-bold">1. Delivery Address</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required name="first" className={input} placeholder="First name" />
              <input required name="last" className={input} placeholder="Last name" />
              <input required name="phone" type="tel" className={input} placeholder="Phone number" />
              <input required name="email" type="email" className={input} placeholder="Email address" />
              <input required name="street" className={`${input} sm:col-span-2`} placeholder="Street address" />
              <input required name="city" className={input} placeholder="City / Town" />
              <select required name="state" className={input} defaultValue="">
                <option value="" disabled>
                  Select state
                </option>
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="rounded bg-white p-5 shadow-card">
            <h2 className="mb-4 font-bold">2. Delivery Method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ['door', 'Door Delivery', subtotal >= 50000 ? 'Free' : naira(2500), '1 – 3 working days'],
                  ['pickup', 'Pickup Station', 'Free', 'Ready in 1 – 2 days'],
                ] as const
              ).map(([id, label, fee, eta]) => (
                <label
                  key={id}
                  className={`cursor-pointer rounded border p-3 text-sm ${method === id ? 'border-konga bg-konga-light' : 'border-konga-line'}`}
                >
                  <input type="radio" name="method" className="mr-2 accent-konga" checked={method === id} onChange={() => setMethod(id)} />
                  <strong>{label}</strong> · {fee}
                  <span className="block pl-5 text-xs text-konga-muted">{eta}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded bg-white p-5 shadow-card">
            <h2 className="mb-4 font-bold">3. Payment Method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {payments.map((p) => (
                <label
                  key={p.id}
                  className={`cursor-pointer rounded border p-3 text-sm ${payment === p.id ? 'border-konga bg-konga-light' : 'border-konga-line'}`}
                >
                  <input type="radio" name="payment" className="mr-2 accent-konga" checked={payment === p.id} onChange={() => setPayment(p.id)} />
                  <strong>{p.label}</strong>
                  <span className="block pl-5 text-xs text-konga-muted">{p.note}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="self-start rounded bg-white p-5 shadow-card lg:sticky lg:top-40">
          <h2 className="mb-3 font-bold">Order Summary</h2>
          <ul className="max-h-64 space-y-3 overflow-y-auto">
            {lines.map(({ product: p, qty, slug }) => (
              <li key={slug} className="flex gap-3 text-sm">
                <span className="h-12 w-12 shrink-0 overflow-hidden rounded border border-konga-line">
                  <ProductImage product={p} size="sm" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1">{p.name}</span>
                  <span className="text-xs text-konga-muted">Qty: {qty}</span>
                </span>
                <span className="font-semibold">{naira(p.price * qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-konga-line pt-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-konga-muted">Subtotal</dt>
              <dd>{naira(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-konga-muted">Delivery</dt>
              <dd>{delivery ? naira(delivery) : 'Free'}</dd>
            </div>
            {promo > 0 && (
              <div className="flex justify-between text-konga-green">
                <dt>KongaPay discount (5%)</dt>
                <dd>-{naira(promo)}</dd>
              </div>
            )}
          </dl>
          <div className="mt-3 flex justify-between border-t border-konga-line pt-3 text-lg font-black">
            <span>Total</span>
            <span>{naira(total)}</span>
          </div>
          <button type="submit" className="mt-4 w-full rounded bg-konga py-3 text-sm font-bold text-white hover:bg-konga-dark">
            Place Order
          </button>
        </aside>
      </form>
    </div>
  );
}
