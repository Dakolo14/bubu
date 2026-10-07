'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Menu,
  QrCode,
  Search,
  ShoppingCart,
  Store,
  Tag,
  User,
  X,
} from 'lucide-react';
import { useCart } from './CartProvider';
import { categories } from '@/lib/data';
import Logo from './Logo';

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
      className={`flex h-10 w-full overflow-hidden rounded-[4px] bg-white ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for products, brands and categories..."
        className="min-w-0 flex-1 px-3 text-[13px] text-konga-ink outline-none placeholder:text-[#9B9B9B]"
        aria-label="Search Konga"
      />
      <button type="submit" aria-label="Search" className="flex w-[54px] items-center justify-center bg-konga-orange text-white hover:brightness-95">
        <Search size={20} strokeWidth={2.2} />
      </button>
    </form>
  );
}

function Dropdown({ label, icon, items }: { label: string; icon: React.ReactNode; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1.5 py-2 text-[13px]" onClick={() => setOpen((v) => !v)}>
        {icon} {label} <ChevronDown size={14} className="opacity-80" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 w-52 rounded-md bg-white py-2 text-[13px] font-normal text-konga-ink shadow-lift">
          {items.map((l) => (
            <a key={l} href="#" className="block px-4 py-2 hover:bg-konga-blush hover:text-konga">
              {l}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { count } = useCart();
  const [drawer, setDrawer] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-konga text-white">
        <div className="mx-auto flex h-[58px] max-w-site items-center gap-3 px-3 lg:gap-5">
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setDrawer(true)}>
            <Menu size={24} />
          </button>
          <Link href="/" aria-label="Konga home" className="shrink-0 text-[28px]">
            <Logo />
          </Link>
          <nav className="hidden shrink-0 items-center gap-5 whitespace-nowrap text-[13px] xl:flex">
            <a href="#" className="flex items-center gap-1.5 hover:opacity-85">
              <Tag size={15} /> Sell on Konga
            </a>
            <a href="#" className="flex items-center gap-1.5 hover:opacity-85">
              <Store size={15} /> Konga Outlets
            </a>
          </nav>

          <Suspense fallback={<div className="hidden h-10 flex-1 rounded bg-white md:block" />}>
            <SearchBox className="hidden flex-1 md:flex" />
          </Suspense>

          <nav className="ml-auto flex shrink-0 items-center gap-4 whitespace-nowrap md:ml-0">
            <div className="hidden lg:block">
              <Dropdown
                label="Download App"
                icon={<QrCode size={15} />}
                items={['Download on the App Store', 'Get it on Google Play', 'Scan QR code']}
              />
            </div>
            <div className="hidden lg:block">
              <Dropdown
                label="Help"
                icon={<HelpCircle size={15} />}
                items={['Help Centre', 'Track My Order', 'Cancel an Order', 'Returns & Refunds', 'Payment Options', 'Contact Us']}
              />
            </div>
            <Link href="/login" className="flex items-center gap-1.5 text-[13px] hover:opacity-85">
              <User size={17} /> <span className="hidden sm:inline">Login / Signup</span>
            </Link>
            <Link href="/cart" className="relative pr-1" aria-label={`Cart, ${count} items`}>
              <ShoppingCart size={28} strokeWidth={1.8} />
              <span className="absolute -right-1 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-konga-green px-1 text-[11px] font-semibold leading-none">
                {count}
              </span>
            </Link>
          </nav>
        </div>
        <div className="px-3 pb-3 md:hidden">
          <Suspense fallback={<div className="h-10 rounded bg-white" />}>
            <SearchBox />
          </Suspense>
        </div>
      </div>

      <CategoryNav />

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <aside className="absolute left-0 top-0 h-full w-[82%] max-w-xs overflow-y-auto bg-white">
            <div className="flex items-center justify-between bg-konga px-4 py-3 text-[26px]">
              <Logo />
              <button className="text-white" aria-label="Close menu" onClick={() => setDrawer(false)}>
                <X size={22} />
              </button>
            </div>
            <p className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-konga-muted">All Categories</p>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                onClick={() => setDrawer(false)}
                className="flex items-center gap-3 border-b border-konga-line px-4 py-3 text-[13px] text-konga-ink"
              >
                <span className="text-lg">{c.icon}</span> {c.name}
              </Link>
            ))}
            <p className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-konga-muted">Konga</p>
            {['Sell on Konga', 'Konga Outlets', 'Download App', 'Help Centre'].map((l) => (
              <a key={l} href="#" className="block px-4 py-2 text-[13px] text-konga-ink">
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
  const [allOpen, setAllOpen] = useState(false);
  const [allActive, setAllActive] = useState(categories[0].slug);
  const navCats = categories.filter((c) => c.inNav);
  const active = categories.find((c) => c.slug === open);
  const allCat = categories.find((c) => c.slug === allActive)!;

  const close = () => {
    setOpen(null);
    setAllOpen(false);
  };

  return (
    <div className="relative hidden border-b border-konga-line bg-white lg:block" onMouseLeave={close}>
      <nav className="mx-auto flex h-[50px] max-w-site items-center justify-between gap-3 px-3">
        <button
          onMouseEnter={() => {
            setAllOpen(true);
            setOpen(null);
          }}
          onClick={() => setAllOpen((v) => !v)}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] font-medium ${
            allOpen ? 'bg-konga-blush text-konga' : 'bg-[#F2F2F2] text-konga-ink'
          }`}
        >
          <Menu size={16} /> All Categories
        </button>
        {navCats.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            onMouseEnter={() => {
              setOpen(c.slug);
              setAllOpen(false);
            }}
            onClick={close}
            className={`py-3 text-[13px] font-medium transition-colors ${open === c.slug ? 'text-konga' : 'text-konga-ink hover:text-konga'}`}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      {allOpen && (
        <div className="absolute left-1/2 top-full w-full max-w-site -translate-x-1/2">
          <div className="flex w-[760px] overflow-hidden rounded-b-md bg-white shadow-lift">
            <ul className="w-[270px] border-r border-konga-line py-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    onMouseEnter={() => setAllActive(c.slug)}
                    onClick={close}
                    className={`flex items-center justify-between px-4 py-2.5 text-[13px] ${
                      allActive === c.slug ? 'bg-konga-blush text-konga' : 'text-konga-ink'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{c.icon}</span> {c.name}
                    </span>
                    <ChevronRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid flex-1 grid-cols-2 gap-5 p-5">
              {allCat.subcategories.map((s) => (
                <div key={s.title}>
                  <h4 className="mb-2 text-[13px] font-semibold text-konga-ink">{s.title}</h4>
                  <ul className="space-y-1.5">
                    {s.items.map((i) => (
                      <li key={i}>
                        <Link href={`/category/${allCat.slug}`} onClick={close} className="text-[12px] text-[#666] hover:text-konga">
                          {i}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active && (
        <div className="absolute inset-x-0 top-full border-t border-konga-line bg-white shadow-lift">
          <div className="mx-auto grid max-w-site grid-cols-5 gap-6 px-3 py-6">
            {active.subcategories.map((s) => (
              <div key={s.title}>
                <h4 className="mb-2 text-[13px] font-semibold text-konga-ink">{s.title}</h4>
                <ul className="space-y-1.5">
                  {s.items.map((i) => (
                    <li key={i}>
                      <Link href={`/category/${active.slug}`} onClick={close} className="text-[12px] text-[#666] hover:text-konga">
                        {i}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href={`/category/${active.slug}`}
              onClick={close}
              className="col-start-5 row-start-1 flex flex-col justify-end rounded-md p-4 text-konga-ink"
              style={{ background: `linear-gradient(135deg, ${active.tint[0]}, ${active.tint[1]})` }}
            >
              <span className="text-5xl">{active.icon}</span>
              <span className="mt-3 text-[13px] font-semibold">Shop all {active.name}</span>
              <span className="text-xs text-konga">View all →</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
