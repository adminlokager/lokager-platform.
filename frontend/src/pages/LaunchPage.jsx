import { useTranslation } from "react-i18next";
import { Meta } from "@/components/layout/Meta";
import { Ceremony } from "@/components/sections/Ceremony";

export default function LaunchPage() {
  const { t } = useTranslation();
  return (
    <>
      <Meta title={t("meta.launch.title")} description={t("meta.launch.description")} path="/launch" noIndex />
      <Ceremony respectSeen={false} />
    </>
  );
}
