# LOKAGER — Product Requirements (living document)

## Original problem statement (condensed)
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
- Report: `/app/docs/LOKAGER_Module_0_Technology_Report.md`.

## Backlog (prioritised)
- **P0 (Module 1):** Waitlist capture (`/api/waitlist`, Mongo or MySQL per stack decision), per-vertical Coming Soon routes `/buy` … `/mortgage`.
- **P1:** Full homepage (hero, vertical tiles, Why LOKAGER, benefits, vision); final logo asset drop; analytics + consent banner.
- **P2:** Vite + TypeScript migration; Kannada/Hindi locales; Lighthouse tuning; auth/listings (later modules).

## Next tasks
1. Founder rehearsal of `/launch` on the presenting phone.
2. Push to GitHub `lokager-platform` from platform UI.
3. Confirm backend stack decision before Module 1 persistence work.
