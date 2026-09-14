import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { HeaderBrand } from "@/components/brand/HeaderBrand";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "New Projects", to: "/new-projects" },
  { label: "Commercial", to: "/commercial" },
  { label: "Land", to: "/land" },
  { label: "Services", to: "/#services" },
  { label: "Mortgage", to: "/mortgage" },
  { label: "Sell Property", to: "/#list" },
];

export const SiteHeader = ({ onNotify }) => {
  const navigate = useNavigate();
  const { ids } = useSavedProperties();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (to) => {
    setOpen(false);
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
      }
    } else {
      navigate(to);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header
      data-testid="header-navigation"
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-[#FAF5EC] transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-b border-charcoal/10 shadow-[0_1px_30px_rgba(17,17,17,0.05)]" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-16 h-[82px] lg:h-[86px]">
        <button data-testid="header-logo-button" onClick={() => go("/")} aria-label="LOKAGER home" className="flex items-center">
          <HeaderBrand testId="header-logo" />
        </button>

        <nav data-testid="header-desktop-nav" className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {NAV.map((item) => (
            <button
              key={item.label}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => go(item.to)}
              className="relative font-sans text-[13px] font-medium text-charcoal-soft transition-colors duration-200 hover:text-charcoal after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <button
            data-testid="header-saved-button"
            onClick={() => go("/saved")}
            aria-label="Saved properties"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-gold"
          >
            <Heart size={17} className={ids.length ? "fill-gold text-gold" : ""} aria-hidden="true" />
            {ids.length > 0 && (
              <span data-testid="saved-count" className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-mono text-[9px] font-medium text-charcoal">{ids.length}</span>
            )}
          </button>
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

        <div className="flex items-center gap-2 xl:hidden">
          <button
            data-testid="header-saved-button-mobile"
            onClick={() => go("/saved")}
            aria-label="Saved properties"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal"
          >
            <Heart size={18} className={ids.length ? "fill-gold text-gold" : ""} aria-hidden="true" />
            {ids.length > 0 && <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-mono text-[9px] text-charcoal">{ids.length}</span>}
          </button>
          <button
            data-testid="header-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-nav-panel" className="xl:hidden border-t border-charcoal/10 bg-ivory-light/98 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-[1600px] flex-col px-5 sm:px-8 py-4">
            {NAV.map((item) => (
              <button
                key={item.label}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => go(item.to)}
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
