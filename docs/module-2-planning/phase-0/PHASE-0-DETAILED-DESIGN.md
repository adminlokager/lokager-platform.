# Phase 0 — Detailed Design & Implementation Proposal

> **Status:** Design proposal for founder approval. **No coding, no provisioning, no cloud accounts, no integrations.** Incorporates the six approved decisions (see `../22-DECISIONS-LOG.md`). Module 1 remains FROZEN.
>
> **Purpose of Phase 0:** produce the concrete, buildable design that Phase 1 (Core Marketplace Backend) will implement — final architecture, PostgreSQL schema, PROPERTY≠LISTING lifecycle in DDL terms, security architecture, audit-log strategy, media-storage design, environment plan — plus the implementation proposal and the exact gate that must be approved before Phase 1 coding starts.

---

## 0.1 Scope of Phase 0 (design only)

| Deliverable | Output | Coding? |
|-------------|--------|---------|
| Final architecture confirmation | This document §0.2 | No |
| PostgreSQL schema design | §0.4 (illustrative DDL) | No |
| PROPERTY ≠ LISTING lifecycle (data terms) | §0.5 | No |
| Security architecture (concrete) | §0.6 | No |
| Audit-log strategy (table design) | §0.7 | No |
| Media-storage design | §0.8 | No |
| Environment & delivery plan (dev/staging/prod, CI/CD) | §0.9 | No (plan only) |
| Module 1 → API migration plan | §0.10 | No |
| Phase 1 API contracts (frozen for build) | §0.11 | No |
| Testing & acceptance strategy | §0.12 | No |
| Implementation proposal + gate | §0.13–0.14 | No |

---

## 0.2 Confirmed architecture (from approved decisions)

- **System of record:** managed **PostgreSQL** (D1). Single database; no MongoDB, no dedicated search engine yet.
- **Geospatial:** **PostGIS** planned; coordinate columns designed now, extension enabled when maps/geo introduced (Phase 1/2).
- **Media:** cloud **object storage + CDN** (D1); DB stores only metadata + object keys.
- **Search:** PostgreSQL indexes + full-text (`tsvector`) for Phase 1; graduate later only if justified.
- **Cache/sessions:** Redis (introduced Phase 2/3).
- **Hosting:** **India region** as a founder architecture/risk decision — **not** asserted as an automatic DPDP mandate (D2); subject to legal advice, transfer rules, payment-provider needs, and future international expansion. **Cloud provider undecided; services designed to minimise lock-in.**
- **App tier:** stateless API under `/api/v1` (matches current ingress routing of `/api` → backend), horizontally scalable.
- **Cross-cutting:** every record has `id`, `created_at`, `updated_at`, `status`, status-history and responsible-user attribution.

---

## 0.3 Design conventions

| Area | Convention |
|------|------------|
| Identifiers | UUID primary keys; human-facing codes (e.g., `PR-1001`, `LS-88121`) kept as separate unique columns |
| Timestamps | `timestamptz`, UTC; `created_at`, `updated_at` on every table |
| Attribution | `created_by`, `updated_by` referencing `users.id` (nullable for system) |
| Soft state | Prefer `status` + history over hard deletes for records with legal/audit value |
| Money | `numeric(14,2)` value + `currency` (ISO) + optional `period` (e.g., month) — never floats, never a display string |
| Enums | Postgres enums or reference tables for controlled vocabularies |
| Localisation | `language`, `city`, `state`, `currency` as first-class columns |
| Migrations | Versioned, forward-only, rehearsed on staging (§0.9) |

---

## 0.4 PostgreSQL schema design (Phase 1 core — illustrative DDL)

> Illustrative for review; final column tuning happens at build. Reference tables (amenities, localities) and enums shown compactly.

