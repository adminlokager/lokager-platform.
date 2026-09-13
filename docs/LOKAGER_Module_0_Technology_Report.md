# LOKAGER — Module 0 Technology Report
**Module:** 0 — Public Launch Page + Core Foundation
**Date:** June 2026
**Status:** Complete (see §9 for verification results)
**Live preview:** `/` (gated ceremony) · `/launch` (always-available ceremony for demos)

---

## 1. Module Summary

Module 0 delivers the official LOKAGER launch moment as a premium, single-purpose web experience:

1. **Launch screen** — LOKAGER logo, tagline, "The Beginning of a New World of Property", one large `LAUNCH LOKAGER` button, architectural gold frame, faint skyline.
2. **60-second brand film** — ivory stage, luxury instrument dial, gold numerals, 20 scenes (one every 3 s) with left/right property visuals on desktop and a single visual on mobile (see §12).
3. **Celebration** — gold confetti and soft gold glow around the logo; *"Congratulations!" → "LOKAGER IS NOW LIVE" → [LOGO] → "WHERE PROPERTY MEETS TRUST." → "A New World of Property Begins."* (9 s).
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
│       ├── components/brand/      Logo, LogoMark  ← OFFICIAL LOGO, single central location (see §5.0)
│       ├── components/layout/     Stage, Header, Footer, Meta
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

### 5.0 Official Logo — central asset location (read this before replacing the logo)

The approved identity (architectural geometric gold "L" skyline mark + charcoal LOKAGER wordmark + gold tagline) lives in **one place only**:

```
frontend/src/components/brand/
├── LogoMark.jsx   ← the gold geometric L symbol (inline SVG, faithful recreation of the approved reference)
├── Logo.jsx       ← composes LogoMark + "LOKAGER" wordmark (Montserrat 700) + tagline; variants below
└── index.js       ← re-exports { Logo, LogoMark }
```

| Prop | Values | Purpose |
|---|---|---|
| `variant` | `vertical` (default) · `horizontal` | Stacked lock-up vs. side-by-side (header) |
| `size` | `sm` · `md` · `lg` | Header → hero |
| `tone` | `charcoal` (default) · `ivory` | Wordmark colour for light vs. dark surfaces (mark stays gold) |
| `showTagline` | `true` / `false` | Show "WHERE PROPERTY MEETS TRUST." under the wordmark |

Used today in: Header (`horizontal/sm`), Launch screen (`vertical/lg`), Countdown (`LogoMark` only, small), Celebration (`LogoMark` large with gold glow), Coming Soon (`vertical/lg`). Intended for later modules: Homepage, Footer, Login, Admin, Developer portal, Mobile app (same component / same SVG).

**How to drop in the final professional asset (no redesign needed):**
1. Place the final file at `frontend/src/assets/brand/lokager-mark.svg` (or `.png`).
2. In `LogoMark.jsx`, replace the inline `<svg>` body with `<img src={mark} alt="LOKAGER" className={className} />` where `mark` is the imported file. Every screen updates automatically.
3. Replace `frontend/public/favicon.svg` (browser tab / app icon) and `frontend/public/og-image.svg` (social preview) with the supplied icon/OG exports — these are the only two additional copies, required because browsers read them outside the React bundle.

The logo is **never** embedded in backgrounds, CSS or duplicated across components.

### 5.1 Tokens
| Token | Value |
|---|---|
| Ivory (background) | `#F6F1E7` (`ivory`), `#EFEAE0` (`ivory-deep`) |
| Charcoal (text / dark stage) | `#111111` (`charcoal`), `#444444` (`charcoal-soft`) |
| Gold (accent) | `#B8894A` (`gold`), `#D4AF37` (`gold-bright`), `#F3E5AB` (`gold-light`) |
| Display font | Fraunces (variable optical size) → Playfair Display → Georgia |
| Brand wordmark font | Montserrat 700 uppercase, tracking `0.12em` |
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

## 12. Revision 2 — Final Visual Revision (60-second brand film)

**Backend: NONE (used).** The FastAPI process exists only as `GET /api/health` for platform liveness; the launch experience makes **zero** API calls.
**Database: NONE.** Nothing is read or written to MongoDB.

