# 09 — Module 1 Frontend-to-API Mapping

> Plain language: Module 1's frontend currently reads from local demo files and browser storage. This maps each existing "data seam" to the future API so Module 1 can be connected with **minimal, non-breaking** changes when the founder approves. Module 1 stays frozen until then.

---

## 9.1 Mapping table

| Module 1 seam (file) | What it does today | Future API | Phase | Change type |
|----------------------|--------------------|-----------|-------|-------------|
| `getPropertyBySlug(slug)` (`data/verticals.js`) | Finds a property in an in-memory array | `GET /api/v1/properties/{slug}` | 1 | Swap sync lookup for fetch |
| `getAllProperties()` / `getPropertyById()` | In-memory list | `GET /api/v1/properties` | 1 | Fetch + pagination |
| `getSimilar(property)` | Filters array by city/type | `GET /api/v1/properties/{slug}/similar` | 1 | Fetch |
| `applyFilters(config, values)` (`data/verticals.js`) | Client-side filter of dataset | `GET /api/v1/properties?vertical=&filters...` | 1 | Server-side filtering |
| `VERTICALS` config | Hard-coded vertical + filter defs | `GET /api/v1/config/filters` + `/verticals/{key}` | 1 | Config from API (or keep static + data from API) |
| `AD_CAMPAIGN` + `resolveAdCreative()` (`data/home.js`) | Static demo campaign, desktop/mobile variant | `GET /api/v1/ads/active` | 1 (schema), 5 (ops) | Fetch active campaign |
| `PROPERTIES`, `PROJECTS`, `LOCALITIES` (`data/home.js`) | Homepage demo arrays | `GET /properties?featured=`, `/projects`, `/localities` | 1 | Fetch |
| `useSavedProperties()` (`hooks/`) | `localStorage` shortlist + cross-tab sync | `GET/POST/DELETE /api/v1/me/saved-properties` (logged-in); keep localStorage for guests | 2 | Hybrid: device for guests, API when logged in |
| `useCompare()` (`hooks/`) | In-memory max-3 compare | `GET/POST/DELETE /api/v1/me/compare` (optional persist) | 2 | Optional server persist |
| Shared shortlist `?ids=` URL (`/saved?ids=`) | IDs in query string | `POST /api/v1/shortlists` → opaque token; `GET /shortlists/{token}` | 3 | Token-based, expiring, no PII |
| "Express interest" CTA (PropertyDetail) | No-op / toast today | `POST /api/v1/enquiries` (consent captured) | 3 | Wire to backend |
| "Coming soon" waitlist CTAs | Toast today | `POST /api/v1/waitlist` | 3 | Wire to backend |
| `onImgError` / `IMG_FALLBACK` | Static fallback | Remains client-side; media via CDN URLs | 1 | Unchanged |

---

## 9.2 Recommended integration approach (when approved)

1. **Introduce an API client layer** (e.g., `src/lib/api.js`) so components call functions with identical shapes to today's helpers — minimal component churn.
2. **Keep the same function names/signatures** where possible (`getPropertyBySlug` becomes async, returns same shape) so JSX barely changes.
3. **Guest-first**: saves/compare keep working anonymously; on login, device data migrates via `POST /me/saved-properties/import`.
4. **Feature-flag** the switch from demo data → API so Module 1 can be validated in staging before flipping in production.
5. **Preserve the frozen design** — this is a data-source swap, not a redesign.

---

## 9.3 Data-shape contract (keep frontend stable)

The API responses should mirror the current object shapes to avoid UI rework:

| Field group | Current shape (keep) |
|-------------|----------------------|
| Property card | `{ propertyId, title, locality, city, price, propertyType, bedrooms, area, providerType, listing:{status, freshness}, image, slug }` |
| Detail extras | `{ gallery[], amenities[], description }` |
| Project | `{ id, name, developer, location, city, startingPrice, configuration, status, possessionYear, image }` |
| Ad campaign | `{ campaignId, advertiserName, campaignTitle, campaignCopy, ctaText, ctaHref, disclosure, desktopImage/Poster/Video, mobileImage/Poster/Video }` |

> `price`/`freshness` are presentation strings today; the API should return **structured** values (`price_value`, `currency`, timestamps) plus optional pre-formatted display strings, so the frontend can keep rendering as-is while gaining real data.

## 9.4 Pending decisions
- Whether vertical/filter config stays static in frontend or moves to API (recommend: keep static config, fetch data — smaller change).
- Whether compare persists server-side (recommend: keep transient at launch).
