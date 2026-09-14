import { TrendingUp, Train, GraduationCap, HeartPulse, Briefcase } from "lucide-react";
import { onImgError } from "@/data/home";

// Reusable <LocalityCard />. Sample/demo data — not live market data.
const Row = ({ icon: I, label, value }) => (
  <div className="flex items-start gap-2.5">
    <I size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
    <div className="min-w-0">
      <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-charcoal-soft/55">{label}</p>
      <p className="font-sans text-sm text-charcoal">{value}</p>
    </div>
  </div>
);

export const LocalityCard = ({ locality, onClick, testId }) => {
  const { name, city, avgPrice, connectivity, schools, hospitals, businessHubs, image } = locality;
  return (
    <button
      data-testid={testId}
      onClick={() => onClick?.(locality)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory-light text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_28px_70px_-38px_rgba(17,17,17,0.4)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={image} alt={`${name}, ${city}`} loading="lazy" onError={onImgError} className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-4">
          <h3 className="font-display text-xl font-medium text-ivory">{name}</h3>
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-ivory/75">{city}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-center justify-between rounded-xl bg-gold/8 px-4 py-3">
          <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal-soft/70">Avg. Price</span>
          <span className="font-mono text-base font-medium text-charcoal">{avgPrice}</span>
        </div>
        <div className="grid grid-cols-1 gap-3.5">
          <Row icon={Train} label="Connectivity" value={connectivity} />
          <Row icon={GraduationCap} label="Schools" value={schools} />
          <Row icon={HeartPulse} label="Hospitals" value={hospitals} />
          <Row icon={Briefcase} label="Business Hubs" value={businessHubs} />
        </div>
        <p className="mt-4 inline-flex items-center gap-1.5 border-t border-charcoal/8 pt-3 font-sans text-[10px] uppercase tracking-[0.12em] text-charcoal-soft/50">
          <TrendingUp size={12} aria-hidden="true" /> Sample locality data
        </p>
      </div>
    </button>
  );
};
