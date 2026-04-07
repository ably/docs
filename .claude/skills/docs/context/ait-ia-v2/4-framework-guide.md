# Wireframe: Framework Guide (template, using Vercel AI SDK as example)

## Goal

Framework guides answer "I use [framework]. Why do I need Ably AI Transport?" They explain the value proposition specific to this framework — both the new capabilities AI Transport brings and the existing problems it solves. These are not getting started pages (those are purely practical). These are the "why" for each framework.

Each guide should feel like it was written by someone who actually uses that framework — framework-specific patterns, API references, and scenarios. Not a template with the name swapped in.

**Tone:** We're explaining the value proposition honestly. Not shy about why we built this and what problems it solves. Not a sales pitch, but not apologetic either. The evidence speaks for itself.

**Adapts per framework:**
- **LangGraph:** Python, different architecture, agent crash recovery is a bigger story
- **Temporal:** Very different — "two kinds of durability." Temporal handles the backend, AI Transport handles the frontend.
- **OpenAI/Anthropic SDKs:** Simpler integration, more focused on the transport gap
- **AG-UI:** Newer protocol, different integration points

---

## Wireframe (Vercel AI SDK)

```
+------------------------------------------------------------------+
|                                                                    |
|  Vercel AI SDK + Ably AI Transport                                 |
|                                                                    |
|  Ably AI Transport augments your Vercel AI SDK application         |
|  with a durable session layer — reliable streaming, multi-device   |
|  sessions, agent presence, and bidirectional control, without      |
|  changing your existing code.                                      |
|                                                                    |
|  [Get started with Vercel AI SDK ->]                               |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## What each layer does                                           |
|                                                                    |
|  +-----------------------------+  +-----------------------------+  |
|  | Vercel AI SDK               |  | Ably AI Transport           |  |
|  |                             |  |                             |  |
|  | Model orchestration         |  | Durable sessions            |  |
|  | UI state (useChat)          |  | Multi-device fan-out        |  |
|  | Tool calls                  |  | Reconnection and recovery   |  |
|  | Streaming via HTTP          |  | Agent presence and health   |  |
|  | ChatTransport interface     |  | Bidirectional control       |  |
|  |                             |  | Push notifications          |  |
|  |                             |  | Ordering and persistence    |  |
|  +-----------------------------+  +-----------------------------+  |
|                                                                    |
|  Vercel AI SDK handles intelligence and UI. AI Transport           |
|  handles what happens between the model and every device.          |
|  They're designed to work together — Vercel explicitly built       |
|  the ChatTransport interface as the extension point for this.      |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## How they fit together                                          |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  [Architecture diagram]                                      |  |
|  |                                                              |  |
|  |  Vercel AI SDK                                               |  |
|  |  useChat(), streamText(), tool calls, UI state               |  |
|  |                                                              |  |
|  |       ChatTransport interface  <-- the plug-in point         |  |
|  |                |                                             |  |
|  |  Ably AI Transport                                           |  |
|  |  Implements ChatTransport                                    |  |
|  |  Adds: sessions, presence, recovery, control                 |  |
|  |                |                                             |  |
|  |  Ably Infrastructure                                         |  |
|  |  Global edge, multi-region, ordering, persistence            |  |
|  |                |                                             |  |
|  |  Every device, reliably                                      |  |
|  |                                                              |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  Your existing useChat() code, tool calls, and UI logic            |
|  stay the same. One transport swap:                                |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  // Before: default HTTP transport                           |  |
|  |  const { messages } = useChat()                              |  |
|  |                                                              |  |
|  |  // After: Ably transport (everything else stays the same)   |  |
|  |  const { messages } = useChat({                              |  |
|  |    transport: ablyTransport({ channel: 'ai-session' })       |  |
|  |  })                                                          |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## What this unlocks                                              |
|                                                                    |
|  With this architecture in place, AI Transport solves known        |
|  problems and enables entirely new capabilities — right out        |
|  of the box.                                                       |
|                                                                    |
|  ### Problems that go away                                         |
|                                                                    |
|  AI SDK frameworks handle model orchestration well — they're       |
|  not built to solve transport-level problems. With AI Transport    |
|  these known issues are resolved:                                  |
|                                                                    |
|  - Streams that die on disconnect — AI Transport resumes           |
|    from where you left off, automatically                          |
|  - Lost context on tab switch or device change — the session       |
|    persists across any surface                                     |
|  - No way to tell if the agent crashed or is still thinking —      |
|    presence gives you real-time health signals                     |
|  - Partial responses lost on mobile network drops —                |
|    ordering and persistence mean nothing is lost                   |
|                                                                    |
|  For evidence these are real, documented problems:                 |
|  vercel/ai#XXXX, vercel/ai#XXXX, vercel/ai#XXXX                   |
|                                                                    |
|  ### New capabilities                                              |
|                                                                    |
|  Things your app can do that weren't possible before:              |
|                                                                    |
|  - **Multi-device sessions** — same conversation on phone,        |
|    laptop, tablet. All in sync.                                    |
|  - **Agent presence** — show streaming/thinking/idle/crashed       |
|    status in the UI.                                               |
|  - **Bidirectional control** — cancel, barge-in, steer agents     |
|    mid-stream.                                                     |
|  - **Human-in-the-loop** — approval gates that reach the user     |
|    on any device, even after reconnecting.                         |
|  - **Push notifications** — background tasks complete and the      |
|    result finds the user, even offline.                            |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## What to read next                                              |
|                                                                    |
|  +---------------------------+  +------------------------------+   |
|  | Get started               |  | How it works                |   |
|  | Build with Vercel AI SDK  |  | Understand sessions, turns, |   |
|  | in 5 minutes              |  | transport — how AI Transport|   |
|  | [Quickstart ->]           |  | works with Vercel           |   |
|  +---------------------------+  +------------------------------+   |
|                                                                    |
|  +---------------------------+  +------------------------------+   |
|  | Features                  |  | Use cases                   |   |
|  | Multi-device, barge-in,   |  | Building support chat,      |   |
|  | presence, reconnection    |  | copilot, with live demos    |   |
|  | [Browse features ->]      |  | [See use cases ->]          |   |
|  +---------------------------+  +------------------------------+   |
|                                                                    |
+------------------------------------------------------------------+
```

---

## Rationale

**The story arc: layers → architecture → what this unlocks.** The page flows from high-level (what each layer does) to concrete (how they fit together, the one-line code swap) to value (what this architecture enables). The developer sees how simple the integration is *before* the detail on problems solved and new capabilities. This avoids front-loading detail before the developer understands the architecture.

**Side-by-side visual opens the page.** Two-column layout immediately communicates "these are complementary layers." Neither is the main thing with the other as an add-on.

**Architecture + code is the centrepiece.** The diagram shows the full stack (Vercel AI SDK → ChatTransport → AI Transport → Ably Infrastructure → devices) and the before/after code proves it's a one-line swap. This is the "aha moment" that earns the developer's attention for the detail that follows.

**"What this unlocks" combines both value propositions.** Problems that go away + new capabilities, presented together after the architecture. Both are strong messages but they land better once the developer has seen how the pieces fit — "oh, *that's* why those problems go away, because the session layer handles it."

**Known issues framed as evidence, not criticism.** The GitHub links are documentation that these are real, widespread problems. AI SDK frameworks aren't built to solve them because they operate at the intelligence layer, not the transport layer. Not a flaw — a different scope.

**Tailored next steps.** Routing cards specific to the developer's likely next action: quickstart for this framework, features, use cases, concepts.
