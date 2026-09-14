import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Meta } from "@/components/layout/Meta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CompareTray } from "@/components/compare/CompareTray";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustLayer } from "@/components/home/TrustLayer";
import { AdShowcase } from "@/components/home/AdShowcase";
import { ExploreProperty } from "@/components/home/ExploreProperty";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { NewProjects } from "@/components/home/NewProjects";
import { LocalityIntelligence } from "@/components/home/LocalityIntelligence";
import { PropertyIntelligence } from "@/components/home/PropertyIntelligence";
import { LokagerServices } from "@/components/home/LokagerServices";
import { ListProperty } from "@/components/home/ListProperty";
import { TrustStatement } from "@/components/home/TrustStatement";
import { IndiaGlobal } from "@/components/home/IndiaGlobal";

const HOME_TITLE = "LOKAGER | Property, Homes, Land & Real Estate in India";
const HOME_DESC = "Discover homes, land, commercial property and new projects with LOKAGER — a smarter property platform built around trust, information and better decisions.";

export default function HomePage() {
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);

  return (
    <div data-testid="lokager-homepage" className="min-h-[100dvh] bg-ivory">
      <Meta title={HOME_TITLE} description={HOME_DESC} path="/home" />
      <Toaster position="bottom-center" />

      <SiteHeader onNotify={notify} />
      <DemoBanner />

      <main>
        <HeroSection onSearch={() => navigate("/buy")} />
        <TrustLayer />
        <AdShowcase onCta={(c) => notify(`${c.advertiserName} campaign — coming soon.`)} />
        <ExploreProperty onCategory={(c) => navigate(`/${c.id}`)} />
        <FeaturedProperties />
        <NewProjects onExploreAll={() => navigate("/new-projects")} />
        <LocalityIntelligence onLocality={(l) => notify(`${l.name} intelligence — coming soon.`)} />
        <PropertyIntelligence />
        <LokagerServices onExplore={() => notify("LOKAGER Services is coming soon.")} />
        <ListProperty
          onList={() => notify("Property listing opens soon on LOKAGER.")}
          onPartnership={() => notify("Developer partnerships — coming soon.")}
        />
        <TrustStatement />
        <IndiaGlobal />
      </main>

      <SiteFooter onNotify={notify} />
      <CompareTray />
    </div>
  );
}
