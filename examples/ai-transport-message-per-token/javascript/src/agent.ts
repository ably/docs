// Agent Service
// This consumes LLM streams and publishes events to Ably

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

  async processPrompt(prompt: string, responseId: string): Promise<void> {
    const stream = await this.llm.responses.create(prompt);

    for await (const event of stream) {
      if (event.type === 'message_start') {
        // Publish response start
        this.channel.publish({
          name: 'start',
          data: {},
          extras: {
            headers: {
              responseId,
            },
          },
        });
      } else if (event.type === 'message_delta') {
        // Publish tokens
        this.channel.publish({
          name: 'token',
          data: {
            token: event.text,
          },
          extras: {
            headers: {
              responseId,
            },
          },
        });
      } else if (event.type === 'message_stop') {
        // Publish response stop
        this.channel.publish({
          name: 'stop',
          data: {},
          extras: {
            headers: {
              responseId,
            },
          },
        });
      }
    }
  }
}
