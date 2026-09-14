import { Reveal } from "@/components/home/motion";
import { cn } from "@/lib/utils";

// Reusable section heading with eyebrow + optional description.
export const SectionHeader = ({ eyebrow, title, description, align = "left", tone = "charcoal", testId }) => {
  const centered = align === "center";
  const titleColor = tone === "ivory" ? "text-ivory" : "text-charcoal";
  const bodyColor = tone === "ivory" ? "text-ivory/70" : "text-charcoal-soft/85";
  return (
    <div
      data-testid={testId}
      className={cn("flex flex-col gap-4", centered ? "items-center text-center mx-auto max-w-3xl" : "items-start max-w-3xl")}
    >
      {eyebrow && (
        <Reveal as="span" className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" delay={0.05} className={cn("font-display font-medium leading-[1.08] tracking-tight text-3xl sm:text-4xl lg:text-[2.75rem]", titleColor)}>
        {title}
      </Reveal>
      {description && (
        <Reveal as="p" delay={0.1} className={cn("font-sans text-base sm:text-lg leading-relaxed", bodyColor)}>
          {description}
        </Reveal>
      )}
    </div>
  );
};
