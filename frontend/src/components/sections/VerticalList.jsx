export const VerticalList = ({ items }) => (
  <ul data-testid="vertical-list" className="flex flex-wrap items-center justify-center gap-y-3 border-y border-gold/30 py-5 sm:py-6">
    {items.map((item, i) => (
      <li key={item} className="flex items-center">
        {i > 0 && <span className="mx-3.5 sm:mx-6 h-1 w-1 rounded-full bg-gold" aria-hidden="true" />}
        <span data-testid={`vertical-${item.toLowerCase().replace(/\s+/g, "-")}`} className="font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-charcoal">
          {item}
        </span>
      </li>
    ))}
  </ul>
);
