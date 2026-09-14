import { DEMO_MODE, DEMO_LABEL } from "@/lib/demo";

// Restrained, premium demo indicator shown immediately below the fixed header
// on all property-related routes. Renders nothing in production (DEMO_MODE off).
// The inline spacer preserves layout by offsetting content exactly by the bar's
// height so no locked spacing is altered.
export const DemoBanner = () => {
  if (!DEMO_MODE) return null;
  return (
    <>
      <div
        data-testid="demo-mode-banner"
        className="fixed inset-x-0 top-[82px] lg:top-[86px] z-40 flex h-9 items-center justify-center border-b border-gold/25 bg-[#F1E9D8] px-4"
      >
        <p className="truncate font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal-soft sm:text-[11px] sm:tracking-[0.18em]">
          <span className="text-gold">LOKAGER Product Demo</span>
          <span aria-hidden="true"> — </span>
          <span className="text-charcoal-soft/85">Illustrative information only</span>
          <span className="sr-only">{DEMO_LABEL}</span>
        </p>
      </div>
      <div aria-hidden="true" className="h-9" />
    </>
  );
};
