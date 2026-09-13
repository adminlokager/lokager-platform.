# LOKAGER — Module 0 Technology Report
**Module:** 0 — Public Launch Page + Core Foundation
**Date:** June 2026
**Status:** Complete (see §9 for verification results)
**Live preview:** `/` (gated ceremony) · `/launch` (always-available ceremony for demos)

---

## 1. Module Summary

Module 0 delivers the official LOKAGER launch moment as a premium, single-purpose web experience:

1. **Launch screen** — LOKAGER wordmark, tagline *"Where Property Meets Trust."*, one large `LAUNCH LOKAGER` button.
2. **30-second countdown** — charcoal stage, gold serif numerals, SVG progress ring, rotating micro-phrases (no claims).
3. **Celebration** — gold confetti, *"Congratulations!" → "LOKAGER IS NOW LIVE"* (7 s).
4. **Coming Soon** — wordmark, tagline, trust statement *"Building a more trusted property experience."*, the seven verticals (Buy · Sell · Rent · New Projects · Commercial · Land · Mortgage), minimal footer.
5. **404 page**, SEO/meta foundation, i18n scaffold, favicon/OG placeholders.

Per the founder's scope decision during kickoff, **the waitlist form, homepage sections and per-vertical Coming Soon routes were removed from Module 0**. No email/phone is collected. No fake numbers, testimonials, partner logos or verification claims appear anywhere.

---

## 2. Scope Delivered vs. Deferred

| Item | Status |
|---|---|
| Launch ceremony (`/`, `/launch`) | ✅ Delivered |
| Exact 30 s countdown, no skip | ✅ Delivered (timestamp-based, drift-free) |
| Gold celebration + "LOKAGER IS NOW LIVE" | ✅ Delivered |
| Final Coming Soon screen | ✅ Delivered |
| Once-per-browser gate (`lokager_launched_seen`) | ✅ Delivered |
| Reload resilience during countdown (`lokager_launch_started_at`) | ✅ Delivered |
| Responsive (mobile-first → desktop) | ✅ Delivered |
| Header / Footer / Stage layout / 404 | ✅ Delivered |
| SEO meta, canonical, Open Graph, robots.txt, sitemap.xml, manifest | ✅ Delivered |
| i18n structure (`react-i18next`, `src/locales/en/common.json`) | ✅ Delivered |
| Favicon / OG image placeholders (SVG, swappable) | ✅ Delivered |
| Waitlist capture (`/api/waitlist`, MongoDB) | ⏸ Deferred by founder |
| Homepage sections (Why LOKAGER, benefits, vision) | ⏸ Deferred by founder |
| Per-vertical Coming Soon routes | ⏸ Deferred by founder |
| Analytics, cookie banner, auth, listings, dashboards | ❌ Out of scope |

---

## 3. TECHNOLOGY DIFFERENCE FROM PREFERRED LOKAGER STACK

> **Acknowledged deviation.** The preferred LOKAGER stack is **React + Java Spring Boot + MySQL**. Module 0 is built on **React 18 (CRA/craco, JavaScript) + FastAPI (Python) + MongoDB** because the delivery environment ships that scaffold pre-wired to its hosting, ports and hot-reload. A second, smaller deviation: the brief asked for **Vite + TypeScript**; the founder chose to keep the existing **CRA + JavaScript** scaffold to protect reliability for launch day.

### 3.1 What is actually in use today

| Layer | Preferred | Module 0 actual | Impact today |
|---|---|---|---|
| Frontend build | Vite + TypeScript | CRA 5 (react-scripts + craco), JavaScript/JSX | Cosmetic. Same React 18/19 runtime, Router v6 API (v7 package), Tailwind, shadcn/ui, Framer Motion, react-i18next. |
| Backend | Java 17 + Spring Boot | FastAPI (Python 3.11) | **Negligible** — only `GET /api/health` exists. Frontend makes zero API calls. |
| Database | MySQL | MongoDB (connection configured, **no collections used**) | **None** — nothing is persisted in Module 0. |

