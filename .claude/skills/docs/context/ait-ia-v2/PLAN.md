# AI Transport Documentation Plan

**Date:** 2026-04-07
**Branch:** Integration branch, fresh slate for AI Transport docs
**Source of truth:** `@ably/ai-transport` SDK at `/home/mike/code/ably-ai-transport-js`

This plan maps every page in the target IA to the SDK capabilities that back it. Pages are grouped by section. Each page lists its purpose, the SDK source material that drives it, and the priority tier.

**Priority tiers:**
- **P0** - Core pages needed for a developer to understand and start using AI Transport
- **P1** - Feature pages covering shipped SDK capabilities
- **P2** - Depth pages (internals, production, reference) that round out the docs

---

## Section 1: Overview

| Page | File path | Purpose | Priority |
|---|---|---|---|
| Overview | `ai-transport/index.mdx` | Orient the developer. One-paragraph definition of AI Transport, routing cards based on intent (evaluating, choosing a framework, building, looking up reference). | P0 |

**SDK source material:** README.md framing, `src/index.ts` exports for capability summary.
**Design notes:** Per the IA, this is the most designed page. Routes four developer journeys (evaluating, framework-first, problem-first, returning). Not a feature list - a routing page.

---

## Section 2: Why AI Transport

| Page | File path | Purpose | Priority |
|---|---|---|---|
| Why AI Transport | `ai-transport/why-ai-transport.mdx` | Make the case for the product category. The missing layer, what it enables, why Ably. | P0 |

**SDK source material:** README.md problem statement (HTTP streaming fragility), feature overview.
**Design notes:** Single page. If the case can't be made on one page, the messaging isn't sharp enough. Links to framework guides and how it works for depth. Per AITDR-009 principle 2: "simplicity is the product" - framing is "you have this problem, and it disappears."

---

## Section 3: How it works

| Page | File path | Purpose | Priority |
|---|---|---|---|
| How it works (landing) | `ai-transport/how-it-works/index.mdx` | Mental map of the key concepts and how they relate. | P0 |
| Sessions and Turns | `ai-transport/how-it-works/sessions-and-turns.mdx` | Session model, turn lifecycle, what the layer requires. | P0 |
| Transport | `ai-transport/how-it-works/transport.mdx` | Two-layer SDK architecture, client/server split, codec. | P0 |
| Authentication | `ai-transport/how-it-works/authentication.mdx` | Token auth, client IDs, permissions, channel-level auth. | P0 |
| Infrastructure | `ai-transport/how-it-works/infrastructure.mdx` | Edge network, multi-region, scale, reliability - why Ably specifically. | P1 |

**SDK source material:**
- Sessions and Turns: `docs/concepts/turns.md`, `src/core/transport/types.ts` (Turn, ActiveTurn, TurnLifecycleEvent), `src/core/transport/turn-manager.ts`. Wireframe in `3-how-it-works-sessions-and-turns.md`.
- Transport: `docs/concepts/transport.md`, `src/core/codec/types.ts` (Codec interface), `src/core/transport/client-transport.ts`, `src/core/transport/server-transport.ts`.
- Authentication: `ClientTransportOptions.headers`, `ClientTransportOptions.credentials`, `NewTurnOptions.onCancel` for cancel authorization. Ably client auth is a prerequisite.
- Infrastructure: Platform docs (existing Ably content on fault tolerance, latency, scalability).

**Design notes:** Per IA v2, authentication moves under "How it works" (was top-level in AITDR-009). Infrastructure is a new addition - the "why Ably specifically" page. Concept pages follow the pattern: problem -> model -> what this layer requires -> code proof (see wireframe). Concept pages don't teach features - they build the mental model.

---

## Section 4: Getting started

| Page | File path | Purpose | Priority |
|---|---|---|---|
| Getting started (landing) | `ai-transport/getting-started/index.mdx` | Route to per-framework quickstarts. | P0 |
| Vercel AI SDK | `ai-transport/getting-started/vercel-ai-sdk.mdx` | 5-minute quickstart with Vercel AI SDK + useChat. | P0 |
| OpenAI | `ai-transport/getting-started/openai.mdx` | 5-minute quickstart with OpenAI SDK directly. | P0 |
| Anthropic | `ai-transport/getting-started/anthropic.mdx` | 5-minute quickstart with Anthropic SDK directly. | P0 |
| LangGraph | `ai-transport/getting-started/langgraph.mdx` | 5-minute quickstart with LangGraph. | P1 |

