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
      className="group relative aspect-[2/1] overflow-hidden rounded-md bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {heroSlides.map((s) => (
          <Link key={s.title} href={s.href} className="relative flex h-full w-full shrink-0" style={{ background: s.bg }}>
            <div className="relative z-10 flex w-[56%] flex-col justify-center pl-[5%] pr-[2%]">
              <p className="text-[10px] font-bold tracking-[0.25em] sm:text-xs" style={{ color: s.ink }}>
                {s.kicker}
              </p>
              <h2 className="mt-1 text-[20px] font-extrabold uppercase leading-[1.05] sm:text-[32px] lg:text-[40px] xl:text-[46px]" style={{ color: s.ink }}>
                {s.title}
              </h2>
              <p className="mt-2 hidden max-w-[90%] text-sm text-[#333] sm:block lg:text-base">{s.subtitle}</p>
              <span className="mt-3 inline-block w-fit rounded-full bg-konga px-4 py-1.5 text-xs font-semibold text-white sm:mt-5 sm:px-6 sm:py-2.5 sm:text-sm">
                {s.cta}
              </span>
            </div>
            <div className="relative flex w-[44%] items-center justify-center">
              <div className="absolute h-[70%] w-[70%] rounded-full bg-white/15" />
              <span className="relative text-[64px] drop-shadow-2xl sm:text-[110px] lg:text-[150px]">{s.art[0]}</span>
              <span className="absolute bottom-[12%] left-[8%] text-[32px] drop-shadow-xl sm:text-[56px] lg:text-[72px]">{s.art[1]}</span>
              <span className="absolute right-[8%] top-[12%] text-[28px] drop-shadow-xl sm:text-[48px] lg:text-[64px]">{s.art[2]}</span>
            </div>
          </Link>
        ))}
      </div>

      {([-1, 1] as const).map((d) => (
        <button
          key={d}
          aria-label={d < 0 ? 'Previous slide' : 'Next slide'}
          onClick={() => go(index + d)}
          className={`absolute top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-konga-ink opacity-0 shadow transition group-hover:opacity-100 md:flex ${
            d < 0 ? 'left-3' : 'right-3'
          }`}
        >
          {d < 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      ))}

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {heroSlides.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-[6px] rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-3 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
