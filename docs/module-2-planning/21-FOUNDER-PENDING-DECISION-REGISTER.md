# 21 — Founder-Pending Decision Register

> Plain language: Every decision that is **still open** and must not be silently made by engineering. Each row gives a recommendation plus the trade-offs so the founder can decide. Nothing here is locked. Many can be deferred to their phase; a few (marked ⏰ **early**) shape early work.
>
> **Column key:** Rec = recommended option · Cost/Sec/Legal/Scale = impact (L/M/H) · Decide-by = latest sensible phase · Reverse = how hard to change later.

---

## A. Technology

| Decision | Rec | Alternatives | Advantages of Rec | Disadvantages of Rec | Cost | Sec | Legal | Scale | Decide-by | Reverse |
|----------|-----|--------------|-------------------|----------------------|:----:|:---:|:-----:|:-----:|-----------|---------|
| ⏰ Primary database | PostgreSQL | MongoDB | Integrity, money, reporting, geo | Schema discipline needed | M | M | L | M | Phase 0 | **Hard** |
| ⏰ Cloud provider | Defer; India region | Multi-cloud | Data residency, latency | Some lock-in | H | M | M | H | Phase 0 | Hard |
| ⏰ Hosting region | India | Elsewhere | DPDP residency, latency | Fewer edge options | M | M | H | M | Phase 0 | Hard |
| Backend framework/language | Defer to team | — | Team familiarity | — | L | M | L | M | Phase 0 | Medium |
| API architecture | REST `/api/v1` | GraphQL | Simplicity, caching, matches ingress | Less flexible queries | L | L | L | M | Phase 0 | Medium |
| Managed vs self-hosted DB | Managed | Self-hosted | Reliability, backups, PITR | Ongoing fee | M | M | L | M | Phase 0 | Medium |
| Object/media storage | Defer (playbook) | Base64-in-DB ❌ | Scalable, cheap, CDN | Provider choice | M | M | L | H | Phase 1 | Medium |
| CDN provider | Defer | Origin-only | Speed, bandwidth savings | Provider choice | M | L | L | H | Phase 1 | Easy |
| Search technology | PG FTS → engine later | Engine now | Cheap start | Add later if needed | M | L | L | H | Phase 1 | Easy |
| Cache/session tech | Redis | In-DB/none | Speed, rate-limit, sessions | Extra service | L | M | L | M | Phase 2 | Easy |
| Background-job system | Queue + workers | Cron only | Reliable async | Extra infra | L | L | L | M | Phase 3 | Easy |
| Monitoring/error-tracking | Defer (low tier) | None ❌ | Reliability, faster fixes | Small fee | L | M | L | M | Phase 1 | Easy |
| Analytics provider | Privacy-friendly | Heavy trackers | Insights, consent-friendly | Setup | L | M | M | M | Phase 3 | Easy |
| Maps/geocoding provider | Defer | None | Geo search/maps | Per-request cost | M | L | L | M | With geo | Easy |
| AI provider/model strategy | Defer to Phase 8 | Early AI ❌ | Data ready first | Later feature | H | M | M | M | Phase 8 | Easy |

---

## B. Authentication & Communication

| Decision | Rec | Alternatives | Advantages of Rec | Disadvantages of Rec | Cost | Sec | Legal | Scale | Decide-by | Reverse |
|----------|-----|--------------|-------------------|----------------------|:----:|:---:|:-----:|:-----:|-----------|---------|
| ⏰ Primary auth method | Mobile OTP | Password, social-only | India-first, no password | SMS cost | M | M | M | M | Phase 2 | Medium |
| Mobile OTP provider | Defer | — | — | Per-SMS cost, fraud risk | M | M | L | M | Phase 2 | Easy |
| Email auth provider | Defer | — | NRIs/corporates | Deliverability | L | M | L | M | Phase 2 | Easy |
| Transactional email provider | Defer | — | Enquiries, shortlist email | Per-message | L | M | M | M | Phase 3 | Easy |
| Marketing email provider | Defer | None initially | Opt-in only | Compliance burden | L | L | H | M | Later | Easy |
| WhatsApp Business | Later | — | High open rates | API cost/approval | M | M | M | M | Later | Easy |
| Notification provider | Defer | — | Lead alerts | Cost | L | L | L | M | Phase 3 | Easy |
| Social login (Google/Apple) | Optional | Off | Faster signup | Provider dependency | L | M | L | M | Phase 2 | Easy |
| Account-recovery method | Email OTP + support | Security questions ❌ | Robust | Support load | L | M | M | L | Phase 2 | Easy |
| Mandatory vs optional identity verification | Optional at launch | Mandatory | Lower friction | Less trust signal | M | M | H | M | Phase 2/4 | Medium |