```sql
-- LOCALITY
CREATE TABLE localities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  avg_price_note TEXT,          -- illustrative context, not live market data
  connectivity TEXT, schools TEXT, hospitals TEXT,
  business_hubs TEXT, lifestyle TEXT, infrastructure TEXT,
  -- geo added with PostGIS later: geom GEOGRAPHY(Point,4326)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- PROPERTY (persistent real-world asset)
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE,                       -- e.g. PR-1001
  slug TEXT UNIQUE NOT NULL,              -- powers /property/:slug
  title TEXT NOT NULL,
  property_type TEXT NOT NULL,            -- Apartment, Villa, Plot, Office...
  bedrooms INT DEFAULT 0,
  area_value NUMERIC(12,2), area_unit TEXT,   -- sq.ft / acre
  locality_id UUID REFERENCES localities(id),
  geo_lat NUMERIC(9,6), geo_lng NUMERIC(9,6), -- nullable until geocoding
  status TEXT NOT NULL DEFAULT 'active',       -- active / archived (draft handled pre-publish)
  created_by UUID, updated_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AMENITY (reference) + join
CREATE TABLE amenities (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), key TEXT UNIQUE, label TEXT);
CREATE TABLE property_amenities (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id),
  PRIMARY KEY (property_id, amenity_id)
);

-- LISTING (time-bound marketing event on a property)
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE,                       -- e.g. LS-88121
  property_id UUID NOT NULL REFERENCES properties(id),
  provider_user_id UUID,                  -- FK -> users (Phase 2); nullable in Phase 1 admin-seeded
  provider_org_id UUID,                   -- nullable
  provider_type TEXT,                     -- Owner / Broker / Developer (display)
  intent TEXT NOT NULL,                   -- sale / rent / lease
  price_value NUMERIC(14,2), currency TEXT DEFAULT 'INR', price_period TEXT, -- month for rent
  status TEXT NOT NULL DEFAULT 'draft',   -- draft/in_review/published/paused/expired/closed/rejected
  published_at TIMESTAMPTZ, expires_at TIMESTAMPTZ,
  created_by UUID, updated_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_listings_property ON listings(property_id);
CREATE INDEX idx_listings_status_published ON listings(status, published_at);

-- MEDIA (property- and listing-level; binary lives in object storage)
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  listing_id UUID REFERENCES listings(id),
  campaign_id UUID,                       -- FK -> ad campaigns
  kind TEXT NOT NULL,                     -- image / video / document
  object_key TEXT NOT NULL,               -- storage pointer
  variants JSONB,                         -- thumbnail/card/hero/poster keys
  is_public BOOLEAN NOT NULL DEFAULT false,
  moderation_state TEXT DEFAULT 'pending',
  uploaded_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- PROPERTY HISTORY (append-only business timeline)
CREATE TABLE property_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id),
  event_type TEXT NOT NULL,               -- listing_added / price_changed / status_changed / media_updated
  detail JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor_user_id UUID
);
-- No UPDATE/DELETE permitted (enforced via role grants).

-- ADVERTISEMENT CAMPAIGN + creatives (mirrors current AD_CAMPAIGN shape)
CREATE TABLE ad_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE, advertiser_name TEXT, title TEXT, copy TEXT,
  cta_text TEXT, cta_href TEXT, disclosure TEXT DEFAULT 'Advertisement',
  active BOOLEAN DEFAULT false, priority INT DEFAULT 1,
  start_date DATE, end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE ad_creatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES ad_campaigns(id) ON DELETE CASCADE,
  viewport TEXT NOT NULL,                 -- desktop / mobile
  image_key TEXT, poster_key TEXT, video_key TEXT
);
```

**Freshness** (`"Added 1 day ago"`) is **computed** from `published_at`/`updated_at`, never stored as marketing text.

---

## 0.5 PROPERTY ≠ LISTING lifecycle (data terms)

