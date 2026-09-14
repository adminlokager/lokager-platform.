import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PropertyCard } from "@/components/home/PropertyCard";
import { EmptyState } from "@/components/vertical/EmptyState";
import { Reveal } from "@/components/home/motion";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { getPropertyById } from "@/data/verticals";

export default function SavedPage() {
  const { ids, setIds } = useSavedProperties();
  // Resolve saved IDs to properties; silently drop removed/outdated demo IDs.
  const saved = useMemo(() => ids.map(getPropertyById).filter(Boolean), [ids]);

  return (
    <PageShell
      testId="saved-page"
      title="Saved Properties — LOKAGER"
      description="Your shortlisted properties on LOKAGER."
      path="/saved"
      crumbs={[{ label: "Home", to: "/" }, { label: "Saved Properties" }]}
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24 lg:pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Your shortlist" title="Saved properties." testId="saved-header" />
          {saved.length > 0 && (
            <button data-testid="clear-saved-button" onClick={() => setIds([])} className="inline-flex h-11 items-center gap-2 self-start rounded-full border border-charcoal/20 px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft transition-colors hover:border-red-400 hover:text-red-500 sm:self-auto">
              <Trash2 size={15} aria-hidden="true" /> Clear all
            </button>
          )}
        </div>

        {saved.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              testId="saved-empty"
              title="No saved properties yet"
              body="Tap the heart on any property to add it to your shortlist. Your picks stay here on this device."
            />
            <div className="mt-6 flex justify-center">
              <Link to="/buy" data-testid="saved-browse-button" className="inline-flex h-12 items-center rounded-full bg-charcoal px-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory">Browse Properties</Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((p, i) => (
              <Reveal key={p.propertyId} delay={(i % 3) * 0.06}>
                <PropertyCard property={p} testId={`saved-card-${p.propertyId}`} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
