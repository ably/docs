// Publisher service
// This consumes a text stream and appends each delta to a single Pub/Sub
// message, which appears as one entry in channel history.
// For AI token streaming, the AI Transport SDK handles this for you. See the
// AI Transport token streaming example.

import * as Ably from 'ably';
import { MockTextStream } from './stream';

export class Publisher {
  private client: Ably.Realtime;
  private channel: Ably.RealtimeChannel;
  private source: MockTextStream;

  constructor(ablyKey: string, channelName: string) {
    this.client = new Ably.Realtime({
      key: ablyKey,
      clientId: 'publisher',
    });
    this.channel = this.client.channels.get(channelName);
    this.source = new MockTextStream();
  }

  async startStream(): Promise<void> {
    let msgSerial: string | null = null;

    for await (const event of this.source.create()) {
      if (event.type === 'stream_start') {
        // Create an initial empty message and capture its serial
        const publishResult = await this.channel.publish({
          name: 'stream',
          data: '',
        });
        msgSerial = publishResult.serials[0];
      } else if (event.type === 'stream_delta') {
        // Append each delta to the same message using its serial
        if (msgSerial && event.text) {
          this.channel.appendMessage({
            serial: msgSerial,
            data: event.text,
          });
        }
      } else if (event.type === 'stream_stop') {
        // Stream complete - all deltas have been appended
        console.log('Stream complete');
      }
    }
  }

  disconnect(): void {
    this.client.close();
  }
}
