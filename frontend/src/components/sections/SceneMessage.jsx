import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SceneMessage = ({ scene, sceneKey }) => {
  const multi = scene.lines.length > 1;
  return (
    <div className="flex min-h-[8.5rem] sm:min-h-[9.5rem] w-full flex-col items-center justify-start text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneKey}
          data-testid={`scene-message-${sceneKey}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.4 } }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {scene.lead && (
            <span data-testid="scene-lead" className="mb-2 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gold">
              {scene.lead}
            </span>
          )}
          <h2
            data-testid="scene-message"
            className={cn(
              "font-display font-normal leading-[1.1] text-charcoal",
              multi ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl lg:text-5xl",
            )}
          >
            {scene.lines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>
          {scene.support && (
            <p data-testid="scene-support" className="mt-3 max-w-md font-sans text-sm sm:text-base font-normal text-charcoal-soft/80">
              {scene.support}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
