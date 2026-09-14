import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Meta } from "@/components/layout/Meta";
import { Stage } from "@/components/layout/Stage";
import { GoldRule } from "@/components/sections/GoldRule";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <Meta title={t("meta.notFound.title")} description={t("meta.notFound.description")} noIndex />
      <Stage testId="not-found-page">
        <div className="flex max-w-xl flex-col items-center text-center animate-fade-up">
          <p data-testid="not-found-code" className="font-display text-7xl sm:text-8xl font-light text-gold tabular">{t("notFound.code")}</p>
          <GoldRule className="my-8" />
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal">{t("notFound.title")}</h1>
          <p className="mt-4 font-sans text-sm sm:text-base text-charcoal-soft">{t("notFound.body")}</p>
          <Link
            to="/home"
            data-testid="back-home-button"
            className="mt-10 inline-flex min-h-[56px] items-center justify-center rounded-full border border-charcoal px-8 font-sans text-sm uppercase tracking-eyebrow text-charcoal transition-[background-color,color] duration-300 hover:bg-charcoal hover:text-ivory"
          >
            {t("notFound.button")}
          </Link>
        </div>
      </Stage>
    </>
  );
}
