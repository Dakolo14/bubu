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
| `/` | Home, laid out after the live konga.com: top promo banner, hero carousel with 4 side tiles, shortcut tiles, services strip, Today's Deals (with % sold bars), Now Trending, Freedom Sales banner, Sponsored Products, Same Day Delivery (KongaNow), brand-store banner, Best Selling Products, category rails, top brands, side ad panels on wide screens |
| `/category/[slug]` | Category listing with filters (Express, price, brand, rating), sort options and a mobile filter sheet |
| `/deals` | All deal items |
| `/search?q=` | Keyword search across name, brand and category |
| `/product/[slug]` | Product page: gallery, price and savings, quantity, Buy Now / Add To Cart, delivery and seller boxes, description/specs/reviews tabs, related items |
| `/cart` | Cart with quantity controls and order summary (saved in `localStorage`) |
| `/checkout` | Address, delivery method, payment method (KongaPay 5% off), order confirmation |
| `/receipt/[id]` | Branded order receipt (Image, A4 PDF, Share, Gift receipt). `/receipt/demo` shows a sample; checkout ends with **Download Receipt**. Proposal: `docs/konga-receipt-proposal.md` |
| `/login` | Login / sign-up tabs (demo only) |

The header has the Konga logo, Sell on Konga, Konga Outlets, the search bar with an orange button, Download App and Help dropdowns, and a cart badge. Below it, an All Categories flyout and a mega-menu per category; on mobile, a slide-out drawer. Cards show KongaNow, discount and Official Store badges and a wishlist heart. A chat widget, back-to-top button and Feedback tab float on every page.

## Where things live

- `lib/data.ts`: categories, mega-menu groups, products, hero slides, quick links and brands. Edit this to change the catalogue.
- `tailwind.config.js`: brand tokens (`konga` magenta `#ED017F`, `konga-orange` `#F7941D`, deal green, blush section headers, etc.). The font is Poppins.
- `components/`: Header, Footer, ProductCard, ProductRail, Listing (filters/sort), BuyBox, CartProvider, and others.

## Product images

Products currently show a drawn tile (category gradient + icon). To use real photos, set `image: 'https://...'` on a product in `lib/data.ts` and `ProductImage` will render it instead.
