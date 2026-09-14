import { MapPin, BedDouble, Maximize, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SaveButton } from "@/components/home/SaveButton";
import { CompareButton } from "@/components/home/CompareButton";
import { onImgError } from "@/data/home";

// Reusable <PropertyCard />. Opens the property detail page; shows listing
// status/freshness only (no verification claims). Includes a save shortlist.
export const PropertyCard = ({ property, testId }) => {
  const navigate = useNavigate();
  const { propertyId, slug, title, locality, city, price, propertyType, bedrooms, area, providerType, listing, image } = property;
  const open = () => slug && navigate(`/property/${slug}`);

  return (
    <article
      data-testid={testId}
      onClick={open}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory-light transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_28px_70px_-38px_rgba(17,17,17,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={`${title} in ${locality}, ${city}`} loading="lazy" onError={onImgError} className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ivory-light/95 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal backdrop-blur-sm">
          <Clock size={11} aria-hidden="true" /> {listing.status}
        </span>
        <span className="absolute right-3 top-3 flex flex-col gap-2">
          <SaveButton id={propertyId} testId={`${testId}-save`} />
          <CompareButton id={propertyId} testId={`${testId}-compare`} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xl font-medium text-charcoal">{price}</p>
          <span className="rounded-full bg-charcoal/6 px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-charcoal-soft/80">{propertyType}</span>
        </div>
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
          onClick={(e) => { e.stopPropagation(); open(); }}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border border-charcoal/20 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 hover:border-gold hover:bg-charcoal hover:text-ivory"
        >
          View Property
        </button>
      </div>
    </article>
  );
};