### 3.2 Migration difficulty (honest estimate)

| Component | Effort | Notes |
|---|---|---|
| Frontend → Vite + TS | **Low–Medium (1–2 days)** | Move `public/index.html` → root, replace `%PUBLIC_URL%`, swap `process.env.REACT_APP_*` → `import.meta.env.VITE_*`, rename `.jsx → .tsx`, add types for the ceremony hook and i18n resources. Component code is unchanged. |
| Backend → Spring Boot | **Trivial today (hours)** | Recreate one controller: `GET /api/health`. Future modules should be written directly in Spring Boot if that decision holds. |
| MongoDB → MySQL | **Zero today** | No schema exists. The deferred `waitlist` design (`email, vertical, source, created_at, ip_hash`, unique `(email, vertical)`) maps 1:1 to a MySQL table with a composite unique key. |

### 3.3 What a Java/MySQL developer needs to know
- The frontend is fully decoupled: it reads only `REACT_APP_BACKEND_URL` and calls nothing in Module 0.
- API contract convention: every backend route is prefixed `/api`. Keep this in Spring Boot (`@RequestMapping("/api")`).
- The frontend contains **no** business logic that depends on Python or Mongo.

---

## 4. Architecture

```
/app
├── frontend/                      React 18 (CRA + craco), Tailwind, shadcn/ui, Framer Motion
│   ├── public/                    index.html (SEO/OG), favicon.svg, og-image.svg, robots.txt, sitemap.xml, manifest.json
│   └── src/
│       ├── App.js                 BrowserRouter + grain overlay
│       ├── i18n.js                react-i18next init (en only)
│       ├── locales/en/common.json All UI copy (single source of truth)
│       ├── routes/AppRoutes.jsx   "/", "/launch", "*"
│       ├── pages/                 HomePage, LaunchPage, NotFoundPage
│       ├── components/layout/     Stage, Header, Footer, Wordmark, Meta
│       ├── components/sections/   Ceremony, LaunchScreen, CountdownScreen, CountdownRing,
│       │                          CelebrationScreen, ComingSoonScreen, VerticalList, GoldRule
│       ├── hooks/                 useLaunchCeremony (state machine), useGoldConfetti
│       └── lib/                   site.js (constants), storage.js (safe localStorage), utils.js (cn)
├── backend/server.py              FastAPI — GET /api/health only
└── docs/                          This report
```

### 4.1 Ceremony state machine (`useLaunchCeremony`)
`idle → countdown → celebration → complete`

- **Timestamp-based timing.** On tap, `Date.now()` is written to `localStorage.lokager_launch_started_at`. Every 100 ms the hook recomputes `remaining = ceil((30000 − elapsed)/1000)` from that timestamp — so the countdown is exactly 30 s regardless of tab throttling, slow devices or re-renders. `setInterval` drift cannot accumulate.
- **Reload-safe.** If the page reloads mid-ceremony, the phase is re-derived from the timestamp (countdown resumes at the correct second; celebration resumes if within its 7 s window).
- **Once-per-browser.** Entering `celebration` sets `lokager_launched_seen=1`. `/` respects this flag and shows Coming Soon directly; `/launch` ignores it so the ceremony can always be rehearsed or demoed.
- **Double-tap guard.** `start()` is a no-op once a start timestamp exists.

### 4.2 Reliability decisions for launch day
- Native `<button type="button">` with `onClick` (fires on tap, click, keyboard Enter/Space); `touch-action: manipulation` disables double-tap-zoom delay; `-webkit-tap-highlight-color` removed.
- Touch target ≥ 76 px tall on mobile (88 px on desktop), full-width on small screens.
- No network dependency for any phase — the ceremony works even if the API is down.
- Fonts load via Google Fonts with `display=swap`; serif falls back to Playfair/Georgia so the wordmark never disappears.
- `prefers-reduced-motion` respected (animations collapse, confetti skipped).

---

## 5. Design System

