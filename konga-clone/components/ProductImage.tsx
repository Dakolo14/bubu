import { getCategory, Product } from '@/lib/data';

export default function ProductImage({ product, size = 'md' }: { product: Product; size?: 'sm' | 'md' | 'lg' }) {
  if (product.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={product.image} alt={product.name} className="h-full w-full object-contain" loading="lazy" />;
  }
  const tint = getCategory(product.category)?.tint ?? ['#F5F5F5', '#E5E5E5'];
  const iconSize = { sm: 'text-3xl', md: 'text-6xl', lg: 'text-[140px]' }[size];
  return (
    <div
      role="img"
      aria-label={product.name}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(circle at 50% 40%, #ffffff 0%, ${tint[0]} 55%, ${tint[1]} 100%)` }}
    >
      <span className={`${iconSize} drop-shadow-[0_8px_10px_rgba(0,0,0,0.18)]`}>{product.icon}</span>
      {size !== 'sm' && (
        <span className="absolute bottom-2 left-2 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-konga-muted">
          {product.brand}
        </span>
      )}
    </div>
  );
}
