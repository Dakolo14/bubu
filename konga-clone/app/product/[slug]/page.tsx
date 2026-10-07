import { notFound } from 'next/navigation';
import { BadgeCheck, MapPin, RotateCcw, Store, Truck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import BuyBox from '@/components/BuyBox';
import ProductImage from '@/components/ProductImage';
import ProductRail from '@/components/ProductRail';
import ProductTabs from '@/components/ProductTabs';
import Section from '@/components/Section';
import Stars from '@/components/Stars';
import { KongaNowBadge, OfficialStoreTag } from '@/components/Badges';
import { getCategory, getProduct, products, productsIn } from '@/lib/data';
import { discount, naira } from '@/lib/format';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  return { title: p ? `${p.name} | Konga Clone` : 'Product not found' };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const off = discount(product.price, product.oldPrice);
  const related = productsIn(product.category).filter((p) => p.slug !== product.slug);

  return (
    <div className="mx-auto max-w-site px-2 py-4 md:px-4">
      <Breadcrumbs items={[{ label: category.name, href: `/category/${category.slug}` }, { label: product.name }]} />

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-6 rounded bg-white p-4 shadow-card md:grid-cols-[minmax(0,420px)_1fr]">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded border border-konga-line">
              {off > 0 && (
                <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-konga-deal px-2 py-1 text-xs font-medium text-white">-{off}%</span>
              )}
              <ProductImage product={product} size="lg" />
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden rounded border ${i === 0 ? 'border-konga' : 'border-konga-line'}`}
                  style={{ filter: i ? `hue-rotate(${i * 12}deg)` : undefined }}
                >
                  <ProductImage product={product} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-xl font-bold leading-snug md:text-2xl">{product.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-konga-muted">
              <span>
                Brand: <a className="font-semibold text-konga hover:underline" href={`/search?q=${encodeURIComponent(product.brand)}`}>{product.brand}</a>
              </span>
              <span className="h-3 w-px bg-konga-line" />
              <Stars rating={product.rating} reviews={product.reviews} />
            </div>

            <div className="mt-4 border-y border-konga-line py-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-black">{naira(product.price)}</span>
                {product.oldPrice && <span className="text-base text-konga-muted line-through">{naira(product.oldPrice)}</span>}
              </div>
              {off > 0 && (
                <p className="mt-1 text-sm font-semibold text-konga-green">
                  You save {naira(product.oldPrice! - product.price)} ({off}% off)
                </p>
              )}
              <p className="mt-2 rounded bg-konga-light px-3 py-2 text-xs text-konga-ink">
                💳 Get an extra <strong>5% off</strong> when you pay with <strong>KongaPay</strong>
              </p>
            </div>

            {(product.kongaNow || product.official) && (
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px]">
                {product.kongaNow && (
                  <span className="flex items-center gap-2">
                    <KongaNowBadge /> Same day delivery in Lagos &amp; Abuja
                  </span>
                )}
                {product.official && <OfficialStoreTag />}
              </div>
            )}

            <BuyBox product={product} />

            <ul className="mt-5 space-y-1.5 text-sm text-konga-muted">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <BadgeCheck size={16} className="mt-0.5 shrink-0 text-konga-green" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Side info */}
        <aside className="space-y-3">
          <div className="rounded bg-white p-4 text-sm shadow-card">
            <h3 className="mb-3 font-bold">Delivery &amp; Returns</h3>
            <label className="mb-1 block text-xs text-konga-muted">Deliver to</label>
            <select className="mb-3 w-full rounded border border-konga-line px-2 py-2 text-sm outline-none focus:border-konga">
              {['Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Kano', 'Enugu', 'Delta'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <div className="space-y-3">
              <p className="flex gap-2">
                <Truck size={18} className="shrink-0 text-konga" />
                <span>
                  <strong>Door Delivery</strong>
                  <br />
                  <span className="text-xs text-konga-muted">Delivered in 1 – 3 working days in Lagos & Abuja</span>
                </span>
              </p>
              <p className="flex gap-2">
                <MapPin size={18} className="shrink-0 text-konga" />
                <span>
                  <strong>Pickup Station</strong>
                  <br />
                  <span className="text-xs text-konga-muted">Free pickup from over 100 Konga stations</span>
                </span>
              </p>
              <p className="flex gap-2">
                <RotateCcw size={18} className="shrink-0 text-konga" />
                <span>
                  <strong>Return Policy</strong>
                  <br />
                  <span className="text-xs text-konga-muted">Free returns within 7 days for eligible items</span>
                </span>
              </p>
            </div>
          </div>
          <div className="rounded bg-white p-4 text-sm shadow-card">
            <h3 className="mb-2 font-bold">Seller Information</h3>
            <p className="flex items-center gap-2 font-semibold text-konga">
              <Store size={16} /> {product.seller}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded bg-konga-bg p-2">
                <p className="text-base font-black text-konga-green">96%</p>Seller score
              </div>
              <div className="rounded bg-konga-bg p-2">
                <p className="text-base font-black">2,140</p>Successful sales
              </div>
            </div>
          </div>
        </aside>
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <Section title="Customers Also Viewed" href={`/category/${category.slug}`}>
          <ProductRail products={related} />
        </Section>
      )}
    </div>
  );
}
