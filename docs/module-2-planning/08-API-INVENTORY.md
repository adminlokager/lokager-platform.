# 08 — API Inventory

> Plain language: The catalogue of "doors" (endpoints) the platform exposes, grouped by phase. This is a planning inventory — not final signatures. Style: **REST** under `/api/v1/...` (matches the current ingress rule that routes `/api` to the backend). All list endpoints are paginated; all writes are audited.

---

## 8.1 Conventions

| Convention | Value |
|------------|-------|
| Base path | `/api/v1` |
| Auth | Bearer token (Phase 2+); public reads allowed for catalogue |
| Format | JSON; ISO-8601 timestamps; money as `{value, currency, period?}` |
| Errors | Structured `{error_code, message, details}` |
| Pagination | `?page=&limit=` + `X-Total-Count` |
| Idempotency | `Idempotency-Key` on sensitive POSTs (enquiries, payments) |

---

## 8.2 Phase 1 — Core marketplace (public reads)

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/properties` | List/search properties (filters, sort, pagination) | Public |
| GET | `/properties/{slug}` | Property detail (replaces `getPropertyBySlug`) | Public |
| GET | `/properties/{slug}/similar` | Similar properties | Public |
| GET | `/listings` | List active listings (by vertical/intent) | Public |
| GET | `/listings/{id}` | Listing detail | Public |
| GET | `/verticals/{key}` | Vertical config + dataset (buy/rent/…) | Public |
| GET | `/localities` / `/localities/{id}` | Locality intelligence | Public |
| GET | `/amenities` | Amenity vocabulary | Public |
| GET | `/projects` / `/projects/{id}` | New projects | Public |
| GET | `/ads/active` | Active ad campaign for placement (replaces `AD_CAMPAIGN`) | Public |
| GET | `/search/suggest` | Typeahead suggestions | Public |
| GET | `/config/filters` | Filter definitions per vertical (replaces `VERTICALS`) | Public |

**Admin (Phase 1 foundation):**
| POST/PUT/PATCH | `/admin/properties`, `/admin/listings`, `/admin/localities`, `/admin/ads` | CRUD + moderation | Ops/Admin |

---

## 8.3 Phase 2 — Auth & accounts

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/auth/otp/request` | Request mobile/email OTP |
| POST | `/auth/otp/verify` | Verify OTP → session token |
| POST | `/auth/social/{provider}` | Social login (if enabled) |
| POST | `/auth/logout` | End session |
| POST | `/auth/refresh` | Refresh token |
| GET/PATCH | `/me` | Current user profile |
| GET | `/me/roles` | Effective roles/permissions |
| GET/POST/DELETE | `/me/saved-properties` | Account-linked shortlist (replaces `useSavedProperties`) |
| POST | `/me/saved-properties/import` | Migrate device saves on first login |
| GET/POST/DELETE | `/me/compare` | Persisted compare set (replaces `useCompare`) |
| GET/POST/PATCH | `/organisations` | Org profile & membership |

---

## 8.4 Phase 3 — Enquiries, waitlist, shortlist sharing

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/enquiries` | Express interest on a listing (consent captured) |
| GET | `/me/enquiries` | Seeker's enquiries |
| GET/PATCH | `/admin/leads`, `/admin/leads/{id}` | Lead dashboard, assignment, status |
| POST | `/waitlist` | Early-access waitlist signup |
| POST | `/shortlists` | Create shareable shortlist (returns opaque token, expiring) |
| GET | `/shortlists/{token}` | View shared shortlist (no PII in URL) |
| POST | `/shortlists/{token}/email` | Email My Shortlist (consent + verified email + rate-limited) |
| POST | `/consents` | Record explicit consent |
| POST | `/notifications/test` | Ops-only notification check |

---

## 8.5 Phase 4 — Listing onboarding & moderation

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/provider/listings` | Create draft listing |
| PUT/PATCH | `/provider/listings/{id}` | Edit draft |
| POST | `/provider/listings/{id}/submit` | Submit for review |
| POST | `/media/uploads` | Request upload (pre-signed) — see doc 11 |
| POST | `/admin/listings/{id}/approve` \| `/reject` | Moderation decisions |
| GET | `/admin/duplicates` | Suspected duplicate queue |
| POST | `/provider/orgs/onboard` | Broker/developer/vendor onboarding |
| GET | `/provider/dashboard` | Provider performance/leads |

---

## 8.6 Phase 5 — Monetisation & advertising

| Method | Path | Purpose |
|--------|------|---------|
| GET/POST/PATCH | `/admin/campaigns` | Ad campaign management |
| POST | `/admin/campaigns/{id}/creatives` | Desktop/mobile creative upload |
| POST | `/admin/campaigns/{id}/approve` | Advertiser approval |
| GET | `/admin/campaigns/{id}/report` | Lead/impression reporting |
| GET/POST | `/billing/subscriptions`, `/billing/invoices` | Packages, GST invoices (design only) |
| POST | `/payments/intent` | Payment intent (deferred, not activated) |

---

## 8.7 Phase 6 — LOKAGER Manage (future)

| Method | Path | Purpose |
|--------|------|---------|
| POST/GET | `/manage/mandates` | Owner management agreements |
| POST/GET | `/manage/leases` | Tenant + lease records |
| POST | `/manage/inspections` | Move-in/out condition reports |
| POST/GET | `/manage/tickets` | Maintenance tickets |
| POST | `/manage/tickets/{id}/quotes` | Vendor quotations |
| POST | `/manage/tickets/{id}/approve` | Owner repair approval (within limit) |
| POST | `/manage/tickets/{id}/work-order` | Work order + before/after evidence |
| GET | `/manage/owners/{id}/report` | Monthly owner report |

---

## 8.8 Phase 7 — Commercial Connect (future)

| Method | Path | Purpose |
|--------|------|---------|
| POST/GET | `/commercial/mandates` | Landlord mandates |
| POST/GET | `/commercial/requirements` | Corporate space requirements |
| POST | `/commercial/matches` | Requirement↔property matches |
| POST | `/commercial/site-visits` | Site visit scheduling |
| PATCH | `/commercial/matches/{id}/stage` | Negotiation stage |
| POST | `/commercial/proposals` | Commercial proposals + commission disclosure |

---

## 8.9 Phase 8 — Intelligence & AI (future, human-in-the-loop)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/ai/search/nl` | Natural-language search → structured filters |
| POST | `/ai/compare/summary` | Comparison summary (advisory only) |
| POST | `/ai/listings/quality` | Listing-quality assistance |
| POST | `/ai/localities/summary` | Locality summary |
| POST | `/ai/leads/prioritise` | Lead prioritisation signal |

> All AI endpoints are **advisory**; they never finalise legal, lending, valuation, verification, moderation or financial decisions without human review.

## 8.10 Pending decisions
API style confirmed as REST (recommend); GraphQL not recommended initially. Auth token strategy finalised in doc 10. Rate-limit thresholds set per endpoint in doc 13.
