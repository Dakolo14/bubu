'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/lib/data';

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setIndex((n + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="group relative h-[180px] overflow-hidden rounded sm:h-[260px] md:h-[340px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {heroSlides.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="relative flex h-full w-full shrink-0 items-center overflow-hidden px-6 md:px-12"
            style={{ background: `linear-gradient(120deg, ${s.from}, ${s.to})` }}
          >
            <div className="absolute -right-10 -top-16 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 right-40 h-60 w-60 rounded-full bg-white/10" />
            <div className="relative z-10 max-w-[60%] text-white">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 md:text-xs">Only on Konga</p>
              <h2 className="text-2xl font-black leading-tight sm:text-3xl md:text-5xl">{s.title}</h2>
              <p className="mt-2 text-sm text-white/90 md:text-lg">{s.subtitle}</p>
              <span className="mt-4 inline-block rounded bg-white px-5 py-2 text-sm font-bold text-konga-ink shadow-lift md:mt-6">
                {s.cta}
              </span>
            </div>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[90px] drop-shadow-2xl sm:text-[140px] md:right-16 md:text-[200px]">
              {s.art}
            </span>
          </Link>
        ))}
      </div>

      {[-1, 1].map((d) => (
        <button
          key={d}
          aria-label={d < 0 ? 'Previous slide' : 'Next slide'}
          onClick={() => go(index + d)}
          className={`absolute top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-konga-ink opacity-0 shadow transition group-hover:opacity-100 md:block ${
            d < 0 ? 'left-3' : 'right-3'
          }`}
        >
          {d < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      ))}

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
