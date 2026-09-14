import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { Stage } from "@/components/layout/Stage";
import { ArchFrame } from "@/components/sections/ArchFrame";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { Skyline } from "@/components/sections/Skyline";
import { preloadScenes } from "@/lib/scenes";

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const SideNote = ({ lines, side }) => (
  <div className={`pointer-events-none absolute top-1/2 hidden xl:flex -translate-y-1/2 flex-col gap-3 ${side === "left" ? "left-16 items-start" : "right-16 items-end text-right"}`}>
    {lines.map((l) => (
      <span key={l} className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal-soft/55">{l}</span>
    ))}
  </div>
);

export const LaunchScreen = ({ onLaunch }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const id = setTimeout(() => preloadScenes(0, 4), 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <Stage hideHeader hideFooter testId="launch-screen">
      <ArchFrame tl={t("brand.indiaWorld")} tr={t("brand.connects")} bl={t("brand.rooted")} br={t("brand.builtWorld")} />
      <Skyline />
      <SideNote lines={t("launch.sideLeft")} side="left" />
      <SideNote lines={t("launch.sideRight")} side="right" />

      <div className="relative flex w-full max-w-4xl flex-col items-center text-center">
        <motion.p {...fade(0.1)} className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] text-charcoal-soft/60">
          {t("brand.est")}
        </motion.p>
        <motion.div {...fade(0.3)} className="mt-6 sm:mt-8">
          <Logo size="lg" testId="launch-logo" />
        </motion.div>
        <motion.h1 {...fade(0.6)} data-testid="launch-title" className="mt-8 sm:mt-10 font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-charcoal">
          {t("launch.title")}
        </motion.h1>
        <motion.p {...fade(0.75)} className="mt-3 flex items-center gap-3 sm:gap-4 font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] text-charcoal-soft/70">
          {t("launch.pillars").map((p, i) => (
            <span key={p} className="flex items-center gap-3 sm:gap-4">
              {i > 0 && <span className="h-3 w-px bg-gold/60" aria-hidden="true" />}
              {p}
            </span>
          ))}
        </motion.p>
        <motion.div {...fade(1.0)} className="mt-10 sm:mt-12 w-full sm:w-auto">
          <button
            type="button"
            data-testid="launch-button"
            onClick={onLaunch}
            aria-label={t("launch.button")}
            className="relative inline-flex w-full sm:w-auto min-h-[76px] sm:min-h-[88px] items-center justify-center border-2 border-gold bg-charcoal px-12 sm:px-20 font-brand font-semibold text-lg sm:text-xl lg:text-2xl uppercase tracking-[0.18em] text-ivory shadow-[0_28px_70px_-24px_rgba(17,17,17,0.6)] transition-[background-color,color,transform,box-shadow] duration-300 hover:bg-gold hover:text-charcoal active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
          >
            <span className="pointer-events-none absolute inset-1 border border-gold/40" aria-hidden="true" />
            {t("launch.button")}
          </button>
          <p className="mt-5 font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-gold">{t("launch.stamp")}</p>
          <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.22em] text-charcoal-soft/50">{t("launch.hint")}</p>
        </motion.div>
        <motion.div {...fade(1.3)} className="mt-12 sm:mt-16">
          <BrandStrip />
        </motion.div>
      </div>
    </Stage>
  );
};
