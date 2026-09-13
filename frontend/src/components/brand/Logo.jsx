import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/LogoMark";
import { Wordmark } from "@/components/brand/Wordmark";

const sizes = {
  sm: { mark: "h-8", word: "h-[0.95rem]", tag: "text-[9px] tracking-[0.26em]", gap: "gap-3", stack: "gap-1.5" },
  md: { mark: "h-12 sm:h-[4.5rem]", word: "h-[1.2rem] sm:h-[1.7rem]", tag: "text-[10px] sm:text-[11px] tracking-[0.3em]", gap: "gap-3 sm:gap-4", stack: "gap-2 sm:gap-2.5" },
  lg: {
    mark: "h-28 sm:h-36 lg:h-44",
    word: "h-[2.1rem] sm:h-[2.7rem] lg:h-[3.3rem]",
    tag: "text-[11px] sm:text-sm tracking-[0.3em]",
    gap: "gap-6 sm:gap-8",
    stack: "gap-4 sm:gap-5",
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
        <Wordmark tone={tone} className={cn(s.word, "w-auto")} testId={`${testId}-wordmark`} />
        {showTagline && (
          <span
            data-testid={`${testId}-tagline`}
            className={cn("font-sans font-semibold uppercase leading-none", s.tag, tone === "ivory" ? "text-ivory/80" : "text-charcoal-soft")}
          >
            {t("brand.tagline")}
          </span>
        )}
      </div>
    </div>
  );
};
