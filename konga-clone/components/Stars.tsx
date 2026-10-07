import { Star } from 'lucide-react';

export default function Stars({ rating, reviews, size = 12 }: { rating: number; reviews?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-[1px]" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={i <= Math.round(rating) ? 'fill-[#FFC107] text-[#FFC107]' : 'fill-transparent text-[#B8B8B8]'}
          />
        ))}
      </div>
      {reviews !== undefined && <span className="text-[11px] text-konga-muted">({reviews})</span>}
    </div>
  );
}
