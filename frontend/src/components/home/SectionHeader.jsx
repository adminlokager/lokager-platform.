import { Reveal } from "@/components/home/motion";
import { cn } from "@/lib/utils";

// Reusable section heading with eyebrow + optional description.
export const SectionHeader = ({ eyebrow, title, description, align = "left", tone = "charcoal", titleAs = "h2", testId }) => {
  const centered = align === "center";
  const titleColor = tone === "ivory" ? "text-ivory" : "text-charcoal";
  const bodyColor = tone === "ivory" ? "text-ivory/80" : "text-charcoal-soft";
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
      <Reveal as={titleAs} delay={0.05} className={cn("font-display font-medium leading-[1.08] tracking-tight text-3xl sm:text-4xl lg:text-[2.75rem]", titleColor)}>
        {title}
      </Reveal>
      {description && (
        <Reveal as="p" delay={0.1} className={cn("font-sans text-[17px] sm:text-lg lg:text-xl leading-[1.6]", bodyColor)}>
          {description}
        </Reveal>
      )}
    </div>
  );
};
