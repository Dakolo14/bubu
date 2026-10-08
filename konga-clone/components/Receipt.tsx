'use client';

import { forwardRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Order, lineProduct, orderTotals } from '@/lib/orders';
import ProductImage from './ProductImage';

const MAGENTA = '#ED017F';

function money(n: number) {
  const [whole, kobo] = n.toFixed(2).split('.');
  return { whole: '₦' + Number(whole).toLocaleString('en-NG'), kobo };
}

function Amount({ value, className = '' }: { value: number; className?: string }) {
  const m = money(value);
  return (
    <span className={className}>
      {m.whole}.{m.kobo}
    </span>
  );
}

function Wordmark() {
  // Oversized wordmark in a lighter tint of the brand colour, after the Kuda receipt header
  return (
    <svg viewBox="0 0 1000 330" className="block w-full" aria-label="Konga">
      <circle cx="118" cy="168" r="96" fill="#F7941D" />
      <path d="M70 180 Q118 236 166 180" stroke={MAGENTA} strokeWidth="16" strokeLinecap="round" fill="none" />
      <text
        x="232"
        y="262"
        textLength="752"
        lengthAdjust="spacingAndGlyphs"
        fontSize="330"
        fontWeight="800"
        fill="#FFB3DA"
        style={{ fontFamily: 'var(--font-sans), Poppins, sans-serif', letterSpacing: '-0.04em' }}
      >
        konga
      </text>
    </svg>
  );
}

function Row({ label, value, sub }: { label: string; value: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[#F4DCE9] py-[14px] last:border-0">
      <span className="shrink-0 text-[14px] text-[#8A8590]">{label}</span>
      <span className="text-right">
        <span className="block text-[14px] font-medium text-[#1D1A1F]">{value}</span>
        {sub && <span className="mt-0.5 block text-[12px] text-[#8A8590]">{sub}</span>}
      </span>
    </div>
  );
}

type Props = { order: Order; gift?: boolean };

const Receipt = forwardRef<HTMLDivElement, Props>(function Receipt({ order, gift = false }, ref) {
  const [qr, setQr] = useState('');
  const t = orderTotals(order);
  const placed = new Date(order.placedAt);
  const verifyUrl = `https://www.konga.com/verify/${order.id}`;
  const firstName = order.customer.name.split(' ')[0];
  const referral = `${firstName.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8)}1K`;

  useEffect(() => {
    QRCode.toDataURL(verifyUrl, { margin: 0, width: 220, color: { dark: '#1D1A1F', light: '#FFFFFF' } })
      .then(setQr)
      .catch(() => setQr(''));
  }, [verifyUrl]);

  return (
    <div
      ref={ref}
      id="receipt"
      className="mx-auto w-full max-w-[720px] overflow-hidden text-white"
      style={{ background: MAGENTA, fontFamily: 'var(--font-sans), Poppins, sans-serif' }}
    >
      <div className="px-[6%] pt-[6%]">
        <Wordmark />
      </div>

      {/* Hero */}
      <div className="px-[6%] pb-7 pt-6 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/85">{gift ? 'Gift Receipt' : 'Order Receipt'}</p>
        <p className="mt-2 text-[32px] font-extrabold leading-tight sm:text-[44px]">
          {gift ? 'A gift for you 🎁' : `Thank you, ${firstName} 🛍️`}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] font-semibold">
          <span className="rounded-full bg-white px-3 py-1.5 text-[#0E8A4A]">✓ {gift ? `From ${firstName}` : `Paid · ${order.paymentMethod}`}</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5">Order #{order.id}</span>
        </div>
      </div>

      {/* Details card */}
      <div className="mx-[4%] rounded-2xl bg-[#FFF8FB] px-5 py-2 text-[#1D1A1F] sm:px-7">
        <Row label={gift ? 'Gifted By' : 'Customer'} value={order.customer.name} />
        <Row label="Delivery" value={order.deliveryMethod} sub={order.address} />
        <Row
          label="Ordered On"
          value={placed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' })}
          sub={placed.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' })}
        />

        {/* Items */}
        <div className="border-b border-[#F4DCE9] py-4">
          <p className="mb-3 text-[14px] text-[#8A8590]">Items ({t.items})</p>
          <ul className="space-y-3">
            {order.lines.map((l) => {
              const p = lineProduct(l);
              if (!p) return null;
              return (
                <li key={l.slug} className="flex items-center gap-3">
                  <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#F4DCE9] bg-white">
                    <ProductImage product={p} size="sm" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-[13px] font-medium leading-snug">{p.name}</span>
                    <span className="block text-[11px] text-[#8A8590]">
                      Qty {l.qty} · Sold by {p.seller}
                    </span>
                  </span>
                  {!gift && <Amount value={l.price * l.qty} className="shrink-0 text-[13px] font-semibold" />}
                </li>
              );
            })}
          </ul>
        </div>

        {!gift && (
          <div className="flex items-start justify-between gap-6 border-b border-[#F4DCE9] py-4">
            <span>
              <span className="block text-[14px] font-semibold">Total Paid</span>
              <span className="mt-0.5 block text-[11px] text-[#8A8590]">
                {order.paymentMethod} · {order.paymentRef}
              </span>
            </span>
            <span className="text-right">
              <Amount value={t.total} className="block text-[20px] font-extrabold leading-tight" />
              <span className="mt-0.5 block text-[11px] text-[#8A8590]">
                Incl. {order.shipping ? `${money(order.shipping).whole} shipping` : 'free shipping'} · {money(t.vat).whole} VAT
              </span>
              {t.savings > 0 && (
                <span className="mt-1 block text-[12px] font-semibold text-[#0E8A4A]">You saved {money(t.savings).whole} 🎉</span>
              )}
            </span>
          </div>
        )}

        {/* Verify */}
        <div className="flex items-center gap-4 py-4">
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt="Verification QR code" className="h-[84px] w-[84px] shrink-0 rounded-md bg-white p-1.5 ring-1 ring-[#F4DCE9]" />
          ) : (
            <span className="h-[84px] w-[84px] shrink-0 rounded-md bg-[#F4DCE9]" />
          )}
          <span className="text-[12px] leading-relaxed text-[#6E6874]">
            <span className="block text-[14px] font-semibold text-[#1D1A1F]">Scan to verify this receipt</span>
            {verifyUrl.replace('https://www.', '')}
            <br />
            Keep it as proof of purchase for warranty, returns and expense claims.
          </span>
        </div>
      </div>

      {/* Growth card */}
      <div className="mx-auto mt-6 flex w-[86%] max-w-[520px] items-center gap-4 rounded-xl bg-[#FFD9EC] px-4 py-3 text-[#3A0020]">
        <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#7A0042] text-[13px] font-black leading-[0.95] tracking-tight text-[#FFB3DA]">
          <span>KO</span>
          <span>NGA</span>
        </span>
        <span className="text-[13px] leading-snug">
          <strong className="block text-[14px]">Share Konga, earn ₦1,000.</strong>
          Friends get ₦1,000 off their first order with code <strong>{referral}</strong>.
        </span>
      </div>

      <p className="px-[6%] pb-8 pt-6 text-center text-[11px] leading-relaxed text-white/80">
        © {placed.getFullYear()} Konga Online Shopping Ltd. All rights reserved. Prices are VAT-inclusive.
        <br />
        Questions? help@konga.com · 0708 063 5700. Konga will never ask you to pay into a personal account.
      </p>
    </div>
  );
});

export default Receipt;
