import Anthropic from '@anthropic-ai/sdk';
import Ably from 'ably';

export async function publish(channel: Ably.RealtimeChannel, prompt: string) {
  const anthropic = new Anthropic();
  let msgSerial: string | null = null;
  let textBlockIndex: number | null = null;

  const stream = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  for await (const event of stream) {
    switch (event.type) {
      case 'message_start': {
        const result = await channel.publish({ name: 'response', data: '' });
        msgSerial = result.serials[0];
        break;
      }

      case 'content_block_start':
        if (event.content_block.type === 'text') {
          textBlockIndex = event.index;
        }
        break;

      case 'content_block_delta':
        if (event.index === textBlockIndex && event.delta.type === 'text_delta' && msgSerial) {
          channel.appendMessage({ serial: msgSerial, data: event.delta.text });
        }
        break;

      case 'message_stop':
        break;
    }
  }
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:anthropic-mpr-guide');
  await publish(channel, 'Tell me a short joke');
  console.log('Done streaming. Closing connection...');
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
