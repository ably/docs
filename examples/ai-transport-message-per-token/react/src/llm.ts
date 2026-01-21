// Mock LLM Service
// This simulates a generic LLM SDK with streaming capabilities

interface StreamEvent {
  type: 'message_start' | 'message_delta' | 'message_stop';
  text?: string;
  responseId: string;
}

export class MockLLM {
  private readonly responseText =
    'Ably AI Transport is a solution for building stateful, steerable, multi-device AI experiences into new or existing applications. You can use AI Transport as the transport layer with any LLM or agent framework, without rebuilding your existing stack or being locked to a particular vendor.';

  responses = {
    create: (prompt: string) => this.createStream(prompt),
  };

  private async *createStream(_prompt: string): AsyncIterable<StreamEvent> {
    const responseId = `resp_${crypto.randomUUID()}`;

    // Yield start event
    yield { type: 'message_start', responseId };

    // Chunk text into tokens (simulates LLM tokenization)
    const tokens = this.chunkTextLikeAI(this.responseText);

    for (const token of tokens) {
      // Simulate realistic delay between tokens
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 150 + 50));

      // Yield token event
      yield { type: 'message_delta', text: token, responseId };
    }

    // Yield stop event
    yield { type: 'message_stop', responseId };
  }

  private chunkTextLikeAI(text: string): string[] {
    const chunks: string[] = [];
    let pos = 0;
    while (pos < text.length) {
      const size = Math.floor(Math.random() * 8) + 1;
      chunks.push(text.slice(pos, pos + size));
      pos += size;
    }
    return chunks.filter((chunk) => chunk.length > 0);
  }
}
