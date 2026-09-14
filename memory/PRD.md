# LOKAGER — Product Requirements (living document)

## Current approved requirements (supersede historical implementations below)
- Premium public launch site for lokager.com, a trust-first, India-first PropTech brand. One-tap manual launch is essential for the founder's mother presenting on a phone.
- `/` and `/launch` ALWAYS begin at LAUNCH LOKAGER; no auto-start, saved-state gate or reload resume.
- 60-second countdown, 20 cinematic scenes at approximately 3-second intervals, zero hold and chime, then 9-second celebration and final Coming Soon screen.
- Preserve the existing ivory/charcoal/gold palette, page layouts, animations, routes and approved copy.
- Use the supplied complete logo artwork exactly as provided: no redrawing, recolouring, cropping, background removal or splitting out the wordmark. Keep aspect ratio locked and responsive sizing/alignment on desktop/mobile.
- One reusable logo asset/component; final Canva SVG can be substituted later without redesigning layouts. Current approved attachment is WebP, not SVG.
- Module 0 remains frontend-only: no forms, auth, listings, waitlist, backend/DB usage or mocked integrations. ChatGPT integration remains paused pending explicit scope/approval.

## Original problem statement (historical, condensed)
Premium public launch site for lokager.com, a trust-first PropTech brand (India-first). Module 0 scope was narrowed by the founder at kickoff to the **official launch ceremony only**: `LAUNCH LOKAGER` button → exact 30 s countdown → gold celebration "CONGRATULATIONS! LOKAGER IS NOW LIVE" → final premium Coming Soon screen. No forms, no backend/database usage, no skip button, no fake data. Tagline: "Where Property Meets Trust." Trust language: "Building a more trusted property experience." Launch will be performed by the founder's mother on a phone → one-tap reliability is the top priority.

## User personas
- **Founder / presenter** — needs a flawless, elegant, one-tap launch moment on mobile.
- **Public visitor** — lands on lokager.com and sees a premium Coming Soon screen with the brand promise.
- **Future dev (Java/MySQL)** — needs a clean, documented foundation to extend (see docs/report).

## Core requirements (static)
- Palette ivory `#F6F1E7` / charcoal `#111111` / gold `#B8894A`; Fraunces display + Inter body.
- Mobile-first responsive; subtle motion only; no gradients/cartoon icons/fake stats.
- Ceremony once per browser (`lokager_launched_seen`), `/launch` always available.
- i18n-ready (react-i18next, `en.json`), SEO meta, 404, favicon/OG placeholders.
- Mandatory Module Technology Report with honest "TECHNOLOGY DIFFERENCE" section.

## Implemented (June 2026 — Module 0)
- Routes `/`, `/launch`, `*` (404). Ceremony state machine (`useLaunchCeremony`) with timestamp-based 30 s countdown, reload resilience, once-per-browser gate.
- Screens: Launch, Countdown (dark stage, SVG ring), Celebration (canvas-confetti gold), Coming Soon (verticals list), 404.
- Layout: Stage, Header, Footer, Wordmark, Meta; Tailwind tokens; grain texture.
- SEO: index.html meta/OG/canonical, robots.txt, sitemap.xml, manifest.json, favicon.svg, og-image.svg.
- Backend trimmed to `GET /api/health` (no DB usage).
- Official logo identity implemented as a single central component (`src/components/brand/Logo.jsx` + `LogoMark.jsx`): gold geometric L skyline mark, Montserrat wordmark, gold tagline. Used in header, launch, countdown, celebration and coming soon. Swap instructions in the report §5.0.
- Celebration sequence now: Congratulations! → LOKAGER IS NOW LIVE → logo with gold glow → tagline → "A New World of Property Begins." (9 s).
- Revision 2 (June 2026): 60 s brand film (20 scenes × 3 s), ivory countdown stage with 60-tick instrument dial, desktop left/right storytelling panels, mobile single visual, champagne-only celebration, final screen with "A NEW WORLD OF PROPERTY BEGINS." Logo re-matched to the founder's reference (tall slab + descending pillars, gold house-A in LOKAGER). Two font families: Fraunces + Montserrat. Verified 11/11 in iteration_2.
- Revision 3: subtle Web Audio chime (C6-E6-G6) exactly at 0, unlocked by the launch tap; no vibration. Founder decisions: logo swap only when the final Canva asset is uploaded; waitlist + vertical pages deferred to tomorrow.
- Revision 4 (bug fix): removed all localStorage gating/resume — `/` and `/launch` always stop on the LAUNCH LOKAGER screen; countdown starts only on tap; double-tap guarded; refresh returns to opening screen. Verified iteration_3.
- Revision 5: wordmark rendered as one generated SVG (perfect baseline), cinematic side panels 61–71 % of viewport on both sides, no scroll at 1920/1440/1366. Verified iteration_4 + re-measure.
- Report: `/app/docs/LOKAGER_Module_0_Technology_Report.md`.