**SDK source material:**
- Vercel: `docs/get-started/vercel-use-chat.md`, `src/vercel/` (ChatTransport, useChatTransport, useMessageSync).
- OpenAI/Anthropic/LangGraph: These use the core transport directly with a custom or no codec. See `examples/` directory for patterns. The SDK is provider-agnostic; the server transport takes any `ReadableStream<TEvent>`.

**Design notes:** Purely practical. Get running, not understanding. One-liner links to framework guides for "why use these together."

---

## Section 5: Framework guides

| Page | File path | Purpose | Priority |
|---|---|---|---|
| Vercel AI SDK | `ai-transport/framework-guides/vercel-ai-sdk.mdx` | What Vercel AI SDK does, what AI Transport adds, how they complement. | P0 |
| OpenAI SDK | `ai-transport/framework-guides/openai.mdx` | OpenAI SDK + AI Transport: what each layer does. | P1 |
| Anthropic SDK | `ai-transport/framework-guides/anthropic.mdx` | Anthropic SDK + AI Transport: what each layer does. | P1 |
| LangGraph | `ai-transport/framework-guides/langgraph.mdx` | LangGraph + AI Transport: different architecture, agent crash recovery. | P1 |

**SDK source material:**
- Vercel: `docs/frameworks/vercel-ai-sdk.md`, `src/vercel/` (ChatTransport adapter, UIMessageCodec, two integration paths). Wireframe in `4-framework-guide.md`.
- Others: Core transport (`src/core/`) is framework-agnostic. These guides explain the integration pattern, not SDK-specific code.

**Design notes:** Per the wireframe, framework guides follow: what each layer does (side-by-side) -> how they fit together (architecture + code) -> what this unlocks (problems solved + new capabilities). Candid developer-to-developer tone. Not promotional. Each guide must feel framework-native, not a template with the name swapped.

---

## Section 6: Features

All feature pages follow the positive-forward pattern from `5-feature-page.md`: how it works -> minimal code -> lightweight aside -> full implementation -> configuration -> edge cases -> FAQ -> related features.

| Page | File path | SDK feature | Priority |
|---|---|---|---|
| Token streaming | `ai-transport/features/token-streaming.mdx` | `StreamEncoder.appendEvent()`, `streamResponse()`, message appends. Stream lifecycle (streaming/finished/aborted). | P0 |
| Cancellation | `ai-transport/features/cancellation.mdx` | `ActiveTurn.cancel()`, `CancelFilter` (own/turnId/clientId/all), server `onCancel` hook, `onAbort` for final events. | P0 |
| Reconnection and recovery | `ai-transport/features/reconnection-and-recovery.mdx` | Ably channel reconnection, `untilAttach` for gapless history, encoder flush/recovery (`updateMessage` fallback), lifecycle tracker for mid-stream joins. | P0 |
| Multi-device sessions | `ai-transport/features/multi-device.mdx` | Shared Ably channel, observer turn accumulation (AIT-CT16), `useMessageSync` for Vercel, active turn tracking across clients, late-joiner history. | P0 |
| History and replay | `ai-transport/features/history.mdx` | `View.loadOlder()`, `untilAttach`, paginated `PaginatedMessages`, tree reconstruction from history, scroll-back pattern. | P1 |
| Conversation branching | `ai-transport/features/branching.mdx` | `Tree` with parent/forkOf, sibling groups, `View.edit()` forks, `View.regenerate()` forks, `getSiblings()`, `hasSiblings()`, `select()`, split-pane with `useCreateView`. | P1 |
| Interruption and barge-in | `ai-transport/features/interruption.mdx` | Cancel-then-send and send-alongside patterns, detecting active turns, concurrent turn support. | P1 |
| Concurrent turns | `ai-transport/features/concurrent-turns.mdx` | Multiple active turns, independent streams, scoped cancel filters, `useActiveTurns`, `waitForTurn()`. | P1 |
| Edit and regenerate | `ai-transport/features/edit-and-regenerate.mdx` | `View.edit()`, `View.regenerate()`, `useEdit`, `useRegenerate` hooks. Fork computation, truncated history, auto-parent. | P1 |
| Tool calling | `ai-transport/features/tool-calling.mdx` | Server-executed tools (automatic via AI SDK), client-executed tools (`View.update()`), `Turn.addEvents()` for cross-turn events, `EventsNode`. | P1 |
| Human-in-the-loop | `ai-transport/features/human-in-the-loop.mdx` | `View.update()` for approval gates, continuation turns, tool result delivery from client. Built on tool calling primitives. | P1 |
| Optimistic updates | `ai-transport/features/optimistic-updates.mdx` | Optimistic tree insert before POST, reconciliation via `x-ably-msg-id` (AIT-CT15), serial promotion, multi-message chaining. | P1 |
| Agent presence | `ai-transport/features/agent-presence.mdx` | Uses Ably's native Presence API (not in SDK). Show streaming/thinking/idle/crashed status. | P2 |
| Push notifications | `ai-transport/features/push-notifications.mdx` | Uses Ably's native Push API (not in SDK). Background task completion notifications. | P2 |
| Chain of thought | `ai-transport/features/chain-of-thought.mdx` | `PhaseConfig`, `LifecycleTracker`, Vercel codec `reasoning` stream type. Streaming reasoning alongside text. | P2 |
| Double texting | `ai-transport/features/double-texting.mdx` | Concurrent turns as the underlying mechanism. Queue-while-streaming UI pattern. | P2 |

