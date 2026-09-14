import { useNavigate } from "react-router-dom";
import { GitCompare, X, ArrowRight } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { getPropertyById } from "@/data/verticals";
import { onImgError } from "@/data/home";

// Floating compare tray. Appears when >=1 property is selected. Compare enabled
// at >=2. Rendered globally so it persists across pages within the tab.
export const CompareTray = () => {
  const navigate = useNavigate();
  const { ids, remove, clear, max } = useCompare();
  if (!ids.length) return null;

  const items = ids.map(getPropertyById).filter(Boolean);

  return (
    <div data-testid="compare-tray" className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-ivory-light/95 backdrop-blur-xl shadow-[0_-8px_30px_-12px_rgba(17,17,17,0.2)]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-16">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="hidden shrink-0 items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal-soft sm:inline-flex">
            <GitCompare size={14} className="text-gold" aria-hidden="true" /> Compare
          </span>
          <div className="flex items-center gap-2">
            {items.map((p) => (
              <div key={p.propertyId} className="relative shrink-0">
                <img src={p.image} alt={p.title} onError={onImgError} className="h-12 w-16 rounded-md object-cover" />
                <button
                  data-testid={`compare-remove-${p.propertyId}`}
                  onClick={() => remove(p.propertyId)}
                  aria-label={`Remove ${p.title}`}
                  className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-ivory"
                >
                  <X size={11} aria-hidden="true" />
                </button>
              </div>
            ))}
            {Array.from({ length: max - items.length }).map((_, i) => (
              <div key={`slot-${i}`} className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md border border-dashed border-charcoal/25 font-sans text-[10px] text-charcoal-soft/50">Add</div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button data-testid="compare-clear" onClick={clear} className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft transition-colors hover:text-charcoal">Clear</button>
          <button
            data-testid="compare-open"
            onClick={() => navigate("/compare")}
            disabled={items.length < 2}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-charcoal px-6 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory transition-[opacity,background-color] hover:bg-charcoal-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            Compare {items.length > 1 ? `(${items.length})` : ""} <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
