import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LineArt } from "@/components/sections/LineArt";

const Frame = ({ children, panel, landscape, caption }) => (
  <div className={cn("relative w-full", panel ? "h-full" : landscape ? "aspect-[16/10]" : "aspect-[3/4]")}>
    <div className="absolute -inset-2.5 sm:-inset-3.5 border border-gold/30" aria-hidden="true" />
    <div className="absolute inset-0 overflow-hidden border border-gold/60 bg-ivory shadow-[0_40px_90px_-50px_rgba(17,17,17,0.45)]">
      {children}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b from-ivory-light/70 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-ivory-light/80 to-transparent" aria-hidden="true" />
      {caption && (
        <div data-testid="scene-caption" className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <span className="font-display text-4xl font-light leading-none text-charcoal tabular">{caption.index}</span>
          <span className="flex flex-col items-end text-right">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal">{caption.chapter}</span>
          </span>
        </div>
      )}
    </div>
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
  if (visual.type === "art") return <div className="h-full w-full p-8 lg:p-10"><LineArt name={visual.art} /></div>;
  return null;
};

export const SceneVisual = ({ visual, sceneKey, landscape = false, panel = false, caption, className, testId }) => (
  <div className={cn("relative", panel && "h-full", className)} data-testid={testId}>
    <AnimatePresence mode="wait">
      {visual.type !== "none" && (
        <motion.div
          key={sceneKey}
          data-testid={`${testId}-${sceneKey}`}
          className={cn(panel && "h-full")}
          initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Frame panel={panel} landscape={landscape} caption={caption}>{body(visual)}</Frame>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
