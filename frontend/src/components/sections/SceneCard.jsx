import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SCENE_COUNT } from "@/lib/site";

export const SceneCard = ({ index, scene, sceneKey, testId }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full max-w-[260px] flex-col items-start" data-testid={testId}>
      <AnimatePresence mode="wait">
        {scene.chapter && (
          <motion.div
            key={sceneKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <span className="font-display text-6xl font-light leading-none text-gold/70 tabular">{String(index + 1).padStart(2, "0")}</span>
            <span className="mt-4 h-px w-12 bg-gold/70" aria-hidden="true" />
            <span className="mt-4 font-display text-3xl text-charcoal">{scene.chapter}</span>
            <span className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal-soft/55">
              {index + 1} / {SCENE_COUNT} · {t("countdown.journey")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
