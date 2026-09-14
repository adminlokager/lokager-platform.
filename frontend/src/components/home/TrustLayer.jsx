import { SectionHeader } from "@/components/home/SectionHeader";
import { TrustCard } from "@/components/home/TrustCard";
import { Reveal } from "@/components/home/motion";
import { TRUST_PILLARS } from "@/data/home";

export const TrustLayer = () => (
  <section id="trust" data-testid="trust-pillars-section" className="bg-ivory">
    <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
      <SectionHeader
        eyebrow="Why LOKAGER"
        title="Property decisions deserve more trust."
        description="LOKAGER is different by design — the trust comes from how the platform is built, not from unsupported badges."
        testId="trust-header"
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        {TRUST_PILLARS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <TrustCard icon={p.icon} title={p.title} body={p.body} testId={`trust-card-${p.id}`} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
