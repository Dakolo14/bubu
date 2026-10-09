import Link from 'next/link';

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-konga-muted">
      <Link href="/" className="hover:text-konga">
        Home
      </Link>
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1">
          <span>/</span>
          {i.href ? (
            <Link href={i.href} className="hover:text-konga">
              {i.label}
            </Link>
          ) : (
            <span className="line-clamp-1 text-konga-ink">{i.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
