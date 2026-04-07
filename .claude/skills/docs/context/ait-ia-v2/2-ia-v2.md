# AI Transport Docs IA — v2

**Date:** 2026-04-07
**Status:** Working draft
**Context:** Iterating on Fiona's agreed DR ([AITDR-009](0-aitdr-009-ia-decision-record.md)) in her absence. This document tracks what's changed and why, so there's a record when she returns. Wireframe detail for each section lives in `wireframes/`.

---

## What's changed from AITDR-009

| Change                                                           | What                                                                                                         | Why                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication back under "How it works"                         | DR had it as top-level. Now a subpage of "How it works" alongside Sessions+Turns, Transport, Infrastructure. | Auth is conceptually "how the system works." Quickstarts handle auth inline. Adding top-level sections dilutes the nav.                                                                                                                |
| Sessions and Turns combined                                      | DR had them as separate subpages. Now one page.                                                              | Turns are the lifecycle within sessions — tightly coupled. Can't explain turns without sessions, let's see how this plays out when it's documented though.                                                                             |
| Infrastructure added                                             | New "How it works" subpage. Not in the DR.                                                                   | The platform story (edge network, multi-region, scale, DDoS, reliability) is distinct from Transport (the SDK model). This is the "why Ably specifically" page and needed to convince devs this is not just another open source layer. |
| "How it works" homepage added                                    | DR implied subpages only. Now has a landing page.                                                            | Developers need a mental map of the concepts before diving into any one.                                                                                                                                                               |
| Last section renamed to "Internals"                              | DR called it "How it works (internals)".                                                                     | Two "How it works" items in the nav is confusing. "Internals" is short, unambiguous, and developers know what it means.                                                                                                                |
| "Reference" renamed to "API reference"                           | Per Mark Hulbert's feedback, adopted by DR.                                                                  | Clearer. Oriented around language. Types/constants in-situ, not a separate page.                                                                                                                                                       |
| "Going to Production" simplified                                 | DR had separate subpages for compliance, auth hardening. Now a production checklist absorbs these.           | Auth hardening, compliance (SOC 2, HIPAA), data shipping are checklist items, not standalone pages. ISO 27001 removed (Ably doesn't have it).                                                                                          |
| Getting started and Framework guides: explicitly different goals | DR noted they "may combine." We're keeping them separate.                                                    | Getting started = purely practical, get running in 5 min. Framework guides = understand the integration, benefits, architecture, known problems. Different intents.                                                                    |
| Feature page structure defined                                   | Not in DR.                                                                                                   | Positive-forward: leads with "How it works", traditional architecture as lightweight aside. Progressive disclosure. See `wireframes/feature-page.md`.                                                                                  |
| Concept page pattern defined                                     | Not in DR.                                                                                                   | problem → model → what this layer requires → code proof. Concept pages convey the technical properties needed, not feature implementation. See `wireframes/how-it-works-sessions-and-turns.md`.                                         |
| Live demo strategy documented                                    | Not in DR.                                                                                                   | Every feature page ships with a live example. Lightweight LLM (Haiku), Ably-hosted API endpoint, IP rate limiting.                                                                                                                     |
| Page-level design principles documented                          | Not in DR.                                                                                                   | 8 principles governing page structure (humans first, progressive disclosure, positive-forward features, concept scope boundary, etc.). See `PRINCIPLES.md`.                                                                            |

---

## Proposed IA

```
AI Transport
|
|-- Overview
|     Docs landing page. Understand what AI Transport does, why it exists,
|     navigate to everything else. The most designed page.
|
|-- Why AI Transport
|     The emerging layer HTTP can't provide. Not replacing frameworks,
|     replacing the transport. Customer proof points. Links to How it works.
|
|-- How it works
|   |   Homepage: mental map of the key concepts and how they relate.
|   |-- Sessions and Turns
|   |-- Transport
|   |-- Authentication
|   +-- Infrastructure
|
|-- Getting started
|     Per-framework quickstarts. Prompt-based or walkthrough. Links to
|     Framework guides for "why use these together."
|
|-- Framework guides
|     Per-framework: what the framework brings, what AI Transport brings, how
|     they complement, known problems, architecture.
|
|-- Features
|     Flat, atomic pages. Visual-first, code-fast, progressive disclosure.
|     Every page has a live demo. See wireframes/feature-page.md.
|
|-- Use cases and demos
|     1:1 — every use case has a demo, every demo has a guide.
|
|-- Examples
|     Atomic code samples. Ably-hosted LLM endpoint so examples work
|     out of the box without developer's own API key.
|
|-- Going to production
|     Pricing, limits, monitoring, production checklist (absorbs auth
|     hardening, compliance, data shipping).
|
|-- API reference
|     Client transport, server transport, React hooks, codec, error codes.
|     Types/constants in-situ. Oriented around language.
|
+-- Internals
    Codec architecture, wire protocol, transport patterns, event mapping.
```

---

## Decisions made and alternatives considered

### Last section name: "Internals"

| Considered | Why not |
|---|---|
| Under the Hood | Mark Hulbert flagged as too colloquial for docs nav |
| How it works (internals) | Two "How it works" items in the nav is confusing |
| Deep dive | Generic — could mean anything |
| Architecture | Confusable with "How it works > Transport" |
| Technical deep dive | Wordy for a nav item |

**Decision:** "Internals" — short, precise, developers know what it means.

### Authentication placement

| Considered | Why not |
|---|---|
| Top-level section (AITDR-009) | Adds nav clutter. Auth IS "how it works." Creates pressure for other top-level sections. |
| Under Getting started | Doesn't serve developers who want to understand the auth model without building. |
| No standalone page | Bad for discoverability. No single place to understand the model. |

**Decision:** Under "How it works." Auth appears in three journey contexts: conceptual model (How it works), practical setup (quickstarts), hardening (production checklist).

### Getting started + Framework guides: keep separate

Mark suggested they might combine. We're keeping them separate because they serve different intents: Getting started is purely practical (5 min to running code), Framework guides are about understanding the integration deeply (benefits, architecture, known problems, how they complement). A one-liner in Getting started links to the relevant Framework guide for anyone who wants the "why" first.
