export default function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex select-none items-center leading-none ${className}`} aria-label="Konga">
      <span
        className="mr-[1px] inline-block h-[0.62em] w-[0.62em] translate-y-[-0.08em] rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 35%, #FFD25A, #F7941D 70%)' }}
      />
      <span className={`font-extrabold tracking-[-0.04em] ${dark ? 'text-konga' : 'text-white'}`}>konga</span>
    </span>
  );
}
