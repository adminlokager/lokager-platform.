import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-lg sm:text-xl tracking-[0.3em]",
  md: "text-3xl sm:text-4xl tracking-[0.3em]",
  xl: "text-5xl sm:text-7xl lg:text-8xl tracking-[0.22em] sm:tracking-[0.3em]",
};

export const Wordmark = ({ size = "md", tone = "charcoal", className, testId = "lokager-wordmark" }) => {
  const { t } = useTranslation();
  return (
    <span
      data-testid={testId}
      className={cn(
        "font-display font-medium uppercase leading-none select-none",
        sizes[size],
        tone === "ivory" ? "text-ivory" : "text-charcoal",
        className,
      )}
    >
      {t("brand.name")}
    </span>
  );
};
