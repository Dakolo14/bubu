import Link from 'next/link';
import { ChevronRight, Info } from 'lucide-react';

type Tone = 'magenta' | 'green' | 'blush';

const tones: Record<Tone, string> = {
  magenta: 'bg-konga text-white',
  green: 'bg-konga-trend text-white',
  blush: 'bg-konga-blush text-[#222]',
};

export default function Section({
  title,
  subtitle,
  href,
  tone = 'blush',
  terms = false,
  children,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  tone?: Tone;
  terms?: boolean;
  children: React.ReactNode;
}) {
  const light = tone !== 'blush';
  return (
    <section className="mt-5 overflow-hidden rounded-md bg-white">
      <div className={`flex h-[52px] items-center justify-between gap-3 px-4 ${tones[tone]}`}>
        <div className="flex min-w-0 items-baseline gap-2">
          <h2 className="truncate text-[15px] font-semibold md:text-[18px]">{title}</h2>
          {subtitle && <span className="hidden text-[15px] font-normal sm:inline">{subtitle}</span>}
          {terms && (
            <a href="#" className="hidden items-center gap-1 self-center text-[12px] text-konga sm:flex">
              <Info size={12} /> T &amp; C Apply
            </a>
          )}
        </div>
        {href && (
          <Link href={href} className="flex shrink-0 items-center gap-2 text-[13px] font-medium hover:underline">
            See all items
            <span
              className={`flex h-[17px] w-[17px] items-center justify-center rounded-full ${
                light ? 'bg-white text-konga' : 'bg-konga text-white'
              }`}
            >
              <ChevronRight size={13} strokeWidth={3} />
            </span>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
