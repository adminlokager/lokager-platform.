import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/home/SectionHeader";
import { FilterBar } from "@/components/vertical/FilterBar";
import { EmptyState } from "@/components/vertical/EmptyState";
import { PropertyCard } from "@/components/home/PropertyCard";
import { ProjectCard } from "@/components/home/ProjectCard";
import { Reveal } from "@/components/home/motion";
import { VERTICALS, applyFilters } from "@/data/verticals";

export default function VerticalListingPage({ vertical }) {
  const config = VERTICALS[vertical];
  const [values, setValues] = useState({});

  const onChange = (key, value) => setValues((v) => ({ ...v, [key]: value }));
  const onClear = () => setValues({});
  const activeCount = Object.values(values).filter(Boolean).length;

  const results = useMemo(() => applyFilters(config, values), [config, values]);

  return (
    <PageShell
      testId={`vertical-page-${config.key}`}
      title={config.metaTitle}
      description={config.metaDesc}
      path={config.route}
      crumbs={[{ label: "Home", to: "/" }, { label: config.crumb }]}
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24 lg:pt-10">
        <SectionHeader eyebrow={config.eyebrow} title={config.heading} description={config.sub} testId={`${config.key}-header`} />

        <div className="mt-8 lg:mt-10">
          <FilterBar filters={config.filters} values={values} onChange={onChange} onClear={onClear} activeCount={activeCount} />
        </div>

        <p data-testid="results-count" className="mt-8 font-sans text-sm text-charcoal-soft/80">
          {results.length} {results.length === 1 ? (config.cardType === "project" ? "project" : "property") : (config.cardType === "project" ? "projects" : "properties")} found
        </p>

        {results.length === 0 ? (
          <div className="mt-6">
            <EmptyState onReset={activeCount > 0 ? onClear : undefined} />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item, i) => (
              <Reveal key={item.propertyId || item.id} delay={(i % 3) * 0.06}>
                {config.cardType === "project" ? (
                  <ProjectCard project={item} testId={`project-card-${item.id}`} />
                ) : (
                  <PropertyCard property={item} testId={`property-card-${item.propertyId}`} />
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
