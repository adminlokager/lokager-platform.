import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const Row = ({ items, testId, className }) => (
  <p data-testid={testId} className={cn("flex flex-wrap items-center justify-center gap-y-1 font-sans uppercase", className)}>
    {items.map((item, i) => (
      <span key={item} className="flex items-center">
        {i > 0 && <span className="mx-2.5 sm:mx-4 h-1 w-1 rounded-full bg-gold/70" aria-hidden="true" />}
        {item}
      </span>
    ))}
  </p>
);

export const BrandStrip = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div data-testid="brand-strip" className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <Row items={t("comingSoon.verticals")} testId="brand-strip-verticals" className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-charcoal-soft/55" />
      <Row items={t("brand.pillars")} testId="brand-strip-pillars" className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] text-gold/80" />
    </div>
  );
};
