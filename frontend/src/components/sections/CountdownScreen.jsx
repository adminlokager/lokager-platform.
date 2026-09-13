import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { ArchFrame } from "@/components/sections/ArchFrame";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { CountdownNumber } from "@/components/sections/CountdownNumber";
import { SceneMessage } from "@/components/sections/SceneMessage";
import { SceneVisual } from "@/components/sections/SceneVisual";
import { SCENE_VISUALS, sceneIndexAt, preloadScenes } from "@/lib/scenes";

const SidePanel = ({ side, visual, sceneKey, caption, active }) => (
  <aside data-testid={`side-panel-${side}`} className={`hidden lg:flex items-center ${side === "left" ? "justify-end" : "justify-start"} px-4 xl:px-6`}>
    <motion.div
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 1.2 }}
      className="h-[min(76dvh,calc(100dvh-300px))] w-full max-w-[600px] 2xl:max-w-[680px]"
    >
      <SceneVisual visual={visual} sceneKey={sceneKey} panel caption={caption} className="h-full" testId={`scene-visual-${side}`} />
    </motion.div>
  </aside>
);

export const CountdownScreen = ({ remaining, progress }) => {
  const { t } = useTranslation();
  const scenes = t("scenes");
  const index = sceneIndexAt(progress);
  const scene = scenes[index];
  const { visual, secondary, side } = SCENE_VISUALS[index];
  const sceneKey = `s${index}`;
  const caption = scene.chapter ? { index: String(index + 1).padStart(2, "0"), chapter: scene.chapter } : null;

  useEffect(() => preloadScenes(index + 1, 3), [index]);

  return (
    <div data-testid="countdown-screen" className="relative flex min-h-[100dvh] flex-col bg-ivory-light overflow-hidden">
      <ArchFrame tl={t("brand.indiaWorld")} tr={t("brand.connects")} />
      <header className="relative z-10 flex justify-center pt-6 sm:pt-10 lg:pt-7">
        <Logo variant="vertical" size="md" testId="countdown-logo" />
      </header>

      <main className="relative z-10 grid flex-1 grid-cols-1 items-center lg:grid-cols-[1fr_minmax(0,600px)_1fr] px-6 sm:px-12 lg:px-10 xl:px-14 py-6 lg:py-2">
        <SidePanel side="left" visual={side === "left" ? visual : secondary} sceneKey={sceneKey} caption={side === "right" ? caption : null} active={side !== "none"} />

        <section className="flex flex-col items-center text-center">
          <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-charcoal">{t("countdown.eyebrow")}</p>
          <p className="mt-1.5 font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] text-gold">{t("countdown.beginsIn")}</p>
          <div className="mt-5 sm:mt-6">
            <CountdownNumber remaining={remaining} progress={progress} />
          </div>
          <p className="mt-4 font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] text-charcoal-soft/60">{t("countdown.unit")}</p>
          <div className="mt-3 sm:mt-7 w-full">
            <SceneMessage scene={scene} sceneKey={sceneKey} />
          </div>
          <SceneVisual visual={visual} sceneKey={sceneKey} landscape caption={caption} className="lg:hidden mt-1 w-full max-w-[520px] px-3" testId="scene-visual-mobile" />
        </section>

        <SidePanel side="right" visual={side === "right" ? visual : secondary} sceneKey={sceneKey} caption={side === "left" ? caption : null} active={side !== "none"} />
      </main>

      <footer className="relative z-10 flex justify-center px-6 pb-7 sm:pb-9 lg:pb-6">
        <BrandStrip />
      </footer>
    </div>
  );
};
