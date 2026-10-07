'use client';

import Link from 'next/link';
import { Truck } from 'lucide-react';
import { Product } from '@/lib/data';
import { discount, naira } from '@/lib/format';
import { useCart } from './CartProvider';
import ProductImage from './ProductImage';
import Stars from './Stars';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const off = discount(product.price, product.oldPrice);

  return (
    <div className="group relative flex h-full flex-col rounded bg-white p-3 transition-shadow hover:shadow-lift">
      {off > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-konga-light px-1.5 py-0.5 text-[11px] font-bold text-konga">
          -{off}%
        </span>
      )}
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="aspect-square w-full overflow-hidden rounded">
          <ProductImage product={product} />
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] text-[13px] leading-5 text-konga-ink group-hover:text-konga">
          {product.name}
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="text-[15px] font-bold text-konga-ink">{naira(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-konga-muted line-through">{naira(product.oldPrice)}</span>}
        </div>
        {off > 0 && (
          <span className="text-[11px] font-semibold text-konga-green">
            You save {naira(product.oldPrice! - product.price)}
          </span>
        )}
        <div className="mt-1 flex items-center justify-between">
          <Stars rating={product.rating} reviews={product.reviews} />
          {product.express && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold italic text-konga-purple">
              <Truck size={12} /> Express
            </span>
          )}
        </div>
      </Link>
      <button
        onClick={() => add(product.slug)}
        className="mt-3 w-full rounded bg-konga py-2 text-[13px] font-semibold text-white transition md:opacity-0 md:group-hover:opacity-100 hover:bg-konga-dark focus:opacity-100"
      >
        Add To Cart
      </button>
    </div>
  );
}
