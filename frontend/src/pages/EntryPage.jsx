import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Meta } from "@/components/layout/Meta";
import { Ceremony } from "@/components/sections/Ceremony";

// Public demo entry at "/": the launch ceremony plays, then after the
// congratulations reveal it transitions to the property homepage at "/home".
// Uses replace navigation so Back does not force the visitor into the countdown.
export default function EntryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Meta title={t("meta.launch.title")} description={t("meta.launch.description")} path="/" noIndex />
      <Ceremony autoEnter onEnter={() => navigate("/home", { replace: true })} />
    </>
  );
}
