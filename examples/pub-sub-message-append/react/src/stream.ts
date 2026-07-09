// Mock text stream
// This simulates any source that produces text in small deltas, such as a
// live transcription feed or an LLM response.

interface StreamEvent {
  type: 'stream_start' | 'stream_delta' | 'stream_stop';
  text?: string;
  streamId: string;
}

export class MockTextStream {
  private readonly text =
    'Ably Pub/Sub message append grows a single channel message by concatenating each delta onto the latest version. Ably rolls up the appends server-side, so subscribers receive each delta in realtime, and a client that joins late or reconnects loads the accumulated message from history rather than replaying every delta.';

  async *create(): AsyncIterable<StreamEvent> {
    const streamId = `stream_${crypto.randomUUID()}`;

    yield { type: 'stream_start', streamId };

    for (const delta of this.chunkText(this.text)) {
      // Simulate a realistic delay between deltas
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 150 + 50));

      yield { type: 'stream_delta', text: delta, streamId };
    }

    yield { type: 'stream_stop', streamId };
  }

  // Split the text into deltas of random size
  private chunkText(text: string): string[] {
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