**SDK source material per feature listed in table.** Feature docs at `docs/features/` in the SDK repo are the primary prose reference. Source code is the truth for API surface and behaviour.

---

## Section 7: Use cases and demos

| Page | File path | Purpose | Priority |
|---|---|---|---|
| Use cases landing | `ai-transport/use-cases/index.mdx` | Overview of use cases with routing to individual pages. | P2 |
| Customer support chat | `ai-transport/use-cases/support-chat.mdx` | Multi-agent, human handoff, persistent sessions. | P2 |
| AI copilot | `ai-transport/use-cases/copilot.mdx` | Inline assistance, tool calling, cancellation. | P2 |

**Design notes:** 1:1 with demos. Each page includes an interactive demo, explains why AI Transport is suited, links to features. Defer until feature pages exist and demos are built.

---

## Section 8: Examples

Examples are atomic code samples, not documentation pages. They live in the `examples/` directory on the docs site and are linked from feature pages and guides. The existing `/generate-guide` command handles guide generation from examples.

No new MDX pages needed for this section - it's populated by the examples directory and the guides section.

---

## Section 9: Going to production

| Page | File path | Purpose | Priority |
|---|---|---|---|
| Going to production | `ai-transport/production/index.mdx` | Production checklist absorbing auth hardening, compliance, monitoring. | P2 |
| Pricing and limits | `ai-transport/production/pricing-and-limits.mdx` | Cost model, rate limits, message limits. | P2 |

**Design notes:** Per IA v2, this absorbs auth hardening, compliance (SOC 2, HIPAA), data shipping as checklist items. Links out to platform docs for deep dives.

---

## Section 10: API reference

| Page | File path | Purpose | Priority |
|---|---|---|---|
| API reference landing | `ai-transport/api-reference/index.mdx` | Overview of API surfaces, oriented by entry point. | P1 |
| Client transport API | `ai-transport/api-reference/client-transport.mdx` | `createClientTransport`, `ClientTransport` methods, options, events. | P1 |
| Server transport API | `ai-transport/api-reference/server-transport.mdx` | `createServerTransport`, `ServerTransport`, `Turn` lifecycle methods. | P1 |
| React hooks | `ai-transport/api-reference/react-hooks.mdx` | All generic React hooks: signatures, params, returns. | P1 |
| Vercel integration API | `ai-transport/api-reference/vercel.mdx` | `UIMessageCodec`, `ChatTransport`, Vercel-specific hooks. | P1 |
| Codec API | `ai-transport/api-reference/codec.mdx` | `Codec` interface, `EncoderCore`, `DecoderCore`, writing custom codecs. | P2 |
| Error codes | `ai-transport/api-reference/error-codes.mdx` | All error codes with descriptions, HTTP status, recovery guidance. | P1 |

**SDK source material:** `src/core/transport/types.ts`, `src/core/codec/types.ts`, `src/react/index.ts`, `src/vercel/index.ts`, `docs/reference/react-hooks.md`, `docs/reference/error-codes.md`.

