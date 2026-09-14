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

## Module 1 — FROZEN (June 2026)
- Final features shipped & QA-passed (iteration_10, 100%): Share My Shortlist (`/saved` share → `/saved?ids=` view + save-all, invalid-ID safe) and Compare Tray (`useCompare` max 3, floating tray, `/compare` side-by-side table).
- Visual refinement locked (iteration_8 approved): section spacing, typography, grid gaps, hero 7:8, laptop nav (full ≥1280 / hamburger below), mobile. Homepage @1366 11,233→10,102px (−10.1%).
- Full handover: `/app/docs/LOKAGER_Module_1_Final_Handover.md`. Deferred: Recently Viewed, Rich Detail Media, Locality Pages, all backend.

## Backlog (prioritised)
### Module 1 next-phase (June 2026 — dual ads, verticals, detail, save) — DONE
- Phase 1 Dual Ad: `AdShowcase` serves separate desktop (2.3:1) / mobile (4:5 portrait) creatives via `useMediaQuery`; only selected video rendered; no-sound autoplay, controls, disclosure, fallback preserved. Data model = future ad-backend schema.
- Phase 2 Verticals: `/buy /rent /new-projects /commercial /land /mortgage` via config-driven `VerticalListingPage` + `FilterBar` + `EmptyState`; unique SEO, breadcrumbs, working client-side filters, coming-soon toasts.
- Phase 3 Detail: `/property/:slug` — gallery, specs, description, amenities, map placeholder, locality snapshot, similar, share, express-interest.
- Phase 4 Save: `useSavedProperties` (module-level store, localStorage, cross+same-tab sync), heart on cards/detail, header count, `/saved` page, invalid-ID safe.
- Header lockup FOUNDER-APPROVED & LOCKED (HeaderBrand: #FAF5EC-matched bg, one-line tagline). Do not alter.
- QA iteration_9: 96% → saved-count live-update bug fixed & re-verified. Zero overflow 1920/1440/1366/430/390.


- **P0 (Module 1):** Waitlist capture (`/api/waitlist`, Mongo or MySQL per stack decision), per-vertical Coming Soon routes `/buy` … `/mortgage`.
- **P1:** Full homepage (hero, vertical tiles, Why LOKAGER, benefits, vision); final logo asset drop; analytics + consent banner.
- **P2:** Vite + TypeScript migration; Kannada/Hindi locales; Lighthouse tuning; auth/listings (later modules).

## Approved future verticals (June 2026 — founder-approved, planning only)
- **LOKAGER Manage** — Residential property management for owners who can't self-manage (outstation/NRI/investor/multi-property; tenanted or vacant). Separate from LOKAGER Services (standalone painting/interiors/repairs). Future Phase 6; controlled Bengaluru/Mysuru pilot; legally gated. Do not build public pages/dashboards yet.
- **LOKAGER Commercial Connect** — Commercial leasing + business-space matchmaking (retail brands, QSR, offices, IT, banks, co-working, warehouses, logistics, tech parks, institutions). Future Phase 7; relationship-managed mandate+match model; legally gated. No third-party brand logos without written permission. Do not build public pages/dashboards yet.

## Module 2 — PLANNING ONLY (June 2026)
- Complete Module 2 planning package delivered under `/app/docs/module-2-planning/` (22 documents: master index, founder decision summary, system architecture, ER model, PROPERTY≠LISTING lifecycle, user/org model, role & permission matrix, DB decision, API inventory, frontend↔API mapping, auth options, media storage, search, security, audit-log, backup/DR, Manage architecture, Commercial Connect architecture, legal/compliance register, phased roadmap 0–8, cost register, founder-pending decision register).
- **Database recommendation:** PostgreSQL as primary system of record (firm engineering recommendation; awaiting founder approval). PostGIS for geo (later), Redis for cache/sessions, object storage + CDN for media, PG full-text search → dedicated engine only when catalogue demands.
- **Founder-approved phase order (0–8):** 0 Foundation & Compliance → 1 Core Marketplace Backend → 2 Auth & Roles → 3 Enquiries/Waitlist/Leads → 4 Listing Onboarding & Moderation → 5 Monetisation & Advertising → 6 Manage pilot → 7 Commercial Connect pilot → 8 Intelligence & AI. MVP = Phases 0–3; pre-commercial = 4–5; future = 6–8.
- **Hard guardrails (locked):** PROPERTY≠LISTING always; no "verified/guaranteed" claims until a real legally-approved verification process exists; no third-party logos without written permission; every record timestamped + status-history + user-attributed; India-first, multi-city/state/language/currency ready; do not over-engineer MVP; Module 1 stays FROZEN.
- **No implementation done.** No DB/APIs/auth/email/payments/AI/cloud accounts/keys. STOP condition: await founder approval (docs 01 & 21) before Phase 0 detailed design or any coding.
- **Early founder decisions requested (doc 21):** primary DB (PostgreSQL rec), cloud/region (India rec), auth method (Mobile OTP rec), fund-handling posture (no fund holding initially rec), meaning of "verified", contact masking.

## Module 2 — SIX EARLY DECISIONS APPROVED + PHASE 0 DESIGN DELIVERED (June 2026)
- Founder **approved all six early (⏰) decisions** for Phase 0 design only (recorded in `/app/docs/module-2-planning/22-DECISIONS-LOG.md`):
  - D1 PostgreSQL primary (PROPERTY≠LISTING, PostGIS planned, object storage for media, no dedicated search/MongoDB until justified).
  - D2 India-region hosting as a **founder architecture/risk decision — NOT an automatic DPDP mandate**; cloud provider undecided; minimise lock-in.
  - D3 Mobile OTP primary + email OTP secondary + **mandatory staff/admin 2FA** + SIM-swap/ATO protection; providers pending.
  - D4 **No fund holding** (no wallet/escrow/pooled account) without separate legal + regulated payment-partner approval.
  - D5 No "verified/guaranteed/approved" language until a real evidence-based process exists; plan evidence labels (Identity Checked, RERA Details Matched, Site Visited, Listing Recently Confirmed, Documents Submitted, Ownership Reviewed).
  - D6 Masked/routed contact by default (no public PII, consent, anti-scraping, lead attribution, reveal/dispute rules).
- Docs updated with approvals + India-region wording correction (07, 10, 13, 18, 21, 00) and new `22-DECISIONS-LOG.md`.
- **Phase 0 Detailed Design & Implementation Proposal** delivered at `/app/docs/module-2-planning/phase-0/PHASE-0-DETAILED-DESIGN.md` (architecture, illustrative PostgreSQL schema DDL, PROPERTY≠LISTING in data terms, security/audit/media design, dev/staging/prod + CI/CD plan, Module 1→API migration, Phase 1 API contracts, testing/acceptance, implementation proposal, and a coding go/no-go gate). **Awaiting founder approval before any coding.**
- Clearly-named download copies in `/app/docs/module-2-planning/delivery/`.
- **No coding/provisioning/cloud accounts/integrations performed. Module 1 remains FROZEN.**

## Module 2 planning package status
- Delivered June 2026 under `/app/docs/module-2-planning/` (22 numbered docs + Phase 0 design). Planning accepted by founder.

## Next tasks
1. Founder review + approval of Phase 0 Detailed Design (`phase-0/PHASE-0-DETAILED-DESIGN.md`), including the §0.14 coding go/no-go gate.
2. On explicit go: provision Phase 1 infra (managed PostgreSQL + object storage, India region) and build Core Marketplace Backend read APIs + admin skeleton; migrate Module 1 demo content to structured records; connect frozen frontend via feature-flagged API client (no UI change).
3. Public frontend demo: readiness scan PASS + regression QA 100% (iteration_11). Founder triggers production Deploy via platform button (agent cannot click Deploy). Current preview: https://lokager-launch.preview.emergentagent.com
4. Founder rehearsal of `/launch`; push to GitHub `lokager-platform` from platform UI.
