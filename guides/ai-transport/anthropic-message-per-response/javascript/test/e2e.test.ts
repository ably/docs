import Ably from 'ably';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { publish } from '../src/publisher.js';
import { subscribe } from '../src/subscriber.js';

describe('anthropic-message-per-response', () => {
  let publisherClient: Ably.Realtime;
  let subscriberClient: Ably.Realtime;
  let channelName: string;

  beforeAll(() => {
    channelName = `ai:test-anthropic-mpr-${Date.now()}`;
    publisherClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
    subscriberClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    publisherClient?.close();
    subscriberClient?.close();
  });

  it('publishes initial message and appends tokens', async () => {
    const channel = subscriberClient.channels.get(channelName + '-actions');
    const pubChannel = publisherClient.channels.get(channelName + '-actions');
    const actions: { action: string; data?: string; serial?: string }[] = [];

    await channel.subscribe((message: Ably.Message) => {
      actions.push({
        action: message.action!,
        data: message.data as string | undefined,
        serial: message.serial,
      });
    });

    await publish(pubChannel, 'Reply with exactly: OK');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(actions[0].action).toBe('message.create');
    const appendActions = actions.filter((a) => a.action === 'message.append');
    expect(appendActions.length).toBeGreaterThan(0);
    // All actions should share the same serial
    const serials = new Set(actions.map((a) => a.serial));
    expect(serials.size).toBe(1);
  });

  it('subscriber reconstructs the full response from append actions', async () => {
    const subChannel = subscriberClient.channels.get(channelName + '-reconstruct');
    const pubChannel = publisherClient.channels.get(channelName + '-reconstruct');
    const responsePromise = subscribe(subChannel);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await publish(pubChannel, 'Reply with exactly: Hello world');
    const fullResponse = await responsePromise;
    expect(fullResponse.length).toBeGreaterThan(0);
    expect(fullResponse.toLowerCase()).toContain('hello');
  });

  it('appended tokens concatenate to match the full response', async () => {
    const channel = subscriberClient.channels.get(channelName + '-concat');
    const pubChannel = publisherClient.channels.get(channelName + '-concat');
    const appendedTokens: string[] = [];

    await channel.subscribe((message: Ably.Message) => {
      if (message.action === 'message.append') {
        appendedTokens.push(message.data as string);
      }
    });

    const responsePromise = subscribe(channel);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await publish(pubChannel, 'Reply with exactly: Test');
    const fullResponse = await responsePromise;
    const concatenated = appendedTokens.join('');
    expect(concatenated).toBe(fullResponse);
  });
});
