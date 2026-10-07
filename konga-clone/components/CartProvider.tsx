'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, Product } from '@/lib/data';

type Line = { slug: string; qty: number };
type CartLine = Line & { product: Product };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  toast: string | null;
  wishlist: string[];
  toggleWish: (slug: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'konga-clone-cart';
const WISH_KEY = 'konga-clone-wishlist';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const wish = localStorage.getItem(WISH_KEY);
      if (wish) setWishlist(JSON.parse(wish));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [items, wishlist, loaded]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo<CartContextValue>(() => {
    const lines = items
      .map((l) => ({ ...l, product: getProduct(l.slug) }))
      .filter((l): l is CartLine => Boolean(l.product));
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      toast,
      wishlist,
      toggleWish: (slug) => {
        const saved = wishlist.includes(slug);
        setWishlist((prev) => (saved ? prev.filter((s) => s !== slug) : [...prev, slug]));
        setToast(saved ? 'Item removed from your wishlist' : 'Item saved to your wishlist');
      },
      add: (slug, qty = 1) => {
        setItems((prev) => {
          const found = prev.find((l) => l.slug === slug);
          if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { slug, qty }];
        });
        setToast('Item added to cart successfully');
      },
      setQty: (slug, qty) =>
        setItems((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l))),
      remove: (slug) => setItems((prev) => prev.filter((l) => l.slug !== slug)),
      clear: () => setItems([]),
    };
  }, [items, toast, wishlist]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed left-1/2 top-4 z-[60] -translate-x-1/2 rounded bg-[#1F9D55] px-5 py-3 text-[13px] font-medium text-white shadow-lift">
          ✓ {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
