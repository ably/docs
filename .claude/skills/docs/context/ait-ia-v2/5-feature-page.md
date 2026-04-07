# Wireframe: Feature Page (using Barge-in as example)

## Goal

Positive-forward. Lead with how AI Transport makes this simple, not with what's broken. The developer's first impression should be "this is elegant" — the traditional architecture context is a lightweight aside, not the opening act.

Follows the page design principles in `PRINCIPLES.md`. First folds for humans, progressive disclosure throughout, every feature has a live example.

**Pattern for all feature pages:**
1. What it is (1-2 lines)
2. Visual
3. How it works (mechanism + code + live example)
4. Lightweight aside: what you'd traditionally need
5. How to implement (server, client, framework-toggled)
6. Configuration and API reference
7. Internals (only if relevant — how it works under the hood)
8. Edge cases
9. FAQ (common questions, misunderstandings, gotchas)
10. Related features

---

## Wireframe

```
+------------------------------------------------------------------+
|                                                                    |
|  Barge-in                                                         |
|                                                                    |
|  Let users interrupt an agent mid-stream and get an immediate      |
|  response to their new input — without waiting for the current     |
|  response to finish.                                               |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |                                                              |  |
|  |  [Simple animation / clean diagram]                          |  |
|  |                                                              |  |
|  |  Shows: user types while agent streams.                      |  |
|  |  Agent stops, pivots to new input.                           |  |
|  |                                                              |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## How it works                             |
|                                                                    |
|  Because sessions give you bidirectional communication between     |
|  the user and agent, barge-in is just a signal on the session      |
|  channel. The user's new input is delivered directly to the        |
|  agent within milliseconds. The current turn ends, a new turn      |
|  begins — no queues, no extra infrastructure.                      |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  | [Framework selector]                                         |  |
|  | [Vercel AI SDK]  [LangGraph]  [OpenAI SDK]  [Anthropic SDK]  |  |
|  +--------------------------------------------------------------+  |
|  |                                                              |  |
|  |  const { messages } = useChat({                              |  |
|  |    transport: ablyTransport({                                |  |
|  |      channel: 'my-session',                                  |  |
|  |      bargeIn: true                                           |  |
|  |    })                                                        |  |
|  |  })                                                          |  |
|  |                                                              |  |
|  |  // That's it. User input during streaming is delivered      |  |
|  |  // directly to the agent. The session layer handles         |  |
|  |  // the interruption flow.                                   |  |
|  |                                                              |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  [Screenshot of live example]          [Try it out ->]       |  |
|  |                                                              |  |
|  |  Type while the agent is responding                          |  |
|  |  to see barge-in in action.                                  |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  +- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+  |
|  |  Without a session layer, barge-in typically requires         |  |
|  |  building a separate message queue or signalling system       |  |
|  |  to communicate back to a running agent. This adds latency   |  |
|  |  and infrastructure complexity. With AI Transport, the        |  |
|  |  session already connects the user and agent                  |  |
|  |  bidirectionally — no additional infrastructure needed.       |  |
|  +- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+  |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## How to implement                                               |
|                                                                    |
|  ### Server                                                        |
|  [Full server code with explanation]                               |
|  How to configure your agent to handle barge-in signals.           |
|  Framework-toggled code blocks.                                    |
|                                                                    |
|  ### Client                                                        |
|  [Full client code with explanation]                               |
|  Framework-toggled code blocks.                                    |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  [Diagram: the barge-in flow]                                |  |
|  |                                                              |  |
|  |  User sends input                                            |  |
|  |    --> Signal delivered to agent via session channel          |  |
|  |    --> Current turn ends                                     |  |
|  |    --> New turn starts with user's input                     |  |
|  |    --> Agent responds to the new input                       |  |
|  |                                                              |  |
|  |  Barge-in uses the turn lifecycle — ending one turn and      |  |
|  |  starting another. [Learn more about Turns ->]               |  |
|  |                                                              |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## Configuration and API reference                                |
|                                                                    |
|  | Option | Default | Description |                              |
|  |--------|---------|-------------|                              |
|  | bargeIn | false  | Enable mid-stream interruption |             |
|  | bargeInMode | 'hard' | 'hard' stops immediately, ... |         |
|                                                                    |
|  [Client transport: bargeIn ->]                                    |
|  [Server transport: onBargeIn ->]                                  |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## Internals                                                      |
|                                                                    |
|  How barge-in works under the hood — only if you need to know.     |
|  [Detail on signal propagation, timing, etc.]                      |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## Edge cases                                                     |
|                                                                    |
|  - What happens to the partial response?                           |
|  - What if the agent is mid-tool-call?                             |
|  - What if multiple users barge in simultaneously?                 |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## FAQ                                                            |
|                                                                    |
|  Common questions, misunderstandings, and gotchas.                 |
|  - Can I disable barge-in for specific turns?                      |
|  - How does barge-in interact with tool calls?                     |
|  - What's the difference between barge-in and cancel?              |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## Related features                                               |
|                                                                    |
|  - [Cancel] — stop the agent without sending new input             |
|  - [Steer mid-stream] — redirect without stopping                  |
|  - [Double texting] — queue messages while streaming               |
|                                                                    |
+------------------------------------------------------------------+
```

---

## Design notes

**Positive-forward framing.** The page leads with how AI Transport solves this, not with what's broken. The traditional architecture context is a dashed-border callout panel — visually distinct, clearly secondary. Two sentences, no diagram, no code. It reinforces the value without dominating the page.

**Code + live example are one unit.** The code sample sits inside the "how AI Transport makes this simple" section, immediately followed by the live example thumbnail and "Try it out" button. These always appear together — the code shows you what to write, the example shows you what happens. This pairing should be a consistent UI element across all feature pages.

**Progressive disclosure tiers:**

| Tier | What's in it | Who it's for |
|---|---|---|
| Understand | Title, one-liner, visual, how AI Transport makes it simple | Everyone |
| See it | Code sample + live example | Everyone |
| Aside | "Traditionally you'd need..." | Evaluators who want context |
| Build it | How to implement (server + client) + flow diagram | Builders |
| Reference | Configuration + API reference | Builders |
| Go deep | Internals, edge cases, FAQ, related features | Builders + agents |

**The "Try it out" pattern.** Every feature page has a live example, presented as: screenshot thumbnail + button. Not embedded inline (too large, distracts from code). This should be a reusable UI component across all feature pages.
