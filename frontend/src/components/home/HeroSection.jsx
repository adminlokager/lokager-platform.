import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SearchBar } from "@/components/home/SearchBar";
import { HERO_IMAGE, onImgError } from "@/data/home";
import { EASE } from "@/components/home/motion";

export const HeroSection = ({ onSearch }) => {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section id="top" data-testid="hero-search-section" className="relative overflow-hidden bg-ivory pt-[86px] lg:pt-[92px]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16 lg:pb-20 lg:pt-16">
        <div className="relative z-10">
          <motion.span {...rise(0.05)} className="inline-flex items-center gap-2 rounded-full border border-charcoal/12 bg-ivory-light px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <ShieldCheck size={14} aria-hidden="true" /> Where property meets trust
          </motion.span>

          <motion.h1 {...rise(0.12)} data-testid="hero-headline" className="mt-6 font-display font-medium leading-[1.04] tracking-tight text-4xl sm:text-5xl lg:text-6xl text-charcoal">
            Find property<br />you can trust.
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-6 max-w-xl font-sans text-[17px] sm:text-lg lg:text-xl leading-[1.6] text-charcoal-soft">
            Discover homes, land, commercial spaces and new projects with better information, smarter comparison and trusted connections.
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-8 lg:mt-10">
            <SearchBar onSearch={onSearch} />
          </motion.div>

          <motion.p {...rise(0.42)} className="mt-5 font-sans text-[15px] text-charcoal-soft/80">
            A smarter property journey starts here.
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-charcoal/10">
            <img
              src={HERO_IMAGE}
              alt="Modern Indian residential towers surrounded by landscaped greenery"
              className="h-full w-full object-cover"
              loading="eager"
              onError={onImgError}
              width="900"
              height="1125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-charcoal/10 bg-ivory-light px-6 py-4 shadow-[0_24px_60px_-30px_rgba(17,17,17,0.4)]">
            <p className="font-mono text-2xl font-medium text-charcoal">7 verticals</p>
            <p className="mt-0.5 font-sans text-xs uppercase tracking-[0.18em] text-charcoal-soft/70">One property platform</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