| Token | Value |
|---|---|
| Ivory (background) | `#F6F1E7` (`ivory`), `#EFEAE0` (`ivory-deep`) |
| Charcoal (text / dark stage) | `#111111` (`charcoal`), `#444444` (`charcoal-soft`) |
| Gold (accent) | `#B8894A` (`gold`), `#D4AF37` (`gold-bright`), `#F3E5AB` (`gold-light`) |
| Display font | Fraunces (variable optical size) → Playfair Display → Georgia |
| Body font | Inter 300–600 |
| Eyebrow tracking | `0.25em` uppercase |
| Wordmark tracking | `0.3em` uppercase |
| Radius | `1rem` base; buttons pill (`rounded-full`) |
| Texture | 4.5 % SVG grain overlay for print-like depth (no gradients) |

Typography hierarchy: H1 `text-4xl sm:text-5xl lg:text-6xl`; wordmark up to `lg:text-8xl`; body `text-sm/base`.

---

## 6. SEO & Metadata
- `<title>`, description, canonical `https://lokager.com/`, Open Graph + Twitter card (SVG OG placeholder), `theme-color #F6F1E7`.
- `Meta` component updates title/description/canonical/OG per route; `/launch` and 404 are `noindex`.
- `robots.txt` (allows `/`, disallows `/launch`), `sitemap.xml` (single URL), `manifest.json`.
- All copy in `common.json` — Kannada/Hindi are a locale-file drop-in (`src/locales/kn/`, `src/locales/hi/`) plus one line in `i18n.js`.

---

## 7. Dependencies added in Module 0
| Package | Purpose |
|---|---|
| `react-i18next`, `i18next` | i18n structure |
| `canvas-confetti` | gold celebration particles |

(Framer Motion, Tailwind, shadcn/ui, React Router already present in scaffold.)

---

## 8. Storage & Privacy
- **No cookies, no analytics, no tracking pixels** added by LOKAGER code.
- Two functional `localStorage` keys only: `lokager_launched_seen`, `lokager_launch_started_at`.
- Zero personal data collected. No cookie banner needed for Module 0.

---

## 9. Verification
Automated QA run (`/app/test_reports/iteration_1.json`), desktop 1920×800 and mobile 390×844 — **11/11 scenarios passed**:

| Check | Result |
|---|---|
| Countdown timing | 30 at t≈1 s, 20 at t≈11 s, 5 at t≈26 s; celebration at t≈31.3 s (30 s + 0.7 s fade) |
| Celebration duration | exactly 7.0 s → Coming Soon at t≈38.3 s |
| Reload mid-countdown | resumed 25 → 24 (no restart) |
| Once-per-browser gate | `/` shows Coming Soon after ceremony; `/launch` fresh again after window |
| Mobile button | 76 px tall, fully visible, single tap starts countdown |
| Horizontal overflow (mobile) | none on any screen |
| 404 + return link | pass |
| Console errors | none |
| Frontend `/api` calls | zero |
| `GET /api/health` | `{"status":"ok"}` |

Manual rehearsal checklist for launch day:
1. Open `https://<domain>/launch` on the presenting device 5 minutes before; confirm the button is visible.
2. Do **not** tap until the moment. If tapped early, wait 40 s, then reload `/launch` to reset.
3. Keep the device unlocked and the browser in the foreground for the full 30 s.
4. After the ceremony, `/` will show the Coming Soon screen on that device.

---

## 10. Backlog for Module 1 (not started)
- Waitlist capture (`/api/waitlist`, unique `(email, vertical)`), per-vertical Coming Soon routes.
- Full homepage sections (Why LOKAGER, buyer/seller/developer benefits, vision).
- Analytics provider decision + consent banner.
- Final logo asset drop (replace `Wordmark` + `favicon.svg` + `og-image.svg`).
- Decision confirmation on Spring Boot/MySQL vs. FastAPI/Mongo before any persistence is written.

---

## 11. Repository & Commit
- Branch recommendation: `module-0-launch` → merge to `main` after founder sign-off.
- Push from the Emergent platform "Save to GitHub" action to repo `lokager-platform`.
