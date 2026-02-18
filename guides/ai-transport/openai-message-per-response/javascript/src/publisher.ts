import OpenAI from 'openai';
import Ably from 'ably';

export async function publish(channel: Ably.RealtimeChannel, prompt: string) {
  const openai = new OpenAI();
  let msgSerial: string | null = null;
  let messageItemId: string | null = null;

  const stream = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    stream: true,
  });

  for await (const event of stream) {
    switch (event.type) {
      case 'response.created': {
        const result = await channel.publish({ name: 'response', data: '' });
        msgSerial = result.serials[0];
        break;
      }

      case 'response.output_item.added':
        if (event.item.type === 'message') {
          messageItemId = event.item.id;
        }
        break;

      case 'response.output_text.delta':
        if (event.item_id === messageItemId && msgSerial) {
          channel.appendMessage({ serial: msgSerial, data: event.delta });
        }
        break;

      case 'response.completed':
        break;
    }
  }
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:openai-mpr-guide');
  await publish(channel, 'Tell me a short joke');
  console.log('Done streaming. Closing connection...');
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
