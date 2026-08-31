---
title: 'Product Brief: Keiba Media Pivot (working name: ウマノミカタ)'
status: 'complete'
created: '2026-08-25'
updated: '2026-08-25'
inputs:
  - _bmad-output/project-context.md (pivot note, reusable-foundation rules)
  - NOTE.md (Japanese SEO / rich-results playbook)
  - Web research: JP + international horse-racing site landscape (netkeiba, JRA, Umanity, keibalab, JRA-VAN, Racing Post, Timeform, Equibase, DRF)
  - Review panel: skeptic, opportunity, GTM/content-ops lenses (2026-08-25)
  - User decisions in session 2026-08-25 (pillars, monetization deferral, new brand)
---

# Product Brief: Keiba Media Pivot — ウマノミカタ (working name)

## Executive Summary

Japan's horse racing is the largest betting market in the world and still growing — JRA turnover reached ¥3.5 trillion in 2025, its 14th consecutive year of growth, driven almost entirely online. Its fastest-growing fan segment is 20-somethings pulled in by Uma Musume and SNS culture. Yet no independent brand owns their journey from curiosity to fandom: the sites they land on are 20-year-old, ad-saturated portals that bury beginners in jargon, and the "tips" category is so scam-ridden that JRA itself publishes warnings about it.

**The thesis: become the graduation path from Uma Musume to real racing** — the brand that owns the beginner journey end-to-end (curiosity → first race card → first bet → first G1 weekend). We will convert an existing, battle-tested static-site codebase (Astro 5, mobile Lighthouse 99–100, a proven Japanese-SEO playbook, and an AI content pipeline) into a new keiba media brand built on three pillars: a **beginner education hub**, a **G1/graded-race magazine**, and — once privately validated — a **transparent AI prediction ledger** positioned as Japan's first fully auditable prediction record.

The strategy deliberately avoids the licensed-data layer (live odds, real-time results, databases) where incumbents are unbeatable and legal risk lives. Monetization is deferred by design: a static site with no licensing fees, no infrastructure cost, and no payroll can wait out the SEO ramp indefinitely — the exact cost asymmetry that forces ad-funded incumbents into the clutter that makes them beatable.

## The Problem

A first-time keiba fan today — a 25-year-old who got curious through Uma Musume — has three bad options:

- **netkeiba**: comprehensive, but ad-dense pages that shift under your thumb, paywalled basics, and race pages written in insider shorthand (脚質, 馬場, 血統) with no on-ramp.
- **JRA's official site**: authoritative and free, but a utilitarian reference desk, not a guide.
- **予想サイト (tip sites)**: a category defined by "guaranteed win" scams and fabricated records.

The fastest-growing fan cohort in the sport's biggest market has no trustworthy, mobile-first place to learn the game — and fans who want analysis get either paywalled expert products or anonymous tipsters with unverifiable records.

## The Solution

A new Japanese-language keiba media site, three pillars plus a signature content vertical:

1. **Beginner education hub (初心者向け)** — evergreen guides: how to read a 出馬表, bet types, keiba glossary, first day at the track, how online betting works. The SEO backbone: build once, rank long, zero licensing risk.
2. **G1/重賞 magazine** — race-week deep dives: history, course characteristics, pedigree stories, star horse profiles. Each G1 gets an evergreen hub page refreshed annually — the JRA calendar is a predictable, compounding seasonal traffic machine (Arima Kinen and the Derby draw casual-search volume rivaling major sporting events).
3. **Transparent AI prediction ledger** — weekend graded-race analysis as articles, with a public, immutable hit/ROI record including losses. Positioned as a transparency standard, not a tip service: no profitability claims, ever. **De-risk first:** the pipeline runs privately for 8–12 race weeks; the ledger goes public only after honest evaluation of its record.
4. **Uma Musume → real horse bridge (signature vertical, woven through pillars 1–2)** — real-story profiles of the horses behind the characters, and "which real races feature them this weekend" guides. Highest-intent, lowest-competition search space in the strategy; factual horse history only (no game assets or character imagery — Cygames IP stays untouched).

All content is static publishing on the existing Astro foundation: no databases, no real-time feeds, no server infrastructure. Client-side interactive tools (bet-type payout simulator, annotated race-card reader) are a Phase-2 backlink-magnet layer that fits the same architecture.

## What Makes This Different

- **Performance as an SEO weapon, not just UX.** Lighthouse 99–100 mobile against catastrophically slow incumbents means winning Core Web Vitals in Japanese mobile SERPs before content quality is even judged — compounded by a documented JP rich-results playbook proven on a previous site.
- **Trust as brand, with receipts.** Named authorship, AI-assistance disclosure, and a prediction ledger whose credibility grows with every honestly recorded losing week — a first-mover asset no late arrival can backfill, because history cannot be faked retroactively.
- **Content-production economics.** An existing AI pipeline (seo-cockpit) enables the dual cadence — evergreen library plus weekly race coverage — that breaks any other solo operator. This is what makes the plan feasible at all.
- **Cost-structure asymmetry.** Incumbents carry data licensing and payroll that force ad saturation; this operation's near-zero cost base makes "traffic first, monetize later" a strategy, not a hope.
- **Honesty about the moat:** speed and clean design are replicable. The durable assets are the accumulated ledger history, the beginner-journey brand, and an owned audience — which is why distribution (below) is first-class scope.

## Trust & Editorial Standards

Gambling-adjacent content is quasi-YMYL for Google, and scaled anonymous AI content is exactly what recent core updates demote. Therefore, as launch requirements:

