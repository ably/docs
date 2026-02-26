# AI Transport Guides - E2E Code

Full, runnable implementations for each AI Transport guide. Each guide directory contains language-specific subdirectories with publisher (agent) and subscriber (client) code.

## Structure

```
<guide-name>/
  javascript/          # JavaScript/TypeScript implementation
    src/publisher.ts
    src/subscriber.ts
    test/e2e.test.ts
  python/              # (future)
  java/                # (future)
```

## Guides

| Guide | Provider | Pattern | Languages |
|-------|----------|---------|-----------|
| `openai-message-per-token` | OpenAI | Message per token | JavaScript |
| `openai-message-per-response` | OpenAI | Message per response | JavaScript |
| `anthropic-message-per-token` | Anthropic | Message per token | JavaScript |
| `anthropic-message-per-response` | Anthropic | Message per response | JavaScript |
| `vercel-message-per-token` | Vercel AI SDK | Message per token | JavaScript |
| `vercel-message-per-response` | Vercel AI SDK | Message per response | JavaScript |
| `lang-graph-message-per-token` | LangGraph | Message per token | JavaScript |
| `lang-graph-message-per-response` | LangGraph | Message per response | JavaScript |

## Streaming patterns

- **Message per token**: Publisher sends discrete `start`, `token`, and `stop` events. Subscriber reconstructs the full response by appending tokens correlated by `responseId`.
- **Message per response**: Publisher creates a single message and appends each token to it. Subscriber handles `message.create` and `message.append` actions, with the full response available in message history.

## Prerequisites

- Node.js 20+
- API keys for the relevant providers (see `.env.example`)

## Setup

```bash
cd guides/ai-transport
cp .env.example .env
# Fill in your API keys in .env

yarn install
```

## Running a guide

Each guide has a publisher (streams from LLM to Ably) and a subscriber (reads from Ably):

```bash
# Terminal 1 - start the subscriber
npx tsx <guide-name>/javascript/src/subscriber.ts

# Terminal 2 - start the publisher
npx tsx <guide-name>/javascript/src/publisher.ts
```

## Running tests

```bash
# All guides
yarn test

# Watch mode
yarn test:watch

# Single guide
npx vitest run <guide-name>
```
