'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { quickTiles } from '@/lib/data';

export default function QuickTiles() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <div className="relative mt-4 rounded-md bg-white px-2 py-3 md:px-6 md:py-4">
      <div ref={ref} className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth md:gap-4">
        {quickTiles.map((t) => (
          <Link key={t.label} href={t.href} className="group w-[84px] shrink-0 text-center md:w-[117px]">
            <div
              className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-md border border-[#EEE] transition group-hover:-translate-y-0.5 group-hover:shadow-lift"
              style={{ background: t.bg }}
            >
              {t.text ? (
                <>
                  <span className="whitespace-pre text-center text-[15px] font-extrabold italic leading-[0.95] md:text-[22px]" style={{ color: t.color }}>
                    {t.text}
                  </span>
                  <span className="absolute bottom-1 right-1 text-xl md:text-2xl">{t.art}</span>
                </>
              ) : (
                <span className="text-[40px] drop-shadow-lg md:text-[58px]">{t.art}</span>
              )}
            </div>
            <p className="mt-2 text-[11px] leading-tight text-[#555] md:text-[14px]">{t.label}</p>
          </Link>
        ))}
      </div>
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
          onClick={() => scroll(dir)}
          className={`absolute top-[42%] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#9E9E9E] text-white shadow md:flex ${
            dir < 0 ? '-left-0 ml-0.5' : '-right-0 mr-0.5'
          }`}
        >
          {dir < 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      ))}
    </div>
  );
}
