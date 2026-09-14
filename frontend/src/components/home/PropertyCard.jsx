import { MapPin, BedDouble, Maximize, Clock } from "lucide-react";

// Reusable <PropertyCard />. Displays listing status/freshness (no verification claims).
export const PropertyCard = ({ property, onClick, testId }) => {
  const { title, locality, city, price, propertyType, bedrooms, area, providerType, listing, image } = property;
  return (
    <article
      data-testid={testId}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory-light transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_28px_70px_-38px_rgba(17,17,17,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={`${title} in ${locality}, ${city}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ivory-light/95 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal backdrop-blur-sm">
          <Clock size={11} aria-hidden="true" /> {listing.status}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-ivory backdrop-blur-sm">
          {propertyType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xl font-medium text-charcoal">{price}</p>
        <h3 className="mt-1.5 font-display text-lg font-medium text-charcoal">{title}</h3>
        <p className="mt-1 flex items-center gap-1.5 font-sans text-sm text-charcoal-soft/80">
          <MapPin size={14} className="text-gold" aria-hidden="true" /> {locality}, {city}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-charcoal/8 pt-4 font-sans text-xs text-charcoal-soft/80">
          {bedrooms > 0 && (
            <span className="inline-flex items-center gap-1.5"><BedDouble size={14} className="text-charcoal-soft/60" aria-hidden="true" /> {bedrooms} BHK</span>
          )}
          <span className="inline-flex items-center gap-1.5"><Maximize size={14} className="text-charcoal-soft/60" aria-hidden="true" /> {area}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal-soft/60">
          <span>By {providerType}</span>
          <span>{listing.freshness}</span>
        </div>

        <button
          data-testid={`${testId}-view`}
          onClick={() => onClick?.(property)}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border border-charcoal/20 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 hover:border-gold hover:bg-charcoal hover:text-ivory"
        >
          View Property
        </button>
      </div>
    </article>
  );
};
