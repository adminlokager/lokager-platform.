import { Toaster, toast } from "sonner";
import { Meta } from "@/components/layout/Meta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
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
  const notify = (msg) => toast(msg);

  return (
    <div data-testid="lokager-homepage" className="min-h-[100dvh] bg-ivory">
      <Meta title={HOME_TITLE} description={HOME_DESC} path="/" />
      <Toaster position="bottom-center" richColors={false} />

      <SiteHeader onNotify={notify} />

      <main>
        <HeroSection onSearch={() => notify("Search results are coming soon — this is a preview.")} />
        <TrustLayer />
        <AdShowcase onCta={(c) => notify(`${c.advertiser} campaign — coming soon.`)} />
        <ExploreProperty onCategory={(c) => notify(`${c.title} — coming soon.`)} />
        <FeaturedProperties
          onProperty={(p) => notify(`${p.title} details — coming soon.`)}
          onViewAll={() => notify("Full property search is coming soon.")}
        />
        <NewProjects
          onProject={(p) => notify(`${p.name} — coming soon.`)}
          onExploreAll={() => notify("New projects browsing is coming soon.")}
        />
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
    </div>
  );
}
