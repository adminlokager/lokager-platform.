// Environment-specific demo settings. DEMO_MODE is ON by default and can be
// turned off for production by setting REACT_APP_DEMO_MODE=false. Controls
// search-engine protection (noindex) and the visible demo indicator.
export const DEMO_MODE = process.env.REACT_APP_DEMO_MODE !== "false";
export const DEMO_LABEL = "LOKAGER Product Demo — Illustrative information only";
