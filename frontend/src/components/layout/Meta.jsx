import { useEffect } from "react";
import { SITE_URL } from "@/lib/site";
import { DEMO_MODE } from "@/lib/demo";

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

export const Meta = ({ title, description, path = "/", noIndex = false }) => {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    // Demo deployments must never be indexed and must not advertise the
    // production domain. Production (DEMO_MODE off) keeps normal SEO.
    if (DEMO_MODE) {
      setMeta('meta[name="robots"]', "content", "noindex, nofollow, noarchive, nosnippet");
      // Use the actual deployed demo origin (never lokager.com).
      const demoUrl = `${window.location.origin}${path}`;
      setMeta('meta[property="og:url"]', "content", demoUrl);
      setMeta('link[rel="canonical"]', "href", demoUrl);
    } else {
      setMeta('meta[name="robots"]', "content", noIndex ? "noindex, nofollow" : "index, follow");
      setMeta('meta[property="og:url"]', "content", `${SITE_URL}${path}`);
      setMeta('link[rel="canonical"]', "href", `${SITE_URL}${path}`);
    }
  }, [title, description, path, noIndex]);
  return null;
};
