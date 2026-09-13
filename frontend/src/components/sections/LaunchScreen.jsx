import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Wordmark } from "@/components/layout/Wordmark";
import { Stage } from "@/components/layout/Stage";
import { GoldRule } from "@/components/sections/GoldRule";

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export const LaunchScreen = ({ onLaunch }) => {
  const { t } = useTranslation();
  return (
    <Stage testId="launch-screen">
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <motion.p {...fade(0.1)} className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-eyebrow text-gold">
          {t("launch.eyebrow")}
        </motion.p>
        <motion.div {...fade(0.3)} className="mt-8 sm:mt-10">
          <Wordmark size="xl" testId="launch-wordmark" />
        </motion.div>
        <motion.div {...fade(0.5)}>
          <GoldRule className="my-8 sm:my-10" />
        </motion.div>
        <motion.p {...fade(0.6)} data-testid="launch-tagline" className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-charcoal">
          {t("brand.tagline")}
        </motion.p>
        <motion.p {...fade(0.8)} className="mt-4 max-w-md font-sans text-sm sm:text-base text-charcoal-soft">
          {t("launch.title")}
        </motion.p>
        <motion.div {...fade(1.0)} className="mt-12 sm:mt-16 w-full sm:w-auto">
          <button
            type="button"
            data-testid="launch-button"
            onClick={onLaunch}
            aria-label={t("launch.button")}
            className="group relative inline-flex w-full sm:w-auto min-h-[76px] sm:min-h-[88px] items-center justify-center rounded-full border-2 border-gold bg-charcoal px-12 sm:px-20 font-display text-xl sm:text-2xl lg:text-3xl uppercase tracking-[0.18em] text-ivory shadow-[0_24px_60px_-20px_rgba(17,17,17,0.55)] transition-[background-color,color,transform,box-shadow] duration-300 hover:bg-gold hover:text-charcoal active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
          >
            {t("launch.button")}
          </button>
          <p className="mt-5 font-sans text-xs uppercase tracking-eyebrow text-charcoal-soft/70">{t("launch.hint")}</p>
        </motion.div>
      </div>
    </Stage>
  );
};
