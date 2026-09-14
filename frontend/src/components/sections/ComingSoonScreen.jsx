import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Stage } from "@/components/layout/Stage";
import { Logo } from "@/components/brand/Logo";
import { ArchFrame } from "@/components/sections/ArchFrame";
import { Skyline } from "@/components/sections/Skyline";
import { VerticalList } from "@/components/sections/VerticalList";

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export const ComingSoonScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stage hideHeader hideFooter testId="coming-soon-container">
      <ArchFrame tl={t("brand.indiaWorld")} tr={t("brand.connects")} />
      <Skyline />
      <div className="relative flex w-full max-w-4xl flex-col items-center text-center pb-16">
        <motion.div {...fade(0.2)}>
          <Logo size="lg" testId="coming-soon-logo" />
        </motion.div>
        <motion.h1 {...fade(0.6)} data-testid="coming-soon-statement" className="mt-10 sm:mt-12 font-display font-normal leading-[1.08] text-4xl sm:text-5xl lg:text-6xl text-charcoal">
          {t("comingSoon.statement").map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </motion.h1>
        <motion.div {...fade(0.9)} className="mt-10 sm:mt-12 w-full">
          <VerticalList items={t("comingSoon.verticals")} />
        </motion.div>
        <motion.p {...fade(1.1)} data-testid="coming-soon-title" className="mt-10 font-sans text-sm sm:text-base font-semibold uppercase tracking-[0.34em] text-gold">
          {t("comingSoon.title")}
        </motion.p>
        <motion.p {...fade(1.2)} data-testid="trust-statement" className="mt-3 font-sans text-sm sm:text-base text-charcoal-soft/85">
          {t("brand.trust")}
        </motion.p>
        <motion.button
          {...fade(1.35)}
          data-testid="enter-lokager-button"
          onClick={() => navigate("/")}
          className="mt-10 inline-flex min-h-[56px] items-center justify-center rounded-full border border-gold bg-charcoal px-10 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-ivory transition-[transform,background-color] duration-300 hover:bg-charcoal-soft active:scale-[0.98]"
        >
          Enter LOKAGER
        </motion.button>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-2 px-6 pb-7 sm:pb-9 text-center">
        <p data-testid="coming-soon-footer-statement" className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-charcoal">
          {t("brand.rooted")} {t("brand.builtWorld")}
        </p>
        <p data-testid="footer-rights" className="font-sans text-[10px] sm:text-[11px] text-charcoal-soft/55">{t("footer.rights", { year: new Date().getFullYear() })}</p>
      </div>
    </Stage>
  );
};
