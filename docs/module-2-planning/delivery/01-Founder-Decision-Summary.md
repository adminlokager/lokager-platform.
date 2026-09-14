# 01 — Founder Decision Summary (non-technical)

> Read this first. It explains, in plain language, what Module 2 is, what it will cost you in effort/risk, and the small number of decisions only you can make. Details live in the linked documents.

---

## 1. What Module 2 is (and is not)

**Module 1** (the beautiful public website) is finished and frozen. It currently runs on *demo data* — nothing is saved, no one can log in, no enquiry actually reaches you.

**Module 2** turns LOKAGER from a website into a *platform*: a real database behind it, real properties and listings, people who can log in with the right permissions, and enquiries/waitlist leads that actually reach your team. It is planned in **9 phases (0–8)** so you can launch value early and add heavier things (payments, property management, commercial, AI) only when the business and the law are ready.

This document package is **planning only**. Nothing has been built, no accounts created, no money spent.

---

## 2. Recommended architecture (in one picture)

- **A relational database (PostgreSQL) as the single source of truth** — because LOKAGER is full of *relationships and records that must stay consistent*: a property and its many listings, owners and their mandates, agreements, approvals, money, and history. See doc 07 for the honest trade-off and recommendation.
- **Photos and videos stored in cloud object storage** (not in the database) and served through a CDN for speed. See doc 11.
- **Search starts simple** (database filters, exactly like today's frontend filters) and only graduates to a dedicated search engine when catalogue size demands it. See doc 12.
- **Security, privacy and an audit trail built in from day one** — every important action records *who did what, when*. See docs 13 and 14.
- **A backup + recovery plan from day one** so data loss is survivable. See doc 15.
- Everything is **modular and replaceable** to avoid being locked into one vendor.

---

## 3. Major trade-offs

| Trade-off | Plain-language summary |
|-----------|------------------------|
| PostgreSQL vs MongoDB | PostgreSQL is stronger for money, agreements, approvals and consistency (LOKAGER's core), at the cost of slightly more upfront schema discipline. Recommended primary DB. |
| Build search engine now vs later | A dedicated search engine (e.g. typo-tolerant, instant) is powerful but adds cost + ops. Start with database filters; add it when the catalogue is large. |
| Direct owner contact vs masked contact | Showing phone/email directly is convenient but invites spam/scraping and weakens lead attribution. Masked/routed contact protects users and your business — **your decision** (doc 21). |
| Fast MVP vs verification-first | Real "verified" badges require legal + documentary processes. We will **not** claim "verified" until that exists. This protects trust and reduces legal risk. |
| Holding customer/rent funds vs not | If LOKAGER ever holds rent or vendor money (Manage vertical), it triggers serious legal/financial obligations. Strongly recommend **not** holding funds initially. **Your decision** (doc 21). |

---

## 4. Major risks

| Risk | Why it matters | Mitigation in plan |
|------|----------------|--------------------|
| Legal/RERA non-compliance | Brokerage, property management and commercial mandates are regulated in India; getting this wrong is costly and reputational. | Legal/Compliance register (doc 18); Manage & Commercial are pilot-gated behind legal review. |
| Over-claiming trust ("verified") | Damages the trust-first brand and invites liability. | Hard rule: no "verified" language until a real process exists. |
| Data breach / privacy | Personal data of owners, tenants, seekers. | Security architecture + audit log designed from Phase 0 (docs 13, 14). |
| Over-engineering the MVP | Wastes money and time before revenue. | Clear MVP / pre-launch / future-scale separation throughout. |
| Vendor lock-in | Expensive to change cloud/search/email later. | Modular services + abstraction layers; provider choices deferred (doc 21). |
| Fund handling (Manage) | Could require payment aggregator/escrow licensing. | Recommend no fund-holding initially; explicit founder decision required. |

---

## 5. Cost-impacting decisions (summary — full list in doc 20)

| Decision | Cost driver | Recommendation |
|----------|-------------|----------------|
| Cloud provider & region | Ongoing monthly hosting | Defer; pick India region for data residency |
| Managed vs self-hosted database | Ops cost vs engineering time | Managed PostgreSQL for reliability |
| Search engine timing | Extra infra + ops | Delay until catalogue justifies it |
| Media storage + CDN | Grows with photos/videos | Object storage + CDN; compress/transcode |
| Transactional email/OTP/SMS | Per-message cost | Pick providers only at Phase 2/3 |
| AI (Phase 8) | Per-request LLM cost | Only after reliable data exists |

---

## 6. Legal dependencies (full register in doc 18)

Nothing in **LOKAGER Manage** or **Commercial Connect** can launch commercially until legal/operational review covers: company object clauses, GST, state-wise RERA, brokerage/commission disclosure, owner mandates, property-management agreements, tenant consent, vendor agreements, data privacy, payment/rent handling, liability/insurance, and dispute terms.

---

## 7. Operational dependencies

- People to review/moderate listings before "publish" (Phase 4).
- A lead-handling process/CRM discipline for enquiries (Phase 3).
- For Manage pilot: property managers + vetted vendors in Bengaluru/Mysuru (Phase 6).
- For Commercial Connect: relationship managers (Phase 7).

---

## 8. Founder decisions required now (to approve Module 2)

1. **Approve PostgreSQL as primary database** (doc 07) — or ask for changes.
2. **Approve the phase order 0–8** (doc 19) — already based on your stated priority.
3. **Confirm the guardrails** (no "verified" claims yet; no third-party logos; PROPERTY ≠ LISTING).
4. **Acknowledge the pending-decision register** (doc 21) — you don't need to answer all now; several are deferred to their phase, but a few (below) shape early work.

**Early-shaping decisions worth an early view (details in doc 21):**
- Authentication method for launch (Mobile OTP recommended for India).
- Whether owner contact is masked/routed or shown directly.
- Whether LOKAGER will ever hold customer/rent funds (recommend: no, initially).
- Data residency region (recommend: India).

---

## 9. Recommended next action

1. Read docs **07** (database) and **19** (roadmap).
2. Approve Phase 0 + Phase 1 scope (foundation + core marketplace backend) — the safe, high-value, low-legal-risk start.
3. Defer Phases 5–8 (payments, Manage, Commercial, AI) decisions to their gates.
4. On approval, the next deliverable is a **Phase 0 detailed technical design** (still no production coding until you say go).

> **You do not need to decide everything today.** Approving Phases 0–1 unblocks all the valuable, low-risk work while the regulated/expensive decisions stay open.
