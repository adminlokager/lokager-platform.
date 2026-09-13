import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Stage } from "@/components/layout/Stage";
import { LogoMark } from "@/components/brand/LogoMark";
import { useGoldConfetti } from "@/hooks/useGoldConfetti";

const fade = (delay, extra = {}) => ({
  initial: { opacity: 0, y: 16, ...extra.from },
  animate: { opacity: 1, y: 0, ...extra.to },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
});

export const CelebrationScreen = () => {
  const { t } = useTranslation();
  useGoldConfetti();
  return (
    <Stage testId="celebration-screen">
      <div data-testid="celebration-banner" className="flex w-full max-w-5xl flex-col items-center text-center">
        <motion.p {...fade(0.2)} data-testid="celebration-eyebrow" className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-gold">
          {t("celebration.eyebrow")}
        </motion.p>
        <motion.h1
          {...fade(0.6)}
          data-testid="celebration-title"
          className="mt-4 font-brand font-bold uppercase text-2xl sm:text-5xl lg:text-6xl tracking-[0.1em] leading-[1.1] text-charcoal"
        >
          {t("celebration.title")}
        </motion.h1>
        <motion.div {...fade(1.1, { from: { scale: 0.92 }, to: { scale: 1 } })} className="relative mt-10 sm:mt-14">
          <div className="absolute inset-0 -m-14 sm:-m-20 rounded-full bg-gold/20 blur-3xl animate-shimmer" aria-hidden="true" />
          <LogoMark className="relative h-32 sm:h-44 lg:h-56 w-auto drop-shadow-[0_18px_40px_rgba(184,137,74,0.35)]" testId="celebration-logo-mark" />
        </motion.div>
        <motion.p {...fade(1.7)} data-testid="celebration-tagline" className="mt-10 sm:mt-12 font-sans font-medium text-xs sm:text-base uppercase tracking-[0.3em] text-gold">
          {t("brand.tagline")}
        </motion.p>
        <motion.p {...fade(2.1)} data-testid="celebration-sub" className="mt-4 font-display italic text-xl sm:text-2xl lg:text-3xl text-charcoal">
          {t("celebration.sub")}
        </motion.p>
      </div>
    </Stage>
  );
};