---

## Section 11: Internals

| Page | File path | Purpose | Priority |
|---|---|---|---|
| Internals landing | `ai-transport/internals/index.mdx` | Overview of internal architecture. | P2 |
| Wire protocol | `ai-transport/internals/wire-protocol.mdx` | Headers, lifecycle events, content messages, streamed message lifecycle, message identity. | P2 |
| Codec architecture | `ai-transport/internals/codec-architecture.mdx` | Encoder core, decoder core, lifecycle tracker, how to write a custom codec. | P2 |
| Conversation tree | `ai-transport/internals/conversation-tree.mdx` | Serial ordering, sibling groups, fork chains, flatten algorithm. | P2 |
| Transport patterns | `ai-transport/internals/transport-patterns.mdx` | StreamRouter, TurnManager, pipeStream, cancel routing. | P2 |

**SDK source material:** All 14 internals docs in `docs/internals/` plus glossary. These are the primary input - adapt for public audience.

---

## Section 12: Guides

Guides are step-by-step tutorials generated from runnable examples. The existing `/generate-guide` command handles these. They sit alongside the IA but are generated separately.

Current guides cover: message-per-response, message-per-token, human-in-the-loop, and citations across Anthropic, OpenAI, LangGraph, and Vercel AI SDK. New guides will be added as examples are built.

---

## Implementation order

### Phase 1: Core narrative (P0)

Write the pages that let a developer understand and start using AI Transport:

1. **Overview** - the front door
2. **Why AI Transport** - the case for the category
3. **How it works** - landing + Sessions and Turns + Transport + Authentication
4. **Getting started** - Vercel AI SDK quickstart first (best SDK support), then OpenAI, Anthropic
5. **Vercel AI SDK framework guide** - the deepest integration

### Phase 2: Feature pages (P0 + P1)

Write feature pages for shipped SDK capabilities, starting with the highest-impact:

1. Token streaming (P0)
2. Cancellation (P0)
3. Reconnection and recovery (P0)
4. Multi-device sessions (P0)
5. History and replay (P1)
6. Conversation branching (P1)
7. Remaining P1 features in any order

### Phase 3: Reference and depth (P1 + P2)

1. API reference pages
2. Remaining framework guides (OpenAI, Anthropic, LangGraph)
3. Going to production
4. Internals
5. Use cases and demos
6. Remaining P2 features (presence, push, chain of thought, double texting)

---

## Navigation structure

