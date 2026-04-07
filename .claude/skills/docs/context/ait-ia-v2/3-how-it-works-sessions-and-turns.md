# Wireframe: How it works — Sessions and Turns

## Goal

Concept page. Give the developer a mental model so that feature pages make sense. Not a feature reference — surfaces capabilities with a taste and a link, doesn't teach implementation.

Also: convey what a *proper* session/turn layer requires technically, so the developer thinks "OK, I see why this needs to be a dedicated layer, not something I bolt on." This isn't about comparing to HTTP specifically — it's about the properties needed for a credible session layer and why they matter.

**One page or two:** Not deciding now. Team decides based on content volume.

**Relationship to Mike's turns doc:** Mike's [turns.md](https://github.com/ably/ably-ai-transport-js/blob/main/docs/concepts/turns.md) is a great starting point — code-forward, clear, well-structured. The shift for the public docs is scope: Mike's doc covers implementation depth (abort signals, onCancel hooks, active turn tracking) that will live in feature pages and API reference. The concept page pulls back to the mental model; feature pages inherit Mike's implementation depth.

**Pattern:** problem → model → what this layer requires → code proof → capabilities. The "what this layer requires" section names the technical properties and connects each to why it matters — building the picture of what makes a session/turn layer credible.

---

## Wireframe

```
+------------------------------------------------------------------+
|                                                                    |
|  Sessions and Turns                                                |
|                                                                    |
|  Sessions are the persistent layer between agents and users.       |
|  Turns are the conversations that happen within them.              |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## Sessions                                                       |
|                                                                    |
|  With HTTP streaming, your agent has a connection — not a          |
|  session. When it drops, everything is gone. A session is the      |
|  layer above connections. It persists across disconnects,          |
|  device switches, and time.                                        |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  [Diagram: connection vs session]                             |  |
|  |                                                              |  |
|  |  HTTP: Client --connection--> Server                         |  |
|  |        Connection drops. Everything lost.                    |  |
|  |                                                              |  |
|  |  AI Transport: Client --conn--> [Session] <--conn-- Server   |  |
|  |        Connection drops. Session persists.                   |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  Three session states:                                             |
|                                                                    |
|  +------------------+  +------------------+  +------------------+  |
|  | Hot              |  | Warm             |  | Cold             |  |
|  | Active, tokens   |  | Disconnected,    |  | Offline. Push    |  |
|  | flowing.         |  | auto-reconnect   |  | notifications.   |  |
|  |                  |  | resumes where    |  | Full history     |  |
|  |                  |  | you left off.    |  | on return.       |  |
|  +------------------+  +------------------+  +------------------+  |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  Hot --disconnect--> Warm --timeout--> Cold                  |  |
|  |   ^                   |                  |                   |  |
|  |   +---reconnect-------+    +--return-----+                  |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  ### What a session layer requires                                 |
|                                                                    |
|  To support all three states and the transitions between           |
|  them, the session layer needs specific properties:                |
|                                                                    |
|  | Property | Why it matters |                                    |
|  |----------|---------------|                                    |
|  | Message ordering | State is always consistent on reload.       |
|  |                  | Events arrive in the order they were         |
|  |                  | published, regardless of reconnection.       |
|  | Persistence      | Warm and cold recovery require messages to   |
|  |                  | be persisted to disk. A returning client      |
|  |                  | gets the full state without replaying every   |
|  |                  | event from scratch.                           |
|  | Accumulation     | The session accumulates messages so           |
|  |                  | reconnecting clients immediately get the      |
|  |                  | final state — not a stream of deltas to       |
|  |                  | reassemble.                                   |
|  | Fan-out          | Multiple participants (users, agents,         |
|  |                  | devices) subscribe to the same session.       |
|  |                  | Every participant sees every event.           |
|  | Presence         | Know which participants are online. Detect    |
|  |                  | agent health, user device changes, session    |
|  |                  | activity.                                     |
|  | Mutable state    | Session metadata can change — participants    |
|  |                  | join and leave, agent status updates,         |
|  |                  | session configuration evolves.                |
|  | Bidirectional    | Users send signals to agents (cancel,         |
|  |                  | barge-in, steer) over the same session.       |
|  |                  | Not a second channel or a separate queue.     |
|                                                                    |
|  AI Transport provides all of these on top of Ably's               |
|  infrastructure. [How the infrastructure works ->]                 |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  const { messages } = useChat({                              |  |
|  |    transport: ablyTransport({ channel: 'my-session' })       |  |
|  |  })                                                          |  |
|  |  // All of the above — ordering, persistence, fan-out,       |  |
|  |  // presence, bidirectional — in one line.                    |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  Sessions enable: [Multi-device ->] [History and replay ->]        |
|  [Reconnection ->] [Presence ->] [Push notifications ->]           |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  ## Turns                                                          |
|                                                                    |
|  A raw token stream has no structure — you can't cancel one        |
|  response without killing the connection, and reconnecting         |
|  means replaying thousands of individual events. A turn wraps      |
|  one prompt-response cycle into a structured unit.                 |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  [Diagram: turn lifecycle]                                   |  |
|  |                                                              |  |
|  |  User prompt -> Turn starts -> Agent streams -> Completes    |  |
|  |                 (reason: complete | cancelled | error)        |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  [Diagram: session containing turns]                         |  |
|  |                                                              |  |
|  |  Session                                                     |  |
|  |  +------------------------------------------------------+    |  |
|  |  | Turn 1: prompt -> response (complete)                 |    |  |
|  |  | Turn 2: prompt -> response (streaming...)             |    |  |
|  |  | Turn 3: background task (complete)                    |    |  |
|  |  +------------------------------------------------------+    |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  ### What a turn layer requires                                    |
|                                                                    |
|  | Property | Why it matters |                                    |
|  |----------|---------------|                                    |
|  | Structured boundaries | Each turn has a clear start and end.  |
|  |                       | Cancellation is scoped to a turn, not |
|  |                       | the whole session.                     |
|  | Assembled history     | Reconnecting clients get complete     |
|  |                       | responses per turn, not raw token      |
|  |                       | streams to reassemble.                 |
|  | Concurrent lifecycles | Multiple turns can stream              |
|  |                       | simultaneously. Each has its own       |
|  |                       | cancel handle and stream.              |
|  | Content multiplexing  | A single turn can contain text,       |
|  |                       | reasoning, tool calls — multiple      |
|  |                       | content streams managed as one unit.  |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |  const turn = await transport.send(userMessage)              |  |
|  |  turn.stream   // ReadableStream of decoded events           |  |
|  |  turn.cancel() // Cancel this turn only                      |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
|  Turns enable: [Cancel ->] [Barge-in ->] [Concurrent turns ->]     |
|  [History and replay ->] [Double texting ->]                       |
|                                                                    |
|  ================================================================  |
|                                                                    |
|  [Transport ->] How the SDK connects your code to sessions         |
|  [Getting started ->] Skip the concepts, start building            |
|                                                                    |
+------------------------------------------------------------------+
```

---

## Rationale

**Pattern: problem → model → what this requires → proof.** The "what this requires" section is the key addition. It names the technical properties a proper session/turn layer needs and why each matters. This isn't a comparison to HTTP — it's about what makes the layer credible as a dedicated offering. The developer builds a mental picture: "ordering, persistence, accumulation, fan-out, presence, bidirectional... OK, I see why this is a real layer and not something I'd bolt on myself."

The code proof then lands harder — "all of that, in one line."

**This is not about HTTP vs AI Transport.** The properties table isn't saying "HTTP can't do this." It's saying "a proper session layer has these characteristics, and here's why each one matters for AI applications." Some of these (fan-out, presence, bidirectional) are things HTTP simply doesn't model. Others (ordering, persistence) are things you *could* build but shouldn't have to. The framing is "here's what's needed" not "here's what's broken."

**Same pattern for turns.** The turn properties table is lighter (turns have fewer infrastructure requirements) but follows the same structure: what the layer requires and why. Structured boundaries, assembled history, concurrent lifecycles, content multiplexing.

**Scope boundary stays the same.** Concept pages show what an abstraction *is* and what it requires. Feature pages show what you *do* with it. The properties table doesn't teach you how to implement fan-out or cancel — it tells you these are properties of the layer, so when you read the Cancel feature page, you already understand that cancellation is scoped to turns by design.
