import { Heart } from "lucide-react";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { cn } from "@/lib/utils";

// Reusable save/shortlist toggle. Stores property IDs in localStorage.
export const SaveButton = ({ id, variant = "floating", testId }) => {
  const { isSaved, toggle } = useSavedProperties();
  const saved = isSaved(id);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  if (variant === "inline") {
    return (
      <button
        data-testid={testId || `save-${id}`}
        data-saved={saved}
        onClick={onClick}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved" : "Save property"}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
          saved ? "border-gold bg-gold/10 text-gold" : "border-charcoal/20 text-charcoal hover:border-gold",
        )}
      >
        <Heart size={16} className={saved ? "fill-gold text-gold" : ""} aria-hidden="true" />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      data-testid={testId || `save-${id}`}
      data-saved={saved}
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save property"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory-light/95 text-charcoal shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-ivory"
    >
      <Heart size={17} className={saved ? "fill-gold text-gold" : "text-charcoal-soft"} aria-hidden="true" />
    </button>
  );
};
