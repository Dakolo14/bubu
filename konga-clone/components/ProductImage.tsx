import { Product } from '@/lib/data';

export default function ProductImage({ product, size = 'md' }: { product: Product; size?: 'sm' | 'md' | 'lg' }) {
  if (product.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={product.image} alt={product.name} className="h-full w-full object-contain" loading="lazy" />;
  }
  const iconSize = { sm: 'text-3xl', md: 'text-[78px]', lg: 'text-[170px]' }[size];
  return (
    <div role="img" aria-label={product.name} className="flex h-full w-full items-center justify-center bg-white">
      <span className={`${iconSize} leading-none drop-shadow-[0_10px_12px_rgba(0,0,0,0.18)]`}>{product.icon}</span>
    </div>
  );
}
