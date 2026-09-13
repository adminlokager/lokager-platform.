import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/LogoMark";

const sizes = {
  sm: { mark: "h-7", word: "text-lg", tag: "text-[8px] tracking-[0.28em]", gap: "gap-2.5", stack: "gap-1" },
  md: { mark: "h-16", word: "text-3xl", tag: "text-[10px] tracking-[0.3em]", gap: "gap-5", stack: "gap-2" },
  lg: {
    mark: "h-28 sm:h-36 lg:h-44",
    word: "text-4xl sm:text-5xl lg:text-6xl",
    tag: "text-[11px] sm:text-sm tracking-[0.3em]",
    gap: "gap-6 sm:gap-8",
    stack: "gap-3 sm:gap-4",
  },
};

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
        <span
          data-testid={`${testId}-wordmark`}
          className={cn("font-brand font-bold uppercase leading-none tracking-[0.12em]", s.word, tone === "ivory" ? "text-ivory" : "text-charcoal")}
        >
          {t("brand.name")}
        </span>
        {showTagline && (
          <span data-testid={`${testId}-tagline`} className={cn("font-sans font-medium uppercase text-gold", s.tag)}>
            {t("brand.tagline")}
          </span>
        )}
      </div>
    </div>
  );
};