| Rule | Enforcement in schema |
|------|-----------------------|
| One property, many listings | `listings.property_id` FK; no listing exists without a property |
| Re-listing keeps history | New `listings` row (new `id`); old rows retained as `closed`/`expired` |
| Price/status/media changes logged | Trigger/app writes to `property_history` (append-only) |
| A property may be active with no live listing | `properties.status='active'` with zero `published` listings is valid |
| Duplicate handling | Suspected duplicates flagged for staff (Phase 4); linked to one property, not duplicated |

Listing status machine (see `../04-PROPERTY-VS-LISTING-LIFECYCLE.md`): `draft → in_review → published ↔ paused/updated → expired/closed`, plus `rejected`. "Verified" is **not** a status (D5).

---

## 0.6 Security architecture (concrete for build)

| Control | Phase 0 design decision |
|---------|-------------------------|
| Transport | TLS everywhere; HSTS |
| At rest | Encrypted DB + object storage + backups |
| Secrets | Environment variables / secret manager; never in code or logs; no secrets in `.env` committed |
| AuthZ | RBAC enforced server-side on every endpoint; org-scoping; deny-by-default (design; enforced Phase 2) |
| Input validation | Schema validation at all boundaries; parameterised queries/ORM only |
| Rate limiting | Design counters (Redis) for public reads, OTP, enquiries |
| PII | **Masked/routed contact by default (D6)**; no personal phone/email in public responses or URLs |
| Media safety | Private drafts, malware scan, EXIF/GPS strip (design; enforced Phase 4) |
| Auth hardening | Mobile OTP primary; **mandatory staff/admin 2FA**; OTP attempt limits; session/device monitoring; SIM-swap/ATO protections (D3) |
| Monitoring | Error tracking + audit review (provider pending) |

Data residency recorded as a **founder architecture/risk decision (India region)**, subject to legal advice and transfer rules — **not** stated as an automatic regulatory mandate (D2).

---

## 0.7 Audit-log strategy (table design)

```sql
CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor_user_id UUID,            -- null = system
  actor_role TEXT, actor_org_id UUID,
  action TEXT NOT NULL,          -- e.g. listing.approved, auth.otp.verify
  target_type TEXT, target_id UUID,
  before JSONB, after JSONB,     -- secrets redacted
  ip TEXT, user_agent TEXT, request_id TEXT,
  result TEXT NOT NULL           -- success / denied / error
);
-- Append-only: application DB role has INSERT + SELECT only (no UPDATE/DELETE).
-- Periodic export to immutable/versioned cold storage for tamper-evidence.
```

Retention durations remain a legal decision (`../18-LEGAL-COMPLIANCE-REGISTER.md`). Optional hash-chaining reserved for high-value events.

---

## 0.8 Media-storage design

- Direct-to-storage **chunked uploads** via short-lived pre-signed URLs (bypasses proxy limits, keeps API light).
- Background job: malware scan → image variants (thumb/card/hero) → video poster/transcode.
- Public bucket/prefix for published marketing media (via CDN); **private** prefix for drafts and any documents.
- Immutable, content-addressed/UUID object keys → safe CDN caching + versioning.
- Metadata in `media` table only; binaries never in PostgreSQL.
- **Provider (object storage + CDN) undecided** — design is provider-agnostic; use approved object-storage integration playbook when authorised.

---

## 0.9 Environments & delivery plan

| Environment | Purpose | Data | Notes |
|-------------|---------|------|-------|
| Development | Build & unit test | Synthetic | Per-engineer |
| Staging | Pre-release verification + migration rehearsal | Anonymised sample | Founder review before prod |
| Production | Live | Real | Least-privilege, audited, India region |

- **CI/CD:** automated build, lint, tests, migration dry-run on staging → promote to prod.
- **Migrations:** versioned, forward-only, always rehearsed on staging first.
- **Backups/DR:** managed daily backups + PITR/WAL, cross-region copies, restore drills (`../15-BACKUP-AND-DR-PLAN.md`).
- **Config:** all URLs/keys via env vars; no hardcoded values; `/api` prefix preserved.

