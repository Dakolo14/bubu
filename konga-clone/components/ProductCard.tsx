'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/data';
import { discount, naira } from '@/lib/format';
import { useCart } from './CartProvider';
import ProductImage from './ProductImage';
import Stars from './Stars';
import { DiscountBadge, KongaNowBadge, OfficialStoreTag } from './Badges';

export type CardVariant = 'plain' | 'deal' | 'reviews';

export default function ProductCard({ product, variant = 'plain' }: { product: Product; variant?: CardVariant }) {
  const { wishlist, toggleWish } = useCart();
  const off = discount(product.price, product.oldPrice);
  const saved = wishlist.includes(product.slug);

  return (
    <div className="group flex h-full flex-col rounded-md bg-white p-2 transition-shadow hover:shadow-lift">
      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="aspect-square w-full overflow-hidden">
          <ProductImage product={product} />
        </div>
        <div className="absolute inset-x-0 top-1 flex items-start justify-between gap-1">
          {product.kongaNow ? <KongaNowBadge small /> : <span />}
          {off > 0 && <DiscountBadge off={off} />}
        </div>
        {product.official && (
          <div className="absolute bottom-0 left-0">
            <OfficialStoreTag />
          </div>
        )}
      </Link>

      <div className="mt-3 px-1">
        <Link href={`/product/${product.slug}`} className="block truncate text-[13px] text-konga-ink hover:text-konga" title={product.name}>
          {product.name}
        </Link>
        <div className="mt-1 flex items-start justify-between gap-1">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-tight text-[#222]">{naira(product.price)}</p>
            {product.oldPrice && <p className="mt-0.5 text-[11px] text-konga-muted line-through">{naira(product.oldPrice)}</p>}
          </div>
          <button
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            onClick={() => toggleWish(product.slug)}
            className="mt-0.5 shrink-0 p-0.5 text-[#9B9B9B] hover:text-konga"
          >
            <Heart size={19} strokeWidth={1.5} className={saved ? 'fill-konga text-konga' : ''} />
          </button>
        </div>

        {variant === 'deal' && (
          <div className="mt-2">
            <p className="text-[10px] text-konga-muted">{product.sold}% sold</p>
            <div className="mt-1 h-[5px] overflow-hidden rounded-full bg-[#9AA0A6]/60">
              <div className="h-full rounded-full bg-konga-green" style={{ width: `${product.sold}%` }} />
            </div>
          </div>
        )}

        {variant === 'reviews' && (
          <div className="mt-1.5 flex items-center gap-1">
            <Stars rating={product.rating} />
            <span className="text-[11px] text-[#666]">
              {product.reviews ? `(${product.reviews} review${product.reviews === 1 ? '' : 's'})` : '(No reviews)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
