import { Toaster, toast } from "sonner";
import { Meta } from "@/components/layout/Meta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CompareTray } from "@/components/compare/CompareTray";

// Shared page shell for all non-home routes: header + toaster + breadcrumbs +
// footer + SEO meta. Keeps every vertical/detail page consistent.
export const PageShell = ({ title, description, path, crumbs, children, testId }) => {
  const notify = (msg) => toast(msg);
  return (
    <div data-testid={testId} className="min-h-[100dvh] bg-ivory">
      <Meta title={title} description={description} path={path} />
      <Toaster position="bottom-center" />
      <SiteHeader onNotify={notify} />
      <DemoBanner />
      {crumbs && <Breadcrumbs items={crumbs} />}
      <main>{typeof children === "function" ? children(notify) : children}</main>
      <SiteFooter onNotify={notify} />
      <CompareTray />
    </div>
  );
};
