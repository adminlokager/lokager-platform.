import { cn } from "@/lib/utils";

const LOGO_SRC = `${process.env.PUBLIC_URL}/brand/lokager-logo.webp`;

// Header brand lockup: the exact LOKAGER wordmark from the approved artwork,
// CSS-cropped (full width shown, tagline band clipped) so the mark stays whole
// and crisp on Retina, paired with a re-typeset, always-readable tagline.
export const HeaderBrand = ({ testId = "header-logo" }) => (
  <span data-testid={testId} className="flex select-none flex-col items-center leading-none">
    <span
      data-testid={`${testId}-wordmark`}
      aria-label="LOKAGER"
      role="img"
      className={cn(
        "block bg-no-repeat",
        "w-[144px] aspect-[6/1] sm:w-[162px] lg:w-[184px]",
      )}
      style={{ backgroundImage: `url(${LOGO_SRC})`, backgroundSize: "100% auto", backgroundPosition: "0% 27%" }}
    />
    <span
      data-testid={`${testId}-tagline`}
      className="mt-1 max-w-[144px] text-center font-sans text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.24em] text-charcoal-soft sm:max-w-[162px] sm:text-[9.5px] lg:max-w-[184px] lg:text-[10px]"
    >
      Where Property Meets Trust
    </span>
  </span>
);
