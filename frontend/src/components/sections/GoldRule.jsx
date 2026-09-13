import { cn } from "@/lib/utils";

export const GoldRule = ({ className }) => (
  <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
    <span className="h-px w-10 sm:w-16 bg-gold/60" />
    <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
    <span className="h-px w-10 sm:w-16 bg-gold/60" />
  </div>
);
