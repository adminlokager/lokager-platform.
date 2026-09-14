import { Link, useNavigate } from "react-router-dom";
import { X, GitCompare } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/home/SectionHeader";
import { EmptyState } from "@/components/vertical/EmptyState";
import { useCompare } from "@/hooks/useCompare";
import { getPropertyById } from "@/data/verticals";
import { onImgError } from "@/data/home";

const ROWS = [
  { label: "Price", get: (p) => p.price },
  { label: "Type", get: (p) => p.propertyType },
  { label: "Bedrooms", get: (p) => (p.bedrooms > 0 ? `${p.bedrooms} BHK` : "—") },
  { label: "Area", get: (p) => p.area },
  { label: "Locality", get: (p) => `${p.locality}, ${p.city}` },
  { label: "Listed by", get: (p) => p.providerType },
  { label: "Status", get: (p) => p.listing.status },
  { label: "Freshness", get: (p) => p.listing.freshness },
];

export default function ComparePage() {
  const navigate = useNavigate();
  const { ids, remove, clear } = useCompare();
  const items = ids.map(getPropertyById).filter(Boolean);

  return (
    <PageShell
      testId="compare-page"
      title="Compare Properties — LOKAGER"
      description="Compare shortlisted properties side by side on LOKAGER — price, size, locality and more."
      path="/compare"
      crumbs={[{ label: "Home", to: "/" }, { label: "Compare" }]}
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24 lg:pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Compare" title="Properties side by side." testId="compare-header" />
          {items.length > 0 && (
            <button data-testid="compare-page-clear" onClick={clear} className="inline-flex h-11 items-center gap-2 self-start rounded-full border border-charcoal/20 px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft transition-colors hover:border-gold sm:self-auto">
              Clear all
            </button>
          )}
        </div>

        {items.length < 2 ? (
          <div className="mt-10">
            <EmptyState
              testId="compare-empty"
              title="Add at least 2 properties to compare"
              body="Use the compare icon on any property card to build a side-by-side comparison of up to 3 properties."
            />
            <div className="mt-6 flex justify-center">
              <Link to="/buy" data-testid="compare-browse" className="inline-flex h-12 items-center rounded-full bg-charcoal px-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory">Browse Properties</Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <table data-testid="compare-table" className="w-full min-w-[640px] border-separate border-spacing-x-4">
              <thead>
                <tr>
                  <th className="w-32" />
                  {items.map((p) => (
                    <th key={p.propertyId} className="text-left align-top">
                      <div className="relative overflow-hidden rounded-xl border border-charcoal/10">
                        <img src={p.image} alt={p.title} onError={onImgError} className="aspect-[4/3] w-full object-cover" />
                        <button data-testid={`compare-col-remove-${p.propertyId}`} onClick={() => remove(p.propertyId)} aria-label={`Remove ${p.title}`} className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/70 text-ivory backdrop-blur-sm">
                          <X size={14} aria-hidden="true" />
                        </button>
                      </div>
                      <p className="mt-3 font-display text-base font-medium text-charcoal">{p.title}</p>
                      <button onClick={() => navigate(`/property/${p.slug}`)} className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">View</button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, ri) => (
                  <tr key={r.label} className={ri % 2 ? "" : ""}>
                    <td className="py-3 font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal-soft/60">{r.label}</td>
                    {items.map((p) => (
                      <td key={p.propertyId + r.label} className="border-t border-charcoal/8 py-3 font-sans text-sm text-charcoal">{r.get(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageShell>
  );
}
