import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import HeroTiles from '@/components/HeroTiles';
import QuickTiles from '@/components/QuickTiles';
import ServicesStrip from '@/components/ServicesStrip';
import SideSkins from '@/components/SideSkins';
import Section from '@/components/Section';
import ProductRail, { ProductGrid } from '@/components/ProductRail';
import ProductImage from '@/components/ProductImage';
import Logo from '@/components/Logo';
import { brands, categories, kongaNowProducts, productsIn, withTag } from '@/lib/data';
import { discount } from '@/lib/format';

export default function Home() {
  const deals = withTag('deal');
  const trending = withTag('trending');
  const sponsored = withTag('sponsored');
  const best = withTag('best');
  const adThumbs = productsIn('computers-and-accessories').slice(0, 8);

  return (
    <>
      <SideSkins />
      <div className="relative mx-auto max-w-site px-2 py-4 md:px-3 min-[1340px]:px-0">
        {/* Hero row */}
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_448px]">
          <HeroCarousel />
          <div className="hidden lg:block">
            <HeroTiles />
          </div>
        </div>

        <QuickTiles />
        <ServicesStrip />

        <Section title="Today's Deals - Unbeatable Price" href="/deals" tone="magenta">
          <ProductRail products={deals} variant="deal" />
        </Section>

        <Section title="Now Trending:" subtitle="Buy Them" tone="green">
          <ProductGrid products={trending} />
        </Section>

        {/* Display ad strip */}
        <div className="mx-auto mt-5 hidden max-w-[1010px] items-center gap-1 rounded bg-white p-1 md:flex">
          {adThumbs.map((p) => {
            const off = discount(p.price, p.oldPrice);
            return (
              <Link key={p.slug} href={`/product/${p.slug}`} className="relative h-[88px] w-[96px] shrink-0 border border-[#EEE]">
                <ProductImage product={p} size="sm" />
                {off > 0 && (
                  <span className="absolute left-0.5 top-0.5 rounded-sm border border-[#4285F4] bg-white px-0.5 text-[10px] text-[#4285F4]">
                    -{off}%
                  </span>
                )}
              </Link>
            );
          })}
          <div className="flex flex-1 items-center gap-3 px-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-konga-orange text-2xl">🙂</span>
            <div>
              <p className="text-[14px] text-[#333]">Buy Online From Konga</p>
              <p className="mt-2 text-[10px] text-konga-muted">Konga</p>
            </div>
          </div>
        </div>

        {/* Freedom sales banner */}
        <Link
          href="/deals"
          className="relative mt-5 flex h-[110px] items-center overflow-hidden rounded-md md:h-[135px]"
          style={{ background: 'linear-gradient(100deg,#D9FBEA 0%,#E9FFF5 48%,#0E2F22 48.2%,#08170F 100%)' }}
        >
          <p
            className="pl-4 text-[30px] font-black uppercase italic tracking-tight md:pl-14 md:text-[64px]"
            style={{ color: '#7BE13B', WebkitTextStroke: '2px #1B6B12', textShadow: '0 4px 0 #0E4A08' }}
          >
            Freedom Sales
          </p>
          <span className="absolute left-[46%] top-1/2 hidden h-[104px] w-[104px] -translate-y-1/2 -rotate-12 flex-col items-center justify-center rounded-full bg-[#22A447] text-white shadow-lg md:flex">
            <span className="text-[11px] font-semibold">UP TO</span>
            <span className="text-[30px] font-black leading-none">66%</span>
            <span className="text-[13px] font-bold">OFF</span>
          </span>
          <span className="ml-auto hidden gap-4 text-[64px] md:flex">
            <span>🧊</span>
            <span>📺</span>
            <span>🥤</span>
          </span>
          <span className="ml-auto mr-4 rounded-full bg-konga px-4 py-2 text-[13px] font-semibold text-white md:ml-10 md:mr-10 md:px-6 md:py-2.5 md:text-[16px]">
            Shop Now
          </span>
        </Link>

        <Section title="Sponsored Products">
          <ProductRail products={sponsored} />
        </Section>

        <Section title="Same Day Delivery (KongaNow)" href="/search?q=konganow" terms>
          <ProductRail products={kongaNowProducts()} variant="reviews" />
        </Section>

        {/* Official store banner */}
        <Link href="/search?q=official" className="mt-5 flex h-[100px] overflow-hidden rounded-md bg-white md:h-[128px]">
          <div className="flex items-center gap-3 px-4 md:gap-4 md:px-8">
            <span className="text-[28px] md:text-[34px]">
              <Logo dark />
            </span>
            <span className="h-9 w-[2px] bg-[#222]" />
            <span className="text-[16px] font-bold uppercase tracking-[0.12em] text-[#1428A0] md:text-[24px]">Brand Stores</span>
          </div>
          <div className="hidden items-center lg:flex">
            <span className="bg-[#F7A21B] px-6 py-2 text-[28px] text-[#1B1B1B]">
              Explore the <strong>Official Stores</strong>
            </span>
          </div>
          <div
            className="ml-auto flex flex-1 items-center justify-end gap-4 pr-4 md:pr-8"
            style={{ background: 'linear-gradient(105deg, transparent 0 10%, #1565C0 10.2%)' }}
          >
            <span className="hidden gap-3 text-[48px] md:flex">
              <span>📱</span>
              <span>📺</span>
              <span>💻</span>
            </span>
            <span className="rounded-full bg-konga px-4 py-2 text-[13px] font-semibold text-white md:px-6 md:py-2.5 md:text-[17px]">Shop Now</span>
          </div>
        </Link>

        <Section title="Best Selling Products" tone="magenta">
          <ProductGrid products={best} />
        </Section>

        {categories
          .filter((c) => c.inNav)
          .slice(0, 4)
          .map((c) => (
            <Section key={c.slug} title={c.name} href={`/category/${c.slug}`}>
              <ProductRail products={productsIn(c.slug)} />
            </Section>
          ))}

        <Section title="Top Brands">
          <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-4 md:grid-cols-6">
            {brands.map((b) => (
              <Link
                key={b}
                href={`/search?q=${encodeURIComponent(b)}`}
                className="flex h-16 items-center justify-center rounded-md border border-konga-line text-[14px] font-bold uppercase tracking-wide text-konga-ink hover:border-konga hover:text-konga"
              >
                {b}
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
