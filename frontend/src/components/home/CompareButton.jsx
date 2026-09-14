import { GitCompare } from "lucide-react";
import { toast } from "sonner";
import { useCompare } from "@/hooks/useCompare";
import { cn } from "@/lib/utils";

// Toggle a property into the compare tray (max 3).
export const CompareButton = ({ id, testId }) => {
  const { isInCompare, toggle, max } = useCompare();
  const active = isInCompare(id);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = toggle(id);
    if (!ok && !active) toast(`You can compare up to ${max} properties.`);
  };

  return (
    <button
      data-testid={testId || `compare-${id}`}
      data-active={active}
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Remove from compare" : "Add to compare"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors duration-200",
        active ? "bg-gold text-charcoal" : "bg-ivory-light/95 text-charcoal-soft hover:bg-ivory",
      )}
    >
      <GitCompare size={16} aria-hidden="true" />
    </button>
  );
};
