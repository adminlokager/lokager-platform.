import { Icon } from "@/components/home/Icon";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Reveal } from "@/components/home/motion";
import { INTELLIGENCE } from "@/data/home";

// Flagship technology section on a deep charcoal canvas with subtle gold grid.
export const PropertyIntelligence = () => (
  <section id="intelligence" data-testid="property-intelligence-section" className="relative overflow-hidden bg-charcoal">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{ backgroundImage: "linear-gradient(#B8894A 1px, transparent 1px), linear-gradient(90deg, #B8894A 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      aria-hidden="true"
    />
    <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <SectionHeader
        eyebrow="LOKAGER Property Intelligence"
        title="More than listings. Better property decisions."
        description="We are building intelligence that helps you understand properties deeply — not just browse them. These capabilities are on the way."
        tone="ivory"
        testId="intelligence-header"
      />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {INTELLIGENCE.map((f, i) => (
          <Reveal key={f.id} delay={(i % 3) * 0.08}>
            <div
              data-testid={`intelligence-card-${f.id}`}
              className="group flex h-full flex-col rounded-2xl border border-ivory/12 bg-ivory/[0.03] p-7 transition-[border-color,background-color] duration-300 hover:border-gold/40 hover:bg-ivory/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold-champagne">
                  <Icon name={f.icon} size={20} aria-hidden="true" />
                </span>
                <span className="rounded-full border border-ivory/15 px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-ivory/60">{f.tag}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-ivory">{f.title}</h3>
              <p className="mt-2.5 font-sans text-[15px] leading-[1.6] text-ivory/75">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
