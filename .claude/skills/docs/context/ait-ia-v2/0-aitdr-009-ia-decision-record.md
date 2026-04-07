# AITDR-009: AI Transport documentation information architecture

**Status:** Agreed
**Impact:** Medium
**Driver:** Fiona Corden
**Due date:** 2026-03-31

**Related documentation:**
- Matt's IA proposal (2026-03-24)
- Fiona's IA navigation synthesis (2026-03-17)
- @ably/ai-transport SDK repo

---

## Proposal

Adopt the information architecture described below for the AI Transport documentation on ably.com/docs. This defines the top-level sections, their purpose, and the structural principles that govern how content is organised across them.

This DR covers the IA structure only. It does not cover page-level content, visual design, content migration, prioritisation, or inbound content strategy.

## Context

AI Transport is defining a new product category: durable sessions for AI. Developers don't yet have a name for this layer or know they need it. The docs need to create understanding of the category and enable developers to build with the product. They must serve the full journey from evaluation to implementation without depending on marketing landing pages or sales conversations.

---

## Decision

### Design principles

Seven principles govern the structural choices in the IA.

1. **Docs stand alone for the buying decision.** A developer arriving anywhere in the docs should be able to understand why AIT exists, get excited about what it enables, and decide to use it without needing a landing page or sales conversation. Technical explanation and value proposition are the same thing.

2. **Simplicity is the product.** Every page reinforces that AIT makes things simpler. The framing is always "you have this problem, and it disappears." Infrastructure credibility (10+ years, billions of devices, HubSpot, Intercom) is not marketing - it's fundamental to developer trust.

3. **One focus per page, structured by developer intent.** Navigation mirrors what developers want to do: "cancel a stream", "add multi-device", "set up human handoff." Keeping pages atomic, rather than bundling multiple concepts together, makes each one simpler, more findable, and easier to maintain.

4. **Framework and language are a toggle, not a navigation split.** Feature pages are framework-agnostic. Code examples adapt via client-side language, server-side language, and framework toggles. If specific features need materially different docs per framework, we handle it inline.

5. **Self-contained docs.** AIT docs work without navigating broader Ably platform docs - it should be possible to learn about pricing, limits, authentication and compliance within the AIT docs section. Docs can link out for deep dives where appropriate.

6. **Inbound through excellence, not pollution.** Docs, landing pages, and targeted content each have distinct jobs. Docs serve the developer who has arrived. Landing pages serve broader marketing goals. Targeted inbound content captures developers searching for specific problems. We don't distort docs structure to rank for search terms.

7. **Ship and iterate.** Publishing and showing direction is more important than polish. Be explicit about what's shipped, what's partial, and what's planned.

### Information architecture

The IA has 12 top-level sections:

| Section | Purpose | Content |
|---|---|---|
| Overview | Orient the developer and route them to the right path | One-paragraph definition. Routes based on where the developer is: evaluating, choosing a framework, building, or looking up a reference. |
| Why AI Transport | Make the case for the product category | Single page. The missing layer (problem framing), what it enables (features overview), why Ably (infrastructure credibility). Links to framework guides and how it works for depth. If we can't make the case on one page, the messaging isn't sharp enough. |
| How it works | Give developers the mental model they need before building | Three sub-pages: Sessions (session model, three types of state, recovery), Transport (two-layer SDK, client/server, codec), Turns (turn model, lifecycle, concurrent turns). Sits above Getting started and Features because developers need the mental model to make sense of what follows. |
| Authentication | How to authenticate with AI Transport | Top-level section covering token auth, client IDs, and permissions. Sits outside "How it works" because authentication is a practical prerequisite for getting started, not just a conceptual topic. |
| Getting started | Get running in 5 minutes | Per-framework quickstarts. Action-oriented, minimal explanation. One per supported framework integration. Depending on how the content looks in practice, this section may be combined with the Framework guides. |
| Framework guides | Explain how AIT complements each framework | One page per framework. Each covers: what this framework does well, what gaps AIT fills, why they work well together. Candid, developer-to-developer tone. Not promotional. |
| Features | Explain what you can do and how | Intentionally flat list of atomic, focused pages. Each page: problem framing, capability explanation, code examples with framework toggles, embedded example (sandbox or GIF with link to full example), links to concepts and reference. The flat structure is a feature of the IA, not a problem to solve by grouping. Feature list is not fixed; it grows as capabilities ship. |
| Use cases and demos | Show how features come together for a real scenario | Pages like "Building support chat with AIT" or "Building a copilot." Use cases and demos are 1:1 - each page includes an interactive demo, explains why AIT is suited, and links to relevant features. |
| Examples | Atomic, focused code samples | One example = one thing demonstrated. Discoverable both by browsing and from feature page links. |
| Going to production | Everything needed for production readiness | Pricing and cost control, limits, compliance (SOC 2, HIPAA), monitoring and observability, production checklist. |
| API reference | API detail | Client transport API, server transport API, React hooks, codec API, error codes. Organised by API surface and oriented around language. |
| How it works (internals) | Implementation internals | Codec architecture, wire protocol, transport patterns, event mapping. Conceptually part of "how it works" but at a lower level of abstraction. Not required reading; exists for developers who want to understand the plumbing. |

