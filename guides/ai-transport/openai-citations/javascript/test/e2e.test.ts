import Ably from 'ably';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ask } from '../src/agent.js';
import { subscribe } from '../src/client.js';
import { waitForMessage } from '../../../test-helpers.js';

describe('openai-citations', () => {
  let publisherClient: Ably.Realtime;
  let subscriberClient: Ably.Realtime;
  let channelName: string;

  beforeAll(() => {
    channelName = `ai:test-openai-citations-${Date.now()}`;
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

    const resultPromise = subscribe(subChannel);
    await subChannel.attach();

    const summaryReceived = waitForMessage(subChannel, (m) => m.action === 'message.summary', 120000);
    await ask(pubChannel, 'What is the latest version of Node.js as of 2025?');
    await summaryReceived;

    const { content, citationSummary } = await resultPromise;
    expect(content.length).toBeGreaterThan(0);
    expect(Object.keys(citationSummary).length).toBeGreaterThan(0);
  }, 150000);

  it('citation summaries group by source domain', async () => {
    const subChannel = subscriberClient.channels.get(channelName + '-domains');
    const pubChannel = publisherClient.channels.get(channelName + '-domains');

    const resultPromise = subscribe(subChannel);
    await subChannel.attach();

    const summaryReceived = waitForMessage(subChannel, (m) => m.action === 'message.summary', 120000);
    await ask(pubChannel, 'What is the latest version of Node.js as of 2025?');
    await summaryReceived;

    const { citationSummary } = await resultPromise;
    const domains = Object.keys(citationSummary);
    expect(domains.length).toBeGreaterThan(0);

    for (const domain of domains) {
      // Verify each key is a valid domain name (contains at least one dot)
      expect(domain).toMatch(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
      expect(citationSummary[domain].total).toBeGreaterThan(0);
    }
  }, 150000);
});
