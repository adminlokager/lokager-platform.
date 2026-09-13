import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { ArchFrame } from "@/components/sections/ArchFrame";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { CountdownNumber } from "@/components/sections/CountdownNumber";
import { SceneMessage } from "@/components/sections/SceneMessage";
import { SceneVisual } from "@/components/sections/SceneVisual";
import { SceneCard } from "@/components/sections/SceneCard";
import { SCENE_VISUALS, sceneIndexAt, preloadScenes } from "@/lib/scenes";

const SidePanel = ({ side, index, scene, sceneKey, visual, sideOf }) => (
  <aside
    data-testid={`side-panel-${side}`}
    className={`hidden lg:flex items-center justify-center ${side === "left" ? "pr-6 xl:pr-10" : "pl-6 xl:pl-10"}`}
  >
    <motion.div animate={{ opacity: sideOf === "none" ? 0 : 1 }} transition={{ duration: 1.2 }} className="flex w-full max-w-[min(340px,calc((100dvh-400px)*0.72))] xl:max-w-[min(420px,calc((100dvh-400px)*0.72))] items-center justify-center">
      {sideOf === side ? (
        <SceneVisual visual={visual} sceneKey={sceneKey} className="w-full" testId={`scene-visual-${side}`} />
      ) : (
        <SceneCard index={index} scene={scene} sceneKey={sceneKey} testId={`scene-card-${side}`} />
      )}
    </motion.div>
  </aside>
);

export const CountdownScreen = ({ remaining, progress }) => {
  const { t } = useTranslation();
  const scenes = t("scenes");
  const index = sceneIndexAt(progress);
  const scene = scenes[index];
  const { visual, side } = SCENE_VISUALS[index];
  const sceneKey = `s${index}`;

  useEffect(() => preloadScenes(index + 1, 3), [index]);

  return (
    <div data-testid="countdown-screen" className="relative flex min-h-[100dvh] flex-col bg-ivory-light overflow-hidden">
      <ArchFrame tl={t("brand.indiaWorld")} tr={t("brand.connects")} />
      <header className="relative z-10 flex justify-center pt-8 sm:pt-10 lg:pt-12">
        <Logo variant="vertical" size="md" testId="countdown-logo" />
      </header>

      <main className="relative z-10 grid flex-1 grid-cols-1 items-center lg:grid-cols-[1fr_minmax(0,600px)_1fr] px-6 sm:px-12 py-6 lg:py-4">
        <SidePanel side="left" index={index} scene={scene} sceneKey={sceneKey} visual={visual} sideOf={side} />

        <section className="flex flex-col items-center text-center">
          <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-charcoal">{t("countdown.eyebrow")}</p>
          <p className="mt-1.5 font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] text-gold">{t("countdown.beginsIn")}</p>
          <div className="mt-5 sm:mt-6">
            <CountdownNumber remaining={remaining} progress={progress} />
          </div>
          <p className="mt-4 font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] text-charcoal-soft/60">{t("countdown.unit")}</p>
          <div className="mt-5 sm:mt-7 w-full">
            <SceneMessage scene={scene} sceneKey={sceneKey} />
          </div>
          <SceneVisual visual={visual} sceneKey={sceneKey} landscape className="lg:hidden mt-2 w-full max-w-[420px] px-3" testId="scene-visual-mobile" />
        </section>

        <SidePanel side="right" index={index} scene={scene} sceneKey={sceneKey} visual={visual} sideOf={side} />
      </main>

      <footer className="relative z-10 flex justify-center px-6 pb-7 sm:pb-9">
        <BrandStrip />
      </footer>
    </div>
  );
};
