import { MapPin, Building2 } from "lucide-react";
import { onImgError } from "@/data/home";

// Reusable <ProjectCard /> for new project launches.
export const ProjectCard = ({ project, onClick, testId }) => {
  const { name, developer, location, startingPrice, configuration, status, image } = project;
  return (
    <article
      data-testid={testId}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_28px_70px_-38px_rgba(17,17,17,0.4)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={image} alt={`${name} by ${developer}`} loading="lazy" onError={onImgError} className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
        <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal">{status}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-soft/70">
          <Building2 size={13} className="text-gold" aria-hidden="true" /> {developer}
        </p>
        <h3 className="mt-2 font-display text-xl font-medium text-charcoal">{name}</h3>
        <p className="mt-1 flex items-center gap-1.5 font-sans text-sm text-charcoal-soft/80">
          <MapPin size={14} className="text-gold" aria-hidden="true" /> {location}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-charcoal/8 pt-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-charcoal-soft/60">Starting</p>
            <p className="mt-0.5 font-mono text-base font-medium text-charcoal">{startingPrice}</p>
          </div>
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-charcoal-soft/60">Config</p>
            <p className="mt-0.5 font-sans text-sm font-medium text-charcoal">{configuration}</p>
          </div>
        </div>
        <button
          data-testid={`${testId}-explore`}
          onClick={() => onClick?.(project)}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full border border-charcoal/20 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 hover:border-gold hover:bg-charcoal hover:text-ivory"
        >
          Explore Project
        </button>
      </div>
    </article>
  );
};
