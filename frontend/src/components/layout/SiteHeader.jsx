import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HeaderBrand } from "@/components/brand/HeaderBrand";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Buy", target: "explore" },
  { label: "Rent", target: "explore" },
  { label: "New Projects", target: "projects" },
  { label: "Commercial", target: "explore" },
  { label: "Land", target: "explore" },
  { label: "Services", target: "services" },
  { label: "Mortgage", target: "explore" },
  { label: "Sell Property", target: "list" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const SiteHeader = ({ onNotify }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target) => {
    setOpen(false);
    scrollTo(target);
  };

  return (
    <header
      data-testid="header-navigation"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "bg-ivory-light/90 backdrop-blur-xl border-b border-charcoal/10 shadow-[0_1px_30px_rgba(17,17,17,0.05)]" : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-16 h-[86px] lg:h-[92px]">
        <button data-testid="header-logo-button" onClick={() => go("top")} aria-label="LOKAGER home" className="flex items-center">
          <HeaderBrand testId="header-logo" />
        </button>

        <nav data-testid="header-desktop-nav" className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {NAV.map((item) => (
            <button
              key={item.label}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => go(item.target)}
              className="relative font-sans text-[13px] font-medium text-charcoal-soft transition-colors duration-200 hover:text-charcoal after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <button
            data-testid="header-login-button"
            onClick={() => onNotify?.("Accounts are coming soon to LOKAGER.")}
            className="font-sans text-[13px] font-medium text-charcoal transition-opacity hover:opacity-70"
          >
            Login / Sign Up
          </button>
          <button
            data-testid="header-list-property-button"
            onClick={() => onNotify?.("Property listing opens soon on LOKAGER.")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-gold bg-charcoal px-6 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory transition-[transform,background-color] duration-200 hover:bg-charcoal-soft active:scale-[0.98]"
          >
            List Property
          </button>
        </div>

        <button
          data-testid="header-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div data-testid="mobile-nav-panel" className="xl:hidden border-t border-charcoal/10 bg-ivory-light/98 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-8 py-4">
            {NAV.map((item) => (
              <button
                key={item.label}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => go(item.target)}
                className="flex items-center justify-between border-b border-charcoal/8 py-3.5 text-left font-sans text-[15px] font-medium text-charcoal"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <button
                data-testid="mobile-login-button"
                onClick={() => { setOpen(false); onNotify?.("Accounts are coming soon to LOKAGER."); }}
                className="inline-flex h-12 items-center justify-center rounded-full border border-charcoal/20 font-sans text-sm font-medium text-charcoal"
              >
                Login / Sign Up
              </button>
              <button
                data-testid="mobile-list-property-button"
                onClick={() => { setOpen(false); onNotify?.("Property listing opens soon on LOKAGER."); }}
                className="inline-flex h-12 items-center justify-center rounded-full border border-gold bg-charcoal font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ivory"
              >
                List Property
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
