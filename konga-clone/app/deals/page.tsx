import Breadcrumbs from '@/components/Breadcrumbs';
import Countdown from '@/components/Countdown';
import Listing from '@/components/Listing';
import { withTag } from '@/lib/data';

export const metadata = { title: "Today's Deals | Konga Clone" };

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-site px-2 py-4 md:px-4">
      <Breadcrumbs items={[{ label: "Today's Deals" }]} />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded bg-gradient-to-r from-konga to-konga-purple px-6 py-6 text-white">
        <div>
          <h1 className="text-2xl font-black md:text-3xl">🔥 Today&apos;s Deals</h1>
          <p className="text-sm text-white/85">Massive discounts, refreshed every midnight.</p>
        </div>
        <Countdown />
      </div>
      <Listing products={withTag('deal')} />
    </div>
  );
}
