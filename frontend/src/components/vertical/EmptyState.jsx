import { SearchX } from "lucide-react";

export const EmptyState = ({ title = "No matches found", body = "Try adjusting or clearing your filters to see more results.", onReset, testId = "empty-state" }) => (
  <div data-testid={testId} className="flex flex-col items-center rounded-2xl border border-dashed border-charcoal/20 bg-ivory-light px-6 py-16 text-center">
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
      <SearchX size={24} aria-hidden="true" />
    </span>
    <h3 className="mt-5 font-display text-xl font-medium text-charcoal">{title}</h3>
    <p className="mt-2 max-w-md font-sans text-[15px] text-charcoal-soft/85">{body}</p>
    {onReset && (
      <button data-testid="empty-reset-button" onClick={onReset} className="mt-6 inline-flex h-11 items-center rounded-full border border-charcoal px-7 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory">
        Clear Filters
      </button>
    )}
  </div>
);
