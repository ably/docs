# AI Transport Docs — Page Design Principles

**Baseline:** [AITDR-009](0-aitdr-009-ia-decision-record.md) established 7 IA-level design principles: (1) docs stand alone for the buying decision, (2) simplicity is the product, (3) one focus per page structured by developer intent, (4) framework and language are a toggle, (5) self-contained docs, (6) inbound through excellence not pollution, (7) ship and iterate. Those remain unchanged.

This document tracks **additional page-level principles** that emerged from wireframing. These govern how individual pages are structured, not how the IA is organised.

---

## Page-level principles

### 1. Humans first, agents second

The first one to two folds of every page are designed for humans — what this is, why it matters, how Ably makes it easier. Technical detail, edge cases, and API specifics live lower on the page where agents can still find them. Humans need the narrative up top.

### 2. Progressive disclosure tiers

Each page has clear tiers. A developer can stop reading at any tier and have gotten value:

1. **Understand** — what is this, why does it matter, how does it work (1-2 folds)
2. **See it** — minimal code + live example
3. **Build it** — full implementation guide (server, client, framework-specific)
4. **Go deep** — configuration, API reference, internals, edge cases, FAQ

### 3. Feature pages lead with "How it works" (positive-forward)

Feature pages lead with how AI Transport solves the problem, not with what's broken. The developer's first impression should be "this is elegant." Traditional architecture context is a lightweight aside — a callout panel, two sentences, no code, no diagram. The problem-first framing lives on concept pages ("How it works") and "Why AI Transport", not on feature pages.

### 4. Concept pages convey what the layer requires

Concept pages (under "How it works") aren't just mental models — they also name the technical properties a proper session/turn layer needs (ordering, persistence, accumulation, fan-out, presence, etc.) and connect each to why it matters. This builds the picture of why this is a dedicated layer, not something to bolt on. The pattern is: problem → model → what this requires → code proof.

### 5. Concept pages don't teach features

Concept pages show what an abstraction *is* and what it requires. Feature pages show what you *do* with it. If a concept page covers implementation detail (abort signals, onCancel hooks, React hooks for active turns), it becomes the de facto feature page and the actual feature pages either duplicate or feel thin. The concept page is the stable mental model; feature pages evolve as capabilities ship.

### 6. Minimal code shows what Ably does, not setup boilerplate

The first code sample on any page is contrived and minimal. It shows the specific capability with everything else stripped away. No auth setup, no full app scaffolding. The runnable implementation comes later.

**Auth in examples:** Avoid embedding API keys in client code. Use a placeholder for token auth. Many examples don't need to show auth at all.

### 7. Code + live example are a paired UI element

Every feature page has a code sample immediately followed by a live example thumbnail + "Try it out" button. These always appear together as a consistent UI component. The example is not embedded inline (too large) — it's a thumbnail + link. Live examples use an Ably-hosted LLM endpoint (lightweight model, IP rate limited) so they work out of the box.

### 8. Link back to concepts, don't require them

Feature pages reference concepts (sessions, turns, transport) with 1-2 line inline explanations and "learn more" links. A developer should never need to leave the feature page to understand it.

---

## Changelog

### 2026-04-07: Principles updated after wireframing iterations

- Added principle 3 (positive-forward feature pages) — feature pages no longer lead with the problem. "How it works" is the heading, traditional architecture is a lightweight aside.
- Added principle 4 (concept pages convey what the layer requires) — the properties table pattern.
- Added principle 5 (concept pages don't teach features) — scope boundary to prevent sprawl.
- Added principle 7 (code + live example paired) — consistent UI element.
- Reframed principle 3 from v1 (was "show the problem then show how Ably removes it" — that now applies to concept pages, not feature pages).

### 2026-04-07: Initial page-level principles

Established from wireframing discussion. Reframed to reference AITDR-009 baseline rather than replicate.
