# Speaker Notes

## Slide 1

- Show of hands:
  - AI chat with agent on backend?
  - User sends message, agent streams tokens back live, as generated?
- Fundamental building block of AI UX, in every AI chat app today
- Want to have quick look how this is implemented today

## Slide 2

- Default pattern today: direct HTTP streaming
  - Most frameworks use SSE — Vercel AI SDK, Tanstack AI
- Concretely:
  - Client makes request, establishes persistent point-to-point connection to agent
  - Agent invokes LLM, obtains stream of events
  - Pipes events back over connection as SSE
- This is great — really easy to get something working

## Slide 3

- But: this paradigm is oriented around the idea of:
  - A single client
  - Establishing a single connection
  - To a single agent
- I'm going to make the case that:
  - This limits the quality and richness of the experiences you can build into your AI products

## Slide 4

- Mike Christensen, Staff Engineer at Ably
- Ably = realtime messaging platform
  - SDKs and APIs for building live, interactive experiences — including AI
- Scale, every month:
  - traffic for >2 billion devices
  - handle >30 billion connections
  - process >2 trillion API operations

## Slide 5

- Past year: we've spoken to engineering teams at >40 companies across 10 industries
- Shipping AI agents, assistants, copilots to millions of users
- Pushing boundaries of what AI products can feel like
  - Exploring new interaction models
  - Working through engineering challenges to deliver these experiences reliably in production
- In this talk:
  - Share what we've learned from companies shipping the best AI UX
  - Show you where the direct HTTP streaming model falls short — and why
  - Describe the emerging pattern engineering teams are using to solve these problems

## Slide 6

- We learned:
  - Companies shipping the best AI experiences invest in three foundational capabilities
  - These separate a great AI product from a fragile demo
- 1. Resilient delivery
  - Build streams survive connection drops
    - Think about mobile:
      - You walk out of the house, your phone drops Wi-Fi, switches to 5G
      - That instantly severs the connection
    - Or user simply refreshes the page
    - Or navigates away from the app and comes back
  - Want:
    - Clients can resume the stream when connection drops
    - Pick up exactly where it left off
- 2. Provide continuity across surfaces
  - Users move between surfaces constantly — open a second tab, switch to your phone
  - The session should follow them around
  - Session should be fully in sync no matter which device you're using
- 3. Live control
  - The best AI products do better than a sequential request/response pattern
    - They let you interact with the agent while it's working
  - Think about how you use Claude Code:
    - You interrupt mid-response to redirect & give more information
    - You send a follow-up before the agent finishes a job, ask it to do something else
    - You cancel what it's doing and rephrase your request
  - These all require:
    - Visibility into what's going on in the session, and what the agent is doing
    - Ability for any client to communicate with the agent while it's working

## Slide 7

- Why is this hard with direct HTTP streaming?
- Root cause: everything is coupled to a single request
  - The health of a response stream is tied to the health of the connection
    - Connection drops → stream dies with it
    - It's like a phone call — if the line drops, the conversations over
  - With direct HTTP streaming, the connection is a private pipe between the requesting client and the agent
    - Your other tab or your phone can't access the stream
    - It only exists for the client that established the connection
  - Because the stream is not a shared resource:
    - Other clients have no way to reach the agent
    - You can't steer, interrupt, or interact the agent from other devices

## Slide 8

- Pattern we're seeing many companies adopt:
  - Decouple agent layer from client layer
- Many teams doing this with concept called "durable sessions":
  - A shared resource that sits between the agent layer and the client layer
  - Persistent, stateful medium through which they interact
  - Enables:
    - Resilient streaming
    - Seamless experience across multiple tabs or devices
    - Allows any client to interact, guide or steer your agents
- Let's:
  - Look at some concrete examples that show where direct HTTP streaming model breaks down
  - See how the durable sessions concept can help

## Slide 9

- Let's look at how you might support resumable streams with the direct HTTP streaming approach
- Scenario:
  - Client sends request to agent
  - Agent streams response
  - Client connection drops partway through
- Want:
  - Client re-establishes connection
  - Resumes the stream from where it left off
