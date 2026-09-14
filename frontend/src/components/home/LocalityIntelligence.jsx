import { SectionHeader } from "@/components/home/SectionHeader";
import { LocalityCard } from "@/components/home/LocalityCard";
import { Reveal } from "@/components/home/motion";
import { LOCALITIES } from "@/data/home";

export const LocalityIntelligence = ({ onLocality }) => (
  <section id="locality" data-testid="locality-intelligence-section" className="bg-ivory">
    <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
      <SectionHeader
        eyebrow="Locality Intelligence"
        title="Know the location before you choose the property."
        description="Understand connectivity, amenities and neighbourhood context — because where you buy matters as much as what you buy."
        testId="locality-header"
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
        {LOCALITIES.map((l, i) => (
          <Reveal key={l.id} delay={(i % 3) * 0.08}>
            <LocalityCard locality={l} onClick={onLocality} testId={`locality-card-${l.id}`} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
