# 20 — Cost-Impacting Decision Register

> Plain language: The decisions that drive ongoing money and effort. The aim is to spend nothing prematurely: keep the MVP lean, add cost only when it earns its keep. Each row notes the driver, when it matters, and how to keep it low. All figures are qualitative (no vendor quotes obtained during planning).

---

## 20.1 Register

| # | Decision | Cost driver | When it bites | Recommendation | Reversible? |
|---|----------|-------------|---------------|----------------|-------------|
| 1 | Cloud provider & region | Monthly compute/storage/egress | Phase 0/1 | Pick India region (residency); modular so switchable | Hard-ish (data gravity) |
| 2 | Managed vs self-hosted PostgreSQL | Ops time vs managed fee | Phase 0 | Managed (reliability > saving) | Medium |
| 3 | Compute sizing / autoscaling | Over-provisioning waste | Phase 1+ | Start small, autoscale, right-size | Easy |
| 4 | Object storage + CDN | Grows with photos/videos | Phase 1+ | Compress, variants, lifecycle tiers | Easy |
| 5 | Video hosting/transcoding | Expensive at scale | Phase 4+ | Cap resolution/length; efficient codecs | Easy |
| 6 | Dedicated search engine | Extra infra + ops + sync | When catalogue large | Delay; use PostgreSQL FTS first | Easy (additive) |
| 7 | Redis cache/sessions | Small but ongoing | Phase 2/3 | Start minimal; scale with traffic | Easy |
| 8 | Transactional email | Per-message | Phase 3 | Pay-as-you-go; consent reduces volume | Easy |
| 9 | SMS/OTP | Per-message (can be significant) | Phase 2 | Rate limits; email OTP fallback; anti-fraud | Easy |
| 10 | Maps/geocoding | Per-request/tiles | With geo search | Cache geocodes; lazy-load maps | Easy |
| 11 | Payment gateway | Per-transaction + setup | Phase 5 | Defer until revenue; standard rates | Easy |
| 12 | AI/LLM usage | Per-request; can spike | Phase 8 | Cache, batch, cap; only after data ready | Easy |
| 13 | Monitoring/error-tracking | Tiered by volume | Phase 1+ | Start free/low tier | Easy |
| 14 | Analytics | Volume-based | Phase 3+ | Privacy-friendly, sampled | Easy |
| 15 | Backups + cross-region + DR | Storage + egress | Phase 0+ | Essential; tune retention | Medium |
| 16 | Staff/ops headcount | Salaries | Phase 3+ (moderation/leads), 6/7 (pilots) | Scale with pilot scope | N/A |
| 17 | Legal/compliance | Professional fees | Before commercial launch | Non-negotiable; phase it | N/A |
| 18 | Multi-region/HA | Duplicate infra | Future scale | Defer until reliability demands | Medium |

---

## 20.2 Expensive / hard-to-reverse decisions (call out)

| Decision | Why hard to reverse | Guidance |
|----------|--------------------|----------|
| Primary database (doc 07) | Data migration risk once real data exists | Decide early, deliberately → PostgreSQL recommended |
| Cloud provider/region | Data gravity + egress costs | Choose India region; keep services modular |
| Fund-handling posture (Manage) | Triggers licensing/escrow obligations | Recommend NOT holding funds initially |
| "Verified" branding | Trust/legal exposure if premature | Never claim until real process exists |
| Data model for PROPERTY≠LISTING | Corrupts history if merged | Enforce separation from day one |

---

## 20.3 Cost-control principles
- Don't over-engineer the MVP; add infra only when metrics justify it.
- Prefer managed services early (buy reliability, not headaches); optimise cost later.
- Consent + rate limits directly lower SMS/email/AI spend.
- Modular services avoid costly vendor lock-in.
- Every additive service (search engine, Redis, maps, AI) is introduced at its phase, not upfront.

## 20.4 Founder decisions (see doc 21)
Cloud/region, managed vs self-hosted DB, provider choices (SMS/email/maps/payment/AI), monitoring/analytics tiers, HA timing, fund-handling posture.
