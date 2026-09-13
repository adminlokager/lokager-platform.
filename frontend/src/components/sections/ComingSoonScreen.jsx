import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Stage } from "@/components/layout/Stage";
import { Logo } from "@/components/brand/Logo";
import { GoldRule } from "@/components/sections/GoldRule";
import { VerticalList } from "@/components/sections/VerticalList";

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export const ComingSoonScreen = () => {
  const { t } = useTranslation();
  return (
    <Stage testId="coming-soon-container">
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <motion.span
          {...fade(0.1)}
          data-testid="live-badge"
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-eyebrow text-gold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          {t("comingSoon.badge")}
        </motion.span>
        <motion.div {...fade(0.3)} className="mt-8 sm:mt-10">
          <Logo variant="vertical" size="lg" testId="coming-soon-logo" />
        </motion.div>
        <motion.div {...fade(0.6)}>
          <GoldRule className="my-8 sm:my-10" />
        </motion.div>
        <motion.h1 {...fade(0.7)} data-testid="coming-soon-title" className="font-display font-normal text-4xl sm:text-5xl text-charcoal">
          {t("comingSoon.title")}
        </motion.h1>
        <motion.p {...fade(0.85)} data-testid="trust-statement" className="mt-4 font-sans text-sm sm:text-base text-charcoal-soft">
          {t("brand.trust")}
        </motion.p>
        <motion.p {...fade(0.95)} className="mt-2 max-w-lg font-sans text-sm text-charcoal-soft/80">
          {t("comingSoon.lead")}
        </motion.p>
        <motion.div {...fade(1.1)} className="mt-10 sm:mt-14 w-full">
          <VerticalList items={t("comingSoon.verticals")} />
        </motion.div>
      </div>
    </Stage>
  );
};
