import Ably from 'ably';

interface CitationSummaryResult {
  content: string;
  citationSummary: Record<string, { total: number }>;
}

export function subscribe(channel: Ably.RealtimeChannel): Promise<CitationSummaryResult> {
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
      const serial = message.serial;
      if (!serial) {
        return;
      }

      switch (message.action) {
        case 'message.create':
          console.log('\n[Response received]', serial);
          content = message.data as string;
          resetTimer();
          break;

        case 'message.summary':
          if (message.annotations?.summary?.['citations:multiple.v1']) {
            citationSummary = message.annotations.summary['citations:multiple.v1'] as Record<
              string,
              { total: number }
            >;
            console.log('\n[Citation summary received]', citationSummary);
          }
          resetTimer();
          break;
      }
    });
  });
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  const channel = realtime.channels.get('ai:anthropic-citations-guide');
  console.log('Client ready, waiting for response and citations...');
  const { content, citationSummary } = await subscribe(channel);
  console.log('\nFull response:', content);
  console.log('Citation summary:', citationSummary);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
