import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Section({
  title,
  href,
  accent = false,
  extra,
  children,
}: {
  title: string;
  href?: string;
  accent?: boolean;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded bg-white shadow-card">
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 ${
          accent ? 'bg-konga text-white' : 'border-b border-konga-line text-konga-ink'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-base font-bold md:text-lg">{title}</h2>
          {extra}
        </div>
        {href && (
          <Link
            href={href}
            className={`flex shrink-0 items-center text-[13px] font-semibold ${
              accent ? 'text-white hover:underline' : 'text-konga hover:underline'
            }`}
          >
            See All <ChevronRight size={16} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
