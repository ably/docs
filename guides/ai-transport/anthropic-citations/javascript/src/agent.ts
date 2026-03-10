import Anthropic from '@anthropic-ai/sdk';
import Ably from 'ably';

interface Citation {
  type: string;
  cited_text: string;
  document_index: number;
  document_title: string;
  start_char_index?: number;
  end_char_index?: number;
  start_page_number?: number;
  end_page_number?: number;
  source?: string;
  responseStartOffset: number;
  responseEndOffset: number;
}

export async function publish(
  channel: Ably.RealtimeChannel,
  question: string,
  documentContent: string,
): Promise<{ msgSerial: string; citations: Citation[] }> {
  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'text',
              media_type: 'text/plain',
              data: documentContent,
            },
            title: 'Source Document',
            citations: { enabled: true },
          },
          {
            type: 'text',
            text: question,
          },
        ],
      },
    ],
  });

  let fullText = '';
  const citations: Citation[] = [];
  let currentOffset = 0;

  // Extract text and citations from response
  for (const block of response.content) {
    if (block.type === 'text') {
      const text = block.text;

      if ('citations' in block && Array.isArray(block.citations)) {
        for (const citation of block.citations as unknown as Record<string, unknown>[]) {
          citations.push({
            type: citation.type as string,
            cited_text: citation.cited_text as string,
            document_index: citation.document_index as number,
            document_title: citation.document_title as string,
            start_char_index: citation.start_char_index as number | undefined,
            end_char_index: citation.end_char_index as number | undefined,
            start_page_number: citation.start_page_number as number | undefined,
            end_page_number: citation.end_page_number as number | undefined,
            source: citation.source as string | undefined,
            // Track position in the full response text
            responseStartOffset: currentOffset,
            responseEndOffset: currentOffset + text.length,
          });
        }
      }

      fullText += text;
      currentOffset += text.length;
    }
  }

  const result = await channel.publish('response', fullText);
  const msgSerial = result.serials[0]!;

  // Publish each citation as an annotation
  for (const citation of citations) {
    let sourceDomain;
    try {
      sourceDomain = citation.source ? new URL(citation.source).hostname : citation.document_title;
    } catch {
      sourceDomain = citation.document_title || 'document';
    }

    await channel.annotations.publish(msgSerial, {
      type: 'citations:multiple.v1',
      name: sourceDomain,
      data: {
        title: citation.document_title,
        citedText: citation.cited_text,
        citationType: citation.type,
        startOffset: citation.responseStartOffset,
        endOffset: citation.responseEndOffset,
        documentIndex: citation.document_index,
        ...(citation.start_char_index !== undefined && {
          startCharIndex: citation.start_char_index,
          endCharIndex: citation.end_char_index,
        }),
        ...(citation.start_page_number !== undefined && {
          startPageNumber: citation.start_page_number,
          endPageNumber: citation.end_page_number,
        }),
      },
    });
  }

  return { msgSerial, citations };
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:anthropic-citations-guide');

  const document = `The James Webb Space Telescope (JWST) is a space telescope designed to conduct infrared astronomy. Its high-resolution and high-sensitivity instruments allow it to view objects too old and distant for the Hubble Space Telescope. This enables investigations across many fields of astronomy and cosmology, such as observation of the first stars and the formation of the first galaxies.`;

  const { msgSerial, citations } = await publish(
    channel,
    'What is the JWST designed for? Cite your sources.',
    document,
  );
  console.log('Message serial:', msgSerial);
  console.log('Citations:', citations.length);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
