'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, FileText, Gift, Receipt as ReceiptIcon, Share2 } from 'lucide-react';
import Receipt from '@/components/Receipt';
import { demoOrder, loadOrder, Order } from '@/lib/orders';

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [gift, setGift] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    setOrder(id === 'demo' || id === demoOrder.id ? demoOrder : loadOrder(id));
  }, [id]);

  const render = async () => {
    if (!ref.current) throw new Error('Receipt not ready');
    return toPng(ref.current, { pixelRatio: 2, cacheBust: true, style: { margin: '0' } });
  };

  const fileName = `Konga-${gift ? 'Gift-' : ''}Receipt-${order?.id ?? id}.png`;

  const downloadPng = async () => {
    setBusy(true);
    try {
      const url = await render();
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    } catch {
      setNote('Could not create the image. Try Download PDF instead.');
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    setBusy(true);
    try {
      const blob = await (await fetch(await render())).blob();
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'My Konga receipt' });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setNote('Link copied. Paste it anywhere to share this receipt.');
      }
    } catch {
      // user cancelled the share sheet
    } finally {
      setBusy(false);
    }
  };

  if (order === undefined) return <div className="min-h-[60vh]" />;

  if (order === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-5xl">🧾</p>
        <h1 className="mt-3 text-xl font-bold">We couldn&apos;t find receipt #{id}</h1>
        <p className="mt-1 text-sm text-konga-muted">Receipts are saved on the device you ordered from.</p>
        <Link href="/receipt/demo" className="mt-5 inline-block rounded bg-konga px-6 py-3 text-sm font-semibold text-white">
          View a sample receipt
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[760px] px-3 py-6">
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-full bg-white p-1 text-[13px] font-medium shadow-card">
          {[
            [false, 'Receipt', ReceiptIcon],
            [true, 'Gift receipt', Gift],
          ].map(([value, label, Icon]) => {
            const I = Icon as typeof Gift;
            return (
              <button
                key={label as string}
                onClick={() => setGift(value as boolean)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 ${gift === value ? 'bg-konga text-white' : 'text-konga-ink'}`}
              >
                <I size={15} /> {label as string}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 text-[13px] font-medium">
          <button
            disabled={busy}
            onClick={downloadPng}
            className="flex items-center gap-1.5 rounded-full bg-konga px-4 py-2.5 text-white disabled:opacity-60"
          >
            <Download size={15} /> Image
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 shadow-card">
            <FileText size={15} /> PDF
          </button>
          <button disabled={busy} onClick={share} className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 shadow-card disabled:opacity-60">
            <Share2 size={15} /> Share
          </button>
        </div>
      </div>
      {note && <p className="no-print mb-3 rounded bg-konga-blush px-3 py-2 text-[13px] text-konga">{note}</p>}

      <div className="overflow-hidden rounded-2xl shadow-lift print:rounded-none print:shadow-none">
        <Receipt ref={ref} order={order} gift={gift} />
      </div>
    </div>
  );
}
