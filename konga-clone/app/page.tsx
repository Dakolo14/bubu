import Link from 'next/link';
import { BadgeCheck, CreditCard, RotateCcw, Truck } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import Section from '@/components/Section';
import ProductRail from '@/components/ProductRail';
import ProductCard from '@/components/ProductCard';
import Countdown from '@/components/Countdown';
import { brands, categories, products, productsIn, quickLinks, withTag } from '@/lib/data';

const perks = [
  { icon: Truck, title: 'Nationwide Delivery', text: 'To all 36 states' },
  { icon: CreditCard, title: 'Pay on Delivery', text: 'In selected cities' },
  { icon: RotateCcw, title: 'Easy Returns', text: '7-day return policy' },
  { icon: BadgeCheck, title: 'Authentic Items', text: '100% genuine products' },
];

export default function Home() {
  const deals = withTag('deal');
  const top = withTag('top');
  const recommended = [...products].sort((a, b) => b.rating - a.rating).slice(0, 12);

  return (
    <div className="mx-auto max-w-site px-2 py-4 md:px-4">
      {/* Hero row */}
      <div className="grid gap-3 md:grid-cols-[1fr_280px]">
        <HeroCarousel />
        <div className="hidden grid-rows-2 gap-3 md:grid">
          <Link
            href="/category/home-and-kitchen"
            className="relative flex flex-col justify-center overflow-hidden rounded bg-gradient-to-br from-[#FFE9A8] to-[#FFB800] p-5"
          >
            <p className="text-xs font-bold uppercase text-konga-ink/70">Kitchen Essentials</p>
            <p className="text-xl font-black text-konga-ink">Air Fryers from ₦52,000</p>
            <span className="absolute -bottom-2 right-2 text-7xl">🍟</span>
          </Link>
          <Link
            href="/category/phones-and-tablets"
            className="relative flex flex-col justify-center overflow-hidden rounded bg-gradient-to-br from-konga-purple to-[#6B2BD9] p-5 text-white"
          >
            <p className="text-xs font-bold uppercase text-white/70">KongaPay</p>
            <p className="text-xl font-black">Extra 5% off with KongaPay</p>
            <span className="absolute -bottom-2 right-2 text-7xl">💳</span>
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto rounded bg-white p-3 shadow-card md:grid md:grid-cols-10">
        {quickLinks.map((q) => (
          <Link
            key={q.label}
            href={q.href}
            className="flex w-20 shrink-0 flex-col items-center gap-1.5 rounded p-2 text-center hover:bg-konga-light md:w-auto"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-konga-light text-2xl">{q.icon}</span>
            <span className="text-[11px] font-semibold leading-tight text-konga-ink">{q.label}</span>
          </Link>
        ))}
      </div>

      <Section title="Today's Deals" href="/deals" accent extra={<Countdown />}>
        <ProductRail products={deals} />
      </Section>

      {/* Top categories */}
      <Section title="Shop by Category">
        <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-4 md:grid-cols-7">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="group flex flex-col items-center gap-2 text-center">
              <span
                className="flex aspect-square w-full items-center justify-center rounded text-5xl transition group-hover:scale-[1.03]"
                style={{ background: `linear-gradient(135deg, ${c.tint[0]}, ${c.tint[1]})` }}
              >
                {c.icon}
              </span>
              <span className="text-xs font-semibold text-konga-ink group-hover:text-konga">{c.name}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Top Selling Items" href="/deals">
        <ProductRail products={top} />
      </Section>

      {/* Promo strip */}
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          { t: 'Phones & Tablets', s: 'Up to 30% off', href: '/category/phones-and-tablets', bg: 'from-[#FF8A00] to-[#ED017F]', i: '📱' },
          { t: 'Power Solutions', s: 'Generators & inverters', href: '/category/electronics', bg: 'from-[#00A86B] to-[#007A5E]', i: '🔋' },
          { t: 'Fashion Week', s: 'New arrivals daily', href: '/category/konga-fashion', bg: 'from-[#33058D] to-[#ED017F]', i: '👟' },
        ].map((b) => (
          <Link key={b.t} href={b.href} className={`relative overflow-hidden rounded bg-gradient-to-r ${b.bg} p-5 text-white`}>
            <p className="text-lg font-black">{b.t}</p>
            <p className="text-sm text-white/85">{b.s}</p>
            <span className="mt-3 inline-block rounded bg-white/20 px-3 py-1 text-xs font-bold">Shop Now →</span>
            <span className="absolute -right-1 bottom-0 text-7xl opacity-90">{b.i}</span>
          </Link>
        ))}
      </div>

      {categories.slice(0, 5).map((c) => (
        <Section key={c.slug} title={c.name} href={`/category/${c.slug}`}>
          <ProductRail products={productsIn(c.slug)} />
        </Section>
      ))}

      <Section title="Recommended For You">
        <div className="grid grid-cols-2 gap-1 bg-konga-bg/50 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {recommended.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      <Section title="Top Brands">
        <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-4 md:grid-cols-6">
          {brands.map((b) => (
            <Link
              key={b}
              href={`/search?q=${encodeURIComponent(b)}`}
              className="flex h-16 items-center justify-center rounded border border-konga-line text-sm font-black uppercase tracking-wide text-konga-ink hover:border-konga hover:text-konga"
            >
              {b}
            </Link>
          ))}
        </div>
      </Section>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded bg-white p-4 shadow-card md:grid-cols-4">
        {perks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="rounded-full bg-konga-light p-2.5 text-konga">
              <Icon size={20} />
            </span>
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs text-konga-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
