import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

export const Stage = ({ children, dark = false, hideHeader = false, hideFooter = false, className, testId }) => {
  const tone = dark ? "ivory" : "charcoal";
  return (
    <div
      data-testid={testId}
      className={cn("relative flex min-h-[100dvh] flex-col overflow-hidden transition-colors duration-700", dark ? "bg-charcoal" : "bg-ivory-light", className)}
    >
      {!hideHeader && <Header tone={tone} />}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 sm:px-12 py-10">{children}</main>
      {!hideFooter && <Footer tone={tone} />}
    </div>
  );
};
