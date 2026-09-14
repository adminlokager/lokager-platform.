import { SectionHeader } from "@/components/home/SectionHeader";
import { ServiceCategory } from "@/components/home/ServiceCategory";
import { Reveal } from "@/components/home/motion";
import { SERVICES } from "@/data/home";
import { ArrowRight } from "lucide-react";

// LOKAGER Services — a FUTURE ecosystem extension, kept clearly secondary to
// property discovery. Marked COMING SOON with no service guarantees.
export const LokagerServices = ({ onExplore }) => (
  <section id="services" data-testid="lokager-services-section" className="bg-ivory-light">
    <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          Coming Soon
        </span>
        <SectionHeader
          eyebrow="LOKAGER Services"
          title="Your property journey doesn't end at the purchase."
          description="From painting and interiors to repairs and property improvement, LOKAGER is building a trusted service ecosystem designed around clearer scope, quality expectations and committed timelines."
          testId="services-header"
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={(i % 6) * 0.05}>
            <ServiceCategory icon={s.icon} label={s.label} testId={`service-${s.id}`} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <button
          data-testid="explore-services-button"
          onClick={onExplore}
          className="group inline-flex items-center gap-2 rounded-full border border-charcoal px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-ivory"
        >
          Explore LOKAGER Services
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </Reveal>
    </div>
  </section>
);
