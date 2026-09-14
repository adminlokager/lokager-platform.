import { Icon } from "@/components/home/Icon";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Reveal } from "@/components/home/motion";
import { LIST_TYPES } from "@/data/home";

export const ListProperty = ({ onList, onPartnership }) => (
  <section id="list" data-testid="list-sell-section" className="bg-ivory">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="overflow-hidden rounded-3xl border border-charcoal/10 bg-ivory-light">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <SectionHeader
              eyebrow="For Property Providers"
              title="Have a property? Bring it to LOKAGER."
              description="Reach genuine, intent-driven seekers on a cleaner platform built for trust and clarity."
              testId="list-header"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                data-testid="list-property-cta"
                onClick={onList}
                className="inline-flex h-13 items-center justify-center rounded-full bg-charcoal px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory transition-[transform,background-color] duration-200 hover:bg-charcoal-soft active:scale-[0.98]"
              >
                List Your Property
              </button>
              <button
                data-testid="developer-partnership-cta"
                onClick={onPartnership}
                className="inline-flex h-13 items-center justify-center rounded-full border border-charcoal/25 px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                Developer Partnerships
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-charcoal/8 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-charcoal/8">
            {LIST_TYPES.map((tpe, i) => (
              <Reveal key={tpe.id} delay={i * 0.08} className="bg-ivory-light">
                <div data-testid={`list-type-${tpe.id}`} className="flex h-full items-start gap-4 p-7 lg:p-8">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/8 text-gold">
                    <Icon name={tpe.icon} size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal">{tpe.title}</h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-charcoal-soft/80">{tpe.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
