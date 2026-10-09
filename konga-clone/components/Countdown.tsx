'use client';

import { useEffect, useState } from 'react';

function untilMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
}

export default function Countdown() {
  const [secs, setSecs] = useState<number | null>(null);

  useEffect(() => {
    setSecs(untilMidnight());
    const id = setInterval(() => setSecs(untilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts =
    secs === null
      ? ['--', '--', '--']
      : [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60].map((n) => String(n).padStart(2, '0'));

  return (
    <span className="flex items-center gap-1 text-[13px] font-semibold">
      <span className="hidden sm:inline">Ends in</span>
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="rounded bg-white px-1.5 py-0.5 font-mono text-konga">{p}</span>
          {i < 2 && ':'}
        </span>
      ))}
    </span>
  );
}
