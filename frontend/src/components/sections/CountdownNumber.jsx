import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CountdownDial } from "@/components/sections/CountdownDial";

export const CountdownNumber = ({ remaining, progress }) => {
  const finale = remaining <= 3;
  const scale = finale ? 1 + (4 - remaining) * 0.09 : 1;
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 -m-10 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      {finale && (
        <motion.div
          key={`pulse-${remaining}`}
          aria-hidden="true"
          initial={{ scale: 0.85, opacity: 0.45 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute h-[clamp(230px,38dvh,400px)] w-[clamp(230px,38dvh,400px)] rounded-full border border-gold"
        />
      )}
      <CountdownDial progress={progress} />
      <motion.span
        key={remaining}
        data-testid="countdown-timer"
        aria-live="polite"
        initial={{ opacity: 0.35, scale: scale * 0.97 }}
        animate={{ opacity: 1, scale }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "absolute font-display tabular font-light leading-none text-[clamp(5rem,13dvh,9rem)]",
          finale ? "text-gold drop-shadow-[0_0_28px_rgba(184,137,74,0.45)]" : "text-charcoal",
        )}
      >
        {remaining}
      </motion.span>
    </div>
  );
};
