import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Stage } from "@/components/layout/Stage";
import { Logo } from "@/components/brand/Logo";
import { ArchFrame } from "@/components/sections/ArchFrame";
import { useGoldConfetti } from "@/hooks/useGoldConfetti";

const fade = (delay, dur = 1) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] },
});

export const CelebrationScreen = () => {
  const { t } = useTranslation();
  useGoldConfetti();
  return (
    <Stage hideHeader testId="celebration-screen">
      <ArchFrame tl={t("brand.indiaWorld")} tr={t("brand.connects")} />
      <motion.div
        aria-hidden="true"
        data-testid="gold-sweep"
        initial={{ x: "-70vw", opacity: 0 }}
        animate={{ x: "170vw", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.7, ease: "easeInOut", delay: 0.1 }}
        className="pointer-events-none absolute top-[-30%] left-0 h-[160%] w-[34vw] rotate-[14deg] bg-gradient-to-r from-transparent via-gold-champagne/45 to-transparent blur-sm"
      />
      <div data-testid="celebration-banner" className="relative flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div {...fade(0.5)} className="relative">
          <div className="absolute inset-0 -m-14 rounded-full bg-gold/15 blur-3xl animate-shimmer" aria-hidden="true" />
          <Logo size="celebration" className="relative" testId="celebration-logo" />
        </motion.div>
        <motion.p {...fade(0.9)} data-testid="celebration-eyebrow" className="mt-10 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.34em] text-gold">
          {t("celebration.eyebrow")}
        </motion.p>
        <motion.h1 {...fade(1.3)} data-testid="celebration-title" className="mt-6 flex h-10 sm:h-16 lg:h-20 items-center justify-center font-brand font-semibold text-[40px] sm:text-[64px] lg:text-[80px] leading-none text-charcoal">
          {t("celebration.name")}
        </motion.h1>
        <motion.p {...fade(1.7)} data-testid="celebration-live" className="mt-4 font-display italic text-3xl sm:text-4xl lg:text-5xl text-charcoal">
          {t("celebration.live")}
        </motion.p>
        <motion.span {...fade(2.1)} className="my-7 h-px w-16 bg-gold" aria-hidden="true" />
        <motion.p {...fade(2.2)} data-testid="celebration-tagline" className="font-sans font-semibold text-xs sm:text-base uppercase tracking-[0.3em] text-gold">
          {t("brand.tagline")}
        </motion.p>
        <motion.p {...fade(2.9)} data-testid="celebration-sub" className="mt-5 font-display text-xl sm:text-2xl lg:text-3xl text-charcoal-soft">
          {t("celebration.sub")}
        </motion.p>
      </div>
    </Stage>
  );
};
