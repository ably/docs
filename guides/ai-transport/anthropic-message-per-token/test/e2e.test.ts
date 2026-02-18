import Ably from 'ably';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { publish } from '../src/publisher.js';
import { subscribe } from '../src/subscriber.js';

describe('anthropic-message-per-token', () => {
  let publisherClient: Ably.Realtime;
  let subscriberClient: Ably.Realtime;
  let channelName: string;

  beforeAll(() => {
    channelName = `test-anthropic-mpt-${Date.now()}`;
    publisherClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
    subscriberClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    publisherClient?.close();
    subscriberClient?.close();
  });

  it('publishes start, token, and stop events in order', async () => {
    const channel = subscriberClient.channels.get(channelName + '-lifecycle');
    const pubChannel = publisherClient.channels.get(channelName + '-lifecycle');
    const events: { name: string; data?: string; responseId?: string }[] = [];

    await channel.subscribe((message: Ably.Message) => {
      events.push({
        name: message.name!,
        data: message.data as string | undefined,
        responseId: message.extras?.headers?.responseId,
      });
    });

    await publish(pubChannel, 'Reply with exactly: OK');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(events[0].name).toBe('start');
    expect(events[events.length - 1].name).toBe('stop');
    const tokenEvents = events.filter((e) => e.name === 'token');
    expect(tokenEvents.length).toBeGreaterThan(0);
    const responseIds = new Set(events.map((e) => e.responseId));
    expect(responseIds.size).toBe(1);
    expect(responseIds.values().next().value).toBeTruthy();
  });

  it('subscriber reconstructs the full response from token events', async () => {
    const subChannel = subscriberClient.channels.get(channelName + '-reconstruct');
    const pubChannel = publisherClient.channels.get(channelName + '-reconstruct');
    const responsePromise = subscribe(subChannel);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await publish(pubChannel, 'Reply with exactly: Hello world');
    const fullResponse = await responsePromise;
    expect(fullResponse.length).toBeGreaterThan(0);
    expect(fullResponse.toLowerCase()).toContain('hello');
  });

  it('token data concatenates to match the complete response', async () => {
    const channel = subscriberClient.channels.get(channelName + '-concat');
    const pubChannel = publisherClient.channels.get(channelName + '-concat');
    const tokens: string[] = [];
    await channel.subscribe('token', (message: Ably.Message) => {
      tokens.push(message.data as string);
    });
    const responsePromise = subscribe(channel);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await publish(pubChannel, 'Reply with exactly: Test');
    const fullResponse = await responsePromise;
    const concatenated = tokens.join('');
    expect(concatenated).toBe(fullResponse);
  });
});
