# LOKAGER — Module 2 Planning Package · Master Index

> **Status of this package:** PLANNING ONLY. No backend code, database, authentication, email, payments, cloud accounts, API keys or AI has been implemented. **Module 1 (public frontend) remains FROZEN** and must not be modified during this planning stage.
>
> **Purpose:** Give the founder a complete, honest, non-technical-friendly blueprint to confidently approve Module 2, and to let any qualified development team implement the architecture consistently.
>
> **Product horizon:** LOKAGER is planned as a long-term (10-year) India-first, globally scalable PropTech platform — not a listing website. Architecture favours modular, replaceable services, avoids premature complexity/cost, and separates **Required for MVP**, **Required before commercial launch**, and **Future scale**.

---

## How to read this package

1. Start with **01 — Founder Decision Summary** (non-technical).
2. Skim **19 — Phased Implementation Roadmap** to see the sequence.
3. Review **07 — Database Decision** (the one big technology call).
4. Approve or override the items in **21 — Founder-Pending Decision Register**.

---

## Document register

| # | Document | Purpose | Status | Founder approval | Depends on | Pending decisions | Phase(s) |
|---|----------|---------|--------|------------------|------------|-------------------|----------|
| 00 | [Master Index](./00-MASTER-INDEX.md) | Navigation + status of all docs | Draft for review | Pending | — | — | All |
| 01 | [Founder Decision Summary](./01-FOUNDER-DECISION-SUMMARY.md) | Non-technical overview, risks, decisions | Draft for review | Pending | 07, 18, 20, 21 | See doc 21 | All |
| 02 | [System Architecture](./02-SYSTEM-ARCHITECTURE.md) | High-level components & data flow | Draft for review | Pending | 07, 11, 12, 13 | Cloud, framework | 0 |
| 03 | [Entity-Relationship Model](./03-ENTITY-RELATIONSHIP-MODEL.md) | Core marketplace entities & cardinality | Draft for review | Pending | 04, 05 | — | 0–1 |
| 04 | [PROPERTY vs LISTING Lifecycle](./04-PROPERTY-VS-LISTING-LIFECYCLE.md) | The foundational data rule + status flows | Draft for review | Pending | 03 | Status vocabulary | 0–1 |
| 05 | [User & Organisation Model](./05-USER-AND-ORGANISATION-MODEL.md) | People, orgs, identities | Draft for review | Pending | 10 | Identity verification | 2 |
| 06 | [Role & Permission Matrix](./06-ROLE-AND-PERMISSION-MATRIX.md) | RBAC, approval authority | Draft for review | Pending | 05 | Approval limits | 2 |
| 07 | [Database Decision (PostgreSQL vs MongoDB)](./07-DATABASE-DECISION.md) | Firm recommendation + trade-offs | **Recommendation ready** | Pending | — | Final DB choice | 0 |
| 08 | [API Inventory](./08-API-INVENTORY.md) | Endpoint catalogue across phases | Draft for review | Pending | 03, 05, 06 | API style (REST) | 1–8 |
| 09 | [Module 1 Frontend-to-API Mapping](./09-MODULE-1-FRONTEND-TO-API-MAPPING.md) | Maps existing frontend seams to APIs | Draft for review | Pending | 08 | — | 1–3 |
| 10 | [Authentication Options](./10-AUTHENTICATION-OPTIONS.md) | OTP / social / password comparison | Draft for review | Pending | 05, 13 | Auth provider | 2 |
| 11 | [Media Storage Architecture](./11-MEDIA-STORAGE-ARCHITECTURE.md) | Uploads, CDN, moderation | Draft for review | Pending | 13 | Storage/CDN provider | 0–4 |
| 12 | [Search Architecture](./12-SEARCH-ARCHITECTURE.md) | Filters now, search engine later, geo | Draft for review | Pending | 07 | Search engine timing | 1 |
| 13 | [Security Architecture](./13-SECURITY-ARCHITECTURE.md) | AuthN/Z, data protection, threats | Draft for review | Pending | 10, 14 | — | 0 |
| 14 | [Audit-Log Plan](./14-AUDIT-LOG-PLAN.md) | Who-did-what, immutability, retention | Draft for review | Pending | 13 | Retention periods | 0 |
| 15 | [Backup & Disaster Recovery](./15-BACKUP-AND-DR-PLAN.md) | RPO/RTO, restore drills | Draft for review | Pending | 07, 11 | Region strategy | 0 |
| 16 | [LOKAGER Manage Architecture](./16-LOKAGER-MANAGE-ARCHITECTURE.md) | Property management vertical (future) | Draft for review | Pending | 03, 06, 18 | Fund handling, pilot city | 6 |
| 17 | [Commercial Connect Architecture](./17-COMMERCIAL-CONNECT-ARCHITECTURE.md) | Commercial matchmaking vertical (future) | Draft for review | Pending | 03, 06, 18 | Commission model | 7 |
| 18 | [Legal & Compliance Dependency Register](./18-LEGAL-COMPLIANCE-REGISTER.md) | RERA, GST, mandates, privacy gates | Draft for review | Pending | — | Entire register | All |
| 19 | [Phased Implementation Roadmap](./19-PHASED-IMPLEMENTATION-ROADMAP.md) | Phases 0–8 with 12-point spec each | Draft for review | Pending | All | Per-phase gates | 0–8 |
| 20 | [Cost-Impacting Decision Register](./20-COST-IMPACTING-DECISION-REGISTER.md) | Decisions that drive spend | Draft for review | Pending | 02, 07, 11, 12 | See doc | All |
| 21 | [Founder-Pending Decision Register](./21-FOUNDER-PENDING-DECISION-REGISTER.md) | Every open decision, structured | Draft for review | Pending | All | The whole doc | All |

---

## Status legend

| Label | Meaning |
|-------|---------|
| Draft for review | Written, awaiting founder review |
| Recommendation ready | Contains a firm engineering recommendation to approve/override |
| Pending | Not yet approved by founder |
| Approved | Founder signed off (to be updated after review) |
| Locked | Approved and frozen |

## Global guardrails (apply to every document)

- **PROPERTY ≠ LISTING** — always separate entities (one property, many listings over time).
- No listing/owner/broker is described as **"verified"** until a legally + operationally approved verification process is live (see doc 18).
- No third-party brand/developer/bank logos without written permission.
- Every major record carries: `created_at`, `updated_at`, `status`, status history, and responsible-user attribution.
- Multi-city, multi-state, multi-language, multi-currency ready; international-capable later.
- Assumptions are flagged as assumptions, never treated as approved decisions.
- Irreversible / expensive-to-change decisions are called out explicitly.

## Stop condition

This package ends at planning. **No implementation, provisioning, integration, or Module 1 modification** until the founder approves the relevant items in docs 01 and 21.