---

## C. Payments & Finance

| Decision | Rec | Alternatives | Advantages of Rec | Disadvantages of Rec | Cost | Sec | Legal | Scale | Decide-by | Reverse |
|----------|-----|--------------|-------------------|----------------------|:----:|:---:|:-----:|:-----:|-----------|---------|
| ⏰ Payment gateway | Defer to Phase 5 | Early ❌ | No premature cost | Later work | M | H | H | M | Phase 5 | Easy |
| ⏰ Hold customer/rent/vendor funds | **No, initially** | Hold via escrow | Avoids licensing/liability | Less control of flow | L | H | **H** | M | Before Manage | **Hard** |
| Rent-collection mechanism | Direct owner↔tenant initially | LOKAGER-routed | No fund-handling obligations | Less stickiness | L | M | H | M | Phase 6 | Medium |
| Refund process | Define at Phase 5 | — | Clarity | — | L | M | H | L | Phase 5 | Easy |
| Vendor payout process | Owner-direct initially | LOKAGER-routed | Avoids fund handling | Less control | L | M | H | M | Phase 6 | Medium |
| Advertisement billing | Invoice + gateway | Manual | Scalable | Setup | M | M | H | M | Phase 5 | Easy |
| Subscription billing | Defer | — | Recurring revenue | Complexity | M | M | H | M | Phase 5 | Medium |
| Invoice & GST process | With legal/finance | — | Compliance | Effort | M | L | **H** | M | Phase 5 | Medium |
| Escrow requirements | Only if holding funds | — | Compliance if needed | Cost/complexity | H | H | H | M | If fund-holding | Hard |

---

## D. Verification & Trust

| Decision | Rec | Alternatives | Advantages of Rec | Disadvantages of Rec | Cost | Sec | Legal | Scale | Decide-by | Reverse |
|----------|-----|--------------|-------------------|----------------------|:----:|:---:|:-----:|:-----:|-----------|---------|
| ⏰ Meaning of "verified" | Define before any use | Use loosely ❌ | Protects trust/brand | Slower badge rollout | L | M | **H** | L | Before claims | Hard (reputation) |
| Document-verification process | Manual + human review first | Auto-only | Accuracy, defensible | Ops effort | M | M | H | M | Before "verified" | Medium |
| RERA verification process | With legal, state-wise | Ignore ❌ | Compliance | Complexity | M | L | **H** | M | Before brokerage rev | Hard |
| Owner/broker/developer/vendor verification | Onboarding + review | Self-declared only | Trust, fraud reduction | Ops load | M | M | H | M | Phase 4 | Medium |
| Tenant background verification | Optional, consented | Mandatory | Privacy-respecting | Less assurance | M | M | H | M | Phase 6 | Medium |
| Listing moderation policy | Human review pre-publish | Auto-publish ❌ | Quality, safety | Throughput cost | M | M | M | M | Phase 4 | Easy |
| Fraud & dispute process | Define + audit trail | Ad hoc ❌ | Resolvable, defensible | Ops | M | M | H | M | Phase 3/4 | Medium |
| Human review requirements | Required for high-stakes | AI-only ❌ | Safety, compliance | Slower | M | M | H | M | Ongoing | Easy |

---

## E. Business & Operations

