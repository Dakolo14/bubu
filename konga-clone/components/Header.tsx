'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ChevronDown, HelpCircle, MapPin, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useCart } from './CartProvider';
import { categories } from '@/lib/data';
import Logo from './Logo';

const topLinks = ['Konga Mall', 'KongaPay', 'Konga Health', 'Konga Travel', 'Konga Business', 'Sell on Konga'];

function SearchBox({ className = '' }: { className?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');

  useEffect(() => {
    setQ(params.get('q') ?? '');
  }, [params]);

  return (
    <form
      role="search"
      className={`flex h-10 w-full overflow-hidden rounded bg-white ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for products, brands and categories..."
        className="min-w-0 flex-1 px-3 text-sm text-konga-ink outline-none placeholder:text-konga-muted"
        aria-label="Search Konga"
      />
      <button
        type="submit"
        className="flex items-center gap-1 bg-konga-purple px-4 text-sm font-semibold text-white hover:bg-[#25036a]"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}

export default function Header() {
  const { count } = useCart();
  const [drawer, setDrawer] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-card">
      {/* Utility strip */}
      <div className="hidden bg-konga-purple text-[12px] text-white/90 md:block">
        <div className="mx-auto flex h-8 max-w-site items-center justify-between px-4">
          <nav className="flex gap-5">
            {topLinks.map((l) => (
              <a key={l} href="#" className="hover:text-white hover:underline">
                {l}
              </a>
            ))}
          </nav>
          <span>
            Free delivery on orders above <strong className="text-white">₦50,000</strong> in Lagos &amp; Abuja
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-konga">
        <div className="mx-auto flex max-w-site items-center gap-3 px-4 py-3 md:gap-6">
          <button className="text-white md:hidden" aria-label="Open menu" onClick={() => setDrawer(true)}>
            <Menu size={24} />
          </button>
          <Link href="/" aria-label="Konga home" className="shrink-0">
            <Logo />
          </Link>

          <Suspense fallback={<div className="hidden h-10 flex-1 rounded bg-white md:block" />}>
            <SearchBox className="hidden md:flex" />
          </Suspense>

          <nav className="ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-white md:gap-2">
            <a href="#" className="hidden items-center gap-1 rounded px-2 py-2 hover:bg-white/10 lg:flex">
              <MapPin size={18} /> Store Locator
            </a>
            <div className="relative hidden lg:block" onMouseLeave={() => setHelpOpen(false)}>
              <button
                className="flex items-center gap-1 rounded px-2 py-2 hover:bg-white/10"
                onMouseEnter={() => setHelpOpen(true)}
                onClick={() => setHelpOpen((v) => !v)}
              >
                <HelpCircle size={18} /> Help <ChevronDown size={14} />
              </button>
              {helpOpen && (
                <div className="absolute right-0 top-full w-52 rounded bg-white py-2 text-sm font-normal text-konga-ink shadow-lift">
                  {['Help Centre', 'Track My Order', 'Cancel an Order', 'Returns & Refunds', 'Payment Options', 'Contact Us'].map(
                    (l) => (
                      <a key={l} href="#" className="block px-4 py-2 hover:bg-konga-light hover:text-konga">
                        {l}
                      </a>
                    ),
                  )}
                </div>
              )}
            </div>
            <Link href="/login" className="flex items-center gap-1 rounded px-2 py-2 hover:bg-white/10">
              <User size={18} /> <span className="hidden sm:inline">Login / Signup</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded bg-white/10 px-3 py-2 hover:bg-white/20"
              aria-label={`My cart, ${count} items`}
            >
              <span className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-konga-orange px-1 text-[11px] leading-none">
                  {count}
                </span>
              </span>
              <span className="hidden sm:inline">My Cart</span>
            </Link>
          </nav>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <Suspense fallback={<div className="h-10 rounded bg-white" />}>
            <SearchBox />
          </Suspense>
        </div>
      </div>

      <CategoryNav />

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <aside className="absolute left-0 top-0 h-full w-[82%] max-w-xs overflow-y-auto bg-white">
            <div className="flex items-center justify-between bg-konga px-4 py-3">
              <Logo />
              <button className="text-white" aria-label="Close menu" onClick={() => setDrawer(false)}>
                <X size={22} />
              </button>
            </div>
            <p className="px-4 pb-2 pt-4 text-xs font-bold uppercase tracking-wide text-konga-muted">Categories</p>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                onClick={() => setDrawer(false)}
                className="flex items-center gap-3 border-b border-konga-line px-4 py-3 text-sm text-konga-ink"
              >
                <span className="text-lg">{c.icon}</span> {c.name}
              </Link>
            ))}
            <p className="px-4 pb-2 pt-4 text-xs font-bold uppercase tracking-wide text-konga-muted">Konga Services</p>
            {topLinks.map((l) => (
              <a key={l} href="#" className="block px-4 py-2 text-sm text-konga-ink">
                {l}
              </a>
            ))}
          </aside>
        </div>
      )}
    </header>
  );
}

function CategoryNav() {
  const [open, setOpen] = useState<string | null>(null);
  const active = categories.find((c) => c.slug === open);

  return (
    <div className="relative hidden border-b border-konga-line bg-white md:block" onMouseLeave={() => setOpen(null)}>
      <nav className="mx-auto flex max-w-site items-stretch justify-between px-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            onMouseEnter={() => setOpen(c.slug)}
            onClick={() => setOpen(null)}
            className={`border-b-2 px-1 py-3 text-[13px] font-semibold transition-colors lg:px-2 ${
              open === c.slug ? 'border-konga text-konga' : 'border-transparent text-konga-ink hover:text-konga'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </nav>
      {active && (
        <div className="absolute inset-x-0 top-full border-t border-konga-line bg-white shadow-lift">
          <div className="mx-auto grid max-w-site grid-cols-5 gap-6 px-4 py-6">
            {active.subcategories.map((s) => (
              <div key={s.title}>
                <h4 className="mb-2 text-sm font-bold text-konga-ink">{s.title}</h4>
                <ul className="space-y-1.5">
                  {s.items.map((i) => (
                    <li key={i}>
                      <Link
                        href={`/category/${active.slug}`}
                        onClick={() => setOpen(null)}
                        className="text-[13px] text-konga-muted hover:text-konga"
                      >
                        {i}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href={`/category/${active.slug}`}
              onClick={() => setOpen(null)}
              className="col-start-5 row-start-1 flex flex-col justify-end rounded p-4 text-konga-ink"
              style={{ background: `linear-gradient(135deg, ${active.tint[0]}, ${active.tint[1]})` }}
            >
              <span className="text-5xl">{active.icon}</span>
              <span className="mt-3 text-sm font-bold">Shop all {active.name}</span>
              <span className="text-xs text-konga">View all →</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
