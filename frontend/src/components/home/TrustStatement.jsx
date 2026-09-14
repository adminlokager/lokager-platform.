import { Reveal } from "@/components/home/motion";

// Distinctive brand trust statement on a deep charcoal canvas.
export const TrustStatement = () => (
  <section data-testid="trust-statement-section" className="bg-charcoal">
    <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-8 sm:py-32 lg:px-12 lg:py-36">
      <Reveal as="span" className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        The LOKAGER Promise
      </Reveal>
      <Reveal delay={0.06} as="h2" className="mt-8 font-display font-medium leading-[1.1] tracking-tight text-3xl sm:text-5xl lg:text-6xl text-ivory">
        Trust isn't a badge.<br />
        <span className="text-gold-champagne">It's how the platform is built.</span>
      </Reveal>
      <Reveal delay={0.14} as="p" className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-ivory/70 sm:text-lg">
        LOKAGER is being designed around clearer property information, transparent listing status, smarter comparisons and responsible connections between property seekers and property providers.
      </Reveal>
      <Reveal delay={0.2} className="mx-auto mt-10 h-px w-16 bg-gold" />
    </div>
  </section>
);
