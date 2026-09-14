import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Meta } from "@/components/layout/Meta";
import { Ceremony } from "@/components/sections/Ceremony";

// Public demo entry at "/": the launch ceremony plays and remains on the
// congratulations reveal. The visitor must click ENTER LOKAGER to reach /home.
// No automatic navigation. Replace navigation keeps Back from restarting it.
export default function EntryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const enteredRef = useRef(false);
  const handleEnter = () => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    navigate("/home", { replace: true });
  };
  return (
    <>
      <Meta title={t("meta.launch.title")} description={t("meta.launch.description")} path="/" noIndex />
      <Ceremony onEnter={handleEnter} />
    </>
  );
}
