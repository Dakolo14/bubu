import Link from 'next/link';

function Skin({ side }: { side: 'left' | 'right' }) {
  return (
    <Link
      href="/category/groceries-and-more"
      className={`fixed bottom-0 top-[109px] z-0 hidden w-[calc((100vw-1312px)/2)] flex-col items-center justify-center gap-6 overflow-hidden bg-konga-skin px-6 text-center 3xl:flex ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      aria-label="Konga Auto"
    >
      <p className="text-[22px] font-black italic tracking-tight text-[#B91C1C]">
        KONGA <span className="text-[#111]">AUTO</span>
      </p>
      <p className="text-[46px] font-extrabold uppercase leading-[0.95] tracking-tight text-[#111]">
        Find
        <br />
        your
        <br />
        next
        <br />
        ride
      </p>
      <span className="text-[90px] leading-none">🚙</span>
      <span className="rounded-full bg-konga px-7 py-3 text-[20px] font-semibold text-white">Book a test drive</span>
    </Link>
  );
}

export default function SideSkins() {
  return (
    <>
      <Skin side="left" />
      <Skin side="right" />
    </>
  );
}
