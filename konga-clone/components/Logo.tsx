export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`select-none text-[28px] font-black lowercase leading-none tracking-tight md:text-[32px] ${
        dark ? 'text-konga' : 'text-white'
      }`}
      style={{ fontFamily: 'var(--font-logo), var(--font-sans), sans-serif' }}
    >
      konga
    </span>
  );
}
