import { ArrowUpRight } from "lucide-react";
import { onImgError } from "@/data/home";

// Large premium category card with hover zoom photography.
export const CategoryCard = ({ title, note, image, onClick, testId, tall = false }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    className={`group relative block w-full overflow-hidden rounded-2xl border border-charcoal/10 text-left ${tall ? "aspect-[3/4] lg:row-span-2 lg:aspect-auto lg:h-full" : "aspect-[4/3]"}`}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      onError={onImgError}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" aria-hidden="true" />
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
      <div>
        <h3 className="font-display text-xl font-medium text-ivory sm:text-2xl">{title}</h3>
        <p className="mt-1 font-sans text-xs text-ivory/70 sm:text-sm">{note}</p>
      </div>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-[background-color,transform] duration-300 group-hover:bg-gold group-hover:text-charcoal group-hover:-translate-y-0.5">
        <ArrowUpRight size={18} aria-hidden="true" />
      </span>
    </div>
  </button>
);
