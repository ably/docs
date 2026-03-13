import Ably from 'ably';

interface ClientResult {
  content: string;
  citationSummary: Record<string, { total: number }>;
}

export function subscribe(channel: Ably.RealtimeChannel): Promise<ClientResult> {
  return new Promise((resolve) => {
    let content = '';
    let citationSummary: Record<string, { total: number }> = {};
    let doneTimer: ReturnType<typeof setTimeout> | null = null;

    const resetTimer = () => {
      if (doneTimer) {
        clearTimeout(doneTimer);
      }
      doneTimer = setTimeout(() => {
        resolve({ content, citationSummary });
      }, 3000);
    };

    channel.subscribe((message: Ably.Message) => {
      switch (message.action) {
        case 'message.create':
          console.log('\n[Response received]', message.serial);
          content = message.data as string;
          resetTimer();
          break;

        case 'message.summary': {
          const summary = message.annotations?.summary?.['citations:multiple.v1'];
          if (summary) {
            citationSummary = summary as Record<string, { total: number }>;
            console.log('\n[Citation summary received]', Object.keys(citationSummary).length, 'source(s)');
          }
          resetTimer();
          break;
        }
      }
    });
  });
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  const channel = realtime.channels.get('ai:openai-citations-guide');
  console.log('Client ready, waiting for response...');
  const { content, citationSummary } = await subscribe(channel);
  console.log('\nFull response:', content);
  console.log('\nCitation sources:', citationSummary);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
