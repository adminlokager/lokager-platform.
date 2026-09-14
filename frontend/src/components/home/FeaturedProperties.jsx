import { useNavigate } from "react-router-dom";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Reveal } from "@/components/home/motion";
import { FEATURED } from "@/data/verticals";
import { ArrowRight } from "lucide-react";

export const FeaturedProperties = () => {
  const navigate = useNavigate();
  return (
    <section id="properties" data-testid="featured-properties-grid" className="bg-ivory">
      <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Featured" title="Handpicked properties to explore." testId="featured-header" />
          <button
            data-testid="view-all-properties-button"
            onClick={() => navigate("/buy")}
            className="group inline-flex items-center gap-2 self-start font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal sm:self-auto"
          >
            View All Properties
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 text-gold" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {FEATURED.map((p, i) => (
            <Reveal key={p.propertyId} delay={(i % 3) * 0.08}>
              <PropertyCard property={p} testId={`property-card-${p.propertyId}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
