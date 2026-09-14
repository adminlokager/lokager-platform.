import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MapPin, BedDouble, Maximize, Building2, Clock, UserRound, Share2, ArrowLeft, Map as MapIcon } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ImageGallery } from "@/components/property/ImageGallery";
import { SaveButton } from "@/components/home/SaveButton";
import { PropertyCard } from "@/components/home/PropertyCard";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Reveal } from "@/components/home/motion";
import { getPropertyBySlug, getSimilar, VERTICALS } from "@/data/verticals";

const Spec = ({ icon: I, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-ivory-light p-4">
    <I size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
    <div>
      <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-charcoal-soft/60">{label}</p>
      <p className="mt-0.5 font-sans text-sm font-medium text-charcoal">{value}</p>
    </div>
  </div>
);

export default function PropertyDetailPage() {
  const { propertySlug } = useParams();
  const navigate = useNavigate();
  const property = getPropertyBySlug(propertySlug);

  if (!property) {
    return (
      <PageShell testId="property-not-found" title="Property not found — LOKAGER" description="This property is no longer available." path="/">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center px-5 py-32 text-center sm:px-8 lg:px-16">
          <h1 className="font-display text-3xl font-medium text-charcoal">This property isn't available</h1>
          <p className="mt-3 font-sans text-[15px] text-charcoal-soft/85">It may have been removed or the link is outdated.</p>
          <Link to="/buy" data-testid="detail-back-to-buy" className="mt-8 inline-flex h-12 items-center rounded-full bg-charcoal px-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory">Browse Properties</Link>
        </div>
      </PageShell>
    );
  }

  const crumbVertical = VERTICALS[property.category] || VERTICALS.buy;
  const similar = getSimilar(property);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: property.title, url }); return; } catch { /* cancelled */ }
    }
    try { await navigator.clipboard.writeText(url); toast("Link copied to clipboard."); } catch { toast("Could not copy link."); }
  };

  return (
    <PageShell
      testId="property-detail-page"
      title={`${property.title}, ${property.locality} ${property.city} — LOKAGER`}
      description={`${property.title} in ${property.locality}, ${property.city}. ${property.propertyType}, ${property.area}, priced ${property.price}. Illustrative demo listing on LOKAGER.`}
      path={`/property/${property.slug}`}
      crumbs={[{ label: "Home", to: "/" }, { label: crumbVertical.crumb, to: crumbVertical.route }, { label: property.title }]}
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24">
        <button data-testid="detail-back" onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft transition-colors hover:text-gold">
          <ArrowLeft size={15} aria-hidden="true" /> Back
        </button>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <ImageGallery images={property.gallery} alt={property.title} />
          </div>

          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ivory-light px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal">
              <Clock size={11} aria-hidden="true" /> {property.listing.status}
            </span>
            <h1 data-testid="detail-title" className="mt-4 font-display text-3xl font-medium leading-tight text-charcoal lg:text-4xl">{property.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 font-sans text-[15px] text-charcoal-soft/85">
              <MapPin size={16} className="text-gold" aria-hidden="true" /> {property.locality}, {property.city}
            </p>
            <p data-testid="detail-price" className="mt-5 font-mono text-3xl font-medium text-charcoal">{property.price}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button data-testid="detail-interest" onClick={() => toast("We'll connect you soon — express interest opens shortly.")} className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-charcoal px-6 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-charcoal-soft">
                Express Interest
              </button>
              <SaveButton id={property.propertyId} variant="inline" testId="detail-save" />
              <button data-testid="detail-share" onClick={share} aria-label="Share property" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-gold hover:text-gold">
                <Share2 size={17} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Spec icon={Building2} label="Type" value={property.propertyType} />
              {property.bedrooms > 0 && <Spec icon={BedDouble} label="Bedrooms" value={`${property.bedrooms} BHK`} />}
              <Spec icon={Maximize} label="Area" value={property.area} />
              <Spec icon={UserRound} label="Listed by" value={property.providerType} />
            </div>
            <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal-soft/55">{property.listing.freshness}</p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="flex flex-col gap-12">
            <section>
              <h2 className="font-display text-2xl font-medium text-charcoal">About this property</h2>
              <p className="mt-4 font-sans text-[16px] leading-[1.7] text-charcoal-soft">{property.description}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-charcoal">Amenities</h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {property.amenities.map((a) => (
                  <span key={a} data-testid={`amenity-${a}`} className="rounded-full border border-charcoal/12 bg-ivory-light px-4 py-2 font-sans text-[13px] text-charcoal-soft">{a}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-charcoal">Location</h2>
              <div data-testid="map-placeholder" className="mt-5 relative flex aspect-[16/8] w-full items-center justify-center overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/[0.04]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "linear-gradient(#11111114 1px, transparent 1px), linear-gradient(90deg, #11111114 1px, transparent 1px)", backgroundSize: "40px 40px" }} aria-hidden="true" />
                <div className="relative flex flex-col items-center text-center">
                  <MapIcon size={30} className="text-gold" aria-hidden="true" />
                  <p className="mt-3 font-sans text-sm font-medium text-charcoal">{property.locality}, {property.city}</p>
                  <p className="mt-1 font-sans text-xs text-charcoal-soft/60">Interactive map coming soon</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-charcoal/10 bg-ivory-light p-6">
              <h3 className="font-display text-lg font-medium text-charcoal">Locality snapshot</h3>
              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-charcoal-soft/85">
                {property.locality} is a sought-after part of {property.city} with growing connectivity, schools, healthcare and everyday conveniences nearby.
              </p>
              <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal-soft/50">Sample locality data</p>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <div className="mt-20">
            <SectionHeader eyebrow="You may also like" title="Similar properties." testId="similar-header" />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p, i) => (
                <Reveal key={p.propertyId} delay={(i % 3) * 0.06}>
                  <PropertyCard property={p} testId={`similar-card-${p.propertyId}`} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
