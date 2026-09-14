import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { SEARCH_TABS, PROPERTY_TYPES, BUDGET_RANGES } from "@/data/home";
import { cn } from "@/lib/utils";

// Prominent tabbed property search. Frontend/demo behaviour only.
export const SearchBar = ({ onSearch }) => {
  const [tab, setTab] = useState(SEARCH_TABS[0]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch?.({ tab, query, type, budget });
  };

  return (
    <div data-testid="hero-search-widget" className="w-full rounded-2xl border border-charcoal/10 bg-ivory-light/95 p-3 shadow-[0_24px_70px_-30px_rgba(17,17,17,0.35)] backdrop-blur-sm sm:p-4">
      <div data-testid="search-tabs" className="mb-3 flex flex-wrap gap-1.5 sm:gap-2">
        {SEARCH_TABS.map((label) => (
          <button
            key={label}
            data-testid={`search-tab-${label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setTab(label)}
            className={cn(
              "rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200",
              tab === label ? "bg-charcoal text-ivory" : "text-charcoal-soft/80 hover:bg-charcoal/5",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
        <label className="relative flex items-center rounded-xl border border-charcoal/12 bg-ivory px-4 focus-within:border-gold">
          <span className="sr-only">City, locality or project</span>
          <MapPin size={18} className="mr-2.5 shrink-0 text-gold" aria-hidden="true" />
          <input
            data-testid="search-location-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City, locality or project"
            className="h-14 w-full bg-transparent font-sans text-sm text-charcoal placeholder:text-charcoal-soft/50 focus:outline-none"
          />
        </label>

        <SelectField label="Property Type" value={type} onChange={setType} options={PROPERTY_TYPES} placeholder="Property type" testId="search-type-select" />
        <SelectField label="Budget" value={budget} onChange={setBudget} options={BUDGET_RANGES} placeholder="Budget" testId="search-budget-select" />

        <button
          data-testid="search-submit-button"
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gold px-7 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-[transform,background-color] duration-200 hover:bg-gold-champagne active:scale-[0.98]"
        >
          <Search size={18} aria-hidden="true" />
          <span className="whitespace-nowrap">Search Properties</span>
        </button>
      </form>
    </div>
  );
};

const SelectField = ({ label, value, onChange, options, placeholder, testId }) => (
  <label className="relative flex items-center rounded-xl border border-charcoal/12 bg-ivory px-4 focus-within:border-gold">
    <span className="sr-only">{label}</span>
    <select
      data-testid={testId}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn("h-14 w-full appearance-none bg-transparent pr-6 font-sans text-sm focus:outline-none", value ? "text-charcoal" : "text-charcoal-soft/50")}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <ChevronDown size={16} className="pointer-events-none absolute right-4 text-charcoal-soft/60" aria-hidden="true" />
  </label>
);
