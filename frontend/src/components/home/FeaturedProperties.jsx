import { SectionHeader } from "@/components/home/SectionHeader";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Reveal } from "@/components/home/motion";
import { PROPERTIES } from "@/data/home";
import { ArrowRight } from "lucide-react";

export const FeaturedProperties = ({ onProperty, onViewAll }) => (
  <section id="properties" data-testid="featured-properties-grid" className="bg-ivory">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader eyebrow="Featured" title="Handpicked properties to explore." testId="featured-header" />
        <button
          data-testid="view-all-properties-button"
          onClick={onViewAll}
          className="group inline-flex items-center gap-2 self-start font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal sm:self-auto"
        >
          View All Properties
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 text-gold" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {PROPERTIES.map((p, i) => (
          <Reveal key={p.propertyId} delay={(i % 3) * 0.08}>
            <PropertyCard property={p} onClick={onProperty} testId={`property-card-${p.propertyId}`} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
