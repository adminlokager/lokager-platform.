# 07 — Database Decision: PostgreSQL vs MongoDB

> This is the single biggest technology decision in Module 2. It contains a **firm engineering recommendation** (as requested), with an honest trade-off table. **No database has been provisioned.**
>
> ✅ **FOUNDER-APPROVED (June 2026):** Managed PostgreSQL is approved as LOKAGER's primary system of record — preserve PROPERTY≠LISTING, relational integrity for agreements/roles/approvals/payments/audit, plan PostGIS for geo, object storage for media, and **no** dedicated search engine or MongoDB until proven scale/use case justifies it. See `22-DECISIONS-LOG.md` (D1). Approval covers Phase 0 design only; no provisioning/coding authorised.

---

## 7.1 Recommendation (headline)

**Recommended primary database: PostgreSQL** (as the single system of record).

LOKAGER is fundamentally a system of **structured, connected, long-lived records with legal and financial weight**: one property with many listings, owners and mandates, agreements, approvals, money, expenses, and audit histories. These are exactly the workloads relational databases with ACID transactions and foreign-key integrity are built for. MongoDB is excellent for flexible, document-shaped, high-write, loosely-related data — but LOKAGER's core is the opposite, and choosing MongoDB "because it's convenient for prototyping" would create integrity and reporting problems that are expensive to unwind later.

This aligns with the founder's stated preference, but the reasoning below is the engineering justification — not a rubber stamp.

---

## 7.2 Trade-off table (evaluated for LOKAGER specifically)

| Dimension | PostgreSQL | MongoDB | Winner for LOKAGER |
|-----------|-----------|---------|--------------------|
| PROPERTY ≠ LISTING (relationships) | Native foreign keys, joins, integrity | Manual references, app-enforced | **PostgreSQL** |
| Users, orgs, roles (RBAC) | Relational join tables ideal | Workable but denormalised | **PostgreSQL** |
| Agreements & mandates | Strong integrity + constraints | App-enforced | **PostgreSQL** |
| Inspections / maintenance / vendor quotes | Related records + transactions | Possible, less safe | **PostgreSQL** |
| Owner repair approvals (money) | ACID transactions essential | Multi-doc txns exist but heavier | **PostgreSQL** |
| Payments & expense records | ACID, precise decimals | Riskier for money | **PostgreSQL** |
| Commercial requirements & matches | Relational many-to-many | Workable | **PostgreSQL** (slight) |
| Advertisement campaigns | Structured + schedule | Fine either way | Tie |
| Audit histories | Append-only tables + constraints | Append docs | **PostgreSQL** (integrity) |
| Search & filtering (catalogue) | SQL indexes; add search engine later | Good text search built-in | Tie (both need engine at scale) |
| Geospatial queries | PostGIS (industry-grade) | GeoJSON + 2dsphere (good) | **PostgreSQL** (PostGIS depth) |
| Reporting & analytics | SQL is the analytics lingua franca | Aggregation pipeline, weaker for ad-hoc | **PostgreSQL** |
| Scalability (read/write) | Vertical + read replicas + partitioning | Horizontal sharding native | **MongoDB** (raw horizontal) |
| Flexible/evolving schema | Migrations required | Schema-flexible | **MongoDB** |
| Backup & recovery | Mature (PITR, WAL) | Mature (Atlas/ops) | Tie |
| Migration risk | Schema discipline upfront | Easy to start, risky to correct later | **PostgreSQL** (long-term) |
| Developer complexity (this app) | Slight upfront schema effort | Fast start, complexity later | **PostgreSQL** (net) |
| Operating cost | Managed PG affordable | Managed Atlas affordable | Tie |
| Long-term maintainability | Excellent for structured domains | Risk of inconsistent data drift | **PostgreSQL** |

**Net:** PostgreSQL wins the dimensions that matter most for LOKAGER's core (integrity, money, agreements, reporting, long-term correctness). MongoDB's advantages (horizontal scaling, schema flexibility) are not LOKAGER's early bottlenecks and can be addressed within PostgreSQL for years.

---

## 7.3 Required statements (per founder request)

1. **Recommended primary database:** PostgreSQL (managed).
2. **Why suitable for LOKAGER:** relational integrity for PROPERTY≠LISTING, agreements, approvals, money and audit; best-in-class reporting via SQL; PostGIS for geo; mature backup/PITR.
3. **Risks / disadvantages:** requires schema discipline and migrations; horizontal write-scaling is more deliberate than MongoDB (mitigated by read replicas + partitioning for years); team must be comfortable with SQL.
4. **Justified secondary role for MongoDB?** Not required at MVP. A *possible* future niche: high-volume, schema-loose event/telemetry or AI feature-store data — but even that is often better in PostgreSQL (JSONB) or a purpose-built store. **Recommendation: single-database (PostgreSQL) until a concrete need proves otherwise.** Avoid polyglot persistence early (operational overhead).
5. **PostgreSQL geospatial (PostGIS) required?** Not at pure MVP (no live maps). **Add PostGIS at Phase 1/2** when locality/radius/geo search is introduced. Design coordinate fields now, enable PostGIS when maps provider is chosen.
6. **Dedicated search engine initially?** No. Start with PostgreSQL indexes + full-text (`tsvector`) — this covers current Module 1 filters comfortably. Introduce a dedicated engine (e.g., typo-tolerant/instant search) only when catalogue size/latency demands it (doc 12).
7. **Where Redis helps:** sessions, caching hot reads (home/featured/localities), rate-limiting (OTP, enquiries), and as a background-job broker. Introduce at Phase 2/3, not day one.
8. **Where object storage is required:** all property/listing media and documents — never store binaries in the database (doc 11).
9. **Backup & DR approach:** managed PostgreSQL with automated daily backups + Point-In-Time Recovery (WAL), cross-region backup copies, periodic restore drills; object storage versioning + lifecycle (doc 15).
10. **Reconsider the DB decision if:** (a) write throughput genuinely exceeds a well-tuned primary + replicas + partitioning, (b) a large truly-schemaless domain emerges with no relational needs, or (c) analytics scale demands a separate warehouse (that would be an *addition*, not a replacement).

---

## 7.4 Supporting technology recommendations

| Concern | Recommendation | When | Pending |
|---------|----------------|------|---------|
| Primary database | Managed PostgreSQL | Phase 0 | Cloud/managed provider (doc 21) |
| Geospatial | PostGIS extension | Phase 1/2 | Maps provider (doc 21) |
| Search | PG full-text → dedicated engine later | Phase 1 → later | Engine choice/timing |
| Cache / sessions / rate-limit | Redis | Phase 2/3 | Provider |
| Object storage | Cloud object storage + CDN | Phase 1 | Provider (doc 11/21) |
| Audit log | Append-only PostgreSQL tables (+ export) | Phase 0 | Retention (doc 14) |
| Analytics/reporting | SQL on replica → warehouse if needed | Phase 3+ | — |

---

## 7.5 MVP vs pre-launch vs future scale

| Tier | Database posture |
|------|------------------|
| MVP | Single managed PostgreSQL, daily backups, PG full-text search |
| Before commercial launch | Read replica, PITR, Redis, PostGIS, object storage + CDN, restore drills |
| Future scale | Partitioning/sharding of large tables, dedicated search engine, analytics warehouse, multi-region |

## 7.6 Founder decision required
Approve **PostgreSQL as primary system of record** (recommended), or request reconsideration. This decision is expensive to reverse after Phase 1 data exists — worth confirming early.
