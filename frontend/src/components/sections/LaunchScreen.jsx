import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
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
          <Logo variant="vertical" size="lg" testId="launch-logo" />
        </motion.div>
        <motion.div {...fade(0.6)}>
          <GoldRule className="my-8 sm:my-10" />
        </motion.div>
        <motion.p {...fade(0.8)} data-testid="launch-title" className="max-w-md font-display italic text-xl sm:text-2xl text-charcoal-soft">
          {t("launch.title")}
        </motion.p>
        <motion.div {...fade(1.0)} className="mt-10 sm:mt-14 w-full sm:w-auto">
          <button
            type="button"
            data-testid="launch-button"
            onClick={onLaunch}
            aria-label={t("launch.button")}
            className="group relative inline-flex w-full sm:w-auto min-h-[76px] sm:min-h-[88px] items-center justify-center rounded-full border-2 border-gold bg-charcoal px-12 sm:px-20 font-brand font-bold text-lg sm:text-xl lg:text-2xl uppercase tracking-[0.16em] text-ivory shadow-[0_24px_60px_-20px_rgba(17,17,17,0.55)] transition-[background-color,color,transform,box-shadow] duration-300 hover:bg-gold hover:text-charcoal active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
          >
            {t("launch.button")}
          </button>
          <p className="mt-5 font-sans text-xs uppercase tracking-eyebrow text-charcoal-soft/70">{t("launch.hint")}</p>
        </motion.div>
      </div>
    </Stage>
  );
};
