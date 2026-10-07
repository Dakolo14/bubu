import { Star } from 'lucide-react';

export default function Stars({ rating, reviews, size = 12 }: { rating: number; reviews?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(rating) ? 'fill-konga-orange text-konga-orange' : 'fill-konga-line text-konga-line'}
          />
        ))}
      </div>
      {reviews !== undefined && <span className="text-[11px] text-konga-muted">({reviews})</span>}
    </div>
  );
}
