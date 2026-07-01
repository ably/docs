# AI Transport docs

Positioning and terminology for AI Transport documentation pages under this
folder, auto-loaded when you edit them. Apply it alongside the general docs
guidance in `src/pages/docs/AGENTS.md`.

## Terminology

Use the canonical product vocabulary (the AI Transport Terminology Reference,
Confluence page 4865097761, is the source of truth):

- **Session / Run** — not Transport / Turn.
- **An object on a channel** — not `root`; e.g. `const myObject = await channel.object.get();`.
- **Barge-in is voice-specific; interruption is the general term** — do not conflate them.
- Branch selection is anchored on `codecMessageId`, not `runId`.


## AI Transport — Value Proposition

## One-line pitch

AI Transport is a drop-in infrastructure layer that gives AI applications durable, multi-device sessions so token streams survive disconnections, work across devices, and support bidirectional control — without building custom infrastructure.

## The problem

Most AI frameworks connect clients to agents with HTTP streaming. This works for simple demos but breaks in production:

- **Streams die on disconnection.** A network blip, tab refresh, or device switch kills the response. Tokens the LLM is still generating have nowhere to go.
- **Sessions are single-device.** The stream exists only for the client that started it. A second tab or phone can't access it.
- **The connection is exclusive.** The HTTP stream only exists between the client that initiated the request and the agent. Other clients — a second tab, a phone, a colleague — have no visibility of live activity and no way to send signals to the agent.
- **Multi-agent systems lack shared visibility.** When agents communicate through point-to-point connections, clients can't see granular live activity from all agents without centralised coordination or custom plumbing.

The transport layer is the most underinvested part of the AI stack. Teams end up building custom buffering, sequence numbering, resume handlers, and signalling layers instead of focusing on their product.

## What AI Transport does

AI Transport decouples the conversation from the connection by implementing a durable session pattern on top of Ably channels. The session outlives any individual socket — the agent writes to the channel; clients independently subscribe. The session persists across disconnects, device switches, and agent restarts.

**Core capabilities:**

- **Durable token streaming.** Streams survive tab changes, page refreshes, device switches, and network loss. Append rollup batches high-rate token output into fewer messages, keeping costs efficient.
- **Automatic reconnection and recovery.** Clients reconnect and resume from exactly where they left off — no lost tokens, no manual retry logic.
- **Multi-device sessions.** Any device that subscribes to the channel sees every message in real time. Start on laptop, continue on phone.
- **Bidirectional control.** Cancel, interrupt, or steer the agent mid-response through the same session. Control signals are scoped to individual turns.

## How it's different

| Direct HTTP streaming | AI Transport |
| --- | --- |
| Stream dies on disconnect | Stream survives — client resumes automatically |
| Single-device, single-connection | Any device subscribes to the same session |
| Client can only cancel (loses resume) | Client sends cancel/steer signals; session persists |
| Multi-agent updates proxied through orchestrator | Each agent publishes directly to the session |
| Custom infra needed for recovery, history, multi-device | Built in — zero application code for recovery |

## Framework and model agnostic

AI Transport works with any AI model or framework: OpenAI, Anthropic, Vercel AI SDK, LangChain, and others. A pluggable codec bridges framework-specific event types to Ably messages.

## Who it's for

Engineering teams building production AI applications who need their agent interactions to be reliable, multi-device, and controllable — without investing months building custom realtime infrastructure.
