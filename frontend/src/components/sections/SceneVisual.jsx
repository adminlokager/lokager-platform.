import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LineArt } from "@/components/sections/LineArt";

const Frame = ({ children, landscape }) => (
  <div className={cn("relative w-full", landscape ? "aspect-[16/9]" : "aspect-[3/4]")}>
    <div className="absolute -inset-2.5 sm:-inset-3 border border-gold/30" aria-hidden="true" />
    <div className="absolute inset-0 overflow-hidden border border-gold/60 bg-ivory shadow-[0_30px_80px_-40px_rgba(17,17,17,0.35)]">{children}</div>
  </div>
);

const Picture = ({ src }) => <img src={src} alt="" loading="eager" decoding="async" className="h-full w-full object-cover animate-slow-zoom" />;

const body = (visual) => {
  if (visual.type === "image") return <Picture src={visual.src} />;
  if (visual.type === "collage")
    return (
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-px bg-gold/40">
        {visual.srcs.map((src) => <img key={src} src={src} alt="" loading="eager" decoding="async" className="h-full w-full object-cover" />)}
      </div>
    );
  if (visual.type === "art") return <div className="h-full w-full p-6 sm:p-8"><LineArt name={visual.art} /></div>;
  return null;
};

export const SceneVisual = ({ visual, sceneKey, landscape = false, className, testId }) => (
  <div className={cn("relative", className)} data-testid={testId}>
    <AnimatePresence mode="wait">
      {visual.type !== "none" && (
        <motion.div
          key={sceneKey}
          data-testid={`${testId}-${sceneKey}`}
          initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Frame landscape={landscape}>{body(visual)}</Frame>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
