# LOKAGER — Module 1 Technology Report (Homepage Frontend)

**Date:** June 2026
**Scope:** Homepage frontend only. No backend, database, AI, auth, payments, OTP, maps, waitlist or transaction logic (per explicit Module 1 constraints).

---

## 1. Technology Used
- **React 18** (Create React App) with **React Router v7** (routes `/`, `/launch`, `*`).
- **Tailwind CSS** with existing LOKAGER brand tokens (ivory / charcoal / gold).
- **Framer Motion 11** for subtle scroll reveals and hero entrance choreography.
- **lucide-react** icons (no emojis).
- **sonner** for lightweight "coming soon" demo toasts.
- Fonts: **Fraunces** (display serif), **Montserrat** (sans), **IBM Plex Mono** (metrics/prices) — loaded via Google Fonts in `public/index.html`.

_No new heavyweight dependencies were added; all libraries were already present in `package.json`._

## 2. Launch → Home Persistence / Flow
- `/` = **new homepage** (default landing, always accessible, no ceremony replay).
- `/launch` = **Module 0 ceremony**, untouched, always starts fresh at the LAUNCH LOKAGER screen (rehearsal-safe, no localStorage gate).
- The ceremony's final Coming Soon screen now has an **ENTER LOKAGER** button (`data-testid="enter-lokager-button"`) that navigates to `/`.
- This design eliminates redirect loops, duplicate countdowns and unexpected launch replay: normal visitors to `/` never see the ceremony; the launch event/rehearsal uses `/launch`.

## 3. Files Created
- `src/data/home.js` — all demo/mock data (hero, tabs, trust pillars, ad campaign, categories, properties, projects, localities, intelligence, services, list types, footer links). Property records keep property identity separate from the current listing event (PROPERTY ≠ LISTING).
- `src/components/home/motion.js` — shared `Reveal` wrapper (respects reduced motion).
- `src/components/home/Icon.jsx` — string→lucide icon resolver.
- `src/components/home/SectionHeader.jsx`
- `src/components/home/SearchBar.jsx`
- `src/components/home/HeroSection.jsx`
- `src/components/home/TrustCard.jsx`, `TrustLayer.jsx`
- `src/components/home/AdShowcase.jsx`
- `src/components/home/CategoryCard.jsx`, `ExploreProperty.jsx`
- `src/components/home/PropertyCard.jsx`, `FeaturedProperties.jsx`
- `src/components/home/ProjectCard.jsx`, `NewProjects.jsx`
- `src/components/home/LocalityCard.jsx`, `LocalityIntelligence.jsx`
- `src/components/home/PropertyIntelligence.jsx`
- `src/components/home/ServiceCategory.jsx`, `LokagerServices.jsx`
- `src/components/home/ListProperty.jsx`
- `src/components/home/TrustStatement.jsx`
- `src/components/home/IndiaGlobal.jsx`
- `src/components/layout/SiteHeader.jsx` (sticky nav + mobile hamburger)
- `src/components/layout/SiteFooter.jsx` (national-brand footer)

## 4. Files Modified
- `src/pages/HomePage.jsx` — now assembles the full homepage (previously rendered the ceremony).
- `src/components/sections/ComingSoonScreen.jsx` — added ENTER LOKAGER button → `/`.
- `public/index.html` — added IBM Plex Mono to the Google Fonts link.
- `tailwind.config.js` — added `mono` font family.

_Module 0 ceremony components, hooks and `/launch` route are otherwise unchanged._

## 5. Components (reusable)
`<Logo />` (existing), `<SiteHeader />`, `<SiteFooter />`, `<SearchBar />`, `<SectionHeader />`, `<TrustCard />`, `<AdShowcase />`, `<CategoryCard />`, `<PropertyCard />`, `<ProjectCard />`, `<LocalityCard />`, `<ServiceCategory />`.

## 6. Routes
- `/` → `HomePage` (Module 1 homepage)
- `/launch` → `LaunchPage` (Module 0 ceremony, noindex)
- `*` → `NotFoundPage`

## 7. Mock Data
All illustrative data is isolated in `src/data/home.js` and clearly labelled as demo content (footer disclaimer + "Sample locality data" tags). No verification/guarantee claims ("100% verified", "LOKAGER verified", "guaranteed") are made anywhere. PropertyCards show listing **status/freshness** only. Data model keeps `propertyId` distinct from a nested `listing` object so future APIs can attach multiple listing events, price history and provider relationships to one persistent property.

## 8. Advertising / Video Implementation (`<AdShowcase />`)
- Cinematic 16:9, ~88% container width on desktop.
- Supports poster image + MP4/WebM video; custom Play/Pause + Mute/Unmute controls; advertiser name, headline, CTA, and "Advertisement" disclosure badge.
- Video never autoplays with sound (muted + paused by default, `preload="none"`, lazy).
- On video load failure the poster remains and controls hide — the homepage continues normally.
- Component props are shaped for a future ad backend (campaignId, advertiser, media, poster, CTA). The backend (campaign scheduling, targeting, impressions/clicks) is intentionally NOT built.

## 9. Responsive Testing
Verified via automated QA (iteration_7) at 1920, 430 and 390 widths: **no horizontal overflow**, all sections stack cleanly, hero/search/cards/ad showcase remain readable, mobile hamburger works. Desktop nav collapses to hamburger below `xl`.

## 10. Accessibility
- Semantic headings (single H1 in hero, H2 per section), `alt` text on all imagery, `aria-label`s on icon buttons, `sr-only` labels on search fields, visible focus via native focus rings, and `prefers-reduced-motion` respected (Framer `useReducedMotion` + global CSS rule).

## 11. SEO
- Title: "LOKAGER | Property, Homes, Land & Real Estate in India".
- Meta description, canonical, Open Graph and Twitter tags set via `<Meta />`.
- Semantic section landmarks and internal scroll navigation.

## 12. Performance Measures
- All imagery lazy-loaded below the fold (`loading="lazy"`); hero image eager.
- Ad video `preload="none"` and only loads on interaction.
- Stable aspect-ratio containers prevent layout shift.
- GPU-friendly transforms (opacity/translate/scale) only.

## 13. Known Issues / Technical Debt
- The ad showcase demo video is a public sample MP4 (Google sample bucket) — replace with real campaign media when the ad backend exists.
- Nav items and CTAs currently scroll to sections or show "coming soon" toasts; they will point to real vertical routes/flows in later modules.
- Demo imagery is Unsplash architecture; swap for licensed LOKAGER campaign assets before public launch.

## 14. Future Backend Integration Points
- Property/Listing APIs (respecting PROPERTY ≠ LISTING model), search endpoint, new-projects & locality intelligence services.
- Advertising backend (campaigns, targeting, impressions/clicks) behind `<AdShowcase />`.
- LOKAGER Services workflow (requirement → quote → scope → material spec → vendor selection → timeline → progress → completion → rating) and material sourcing — architecture prepared, not built.
- Auth / list-property / waitlist flows.

---
_Module 1 delivered frontend-only. Full QA passed at 100% (iteration_7)._