> Provisioning of any environment is **not** authorised yet — this is the plan only.

---

## 0.10 Module 1 → API migration plan (non-breaking)

1. Introduce an API client layer (`src/lib/api.js`) mirroring today's helper shapes; **keep function names** (`getPropertyBySlug` becomes async, same return shape).
2. Seed real localities + migrate current demo content into structured `properties`/`listings`/`ad_campaigns` rows (preserving PROPERTY≠LISTING).
3. Ship behind a **feature flag**: demo data → live API; validate in staging with identical UX before flipping production.
4. **No design/spacing/typography/header changes** — pure data-source swap on the frozen UI.
5. Response shapes match the contract in `../09-MODULE-1-FRONTEND-TO-API-MAPPING.md` (structured values + optional display strings).

---

## 0.11 Phase 1 API contracts (frozen for build)

Public reads (no auth), paginated, JSON, `/api/v1`:

| Method | Path | Returns |
|--------|------|---------|
| GET | `/properties` | Filtered/paginated property+current-listing summaries |
| GET | `/properties/{slug}` | Full detail (gallery, amenities, description, current listing) |
| GET | `/properties/{slug}/similar` | Up to N similar |
| GET | `/listings` | Active listings by vertical/intent |
| GET | `/localities` / `/localities/{id}` | Locality context |
| GET | `/projects` / `/projects/{id}` | New projects |
| GET | `/ads/active` | Active campaign (desktop+mobile creatives, disclosure) |
| GET | `/config/filters` | Filter definitions per vertical |

Admin (RBAC, Phase 1 foundation): CRUD + moderation skeleton for properties/listings/localities/ads. Full inventory: `../08-API-INVENTORY.md`.

---

## 0.12 Testing & acceptance strategy

| Layer | Approach |
|-------|----------|
| Schema | Migration applies cleanly on staging; constraints enforce PROPERTY≠LISTING |
| API | Contract tests per endpoint; pagination; filter correctness vs current client behaviour |
| Frontend parity | Frozen Module 1 renders identically from API in staging (visual + functional regression) |
| Security | AuthZ deny-by-default checks; no PII in public payloads/URLs |
| Audit | Sensitive actions produce audit rows; append-only enforced |
| Performance | Baseline query timings on seeded data; indexes verified |

**Phase 1 acceptance:** Module 1 fully functional on live API in staging with identical UX; ad campaign served from API; filters server-side; backups + audit active; zero regressions vs `iteration_11`.

---

## 0.13 Implementation proposal (what Phase 1 would build, once approved)

| Step | Work | Complexity |
|------|------|-----------|
| 1 | Provision managed PostgreSQL + object storage (India region) | Medium |
| 2 | Apply core schema + reference/seed data | Medium |
| 3 | Build read APIs (§0.11) + admin CRUD skeleton | Medium-high |
| 4 | Migrate Module 1 demo content → structured records | Medium |
| 5 | Add API client layer to frozen frontend (flagged) | Low-medium |
| 6 | Wire audit + backups; staging verification | Medium |
| 7 | Regression QA (parity with iteration_11); founder review | Medium |

Estimated Phase 1 complexity: **Medium-high**. No payments, auth, email, AI, or Manage/Commercial in Phase 1.

---

## 0.14 Approval gate (required before ANY coding)

Please confirm:
- [ ] Phase 0 architecture & schema design approved (§0.2–0.5)
- [ ] Security, audit and media designs approved (§0.6–0.8)
- [ ] Environment/delivery + India-region posture approved (§0.9)
- [ ] Module 1 → API migration approach approved (§0.10)
- [ ] Phase 1 API contracts approved (§0.11)
- [ ] Authorisation to provision Phase 1 infra + begin Phase 1 coding **(explicit go/no-go)**

> Until every box is confirmed, no database is provisioned, no cloud account is created, no code is written, and Module 1 stays frozen.
