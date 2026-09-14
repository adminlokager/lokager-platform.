import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

// DAYS / HOURS / MINUTES / SECONDS countdown display. `remaining` is seconds
// (elapsed-time derived upstream, so browser throttling stays accurate).
export const CountdownClock = ({ remaining }) => {
  const total = Math.max(0, remaining);
  const units = [
    { label: "Days", value: Math.floor(total / 86400) },
    { label: "Hours", value: Math.floor((total % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((total % 3600) / 60) },
    { label: "Seconds", value: total % 60 },
  ];
  const finale = remaining <= 3;

  return (
    <div className="relative flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0 -m-8 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div
        data-testid="countdown-timer"
        aria-live="polite"
        aria-label={`${units[0].value} days ${units[1].value} hours ${units[2].value} minutes ${units[3].value} seconds remaining`}
        className="relative flex items-start justify-center gap-2 sm:gap-4 lg:gap-5"
      >
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center">
            <div className="flex min-w-[3.2rem] flex-col items-center sm:min-w-[4.2rem]">
              <motion.span
                key={`${u.label}-${u.value}`}
                initial={{ opacity: 0.4, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "font-display tabular font-light leading-none text-[clamp(2.4rem,7dvh,4.2rem)] lg:text-[clamp(2.8rem,8dvh,5.2rem)]",
                  finale ? "text-gold drop-shadow-[0_0_24px_rgba(184,137,74,0.4)]" : "text-charcoal",
                )}
              >
                {pad(u.value)}
              </motion.span>
              <span className="mt-2 sm:mt-3 font-sans text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.24em] text-charcoal-soft/60">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span aria-hidden="true" className="mt-[0.15em] px-0.5 font-display font-light leading-none text-gold/50 text-[clamp(2rem,5dvh,3.2rem)] lg:text-[clamp(2.4rem,6dvh,4rem)]">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
