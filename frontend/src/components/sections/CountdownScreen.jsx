import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Stage } from "@/components/layout/Stage";
import { LogoMark } from "@/components/brand/LogoMark";
import { CountdownRing } from "@/components/sections/CountdownRing";

export const CountdownScreen = ({ remaining, progress }) => {
  const { t } = useTranslation();
  const phrases = t("countdown.phrases");
  const phrase = phrases[Math.min(phrases.length - 1, Math.floor(progress * phrases.length))];

  return (
    <Stage dark testId="countdown-screen">
      <div className="flex flex-col items-center text-center">
        <LogoMark className="h-9 sm:h-11 w-auto mb-5 sm:mb-6" testId="countdown-logo-mark" />
        <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-eyebrow text-gold">{t("countdown.eyebrow")}</p>
        <div className="relative mt-8 sm:mt-10 flex items-center justify-center">
          <div className="absolute inset-0 -m-16 rounded-full bg-gold/10 blur-3xl animate-shimmer" aria-hidden="true" />
          <CountdownRing progress={progress} />
          <span
            data-testid="countdown-timer"
            aria-live="polite"
            className="absolute font-display tabular text-7xl sm:text-8xl lg:text-9xl font-light text-gold leading-none"
          >
            {remaining}
          </span>
        </div>
        <p className="mt-6 font-sans text-xs uppercase tracking-eyebrow text-ivory/50">{t("countdown.unit")}</p>
        <div className="mt-8 sm:mt-12 h-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={phrase}
              data-testid="countdown-phrase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="font-display italic text-lg sm:text-2xl text-ivory/80"
            >
              {phrase}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
};
