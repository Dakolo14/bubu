'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/data';
import ProductCard, { CardVariant } from './ProductCard';

export function RailArrows({ onScroll, top = '38%' }: { onScroll: (dir: 1 | -1) => void; top?: string }) {
  return (
    <>
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
          onClick={() => onScroll(dir)}
          style={{ top }}
          className={`absolute z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#4A4A4A]/90 text-white shadow-md hover:bg-[#2E2E2E] md:flex ${
            dir < 0 ? 'left-2' : 'right-2'
          }`}
        >
          {dir < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      ))}
    </>
  );
}

export default function ProductRail({ products, variant = 'plain' }: { products: Product[]; variant?: CardVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: 'smooth' });

  return (
    <div className="relative px-1 py-3 md:px-3">
      <div ref={ref} className="no-scrollbar flex snap-x gap-1 overflow-x-auto scroll-smooth">
        {products.map((p) => (
          <div key={p.slug} className="w-[45%] shrink-0 snap-start sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[calc((100%-24px)/7)]">
            <ProductCard product={p} variant={variant} />
          </div>
        ))}
      </div>
      <RailArrows onScroll={scroll} />
    </div>
  );
}

export function ProductGrid({ products, variant = 'plain' }: { products: Product[]; variant?: CardVariant }) {
  return (
    <div className="grid grid-cols-2 gap-1 px-1 py-3 sm:grid-cols-3 md:grid-cols-4 md:px-3 lg:grid-cols-5 xl:grid-cols-7">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} variant={variant} />
      ))}
    </div>
  );
}
