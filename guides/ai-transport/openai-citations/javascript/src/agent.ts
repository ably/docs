import OpenAI from 'openai';
import Ably from 'ably';

interface Citation {
  url: string;
  title: string;
  startIndex: number;
  endIndex: number;
}

export async function ask(channel: Ably.RealtimeChannel, question: string) {
  const openai = new OpenAI();

  const response = await openai.responses.create({
    model: 'gpt-5',
    input: question,
    tools: [{ type: 'web_search_preview' }],
  });

  let fullText = '';
  const citations: Citation[] = [];

  for (const item of response.output) {
    if (item.type === 'message') {
      for (const content of item.content) {
        if (content.type === 'output_text') {
          fullText = content.text;
          if (content.annotations) {
            for (const annotation of content.annotations) {
              if (annotation.type === 'url_citation') {
                citations.push({
                  url: annotation.url,
                  title: annotation.title,
                  startIndex: annotation.start_index,
                  endIndex: annotation.end_index,
                });
              }
            }
          }
        }
      }
    }
  }

  const result = await channel.publish('response', fullText);
  const msgSerial = result.serials[0]!;

  for (const citation of citations) {
    const sourceDomain = new URL(citation.url).hostname;
    await channel.annotations.publish(msgSerial, {
      type: 'citations:multiple.v1',
      name: sourceDomain,
      data: {
        url: citation.url,
        title: citation.title,
        startIndex: citation.startIndex,
        endIndex: citation.endIndex,
      },
    });
  }

  return { msgSerial, citations };
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:openai-citations-guide');
  const { citations } = await ask(channel, 'What is the latest version of Node.js as of 2025?');
  console.log(`Published response with ${citations.length} citation(s).`);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
