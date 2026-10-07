export function KongaNowBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full bg-[#FDE3EF] font-extrabold leading-none tracking-tight ${
        small ? 'px-1.5 py-1 text-[9px]' : 'px-2 py-1 text-[11px]'
      }`}
    >
      <span className="h-[0.75em] w-[0.75em] rounded-full bg-konga-orange" />
      <span className="text-konga">konga</span>
      <span className="text-[#222]">NOW</span>
      <span className="ml-0.5 text-konga">⇉</span>
    </span>
  );
}

export function DiscountBadge({ off }: { off: number }) {
  return (
    <span className="rounded-[3px] bg-konga-deal px-1.5 py-[3px] text-[11px] font-medium leading-none text-white">-{off}%</span>
  );
}

export function OfficialStoreTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-r-full bg-konga-gold py-[2px] pl-1.5 pr-2 text-[9px] font-medium leading-tight text-[#3A2A00]">
      Official Store <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
    </span>
  );
}
