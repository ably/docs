import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import Ably from 'ably';

export async function publish(channel: Ably.RealtimeChannel, prompt: string) {
  let msgSerial: string | null = null;

  const result = streamText({
    model: openai('gpt-4o-mini'),
    prompt,
  });

  for await (const event of result.fullStream) {
    switch (event.type) {
      case 'text-start': {
        const publishResult = await channel.publish({ name: 'response', data: '' });
        msgSerial = publishResult.serials[0];
        break;
      }

      case 'text-delta':
        if (msgSerial) {
          channel.appendMessage({ serial: msgSerial, data: (event as any).text });
        }
        break;

      case 'text-end':
        break;
    }
  }
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:vercel-mpr-guide');
  await publish(channel, 'Tell me a short joke');
  console.log('Done streaming. Closing connection...');
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