- Problem:
  - Connection is dropped, but LLM still generating events — nowhere to go
  - To support resume, need to buffer events:
    - In-memory store (Redis)
    - Correct sequence numbers for ordering
  - When the client resumes:
    - Explicit resume handler on your backend
    - Handler works out what client missed
    - Sends correct set of events, in order
- Problem is the stream is being explicitly managed by the agent
  - So you need to build all this complex plumbing from scratch in order to support resumes

## Slide 10

- Durable sessions simplifies this for us
- By decoupling the agent and the client through a durable session:
  - Allow the agent to write events directly to the session
  - Allow clients to independently connect to the session and resume the stream from it directly

## Slide 11

- Interesting problem:
  - If using SSE, in particular, there is a conflict between:
    - Supporting resumability
    - Offering clients live control over the behaviour of the agent
- Because SSE is one-way: server to client
  - This means the client has no way to send a signal the agent
- Scenario:
  - "Stop" button — cancel an in-progress generation
- Problem:
  - No way for client to send explicit cancel request
  - Only mechanism: close the connection
- Ambiguity when connection drops: what does the agent do?
  - Allow LLM to keep generating and buffer for resume later?
  - Or treat closed connection as a cancellation — stop generation, stop burning tokens?

## Slide 12

- Resume and cancel are mutually exclusive when using SSE
- Evidence:
  - Vercel AI SDK uses SSE by default
  - Their docs: "abort" is incompatible with stream resumption
- Need bidirectional control
  - So clients can send signals to the agent
  - We can use a transport like WebSockets
  - Opens up the possibility of much richer interactions such as:
    - Steering the agent, providing additional context
    - Offers a greater deal of control while the agent works

## Slide 13

- Now we've switched our transport out to use WebSockets
- But a bidirectional transport on it's own still doesn't solve everything
- Problems arise when you try to interact from multiple devices
- Scenario:
  - You send a message to the agent
  - Agent is streaming a response
  - You open the same session in another tab
- Problem:
  - The new tab has no connection to the in-progress stream
    - The second tab didn't send the request to the agent that established the connection
  - The second tab sees nothing:
    - Input message from first tab
    - Streamed response

## Slide 14

- This also presents a problem when trying to steer or control the agent from multiple tabs or devices
- Scenario:
  - You send a message to the agent asking it to book you a flight
  - While it's working on a long task in the background, you switch to your phone
  - You realise you need to change the day of the booking you asked for
- Problem:
  - Same problem:
    - Phone has no visibility of the ongoing work
    - Phone has no upstream channel to the agent that it can use to interrupt or steer it

## Slide 15

- Idea with a durable sessions layer:
  - All clients hold a persistent connection to the durable session:
    - Always active
    - Not just when initiating a request
  - Connection provides full visibility of all activity in the session
  - Clients can continue to resume independently from the session if their connections drop
  - Any client can route to and interact with the agent through the session layer at any time

## Slide 16

- Final example I want to share is about:
  - Concurrent activity
  - And visbility of that activity in the session
- Scenario:
  - In this example: multi-agent architecture
  - Multiple agents participating in the session
  - User establishes a connection with an orchestrator agent
  - Orchestrator handles user requests, delegates tasks to specialised subagents
- Want:
  - Users have visibility of granular progress as subagents work
- Problem:
  - Orchestrator is handling the client's connection
    - So orchestrator is responsible for delivering all updates from the subagents to the client
    - To do its job - orchestrating a task - the orchestrator only cares about final result from each sub-agent
    - Serving a dual purpose here of orchestration, and relaying granular updates from subagents back to the client
  - Adds a lot of complexity to your architecture

## Slide 17

- Again, durable sessions make this much, much easier.
- In this model:
  - All agents can write independently to the durable session layer
    - We don't have to flow all granular updates through a centralised orchestrator
  - Clients only need to subscribe to a single entity
    - Have granular visibility of activity from all agents, but also from all other clients
  - Consume all of this activity over a single, multiplexed, resumable stream
  - This can drastically simplify your architecture

## Slide 18

