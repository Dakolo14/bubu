import { services } from '@/lib/data';

export default function ServicesStrip() {
  return (
    <div className="no-scrollbar mt-4 flex items-center justify-between gap-6 overflow-x-auto rounded-md bg-white px-6 py-4">
      {services.map((s) => (
        <a key={s.label} href="#" className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[#555] hover:text-konga">
          <span className="text-base">{s.icon}</span>
          <span className={s.label === s.label.toUpperCase() ? 'tracking-wide' : 'text-konga'}>{s.label}</span>
        </a>
      ))}
    </div>
  );
}