### Developer journeys

The IA supports four primary entry patterns:

| Journey | Path through the IA |
|---|---|
| Evaluating ("What is this?") | Overview -> Why AI Transport -> How it works -> Framework guides -> Get started |
| Framework-first ("I use Vercel AI SDK, why do I need this?") | Framework guides: Vercel AI SDK -> Get started: Vercel AI SDK -> Features |
| Problem-first ("My streams keep breaking") | Why AI Transport -> How it works: Sessions -> Features: Reconnection and recovery -> Get started |
| Returning developer ("I need to add interruption") | Features: Interrupt -> API reference -> done |

### Key trade-offs

#### Per-framework feature pages vs. framework toggle

**Decision:** Framework toggle.

Framework is a toggle on feature pages (changing code examples), not a navigation split. This avoids the page explosion of having a new page for every framework/feature combination. Framework guides explain how AIT complements each framework, but individual features don't get per-framework variants.

This approach trades findability for simplicity. A developer searching for "Ably Vercel human in the loop" lands on the generic feature page rather than a focused framework-specific page. We accept this risk to keep the total page count under control. If analytics or feedback show that developers are bouncing, we can introduce per-framework sub-pages for the highest-traffic features without changing the rest of the IA.

#### Bundled vs. atomic feature pages

**Decision:** Atomic.

Bundling features based on underlying Ably feature or concept creates pages with conditional logic ("If you want x then do y"). Separate pages are simpler, more findable, and easier to maintain.

#### Where concepts live in the nav

**Decision:** "How it works" above Getting started.

Developers need the mental model before they start building. Implementation internals go in "How it works (internals)" at the bottom.

#### Problems as a section vs. woven in

**Decision:** Woven in.

Problem framing goes in two places: the "Why AI Transport" page establishes category-level problems, and each feature page opens with brief problem framing. Dedicated problem pages targeting specific search terms become targeted inbound content outside the docs, not docs pages.

---

## Required content outside the IA

These pages live outside the product docs IA, but the decision depends on them existing. Marketing and Product own creation and maintenance of these assets.

| Asset | Purpose | Owner |
|---|---|---|
| AIT landing page | Marketing-focused value proposition for a broad audience. Links to docs. | Marketing |
| Framework-specific landing pages | More promotional than the framework guide in docs. Customer stories, broader benefits, call-to-action. | Marketing |
| Problem-focused inbound content | Articles addressing specific pain points ("Vercel SSE streaming failures", "Anthropic connection drops in production"). Lives on blog or content hub. Drives developers to docs. Primary entry point for problem-first developers. | Marketing / Product (joint) |

---

## Migration plan

The new docs IA will be used to write all documentation for the AIT SDK and will be published when the AIT SDK goes to Public Preview. The exact set of documented features and frameworks will be determined by the AIT SDK capabilities. The existing AIT docs will be preserved in git history but will not be referenced or available from the Ably website/docs pages.