### 12.1 What changed
| Area | Before | Now |
|---|---|---|
| Countdown length | 30 s | **60 s**, number changes every second (60 → 1, then `0` shown for 0.7 s) |
| Countdown stage | Dark charcoal | **Ivory-light `#FBF8F2`** + charcoal + refined gold; black only in typography/button |
| Content during countdown | Rotating phrase | **20 brand scenes**, one every 3 s (LOK = WORLD → AGER = PROPERTY → … → WELCOME TO THE WORLD OF LOKAGER) |
| Canvas usage | Centre only | Desktop: centre (logo · dial · message) + **left/right storytelling panels** (framed visual on one side, chapter card on the other, alternating); mobile: one primary visual below the message |
| Dial | Plain ring | **Luxury instrument dial**: 60 tick marks (major every 5) that light up as time passes, champagne outer ring, gold progress arc |
| Finale | — | 3 → 2 → 1 numerals turn gold, scale up 9 % per step, soft glow, expanding gold ring pulse |
| Launch moment | Multicolour confetti | **Gold light sweep** (one pass, 1.7 s) then **champagne particles** only (circles, 4 gentle drifts) — no multicolour, no fireworks |
| Celebration copy | — | CONGRATULATIONS! · LOKAGER · is now live · WHERE PROPERTY MEETS TRUST. · A New World of Property Begins. (held ≈ 9 s) |
| Final screen | Coming soon | Logo · "A NEW WORLD / OF PROPERTY / BEGINS." · verticals · COMING SOON · trust line · "ROOTED IN INDIA. BUILT FOR THE WORLD." — remains, no redirect |
| Logo | Ascending bars | **Reference-matched**: tall gold slab left, two descending pillars, perspective foot; wordmark LOK**A**GER with gold house-A; tagline in charcoal |
| Typography | Fraunces + Inter + Montserrat | **Two families only**: Fraunces (editorial display, numerals, statements) + Montserrat (geometric sans: wordmark, labels, body) |

### 12.2 Files modified / added
```
MODIFIED
frontend/public/index.html                      fonts (Fraunces + Montserrat only)
frontend/public/favicon.svg, og-image.svg        new mark geometry
frontend/tailwind.config.js                      tokens: ivory.light, charcoal.soft #292725, gold.champagne; fonts; keyframes slow-zoom, pulse-ring
frontend/src/index.css                           grain opacity 4.5 % → 2.8 %
frontend/src/lib/site.js                         COUNTDOWN_MS 60000, ZERO_HOLD_MS 700, CELEBRATION_MS 9000, SCENE_COUNT 20
frontend/src/hooks/useLaunchCeremony.js          zero-hold handling
frontend/src/hooks/useGoldConfetti.js            champagne-only particles
frontend/src/locales/en/common.json              all new copy incl. 20 scenes
frontend/src/components/brand/LogoMark.jsx       new mark + BrandA (gold house-A glyph)
frontend/src/components/brand/Logo.jsx           BrandWord (LOK·A·GER) + charcoal tagline
frontend/src/components/layout/Stage.jsx         hideHeader / hideFooter props
frontend/src/components/sections/LaunchScreen.jsx, CountdownScreen.jsx, CelebrationScreen.jsx, ComingSoonScreen.jsx, VerticalList.jsx

ADDED
frontend/src/lib/scenes.js                       scene → visual map, image URLs, sceneIndexAt(), preloadScenes()
frontend/src/components/sections/CountdownDial.jsx      60-tick instrument dial (replaces CountdownRing.jsx — removed)
frontend/src/components/sections/CountdownNumber.jsx    numeral + finale pulse
frontend/src/components/sections/SceneVisual.jsx        framed visual (image / collage / line-art) with horizontal reveal
frontend/src/components/sections/SceneCard.jsx          chapter card (desktop)
frontend/src/components/sections/SceneMessage.jsx       lead / message / support with cross-fade
frontend/src/components/sections/LineArt.jsx            SVG line-art: globe, merge, world, network, identity
frontend/src/components/sections/ArchFrame.jsx          gold architectural frame + corner captions
frontend/src/components/sections/BrandStrip.jsx         BUY • SELL • … / PROPERTY • PEOPLE • POSSIBILITIES
frontend/src/components/sections/Skyline.jsx            faint geometric skyline (launch + final screens)
```

### 12.3 Assets & image formats
- **Photography (13 files)** — Unsplash CDN, requested as `?auto=format&fit=crop&w=720&h=900&q=62`. `auto=format` serves **AVIF/WebP** to browsers that support them (JPEG fallback), ~70–150 KB each, 720 × 900 (portrait, cropped by CSS to 16:9 on mobile). Total ≈ 1.5 MB spread over 60 s. Photo IDs are listed in `src/lib/scenes.js`.
- **Line-art (5 scenes)** — inline SVG, zero network cost: globe, globe + mark merge, world with India pulse, network, identity.
- **Collage (1 scene)** — reuses four already-cached photos (no extra downloads).
- **Logo** — inline SVG (`LogoMark.jsx`), favicon/OG SVG copies in `public/`.
- No video, no GIFs, no icon fonts.

