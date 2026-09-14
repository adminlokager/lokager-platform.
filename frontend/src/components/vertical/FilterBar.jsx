import { Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Config-driven filter bar used across vertical listing pages.
export const FilterBar = ({ filters, values, onChange, onClear, activeCount }) => (
  <div data-testid="filter-bar" className="rounded-2xl border border-charcoal/10 bg-ivory-light p-3 sm:p-4">
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {filters.map((f) => (
        <div key={f.key} className="relative flex items-center rounded-xl border border-charcoal/12 bg-ivory px-4 focus-within:border-gold">
          {f.type === "text" ? (
            <>
              <Search size={16} className="mr-2 shrink-0 text-gold" aria-hidden="true" />
              <input
                data-testid={`filter-${f.key}`}
                value={values[f.key] || ""}
                onChange={(e) => onChange(f.key, e.target.value)}
                placeholder={f.label}
                className="h-13 w-full bg-transparent py-3.5 font-sans text-sm text-charcoal placeholder:text-charcoal-soft/50 focus:outline-none"
              />
            </>
          ) : (
            <>
              <select
                data-testid={`filter-${f.key}`}
                value={values[f.key] || ""}
                onChange={(e) => onChange(f.key, e.target.value)}
                className={cn("h-13 w-full appearance-none bg-transparent py-3.5 pr-6 font-sans text-sm focus:outline-none", values[f.key] ? "text-charcoal" : "text-charcoal-soft/50")}
              >
                <option value="">{f.label}</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-4 text-charcoal-soft/60" aria-hidden="true" />
            </>
          )}
        </div>
      ))}
    </div>
    {activeCount > 0 && (
      <div className="mt-3 flex justify-end">
        <button data-testid="filter-clear" onClick={onClear} className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft transition-colors hover:text-gold">
          <X size={14} aria-hidden="true" /> Clear {activeCount} filter{activeCount > 1 ? "s" : ""}
        </button>
      </div>
    )}
  </div>
);