## Implemented (June 2026 — Module 1: Homepage frontend)
- New homepage at `/` (frontend-only). Ceremony moved to `/launch` (untouched); its final Coming Soon screen has an ENTER LOKAGER button → `/`. No redirect loops / duplicate countdowns.
- 14 sections built with reusable components: sticky SiteHeader + mobile hamburger, hero + tabbed SearchBar, 4 trust pillars (Better Information / Smarter Comparisons / Fresher Listings / Trusted Connections), huge `<AdShowcase />` (16:9, image+video, play/pause/mute, sponsored disclosure, no sound autoplay, poster fallback), 6 explore category cards, 6 featured PropertyCards, 3 ProjectCards, 3 locality intelligence cards, Property Intelligence (6 Coming Soon), LOKAGER Services (12 chips, Coming Soon), List/Sell, Trust Statement, India→Global, national-brand SiteFooter.
- No verification/guarantee claims anywhere; demo data isolated in `src/data/home.js` with PROPERTY≠LISTING model. IBM Plex Mono added for metrics.
- QA: iteration_7 passed 100% (all sections, search interactions, ad controls + fallback, launch→home flow, no horizontal overflow at 1920/430/390, no console errors). Report: `/app/docs/LOKAGER_Module_1_Technology_Report.md`.

## Module 1 refinement (June 2026 — founder design correction)
- Header logo rebuilt as `HeaderBrand.jsx`: exact wordmark from artwork (CSS-cropped, full width shown, baked tagline clipped) + crisp re-typeset readable tagline; ~184px desktop / 162 tablet / 144 mobile; header 86-92px; clear on transparent + sticky; no nav collision.
- Content container widened 1280→1600px, desktop side padding 64px, section vertical spacing reduced ~18%. Ad banner widened to 92vw / max 1760px, cinematic 2.3:1 desktop (16:11 mobile), stronger dark gradient behind text, controls+fallback preserved. Body/section copy 17-20px with deeper charcoal + 1.6 line-height. Footer logo on ivory badge.
- Added `onImgError` fallback across all remote images; swapped 2 dead Unsplash URLs. QA: iteration_8 regression PASS (zero horizontal overflow at 1920/1440/1366/430/390, logo/nav/ad/search/cards/launch-flow all good, 0 broken images).
- OUTSTANDING (founder): supply a transparent SVG / wordmark-only logo asset for pixel-perfect header lockup; interim uses CSS-cropped raster + live tagline.

## Backlog (prioritised)
- **P0 (Module 1):** Waitlist capture (`/api/waitlist`, Mongo or MySQL per stack decision), per-vertical Coming Soon routes `/buy` … `/mortgage`.
- **P1:** Full homepage (hero, vertical tiles, Why LOKAGER, benefits, vision); final logo asset drop; analytics + consent banner.
- **P2:** Vite + TypeScript migration; Kannada/Hindi locales; Lighthouse tuning; auth/listings (later modules).

## Next tasks
1. Founder rehearsal of `/launch` on the presenting phone.
2. Push to GitHub `lokager-platform` from platform UI.
3. Confirm backend stack decision before Module 1 persistence work.