### 12.4 Countdown implementation
Timestamp-based (unchanged principle): tap → `Date.now()` stored in `localStorage.lokager_launch_started_at`; a 100 ms interval recomputes `remaining = ceil((60000 − elapsed)/1000)` and `progress = elapsed/60000`. Drift-free, throttle-proof, survives reload. `ZERO_HOLD_MS = 700` lets "0" be seen before the celebration begins (celebration is triggered at 60.7 s). Numerals re-mount per second with a 0.35 s opacity/scale ease; from 3 downward the scale grows 9 % per step and the colour switches to gold.

### 12.5 Scene sequencing
`sceneIndex = min(19, floor(progress × 20))` → one scene per 3 s, derived from the same timestamp as the number (so scenes and numbers can never drift apart, and a reload resumes on the correct scene). Copy lives in `common.json → scenes[]`; visuals/sides in `scenes.js → SCENE_VISUALS[]`. Scene changes are animated with `AnimatePresence mode="wait"` (Framer Motion): visuals use a clip-path horizontal reveal (0.9 s) and a 0.45 s fade-out; messages cross-fade with a 12 px rise. Scenes 19–20 have `side: "none"` → side panels fade to 0 and the centre takes focus.

### 12.6 Animation technology
Framer Motion (already in the scaffold) for mount/unmount transitions, gold sweep and finale pulse; CSS keyframes for slow image zoom (`slow-zoom`, 4 s, GPU transform) and the India pulse ring; SVG `stroke-dashoffset` transition for the dial arc; `canvas-confetti` for champagne particles only (4 short bursts, circles). All motion is opacity/transform based — no layout-thrashing properties. `prefers-reduced-motion` collapses animations and skips particles.

### 12.7 Performance
- Rolling preload: the launch screen pre-warms scenes 1–4 after 1.2 s; during the countdown the next 3 scenes are preloaded via `new Image()` (deduplicated). A phone never downloads more than a few images ahead.
- One image per scene; only one `<img>` (or four small collage tiles) mounted at a time; unmounted images are released.
- 100 ms tick with two cheap state updates; dial is a static SVG with one animated offset.
- Fonts: two Google families with `display=swap` and preconnect.
- QA run: no console errors, zero /api calls, all images 200, no jank observed at 1920/1366/820/390.

### 12.8 Responsive behaviour
| Breakpoint | Layout |
|---|---|
| ≥ 1024 px (laptop/desktop) | 3-column grid `1fr / 600px / 1fr`; side panels sized `min(340–420px, (100dvh − 400px) × 0.72)` so they never overflow short laptops; dial `clamp(230px, 38dvh, 400px)`; numeral `clamp(5rem, 13dvh, 9rem)` |
| 768–1023 px (tablet) | Single column; one framed 16:9 visual below the message; side panels hidden |
| < 768 px (mobile) | Same as tablet with tighter spacing; 76 px launch button, corner captions hidden, brand strip wraps |

### 12.9 Dependencies
No new dependencies in this revision (Framer Motion, canvas-confetti, react-i18next already present).

### 12.10 Verification (iteration_2)
`/app/test_reports/iteration_2.json` — 11/11 scenarios passed: full 60 → 0 per-second sequence recorded with no skipped/duplicated numbers; all 20 scenes in order with correct lead/support text; all photos loaded (no 4xx); celebration at ≈ 60.7 s, Coming Soon ≈ 9 s later with no redirect; reload resume (55 → 54); gate behaviour; no horizontal overflow on 1920 / 1366 / 820 / 390; side panels only ≥ 1024 px; zero console errors; zero API calls.

## 13. Revision 3 — Launch Chime
- **What:** a subtle, premium three-note chime (C6 → E6 → G6 with a faint octave harmonic, ~2.5 s decay, peak gain 0.16) plays **exactly when the countdown reaches 0**, before the gold sweep begins. No phone vibration (device support varies, per founder decision).
- **How:** synthesised with the **Web Audio API** — no audio file, no download, no new dependency. `frontend/src/lib/chime.js` (`unlockAudio()`, `playChime()`); wired in `useLaunchCeremony.js`: the `LAUNCH LOKAGER` tap unlocks the AudioContext (browsers require a user gesture), and the 100 ms tick fires the chime once at `elapsed ≥ 60000 ms`.
- **Graceful degradation:** if the page is reloaded mid-countdown the gesture unlock is lost and the chime is silently skipped; if the device is on silent / has no Web Audio, nothing breaks. The ceremony never depends on audio.
- **Launch-day tip:** keep the phone's ringer on and media volume at ~60 %.

## 11. Repository & Commit
- Branch recommendation: `module-0-launch` → merge to `main` after founder sign-off.
- Push from the Emergent platform "Save to GitHub" action to repo `lokager-platform`.
