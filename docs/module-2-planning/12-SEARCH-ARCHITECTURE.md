# 12 — Search Architecture

> Plain language: How people find properties. Module 1 already has working filters (city, type, budget, bedrooms…). Module 2 starts by reproducing those filters on the server with the database, and only graduates to a dedicated search engine when the catalogue is large enough to need it. Location/map search is added when a maps provider is chosen.

---

## 12.1 Staged search strategy

```mermaid
flowchart LR
  A["Stage 1: DB filters<br/>PostgreSQL indexes + full-text"] --> B["Stage 2: + PostGIS geo<br/>radius / map-bounds"]
  B --> C["Stage 3: Dedicated search engine<br/>typo-tolerance, instant, facets, ranking"]
  C --> D["Stage 4: + AI natural-language search<br/>(Phase 8, advisory)"]
```

**Explanation:** We add complexity only when needed. Stage 1 covers today's filters cheaply. Geo comes with maps. A dedicated engine is introduced when volume/latency justify the extra cost and ops.

---

## 12.2 Stage details

| Stage | Capability | Technology | When | Cost/Ops |
|-------|-----------|------------|------|----------|
| 1 | Exact + range filters, sort, pagination, basic keyword | PostgreSQL B-tree/GIN indexes, `tsvector` full-text | Phase 1 (MVP) | Low (already have DB) |
| 2 | "Near me", radius, draw-on-map, locality polygons | PostGIS | Phase 1/2 (with maps) | Low-medium |
| 3 | Typo tolerance, instant-as-you-type, faceting, custom ranking, synonyms | Dedicated search engine (e.g., self-hosted OpenSearch/Meilisearch or managed) | When catalogue/latency demands | Medium-high (infra + sync) |
| 4 | Natural-language queries → structured filters | AI/LLM (advisory) | Phase 8 | Per-request LLM cost |

---

## 12.3 Filters mapped from Module 1

The current `VERTICALS[*].filters` (in `data/verticals.js`) map directly to server query params:

| Vertical | Filters (today) | Server params |
|----------|-----------------|---------------|
| Buy | city/locality, type, budget, bedrooms, availability | `q`, `type`, `price_min/max`, `beds_min`, `possession` |
| Rent | city/locality, type, rent, bedrooms, furnishing | `q`, `type`, `rent_min/max`, `beds_min`, `furnished` |
| New Projects | city, developer, configuration, status, possession year | `city`, `developer`, `config`, `status`, `possession_year` |
| Commercial | city/locality, subtype, buy/lease, budget, area | `q`, `sub_type`, `intent`, `price_*`, `area_*` |
| Land | city/locality, land type, price, plot area, ownership | `q`, `land_type`, `price_*`, `area_*`, `ownership` |

> `applyFilters()` (client-side today) becomes a server query. Budget/area "range" filters that are currently `match:'none'` (non-functional placeholders) become real numeric range filters against structured price/area fields.

---

## 12.4 Ranking & freshness

| Factor | Effect on ordering |
|--------|--------------------|
| Freshness (`published_at`/`updated_at`) | Newer/updated listings surface higher |
| Completeness/quality | Better-detailed listings rank higher (Phase 4) |
| Relevance to query | Text + filter match strength |
| Sponsored (ads) | Clearly disclosed, never disguised as organic (doc 18) |

---

## 12.5 Geospatial (with maps)

- Store `geo_lat/geo_lng` on properties (design now, populate when geocoding available).
- PostGIS enables radius search, map-bounds search, and "properties in this locality polygon".
- Maps/geocoding provider is **founder-pending** (doc 21) — architecture stays provider-agnostic.

---

## 12.6 Keeping search in sync (Stage 3)

When a dedicated engine is added, PostgreSQL remains the source of truth; a background job indexes published listings into the engine on create/update/status-change. On engine outage, the system falls back to DB filters (graceful degradation).

## 12.7 MVP vs pre-launch vs future
| Tier | Search posture |
|------|----------------|
| MVP | PostgreSQL filters + full-text; server-side pagination |
| Pre-launch | PostGIS geo; ranking with freshness/quality; sponsored disclosure |
| Future | Dedicated engine (typo-tolerant/instant/facets); AI NL search |

## 12.8 Pending decisions (doc 21)
Search-engine choice + timing; maps/geocoding provider; whether instant search is a launch priority (recommend: no).