- **Named author persona** with an about page and visible editorial policy; mandatory human review pass on all AI-assisted content, with AI assistance disclosed.
- **Responsible-gambling posture:** age notice (betting under 20 is illegal in Japan), no profitability claims, 景品表示法-safe language throughout.
- **Data boundary, written down:** OK — finishing order and winning time of a G1 in prose, hand-curated historical facts, publicly announced information. NOT OK — sortable results tables across races, bulk data reproduction, scraping netkeiba/JRA, anything resembling a database product.

## Who This Serves

**Primary: the new-generation beginner (20s–30s, mobile-first).** Came via Uma Musume or SNS; reads on a phone on weekends before races; needs plain-language explanations and confidence they're not being scammed. Success: "I understood the race card, placed my first small bet, and enjoyed the G1 more because I knew the stories."

**Secondary: the casual-to-intermediate fan** who wants context deeper than headlines without premium data subscriptions. Success: the weekly G1 deep-dive becomes a habit; the honest ledger is a fun weekend reference.

## Distribution

SEO alone is not a launch plan — a new domain sees near-zero organic traffic for 4–8 months, and AI Overviews are absorbing definitional beginner queries. Therefore MVP scope includes:

- **X (Twitter) account** with G1-week threads repurposed from the deep-dives — the keiba conversation lives there, and it feeds the SNS success metric with an actual mechanism.
- **Owned channel from day one:** LINE official account and/or weekend newsletter timed to the JRA calendar ("Saturday morning: this week's G1 story"). The weekly racing rhythm is a natural send cadence most media never gets.
- **Creator citation layer (Phase 2):** keiba YouTubers/VTubers lack a trustworthy written reference to link to; glossary and race-history pages are built to be that citation target.

## Success Criteria

Phase-one success is traffic **and measured trust**, not revenue:

- **6 months:** 5–10k organic sessions/month; top-10 rankings for 15–20 beginner/Uma-Musume-bridge keywords chosen via keyword-gap research (not taxonomy); Article rich results rendering. **Pivot threshold: <2k sessions/month at month 6 → revisit strategy.**
- **12 months:** 30–50k organic sessions/month; monetization decision made from real traffic.
- **Trust proxies:** return-visitor rate, branded search volume, X/LINE follower growth, direct-traffic share by month 12.
- **Operational health:** a defined minimum viable cadence ships every JRA weekend (1 deep-dive per G1 week; evergreen production may pause during race weeks) — with an explicit fallback mode instead of silent burnout.

## Scope

**Pre-MVP gates (blockers, decided before build):**
1. **Name/domain validation** — J-PlatPat trademark search, domain + SNS handle availability, no confusion with existing keiba services. Working name ウマノミカタ ("how to read horses" / "the horse's ally"); alternatives: 競馬コンパス, ウマガイド.
2. **Keyword-gap research** — for each candidate article: volume, current SERP owners (netkeiba/JRA beginner pages, Umanity, affiliate blogs), AI-Overview presence. Article list is committed only where the SERP is winnable.

**In (MVP):**
- Codebase conversion: replace home-services collections/schemas/routes with keiba equivalents; new brand identity on existing design-token system; retire Formspree flow and home-services baggage per the pivot note.
- ~20 foundational beginner + Uma-Musume-bridge articles + glossary, with full JSON-LD/SEO plumbing; pillar hub pages.
- 2–3 G1 deep-dive articles establishing the magazine format.
- X account + LINE/newsletter shell; Trust & Editorial Standards pages (author, policy, responsible-gambling notice).
- Private prediction dry-run begins (internal ledger, not published).

**Phase 2 (deferred, not abandoned):** public prediction ledger (after dry-run evaluation), interactive beginner tools, monetization (Oddspark/Rakuten Keiba affiliate — relationship-building starts earlier), NAR regional coverage, creator partnerships, video repurposing.

**Out (deliberately):** live odds, real-time results, horse/jockey databases, paid tips, JRA-VAN/JRADB data redistribution, betting-account handling, Uma Musume game assets/imagery.

## Top Risks (acknowledged)

1. **AI Overviews / zero-click SERPs** absorbing definitional beginner queries — mitigated by bridge-vertical long-tail, owned channels, and tools/formats AI answers can't replicate. (High)
2. **Solo-operator burnout** on a calendar with no off-season — mitigated by minimum-viable-cadence definition and fallback mode. (High)
3. **Ledger backfire:** a public losing record + future affiliate links = trust and 景品表示法 exposure — mitigated by private dry-run, entertainment/process framing, no profitability claims. (Medium)
4. **Replicable differentiators:** if netkeiba ships a beginner hub, speed/clean-design positioning erodes — mitigated by compounding assets (ledger history, owned audience, brand voice). (Medium)
5. **Uma Musume dependency:** the audience thesis rides one IP's popularity cycle — mitigated by the beginner hub standing on generic 初心者 intent as well. (Medium)

## Open Decisions (owner: Luonghailam)

1. **Named author persona & Japanese-language QA** — who fronts the content, and who reviews AI-assisted Japanese before publish. The single biggest operational bottleneck; must be resolved before content production starts.
2. **Timeline & capacity budget** — launch date and sustainable hours/week. Proposed minimum viable cadence: 1 deep-dive per G1 week, evergreen pausable during race weeks.
3. **Final brand name** — working proposal ウマノミカタ (見方/味方 wordplay); requires the pre-MVP validation gate (trademark, domain, SNS handles) before commitment.

## Vision

In 2–3 years, ウマノミカタ is the default first bookmark for Japan's new keiba fans — the recognized graduation path from Uma Musume to real racing — with a beginner library that owns its search space, a G1 magazine with an SNS-recognizable voice, and the most trusted (because most auditable) prediction record in the category. From that trust base, affiliate revenue funds NAR regional coverage and data-visual storytelling — still fast, still clean, still honest.
