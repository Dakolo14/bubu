'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Check, Download } from 'lucide-react';
import { demoOrder, loadOrder, Order } from '@/lib/orders';

export default function OrderSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrder(loadOrder(id) ?? (id === 'demo' ? demoOrder : null));
  }, [id]);

  const orderId = order?.id ?? id;
  const receiptUrl = `/receipt/${orderId}`;

  return (
    <div className="px-4 py-16">
      <div className="mx-auto w-full max-w-[448px] rounded-md border border-[#E5E7EB] bg-white px-8 py-9 text-center">
        <span className="mx-auto flex h-[50px] w-[50px] items-center justify-center rounded-full border-[3px] border-[#22C55E] text-[#22C55E]">
          <Check size={24} strokeWidth={3} />
        </span>
        <h1 className="mt-6 text-[24px] font-semibold text-[#1F2937]">Thank You for your Order!</h1>
        <p className="mt-2 text-[14px] text-[#4B5563]">
          Your order number is <strong className="font-semibold text-[#111827]">{orderId}</strong>
        </p>

        {/* Receipt entry point: a quiet text link under the order number */}
        <Link
          href={receiptUrl}
          className="mt-3.5 inline-flex items-center gap-1.5 px-0.5 py-1 text-[14px] font-medium text-konga hover:underline hover:underline-offset-4"
        >
          <Download size={15} /> Download Receipt
        </Link>

        <div className="mt-6 rounded-md border border-[#E5E7EB] px-6 py-5 text-left">
          <p className="text-[14px] font-semibold text-[#1F2937]">What happens next?</p>
          <ul className="mt-2 space-y-2 text-[14px] leading-relaxed text-[#4B5563]">
            {[
              'You will receive an order confirmation email shortly, with your receipt attached.',
              "We'll notify you when your order has been shipped.",
              "Track your order or download your receipt anytime from your account's order history.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#9CA3AF]" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-[auto_1fr] gap-2">
          <Link href="/cart" className="rounded-md border border-[#D1D5DB] px-8 py-3 text-[16px] font-medium text-[#111827] hover:bg-[#F9FAFB]">
            View Orders
          </Link>
          <Link href="/" className="rounded-md bg-konga px-6 py-3 text-[16px] font-medium text-white hover:bg-konga-dark">
            Continue Shopping
          </Link>
        </div>
        <p className="mt-6 text-[12px] text-[#6B7280]">
          Need help? <a href="#" className="text-konga hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
}