| Decision | Rec | Alternatives | Notes | Cost | Legal | Decide-by | Reverse |
|----------|-----|--------------|-------|:----:|:-----:|-----------|---------|
| Launch cities | Founder to set | — | Focus resources | M | M | Phase 1/3 | Easy |
| Pilot locations | Bengaluru/Mysuru (Manage) | — | Per founder | M | M | Phase 6 | Easy |
| Membership/subscription prices | Founder + finance | — | Revenue model | M | H | Phase 5 | Easy |
| Listing fees | Defer | Free at launch | Adoption vs revenue | M | H | Phase 4/5 | Easy |
| Advertisement prices | Founder + finance | — | Revenue | M | H | Phase 5 | Easy |
| Property-management fees | Founder | — | Manage revenue | M | H | Phase 6 | Easy |
| Commercial commission model | Founder + legal | — | Must be disclosed | M | H | Phase 7 | Medium |
| Vendor commission model | Founder | — | Manage economics | M | H | Phase 6 | Medium |
| Repair-approval limits | Founder default | — | Owner-set override | L | M | Phase 6 | Easy |
| Service-level commitments (SLA) | Modest at pilot | — | Sets expectations | M | M | Phase 6/7 | Easy |
| Cancellation/refund policy | With legal | — | Required for paid | L | H | Phase 5 | Medium |
| Customer-support structure | Lean at start | — | Scale with load | M | L | Phase 3 | Easy |
| Operational staffing | Scale with phases | — | Moderation/leads/RMs | H | L | Phase 3+ | Easy |
| Third-party partnerships | Only with written terms | — | No logos w/o permission | L | H | As needed | Easy |

---

## F. Legal & Compliance
*(Full detail in doc 18 — all items below are founder/legal decisions, none selectable by engineering.)*

| Decision | Rec | Legal | Decide-by |
|----------|-----|:-----:|-----------|
| Legal entity structure & object clauses | With counsel | H | Before commercial launch |
| State-wise RERA requirements | With counsel | H | Before brokerage revenue |
| Brokerage registration | With counsel | H | Before commission revenue |
| Property-management agreements | With counsel | H | Phase 6 |
| Owner mandates (residential + commercial) | With counsel | H | Phase 6/7 |
| Tenant consent terms | With counsel | H | Phase 6 |
| Commercial occupier agreements | With counsel | H | Phase 7 |
| Vendor agreements | With counsel | H | Phase 6 |
| Data-retention periods | With counsel | H | Phase 0/2 |
| Privacy policy & T&C | With counsel | H | Before public accounts |
| Insurance coverage & liability limits | With counsel | H | Phase 6/7 |
| Dispute resolution | With counsel | H | Before paid services |
| Payment-handling permissions | With counsel | H | Before fund handling |

---

## G. Brand & Customer Experience

| Decision | Rec | Alternatives | Notes | Legal | Decide-by | Reverse |
|----------|-----|--------------|-------|:-----:|-----------|---------|
| Final SVG logo replacement | Await founder asset | Keep interim raster | Removes header workaround (Module 1) | L | When asset ready | Easy |
| Use of third-party logos | Only with written permission | Show anyway ❌ | Strict rule | H | As needed | Easy |
| Verification badge design | After "verified" defined | Early badge ❌ | Tied to real process | H | With verification | Medium |
| Final trust claims/copy | Conservative, honest | Over-claim ❌ | Brand-critical | H | Before launch | Medium |
| ⏰ Contact masking (owner phone/email) | Masked/routed | Show directly | Anti-spam, lead attribution | M | Phase 2/3 | Medium |
| Whether users contact providers directly | Via platform initially | Direct | Protects users + attribution | M | Phase 3 | Medium |
| Languages at launch | English first; add Hindi/Kannada | All at once | Match audience | L | Phase 1+ | Easy |
| Lead-distribution rules | Founder to define | — | Fairness, revenue | M | Phase 3 | Easy |

---

## 21.1 Decisions worth an early view (⏰)
Primary database · cloud/region · auth method · fund-handling posture · meaning of "verified" · contact masking. Confirming these early prevents rework and expensive reversals. All others can be decided at their phase.
