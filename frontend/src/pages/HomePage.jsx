import { useTranslation } from "react-i18next";
import { Meta } from "@/components/layout/Meta";
import { Ceremony } from "@/components/sections/Ceremony";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Meta title={t("meta.home.title")} description={t("meta.home.description")} path="/" />
      <Ceremony respectSeen />
    </>
  );
}
