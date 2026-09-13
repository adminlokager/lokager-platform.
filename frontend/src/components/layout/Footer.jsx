import { useTranslation } from "react-i18next";

export const Footer = ({ tone = "charcoal" }) => {
  const { t } = useTranslation();
  const muted = tone === "ivory" ? "text-ivory/50" : "text-charcoal-soft/70";
  return (
    <footer
      data-testid="site-footer"
      className={`relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 px-6 sm:px-12 pb-6 sm:pb-8 font-sans text-xs ${muted}`}
    >
      <span data-testid="footer-rights">{t("footer.rights", { year: new Date().getFullYear() })}</span>
      <span data-testid="footer-built" className="uppercase tracking-eyebrow">{t("footer.built")}</span>
    </footer>
  );
};
