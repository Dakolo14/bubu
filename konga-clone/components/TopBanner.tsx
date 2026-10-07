import Link from 'next/link';

export default function TopBanner() {
  return (
    <Link
      href="/deals"
      className="relative z-10 hidden h-[88px] items-center justify-center overflow-hidden bg-[#141A3A] md:flex"
      aria-label="Konga Freedom Sales"
    >
      <span className="absolute left-0 top-0 flex h-full w-[220px] items-center justify-center bg-gradient-to-r from-[#0B1030] to-transparent text-6xl">
        🛍️
      </span>
      <p className="text-center text-[22px] font-extrabold uppercase tracking-tight lg:text-[34px]">
        <span className="text-[#F4C35A]">Konga Freedom Sales.</span> <span className="text-white">Up to 66% off everything.</span>
      </p>
      <span className="absolute right-0 top-0 flex h-full w-[220px] items-center justify-center bg-gradient-to-l from-[#0B1030] to-transparent text-6xl">
        🎉
      </span>
    </Link>
  );
}
