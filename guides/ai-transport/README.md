# AI Transport Guides - E2E Code

Full, runnable implementations for each AI Transport guide. Each directory contains the complete publisher (server) and subscriber (client) code that the corresponding guide walks through.

## Guides

| Guide | Provider | Pattern |
|-------|----------|---------|
| `openai-message-per-token` | OpenAI | Message per token |
| `openai-message-per-response` | OpenAI | Message per response |
| `anthropic-message-per-token` | Anthropic | Message per token |
| `anthropic-message-per-response` | Anthropic | Message per response |
| `vercel-message-per-token` | Vercel AI SDK | Message per token |
| `vercel-message-per-response` | Vercel AI SDK | Message per response |
| `lang-graph-message-per-token` | LangGraph | Message per token |
| `lang-graph-message-per-response` | LangGraph | Message per response |

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
npx tsx <guide-name>/src/subscriber.ts

# Terminal 2 - start the publisher
npx tsx <guide-name>/src/publisher.ts
```

## Running tests

```bash
# All guides
yarn test

# Watch mode
yarn test:watch

# Single guide
yarn vitest run <guide-name>
```
