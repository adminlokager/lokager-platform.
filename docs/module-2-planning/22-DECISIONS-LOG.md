# 22 — Approved Decisions Log

> **Authoritative record of founder-approved decisions.** These six decisions are **APPROVED for Phase 0 detailed architecture and design only.** They do **not** authorise production coding, provisioning, cloud accounts, auth/OTP/email/SMS integration, payments, live personal-data collection, AI, or any Module 1 modification. Approval date: June 2026.

---

## D1 — Primary database · **APPROVED**
**Decision:** Managed **PostgreSQL** is LOKAGER's primary system of record.

Binding requirements:
- Preserve **PROPERTY ≠ LISTING**.
- Use relational integrity for agreements, roles, approvals, payments and audit history.
- Plan **PostGIS** for location/geospatial capabilities (enable when geo/maps introduced).
- Use **object storage** for all media (never in the database).
- **Do not** add a dedicated search engine or MongoDB until proven scale or a concrete use case justifies it.

---

## D2 — Cloud region · **APPROVED (with wording correction)**
**Decision:** **India-region hosting** for the initial production architecture.

Rationale (founder architecture & risk-management decision): lower latency for Indian users, operational simplicity, risk reduction, future compliance flexibility, reduced data-movement complexity.

**Wording correction (must be applied across all docs):** Do **not** state that India-region hosting is automatically mandated for all LOKAGER data under the DPDP framework. Record it as a **founder architecture and risk-management decision**, subject to:
- Applicable government transfer restrictions
- Service-specific regulations
- Payment-provider requirements
- Future international expansion
- Final legal advice

**Cloud provider remains UNDECIDED.** Design services to minimise provider lock-in.

---

## D3 — Authentication · **APPROVED**
**Decision:** **Mobile OTP** is the primary customer authentication method.

Also planned:
- Email OTP/link as a secondary method.
- **Mandatory stronger 2FA for employees and administrators.**
- Rate limiting; OTP attempt limits.
- Session/device monitoring.
- Account-recovery process.
- Protection against **SIM-swap** and **account-takeover** risks.
- Social login as an optional future convenience.

**OTP and authentication providers remain founder-decision-pending.**

---

## D4 — No fund holding · **APPROVED**
**Decision:** LOKAGER will **not** hold rent, booking amounts, deposits, repair funds or vendor funds during the initial stage.

Where payments are later enabled:
- Customers pay the appropriate owner, provider or vendor **directly**, or
- Payments are processed through an **approved regulated payment partner**.

LOKAGER must **not** operate an internal wallet, escrow or pooled account without separate legal, financial and regulatory approval. (RBI regulates payment-aggregation activity; avoiding custody at launch materially reduces complexity.) Reconsideration only after legal review and an approved payment-partner architecture.

---

## D5 — "Verified" language · **APPROVED**
**Decision:** Do **not** use "verified," "guaranteed," "approved," or similar trust claims until **all** of the following exist:
- Exact verification level defined
- Required evidence specified
- Responsible reviewer identified
- Verification date recorded
- Expiry/reconfirmation rules exist
- Audit records maintained
- Legal + operational approval of public wording
- The process functions in production

**Planned evidence-based labels** (each must state what was checked **and** what was not checked):

| Label | Means | Explicitly does NOT mean |
|-------|-------|--------------------------|
| Identity Checked | A contact identity was confirmed (e.g., mobile) | Not a full background/KYC check |
| RERA Details Matched | Provided RERA number matched a record | Not a guarantee of project/legal status |
| Site Visited | A LOKAGER-associated visit occurred on a date | Not a condition/quality guarantee |
| Listing Recently Confirmed | Provider reconfirmed the listing on a date | Not a price/availability guarantee |
| Documents Submitted | Documents were uploaded | Not that documents were legally verified |
| Ownership Reviewed | Ownership evidence was reviewed | Not a legal title guarantee |

---

## D6 — Masked / routed contact · **APPROVED**
**Decision:** Masked and platform-routed contact is the **default**.

Requirements:
- Do not publicly expose personal phone numbers or email addresses.
- Record user consent.
- Protect against scraping and spam.
- Maintain lead attribution.
- Allow reporting and blocking.
- Create controlled contact-reveal rules where operationally justified.
- Define emergency and dispute-access procedures.
- Direct contact allowed only through an explicit future policy approved by the founder.

---

## Authorisation boundary (reaffirmed)
Approved for **Phase 0 detailed architecture and design**. NOT yet authorised: production backend coding, database provisioning, cloud-account creation, authentication-provider integration, OTP sending, payments, email/SMS integration, live personal-data collection, AI implementation, Module 1 modification.

**Next gate:** Founder review + approval of the Phase 0 detailed design (`phase-0/PHASE-0-DETAILED-DESIGN.md`) before any coding begins.
