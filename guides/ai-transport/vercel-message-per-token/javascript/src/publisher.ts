import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import Ably from 'ably';

async function processEvent(
  event: { type: string; id?: string; text?: string },
  channel: Ably.RealtimeChannel,
  state: { responseId: string | null },
) {
  switch (event.type) {
    case 'text-start':
      state.responseId = event.id || null;
      channel.publish({
        name: 'start',
        extras: { headers: { responseId: state.responseId } },
      });
      break;

    case 'text-delta':
      channel.publish({
        name: 'token',
        data: event.text,
        extras: { headers: { responseId: state.responseId } },
      });
      break;

    case 'text-end':
      await channel.publish({
        name: 'stop',
        extras: { headers: { responseId: state.responseId } },
      });
      break;
  }
}

export async function publish(channel: Ably.RealtimeChannel, prompt: string) {
  const state = { responseId: null as string | null };

  const result = streamText({
    model: openai('gpt-4o-mini'),
    prompt,
  });

  for await (const event of result.fullStream) {
    await processEvent(event as { type: string; id?: string; text?: string }, channel, state);
  }
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('vercel-mpt-guide');
  await publish(channel, 'Tell me a short joke');
  console.log('Done streaming. Closing connection...');
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
