import Ably from 'ably';

// Subscribe to a channel and reconstruct streamed responses using message actions.
// Returns a promise that resolves with the full response text when no new appends
// arrive for 2 seconds (indicating the stream is complete).
export function subscribe(channel: Ably.RealtimeChannel): Promise<string> {
  return new Promise((resolve) => {
    const responses = new Map<string, string>();
    let lastSerial: string | null = null;
    let doneTimer: ReturnType<typeof setTimeout> | null = null;

    const resetTimer = () => {
      if (doneTimer) clearTimeout(doneTimer);
      doneTimer = setTimeout(() => {
        if (lastSerial) {
          const finalText = responses.get(lastSerial) || '';
          resolve(finalText);
        }
      }, 3000);
    };

    channel.subscribe((message: Ably.Message) => {
      switch (message.action) {
        case 'message.create':
          console.log('\n[Response started]', message.serial);
          responses.set(message.serial, message.data as string);
          lastSerial = message.serial;
          resetTimer();
          break;

        case 'message.append': {
          const current = responses.get(message.serial) || '';
          responses.set(message.serial, current + (message.data as string));
          process.stdout.write(message.data as string);
          resetTimer();
          break;
        }

        case 'message.update':
          responses.set(message.serial, message.data as string);
          console.log('\n[Response updated with full content]');
          resetTimer();
          break;
      }
    });
  });
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  const channel = realtime.channels.get('ai:vercel-mpr-guide');
  console.log('Subscriber ready, waiting for tokens...');
  const response = await subscribe(channel);
  console.log('\nFull response:', response);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