```ts
// src/data/nav/aitransport.ts
{
  name: 'Overview',
  link: '/docs/ai-transport',
  index: true,
},
{
  name: 'Why AI Transport',
  link: '/docs/ai-transport/why-ai-transport',
},
{
  name: 'How it works',
  pages: [
    { name: 'Overview', link: '/docs/ai-transport/how-it-works', index: true },
    { name: 'Sessions and Turns', link: '/docs/ai-transport/how-it-works/sessions-and-turns' },
    { name: 'Transport', link: '/docs/ai-transport/how-it-works/transport' },
    { name: 'Authentication', link: '/docs/ai-transport/how-it-works/authentication' },
    { name: 'Infrastructure', link: '/docs/ai-transport/how-it-works/infrastructure' },
  ],
},
{
  name: 'Getting started',
  pages: [
    { name: 'Vercel AI SDK', link: '/docs/ai-transport/getting-started/vercel-ai-sdk' },
    { name: 'OpenAI', link: '/docs/ai-transport/getting-started/openai' },
    { name: 'Anthropic', link: '/docs/ai-transport/getting-started/anthropic' },
    { name: 'LangGraph', link: '/docs/ai-transport/getting-started/langgraph' },
  ],
},
{
  name: 'Framework guides',
  pages: [
    { name: 'Vercel AI SDK', link: '/docs/ai-transport/framework-guides/vercel-ai-sdk' },
    { name: 'OpenAI', link: '/docs/ai-transport/framework-guides/openai' },
    { name: 'Anthropic', link: '/docs/ai-transport/framework-guides/anthropic' },
    { name: 'LangGraph', link: '/docs/ai-transport/framework-guides/langgraph' },
  ],
},
{
  name: 'Features',
  pages: [
    { name: 'Token streaming', link: '/docs/ai-transport/features/token-streaming' },
    { name: 'Cancellation', link: '/docs/ai-transport/features/cancellation' },
    { name: 'Reconnection and recovery', link: '/docs/ai-transport/features/reconnection-and-recovery' },
    { name: 'Multi-device sessions', link: '/docs/ai-transport/features/multi-device' },
    { name: 'History and replay', link: '/docs/ai-transport/features/history' },
    { name: 'Conversation branching', link: '/docs/ai-transport/features/branching' },
    { name: 'Interruption and barge-in', link: '/docs/ai-transport/features/interruption' },
    { name: 'Concurrent turns', link: '/docs/ai-transport/features/concurrent-turns' },
    { name: 'Edit and regenerate', link: '/docs/ai-transport/features/edit-and-regenerate' },
    { name: 'Tool calling', link: '/docs/ai-transport/features/tool-calling' },
    { name: 'Human-in-the-loop', link: '/docs/ai-transport/features/human-in-the-loop' },
    { name: 'Optimistic updates', link: '/docs/ai-transport/features/optimistic-updates' },
    { name: 'Agent presence', link: '/docs/ai-transport/features/agent-presence' },
    { name: 'Push notifications', link: '/docs/ai-transport/features/push-notifications' },
    { name: 'Chain of thought', link: '/docs/ai-transport/features/chain-of-thought' },
    { name: 'Double texting', link: '/docs/ai-transport/features/double-texting' },
  ],
},
{
  name: 'Use cases',
  pages: [
    { name: 'Overview', link: '/docs/ai-transport/use-cases', index: true },
    { name: 'Customer support chat', link: '/docs/ai-transport/use-cases/support-chat' },
    { name: 'AI copilot', link: '/docs/ai-transport/use-cases/copilot' },
  ],
},
{
  name: 'Going to production',
  pages: [
    { name: 'Overview', link: '/docs/ai-transport/production', index: true },
    { name: 'Pricing and limits', link: '/docs/ai-transport/production/pricing-and-limits' },
  ],
},
{
  name: 'API reference',
  pages: [
    { name: 'Overview', link: '/docs/ai-transport/api-reference', index: true },
    { name: 'Client transport', link: '/docs/ai-transport/api-reference/client-transport' },
    { name: 'Server transport', link: '/docs/ai-transport/api-reference/server-transport' },
    { name: 'React hooks', link: '/docs/ai-transport/api-reference/react-hooks' },
    { name: 'Vercel integration', link: '/docs/ai-transport/api-reference/vercel' },
    { name: 'Codec', link: '/docs/ai-transport/api-reference/codec' },
    { name: 'Error codes', link: '/docs/ai-transport/api-reference/error-codes' },
  ],
},
{
  name: 'Internals',
  pages: [
    { name: 'Overview', link: '/docs/ai-transport/internals', index: true },
    { name: 'Wire protocol', link: '/docs/ai-transport/internals/wire-protocol' },
    { name: 'Codec architecture', link: '/docs/ai-transport/internals/codec-architecture' },
    { name: 'Conversation tree', link: '/docs/ai-transport/internals/conversation-tree' },
    { name: 'Transport patterns', link: '/docs/ai-transport/internals/transport-patterns' },
  ],
},
// Guides section stays as-is, populated by /generate-guide
```

---

## Key decisions reflected in this plan

1. **Fresh slate.** Existing AIT pages are not carried forward. Content may be reused where it aligns with the new IA, but every page is written fresh against the SDK source code.

2. **SDK-first.** Every feature page is backed by implemented SDK capability. Features not in the SDK (presence, push notifications) are documented as Ably platform features used alongside AI Transport, clearly scoped.

3. **Vercel AI SDK is the primary path.** It has the deepest integration (dedicated codec, ChatTransport adapter, React hooks). Other frameworks use the core transport directly.

4. **Flat features section.** Per AITDR-009: "The flat structure is a feature of the IA, not a problem to solve by grouping." Each feature page is atomic and self-contained.

5. **Guides are generated, not hand-written.** The `/generate-guide` command produces guides from runnable examples. They complement the IA but aren't part of the page-by-page plan.

6. **Positive-forward feature pages.** Per the v2 principles, feature pages lead with how AI Transport solves this, not what's broken. Traditional architecture context is a lightweight aside.