- Many of Ably's customers implement the durable session pattern on top of Ably channels
  - Ably channels allow you to implement the pub/sub messaging pattern:
    - Where publishers and subscribers of messages do not talk to each other directly
    - Instead, they communicate through a shared channel
    - This inherently decouples publishers and subscribers
  - Ably channels have the key properties we need for durable sessions:
    - Independently addressable — any client or agent can connect to the session by specifying the channel name
    - Persistent — the messages on the channel outlive any single connection, device, or agent
    - Resumable — a client that drops its connection can automatically reconnect and picks up where it left off
- This is how our customers build the kind of resilient, multi-surface experiences, with rich interactions, we've talked about today

## Slide 19

- To make building durable sessions even easier, we've built a drop-in durable session layer for AI apps
- We call this Ably AI Transport
  - Brings a suite of tools for building durable, steerable, multi-device experiences
  - Includes:
    - An SDK integrates streamed responses from any AI model or framework with Ably channels
    - Cross-platform push notifications - notify clients when an agent finishes a long-running task
    - APIs for shared, subscribable data objects that sync across all connected clients in real time

## Slide 20

- Before: the architecture we've been discussing
  - Single device, HTTP request to agent, streamed response back over the same connection
  - Everything coupled to that one request
- After: with AI Transport
  - The initial HTTP request still happens — client sends the prompt to invoke the agent
  - But the HTTP response is immediate, not a long-lived stream
  - All further communication goes through an Ably channel
    - A channel is:
      - A named resource that anyone can publish messages to
      - Anyone can subscribe to
      - Publishers and subscribers don't need to know about each other
  - Agent publishes response stream to the channel
  - Any number of subscribing clients receive it - across multiple tabs or devices
  - The channel provides:
    - durability
    - bidirectional communication
    - multi-device fan-out
    - support for long-running interactions

## Slide 21

- Vercel AI SDK UI in a React app
- Vercel's `useChat` hook:
  - Uses SSE as the default transport
  - Returns live list of messages
  - Function to send a new user message
  - Specify API endpoint to invoke the agent

## Slide 22

- Drop in Ably AI Transport — a few lines of code
- Walking through the diff:
  - Get an Ably channel using the chatId — the channel is the durable session layer
  - Create a client transport from the channel
  - Wrap it as a chat transport compatible with `useChat`
  - Replace the default `DefaultChatTransport` (SSE) with our chat transport
- That's it on the client side
- What this gives you:
  - Any tab or device with the same chatId subscribes to the same channel — instant multi-surface sync
  - Dropped connections recover automatically — streams resume where they left off
  - Bidirectional — your client can signal the agent through the channel
    - Cancel, steer, redirect — without needing the original connection

## Slide 23

- Agent-side code — Vercel AI SDK in Next.js
- POST handler — runs in serverless function on Vercel
- Default: response streamed back over SSE

## Slide 24

- Walking through the diff:
  - Get the same Ably channel for this session, create a server transport from it
    - Auto-subscribes for control messages — any participant can signal the agent
  - Create a new turn:
    - Identifier for the turn, and identifier for the client initiating the turn
    - Turns can be concurrent and are automatically multiplexed onto the channel
  - Start the turn — signals to all subscribers that a request/response cycle has begun
  - Add the user's input messages to the turn — published to the channel so all clients see them
  - Invoke the LLM — `streamText` is unchanged, same as before
  - Return HTTP 200 immediately — the response is no longer coupled to this request
  - Inside `after()` — extends the serverless function lifetime beyond the HTTP response
    - Stream the response for this turn — published to the channel, all subscribers receive it live
    - Mark turn as ended when stream completes

## Slide 25

- That was Vercel AI SDK — but AI Transport is fully agnostic
  - Works with any LLM provider — OpenAI, Anthropic, Google Gemini
  - Works with any framework — Vercel AI SDK, TanStack AI, LangGraph, AG-UI
  - Drops into your existing stack — you don't need to rebuild anything
- To wrap up — with a few lines of code, you get:
  - Resilient delivery — streams that survive anything the network throws at them
  - Continuity across surfaces — open another tab, switch devices, come back later — it just works
  - Live control — steer, interrupt, redirect, regenerate — interact with your agents while they work
- These are the features your users already expect from the best AI tools they use every day
  - Now you can build them into your own products — without building the infrastructure from scratch
