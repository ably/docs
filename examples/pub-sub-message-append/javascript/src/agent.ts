// Agent Service
// This consumes a stream and appends each chunk to a single Pub/Sub message,
// which appears as one entry in channel history.
// For AI token streaming, the AI Transport SDK handles this for you. See the
// AI Transport token streaming example.

import * as Ably from 'ably';
import { MockLLM } from './llm';

export class Agent {
  private client: Ably.Realtime;
  private channel: Ably.RealtimeChannel;
  private llm: MockLLM;

  constructor(ablyKey: string, channelName: string) {
    this.client = new Ably.Realtime({
      key: ablyKey,
      clientId: 'ai-agent',
    });
    this.channel = this.client.channels.get(channelName);
    this.llm = new MockLLM();
  }

  async processPrompt(prompt: string): Promise<void> {
    const stream = await this.llm.responses.create(prompt);
    let msgSerial: string | null = null;

    for await (const event of stream) {
      if (event.type === 'message_start') {
        // Create initial empty message and capture its serial
        const publishResult = await this.channel.publish({
          name: 'response',
          data: '',
        });
        msgSerial = publishResult.serials[0];
      } else if (event.type === 'message_delta') {
        // Append each token to the same message using its serial
        if (msgSerial && event.text) {
          this.channel.appendMessage({
            serial: msgSerial,
            data: event.text,
          });
        }
      } else if (event.type === 'message_stop') {
        // Stream complete - all tokens have been appended
        console.log('Response complete');
      }
    }
  }

  disconnect(): void {
    this.client.close();
  }
}
