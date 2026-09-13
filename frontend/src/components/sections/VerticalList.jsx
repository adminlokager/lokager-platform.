export const VerticalList = ({ items }) => (
  <ul data-testid="vertical-list" className="flex flex-wrap items-center justify-center gap-y-4 border-y border-charcoal/10 py-6 sm:py-8">
    {items.map((item, i) => (
      <li key={item} className="flex items-center">
        {i > 0 && <span className="mx-4 sm:mx-6 h-1 w-1 rounded-full bg-gold" aria-hidden="true" />}
        <span data-testid={`vertical-${item.toLowerCase().replace(/\s+/g, "-")}`} className="font-sans text-sm sm:text-base uppercase tracking-[0.18em] text-charcoal">
          {item}
        </span>
      </li>
    ))}
  </ul>
);
