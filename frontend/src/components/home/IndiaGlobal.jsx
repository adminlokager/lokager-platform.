import { Reveal } from "@/components/home/motion";

const CITIES = [
  { name: "Mumbai", coord: "19.07°N 72.87°E" },
  { name: "Bengaluru", coord: "12.97°N 77.59°E" },
  { name: "Delhi NCR", coord: "28.61°N 77.20°E" },
  { name: "Hyderabad", coord: "17.38°N 78.48°E" },
  { name: "Dubai", coord: "25.20°N 55.27°E" },
  { name: "Singapore", coord: "1.35°N 103.81°E" },
  { name: "London", coord: "51.50°N 0.12°W" },
  { name: "New York", coord: "40.71°N 74.00°W" },
];

// India -> Global vision. Restrained typographic coordinate language, no flags.
export const IndiaGlobal = () => (
  <section data-testid="india-global-section" className="bg-ivory-light">
    <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal as="span" className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">Vision</Reveal>
          <Reveal delay={0.06} as="h2" className="mt-5 font-display font-medium leading-[1.08] tracking-tight text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal">
            Rooted in India.<br />Built for the world.
          </Reveal>
          <Reveal delay={0.12} as="p" className="mt-6 max-w-lg font-sans text-base leading-relaxed text-charcoal-soft/85 sm:text-lg">
            Starting with India's property market, LOKAGER is being built with technology and architecture designed to scale across cities, languages and markets.
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/8 sm:grid-cols-4">
            {CITIES.map((c) => (
              <div key={c.name} className="bg-ivory-light p-5 transition-colors duration-300 hover:bg-ivory">
                <p className="font-display text-base font-medium text-charcoal">{c.name}</p>
                <p className="mt-1 font-mono text-[10px] tracking-tight text-charcoal-soft/60">{c.coord}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
