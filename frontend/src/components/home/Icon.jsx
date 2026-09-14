import * as Lucide from "lucide-react";

// Resolve a lucide-react icon by its string name (used with mock data).
export const Icon = ({ name, ...props }) => {
  const Cmp = Lucide[name] || Lucide.Square;
  return <Cmp {...props} />;
};
