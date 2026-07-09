// Fake LLM
// Produces the same `UIMessageChunk` stream that Vercel AI SDK's
// `streamText(...).toUIMessageStream()` emits. Because the shape is identical,
// the agent code that consumes it (see agent.ts) is the same as a production
// integration. Only the source of the tokens is mocked.
import type { UIMessageChunk } from 'ai';

const RESPONSE_TEXT =
  'Ably AI Transport is a solution for building stateful, steerable, multi-device AI experiences into new or existing applications. You can use AI Transport as the transport layer with any LLM or agent framework, without rebuilding your existing stack or being locked to a particular vendor.';

// Split text into small chunks to simulate model tokenization.
const tokenize = (text: string): string[] => {
  const tokens: string[] = [];
  let pos = 0;
  while (pos < text.length) {
    const size = Math.floor(Math.random() * 8) + 1;
    tokens.push(text.slice(pos, pos + size));
    pos += size;
  }
  return tokens;
};

// Stream a mocked response as `UIMessageChunk` events. In production this is
// `streamText({ model, messages, abortSignal }).toUIMessageStream()`.
export const streamMockResponse = (signal?: AbortSignal): ReadableStream<UIMessageChunk> => {
  const textId = crypto.randomUUID();
  const tokens = tokenize(RESPONSE_TEXT);

  return new ReadableStream<UIMessageChunk>({
    async start(controller) {
      controller.enqueue({ type: 'start' });
      controller.enqueue({ type: 'text-start', id: textId });

      for (const token of tokens) {
        if (signal?.aborted) break;
        // Simulate inter-token latency from the model.
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 120 + 40));
        controller.enqueue({ type: 'text-delta', id: textId, delta: token });
      }

      controller.enqueue({ type: 'text-end', id: textId });
      controller.enqueue({ type: 'finish' });
      controller.close();
    },
  });
};
