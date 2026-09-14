import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Accessible breadcrumb trail. items: [{ label, to? }] (last item is current).
export const Breadcrumbs = ({ items }) => (
  <nav data-testid="breadcrumbs" aria-label="Breadcrumb" className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 lg:px-16 lg:pt-28">
    <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-charcoal-soft/70">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.to && !last ? (
              <Link to={item.to} className="transition-colors hover:text-gold">{item.label}</Link>
            ) : (
              <span aria-current={last ? "page" : undefined} className={last ? "text-charcoal" : ""}>{item.label}</span>
            )}
            {!last && <ChevronRight size={13} className="text-charcoal-soft/40" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);
