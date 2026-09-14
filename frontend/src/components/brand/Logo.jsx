import { cn } from "@/lib/utils";

// Change only this asset reference when the final Canva SVG is supplied.
const LOGO_SRC = `${process.env.PUBLIC_URL}/brand/lokager-logo.webp`;

// Retain the approved logo slots so surrounding content and motion stay in place.
const sizes = {
  sm: "h-[46px] w-[122px] sm:h-[58px] sm:w-[155px]",
  md: "h-[97.2px] w-[260px] sm:h-[136.2px] sm:w-[364px]",
  lg: "h-[196.6px] w-[min(760px,calc(100vw-48px))] sm:h-[252.2px] lg:h-[294.8px]",
  art: "h-full w-full",
  celebration: "h-20 w-[240px] sm:h-28 sm:w-[320px] lg:h-32 lg:w-[360px]",
};

export const Logo = ({ size = "md", className, testId = "lokager-logo" }) => (
  <div
    data-testid={testId}
    className={cn("inline-flex max-w-full shrink-0 items-center justify-center select-none", sizes[size], className)}
  >
    <img
      data-testid={`${testId}-image`}
      src={LOGO_SRC}
      alt="LOKAGER — Where Property Meets Trust."
      width="2000"
      height="751"
      draggable={false}
      loading="eager"
      className="block h-full w-full object-contain object-center"
    />
  </div>
);
