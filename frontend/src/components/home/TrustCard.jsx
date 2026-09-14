import { Icon } from "@/components/home/Icon";

// Reusable trust pillar card.
export const TrustCard = ({ icon, title, body, testId }) => (
  <div
    data-testid={testId}
    className="group flex h-full flex-col rounded-2xl border border-charcoal/10 bg-ivory-light p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_24px_60px_-34px_rgba(17,17,17,0.35)]"
  >
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/8 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ivory">
      <Icon name={icon} size={22} aria-hidden="true" />
    </span>
    <h3 className="mt-6 font-display text-xl font-medium text-charcoal">{title}</h3>
    <p className="mt-3 font-sans text-base leading-[1.6] text-charcoal-soft/90">{body}</p>
  </div>
);
