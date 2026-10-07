'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

export default function ProductRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <div className="relative">
      <div ref={ref} className="no-scrollbar flex snap-x gap-1 overflow-x-auto scroll-smooth bg-konga-bg/50 p-2">
        {products.map((p) => (
          <div key={p.slug} className="w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[23%] lg:w-[16.2%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {[-1, 1].map((dir) => (
        <button
          key={dir}
          aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
          onClick={() => scroll(dir as 1 | -1)}
          className={`absolute top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 text-konga-ink shadow-lift hover:text-konga md:block ${
            dir < 0 ? 'left-1' : 'right-1'
          }`}
        >
          {dir < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      ))}
    </div>
  );
}
