// Header brand lockup.
// The supplied raster has a baked ivory background + tiny baked tagline. We show
// only the icon+wordmark slice and use mix-blend-mode:multiply so the light
// background blends into the header (normal AND sticky) with no visible patch.
// The tagline is rendered separately as crisp one-line live text.
const LOGO_SRC = `${process.env.PUBLIC_URL}/brand/lokager-logo.webp`;

export const HeaderBrand = ({ testId = "header-logo" }) => (
  <span data-testid={testId} className="flex select-none flex-col items-center leading-none">
    <span
      data-testid={`${testId}-wordmark`}
      aria-label="LOKAGER"
      role="img"
      className="block w-[152px] aspect-[164/29] sm:w-[186px] lg:w-[210px]"
      style={{
        backgroundImage: `url(${LOGO_SRC})`,
        backgroundSize: "100% auto",
        backgroundPosition: "50% 30%",
        backgroundRepeat: "no-repeat",
      }}
    />
    <span
      data-testid={`${testId}-tagline`}
      className="mt-[4px] whitespace-nowrap text-center font-sans font-medium uppercase text-charcoal text-[7px] sm:text-[8px] lg:text-[9px]"
      style={{ letterSpacing: "1.4px" }}
    >
      Where Property Meets Trust
    </span>
  </span>
);
