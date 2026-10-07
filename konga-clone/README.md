# Konga Clone

A Konga.com-style storefront built with Next.js 14 (App Router), TypeScript and Tailwind CSS. It's one of the Yakata Ideas projects and runs separately from the Valentine page at the repo root.

## Run it

```bash
cd konga-clone
npm install
npm run dev      # http://localhost:3001
```

## What's included

| Route | What it is |
| --- | --- |
| `/` | Home: hero carousel, side banners, quick links, Today's Deals with a midnight countdown, category tiles, top sellers, per-category rails, recommendations, top brands |
| `/category/[slug]` | Category listing with filters (Express, price, brand, rating), sort options and a mobile filter sheet |
| `/deals` | All deal items |
| `/search?q=` | Keyword search across name, brand and category |
| `/product/[slug]` | Product page: gallery, price and savings, quantity, Buy Now / Add To Cart, delivery and seller boxes, description/specs/reviews tabs, related items |
| `/cart` | Cart with quantity controls and order summary (saved in `localStorage`) |
| `/checkout` | Address, delivery method, payment method (KongaPay 5% off), order confirmation |
| `/login` | Login / sign-up tabs (demo only) |

The header has the Konga utility strip, magenta search bar, Help dropdown, cart badge, a mega-menu on hover per category, and a slide-out drawer on mobile.

## Where things live

- `lib/data.ts`: categories, mega-menu groups, products, hero slides, quick links and brands. Edit this to change the catalogue.
- `tailwind.config.js`: brand tokens (`konga` magenta `#ED017F`, `konga-purple` `#33058D`, etc.).
- `components/`: Header, Footer, ProductCard, ProductRail, Listing (filters/sort), BuyBox, CartProvider, and others.

## Product images

Products currently show a drawn tile (category gradient + icon). To use real photos, set `image: 'https://...'` on a product in `lib/data.ts` and `ProductImage` will render it instead.
