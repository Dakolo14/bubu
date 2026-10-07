import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function HeroTiles() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link href="#" className="flex aspect-square flex-col overflow-hidden rounded-md">
        <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#F47A37] to-[#EC4B7E] px-3 text-center">
          <p className="text-[15px] font-extrabold uppercase leading-[1.05] text-white xl:text-[26px]">Find a store near you!</p>
        </div>
        <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#1B1B1B] to-[#5A1530] text-[44px] xl:text-[64px]">🏬</div>
      </Link>

      <Link href="/login" className="flex aspect-square flex-col items-center justify-center rounded-md bg-[#0B5E3A] px-3 text-center">
        <p className="text-[11px] font-semibold text-white xl:text-[14px]">
          Konga<span className="text-konga-gold">Pay</span> <span className="font-normal opacity-80">rewards</span>
        </p>
        <p className="mt-2 text-[10px] font-bold uppercase text-konga-gold xl:text-[14px]">Get up to</p>
        <p className="text-[24px] font-extrabold leading-none text-konga-gold xl:text-[36px]">₦1,000</p>
        <p className="mt-1 text-[10px] font-semibold text-white xl:text-[13px]">off your shopping cart</p>
        <p className="mt-0.5 text-[8px] text-white/60 xl:text-[10px]">T&amp;C Apply</p>
        <span className="mt-2 flex w-[85%] items-center justify-center gap-1 rounded bg-konga-gold py-1 text-[11px] font-medium text-[#1B1B1B] xl:py-2 xl:text-[15px]">
          Sign Up <ChevronRight size={14} strokeWidth={3} />
        </span>
      </Link>

      <Link href="/deals" className="flex aspect-square items-center rounded-md bg-[#111] px-3">
        <p className="text-[26px] font-extrabold leading-[0.95] tracking-tight text-white xl:text-[46px]">
          Money
          <br />
          Well
          <br />
          Spent
        </p>
      </Link>

      <Link
        href="/deals"
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-[#0A0A0A]"
      >
        <span className="absolute inset-0 flex items-center justify-center text-[90px] opacity-20">🛍️</span>
        <span className="relative rounded-full bg-konga px-4 py-1.5 text-[12px] font-medium text-white xl:text-[13px]">Shop Now</span>
      </Link>
    </div>
  );
}
