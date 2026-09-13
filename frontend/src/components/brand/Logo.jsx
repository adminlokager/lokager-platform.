import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LogoMark, BrandA } from "@/components/brand/LogoMark";

const sizes = {
  sm: { mark: "h-7", word: "text-lg", tag: "text-[9px] tracking-[0.26em]", gap: "gap-2.5", stack: "gap-1" },
  md: { mark: "h-12 sm:h-16", word: "text-2xl sm:text-3xl", tag: "text-[10px] sm:text-[11px] tracking-[0.3em]", gap: "gap-3 sm:gap-4", stack: "gap-2" },
  lg: {
    mark: "h-24 sm:h-32 lg:h-40",
    word: "text-4xl sm:text-5xl lg:text-6xl",
    tag: "text-[11px] sm:text-sm tracking-[0.3em]",
    gap: "gap-5 sm:gap-7",
    stack: "gap-3 sm:gap-4",
  },
};

export const BrandWord = ({ className, tone = "charcoal", testId = "brand-word" }) => (
  <span
    data-testid={testId}
    aria-label="LOKAGER"
    className={cn("inline-flex items-end font-brand font-semibold uppercase leading-none tracking-[0.12em] whitespace-nowrap", tone === "ivory" ? "text-ivory" : "text-charcoal", className)}
  >
    <span aria-hidden="true">LOK</span>
    <BrandA className="inline-block h-[0.75em] w-auto mr-[0.12em] mb-[0.005em]" />
    <span aria-hidden="true">GER</span>
    <sup className="ml-0.5 self-start mt-[0.24em] text-[0.28em] font-semibold tracking-normal" aria-hidden="true">™</sup>
  </span>
);

export const Logo = ({ variant = "vertical", size = "md", tone = "charcoal", showTagline = true, className, testId = "lokager-logo" }) => {
  const { t } = useTranslation();
  const s = sizes[size];
  const horizontal = variant === "horizontal";
  return (
    <div
      data-testid={testId}
      className={cn("inline-flex select-none", horizontal ? `flex-row items-center ${s.gap}` : `flex-col items-center text-center ${s.gap}`, className)}
    >
      <LogoMark className={cn(s.mark, "w-auto shrink-0")} testId={`${testId}-mark`} />
      <div className={cn("flex flex-col", horizontal ? "items-start" : "items-center", s.stack)}>
        <BrandWord tone={tone} className={s.word} testId={`${testId}-wordmark`} />
        {showTagline && (
          <span
            data-testid={`${testId}-tagline`}
            className={cn("font-sans font-semibold uppercase", s.tag, tone === "ivory" ? "text-ivory/80" : "text-charcoal-soft")}
          >
            {t("brand.tagline")}
          </span>
        )}
      </div>
    </div>
  );
};
