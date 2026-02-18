import OpenAI from 'openai';
import Ably from 'ably';
import 'dotenv/config';

// Process each streaming event and publish to Ably.
// Returns a promise for the 'stop' event so the caller can await it.
async function processEvent(
  event: OpenAI.Responses.ResponseStreamEvent,
  channel: Ably.RealtimeChannel,
  state: { responseId: string | null; messageItemId: string | null },
) {
  switch (event.type) {
    case 'response.created':
      state.responseId = event.response.id;
      channel.publish({
        name: 'start',
        extras: {
          headers: { responseId: state.responseId },
        },
      });
      break;

    case 'response.output_item.added':
      if (event.item.type === 'message') {
        state.messageItemId = event.item.id;
      }
      break;

    case 'response.output_text.delta':
      if (event.item_id === state.messageItemId) {
        channel.publish({
          name: 'token',
          data: event.delta,
          extras: {
            headers: { responseId: state.responseId },
          },
        });
      }
      break;

    case 'response.completed':
      // Await the final publish so all messages are flushed before returning
      await channel.publish({
        name: 'stop',
        extras: {
          headers: { responseId: state.responseId },
        },
      });
      break;
  }
}

// Stream a response from OpenAI and publish tokens to Ably
export async function publish(channel: Ably.RealtimeChannel, prompt: string) {
  const openai = new OpenAI();
  const state = { responseId: null as string | null, messageItemId: null as string | null };

  const stream = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    stream: true,
  });

  for await (const event of stream) {
    await processEvent(event, channel, state);
  }
}

// Run as a standalone script
async function main() {
  const realtime = new Ably.Realtime({
    key: process.env.ABLY_API_KEY,
    echoMessages: false,
  });

  const channel = realtime.channels.get('openai-mpt-guide');

  await publish(channel, 'Tell me a short joke');

  console.log('Done streaming. Closing connection...');
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
