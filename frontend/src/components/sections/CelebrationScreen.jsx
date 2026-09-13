import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Stage } from "@/components/layout/Stage";
import { GoldRule } from "@/components/sections/GoldRule";
import { useGoldConfetti } from "@/hooks/useGoldConfetti";

const fade = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
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
        <motion.div {...fade(0.5)}>
          <GoldRule className="my-8 sm:my-10" />
        </motion.div>
        <motion.h1
          {...fade(0.7)}
          data-testid="celebration-title"
          className="font-display font-normal uppercase text-4xl sm:text-5xl lg:text-7xl tracking-[0.08em] leading-[1.1] text-charcoal"
        >
          {t("celebration.title")}
        </motion.h1>
        <motion.p {...fade(1.1)} className="mt-8 font-sans text-sm sm:text-base uppercase tracking-eyebrow text-charcoal-soft">
          {t("celebration.sub")}
        </motion.p>
      </div>
    </Stage>
  );
};
