'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Heart, Minus, Plus, Share2 } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from './CartProvider';

export default function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Quantity:</span>
        <div className="flex items-center rounded border border-konga-line">
          <button className="p-2 disabled:opacity-40" aria-label="Decrease" disabled={qty <= 1} onClick={() => setQty(qty - 1)}>
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-bold">{qty}</span>
          <button
            className="p-2 disabled:opacity-40"
            aria-label="Increase"
            disabled={qty >= product.stock}
            onClick={() => setQty(qty + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
        <span className={`text-xs ${product.stock < 10 ? 'font-semibold text-konga' : 'text-konga-muted'}`}>
          {product.stock < 10 ? `Only ${product.stock} units left!` : 'In stock'}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          className="flex-1 rounded bg-konga-purple py-3 text-sm font-bold text-white hover:bg-[#25036a]"
          onClick={() => {
            add(product.slug, qty);
            router.push('/cart');
          }}
        >
          Buy Now
        </button>
        <button
          className="flex-1 rounded bg-konga py-3 text-sm font-bold text-white hover:bg-konga-dark"
          onClick={() => add(product.slug, qty)}
        >
          Add To Cart
        </button>
      </div>

      <div className="flex gap-5 text-sm text-konga-muted">
        <button className="flex items-center gap-1.5 hover:text-konga" onClick={() => setSaved(!saved)}>
          <Heart size={16} className={saved ? 'fill-konga text-konga' : ''} /> {saved ? 'Saved' : 'Save for later'}
        </button>
        <button className="flex items-center gap-1.5 hover:text-konga">
          <Share2 size={16} /> Share
        </button>
      </div>
    </div>
  );
}
