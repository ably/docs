import Ably from 'ably';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { publish } from '../src/agent.js';
import { subscribe } from '../src/client.js';
import { waitForMessage } from '../../../test-helpers.js';

const document =
  'Ably provides realtime messaging infrastructure. It supports pub/sub, presence, and history features.';

describe('anthropic-citations', () => {
  let publisherClient: Ably.Realtime;
  let subscriberClient: Ably.Realtime;
  let channelName: string;

  beforeAll(() => {
    channelName = `ai:test-anthropic-citations-${Date.now()}`;
    publisherClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
    subscriberClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    publisherClient?.close();
    subscriberClient?.close();
  });

  it('publishes response and citation annotations', async () => {
    const subChannel = subscriberClient.channels.get(channelName + '-annotations');
    const pubChannel = publisherClient.channels.get(channelName + '-annotations');

    const responsePromise = subscribe(subChannel);
    await subChannel.attach();

    const summaryReceived = waitForMessage(subChannel, (m) => m.action === 'message.summary');

    await publish(pubChannel, 'What features does Ably provide? Cite your sources.', document);
    await summaryReceived;

    const { content, citationSummary } = await responsePromise;

    expect(content.length).toBeGreaterThan(0);
    expect(Object.keys(citationSummary).length).toBeGreaterThan(0);
  });

  it('citations reference the source document', async () => {
    const pubChannel = publisherClient.channels.get(channelName + '-doc-ref');

    const { msgSerial, citations } = await publish(
      pubChannel,
      'What features does Ably provide? Cite your sources.',
      document,
    );

    expect(msgSerial).toBeDefined();
    expect(citations.length).toBeGreaterThan(0);
    expect(citations[0].document_title).toBe('Source Document');
  });
});
