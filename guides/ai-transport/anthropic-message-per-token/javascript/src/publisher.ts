import Anthropic from '@anthropic-ai/sdk';
import Ably from 'ably';

async function processEvent(
  event: Anthropic.MessageStreamEvent,
  channel: Ably.RealtimeChannel,
  state: { responseId: string | null },
) {
  switch (event.type) {
    case 'message_start':
      state.responseId = event.message.id;
      channel.publish({
        name: 'start',
        extras: { headers: { responseId: state.responseId } },
      });
      break;

    case 'content_block_delta':
      if (event.delta.type === 'text_delta') {
        channel.publish({
          name: 'token',
          data: event.delta.text,
          extras: { headers: { responseId: state.responseId } },
        });
      }
      break;

    case 'message_stop':
      await channel.publish({
        name: 'stop',
        extras: { headers: { responseId: state.responseId } },
      });
      break;
  }
}

export async function publish(channel: Ably.RealtimeChannel, prompt: string) {
  const anthropic = new Anthropic();
  const state = { responseId: null as string | null };

  const stream = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  for await (const event of stream) {
    await processEvent(event, channel, state);
  }
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('anthropic-mpt-guide');
  await publish(channel, 'Tell me a short joke');
  console.log('Done streaming. Closing connection...');
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
