import { Icon } from "@/components/home/Icon";

// Reusable <ServiceCategory /> chip.
export const ServiceCategory = ({ icon, label, testId }) => (
  <div
    data-testid={testId}
    className="group flex flex-col items-center gap-3 rounded-2xl border border-charcoal/10 bg-ivory-light p-5 text-center transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold/40"
  >
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/8 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ivory">
      <Icon name={icon} size={22} aria-hidden="true" />
    </span>
    <span className="font-sans text-xs font-medium text-charcoal sm:text-[13px]">{label}</span>
  </div>
);
