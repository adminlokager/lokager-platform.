import { cn } from "@/lib/utils";

const cap = "pointer-events-none absolute z-20 hidden md:block font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal-soft/60";

export const ArchFrame = ({ tl, tr, bl, br, className }) => (
  <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-0", className)}>
    <div className="absolute inset-3 sm:inset-5 lg:inset-7 border border-gold/25" />
    <div className="absolute inset-x-3 sm:inset-x-5 lg:inset-x-7 top-[4.25rem] hidden lg:block h-px bg-gold/15" />
    <div className="absolute inset-x-3 sm:inset-x-5 lg:inset-x-7 bottom-[4.25rem] hidden lg:block h-px bg-gold/15" />
    {tl && <span data-testid="frame-caption-tl" className={cn(cap, "left-10 top-8")}>{tl}</span>}
    {tr && <span data-testid="frame-caption-tr" className={cn(cap, "right-10 top-8 text-right")}>{tr}</span>}
    {bl && <span data-testid="frame-caption-bl" className={cn(cap, "left-10 bottom-8")}>{bl}</span>}
    {br && <span data-testid="frame-caption-br" className={cn(cap, "right-10 bottom-8 text-right")}>{br}</span>}
  </div>
);
