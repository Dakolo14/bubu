import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Listing from '@/components/Listing';
import { categories, getCategory, productsIn } from '@/lib/data';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCategory(params.slug);
  return { title: c ? `${c.name} | Konga Clone` : 'Category not found' };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-site px-2 py-4 md:px-4">
      <Breadcrumbs items={[{ label: category.name }]} />
      <div
        className="mb-4 flex items-center justify-between overflow-hidden rounded px-6 py-6"
        style={{ background: `linear-gradient(120deg, ${category.tint[0]}, ${category.tint[1]})` }}
      >
        <div>
          <h1 className="text-2xl font-black md:text-3xl">{category.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {category.subcategories.flatMap((s) => s.items).slice(0, 8).map((i) => (
              <span key={i} className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-konga-ink">
                {i}
              </span>
            ))}
          </div>
        </div>
        <span className="hidden text-7xl sm:block">{category.icon}</span>
      </div>
      <Listing products={productsIn(category.slug)} />
    </div>
  );
}
