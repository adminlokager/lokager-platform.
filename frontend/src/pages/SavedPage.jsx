import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Trash2, Share2, BookmarkPlus } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PropertyCard } from "@/components/home/PropertyCard";
import { EmptyState } from "@/components/vertical/EmptyState";
import { Reveal } from "@/components/home/motion";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { getPropertyById } from "@/data/verticals";

export default function SavedPage() {
  const { ids, setIds } = useSavedProperties();
  const [params] = useSearchParams();
  const sharedParam = params.get("ids");
  const isShared = Boolean(sharedParam);

  const sourceIds = isShared ? sharedParam.split(",").map((s) => s.trim()).filter(Boolean) : ids;
  // Resolve to properties; silently drop removed/outdated/invalid demo IDs.
  const list = useMemo(() => sourceIds.map(getPropertyById).filter(Boolean), [sourceIds]);

  const shareShortlist = async () => {
    const url = `${window.location.origin}/saved?ids=${ids.join(",")}`;
    if (navigator.share) {
      try { await navigator.share({ title: "My LOKAGER shortlist", url }); return; } catch { /* cancelled */ }
    }
    try { await navigator.clipboard.writeText(url); toast("Shortlist link copied to clipboard."); }
    catch { toast("Could not copy link."); }
  };

  const saveAll = () => {
    const merged = Array.from(new Set([...ids, ...list.map((p) => p.propertyId)]));
    setIds(merged);
    toast("Shared properties added to your shortlist.");
  };

  return (
    <PageShell
      testId="saved-page"
      title={isShared ? "A Shared Shortlist — LOKAGER" : "Saved Properties — LOKAGER"}
      description="Your shortlisted properties on LOKAGER."
      path="/saved"
      crumbs={[{ label: "Home", to: "/home" }, { label: isShared ? "Shared Shortlist" : "Saved Properties" }]}
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24 lg:pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={isShared ? "Shared with you" : "Your shortlist"}
            title={isShared ? "A shared shortlist." : "Your saved properties."}
            description={isShared ? "Someone shared these properties with you. Save them to your own shortlist to keep them." : undefined}
            titleAs="h1"
            testId="saved-header"
          />
          {!isShared && ids.length > 0 && (
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button data-testid="share-shortlist-button" onClick={shareShortlist} className="inline-flex h-11 items-center gap-2 rounded-full bg-charcoal px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-charcoal-soft">
                <Share2 size={15} aria-hidden="true" /> Share Shortlist
              </button>
              <button data-testid="clear-saved-button" onClick={() => setIds([])} className="inline-flex h-11 items-center gap-2 rounded-full border border-charcoal/20 px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft transition-colors hover:border-red-400 hover:text-red-500">
                <Trash2 size={15} aria-hidden="true" /> Clear
              </button>
            </div>
          )}
          {isShared && list.length > 0 && (
            <button data-testid="save-all-button" onClick={saveAll} className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-charcoal px-6 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-charcoal-soft sm:self-auto">
              <BookmarkPlus size={15} aria-hidden="true" /> Save all to my shortlist
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              testId="saved-empty"
              title={isShared ? "This shared shortlist is empty" : "No saved properties yet"}
              body={isShared ? "The link may be outdated or the properties are no longer available." : "Tap the heart on any property to add it to your shortlist. Your picks stay here on this device."}
            />
            <div className="mt-6 flex justify-center">
              <Link to="/buy" data-testid="saved-browse-button" className="inline-flex h-12 items-center rounded-full bg-charcoal px-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory">Browse Properties</Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
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
