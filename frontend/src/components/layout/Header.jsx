import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";

export const Header = ({ tone = "charcoal" }) => {
  const { t } = useTranslation();
  const muted = tone === "ivory" ? "text-ivory/60" : "text-charcoal-soft/70";
  return (
    <header data-testid="site-header" className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-8">
      <Logo variant="horizontal" size="sm" tone={tone} showTagline={false} testId="header-logo" />
      <span className={`hidden sm:block font-sans text-xs uppercase tracking-eyebrow ${muted}`}>{t("brand.region")}</span>
    </header>
  );
};
