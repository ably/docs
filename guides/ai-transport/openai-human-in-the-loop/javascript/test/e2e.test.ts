import Ably from 'ably';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { runAgent } from '../src/agent.js';
import { autoApprove, autoReject } from '../src/approver.js';
import { waitForMessage } from '../../../test-helpers.js';

describe('openai-human-in-the-loop', () => {
  let agentClient: Ably.Realtime;
  let approverClient: Ably.Realtime;
  let channelName: string;

  beforeAll(() => {
    channelName = `ai:test-openai-hitl-${Date.now()}`;
    agentClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
    approverClient = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    agentClient?.close();
    approverClient?.close();
  });

  it('agent publishes approval request when tool use is triggered', async () => {
    const agentChannel = agentClient.channels.get(channelName + '-request');
    const approverChannel = approverClient.channels.get(channelName + '-request');

    const requestReceived = waitForMessage(approverChannel, (m) => m.name === 'approval-request', 30000);

    // Set up auto-approve so the agent doesn't hang waiting for a response
    const cleanup = autoApprove(approverChannel);

    await runAgent(agentChannel, "Publish the blog post called 'Test Post'");
    const message = await requestReceived;

    cleanup();

    const data = message.data as { tool: string; arguments: string };
    expect(data.tool).toBe('publish_blog_post');
    expect(data.arguments).toBeDefined();
  });

  it('agent completes tool execution after approval', async () => {
    const agentChannel = agentClient.channels.get(channelName + '-approve');
    const approverChannel = approverClient.channels.get(channelName + '-approve');

    const cleanup = autoApprove(approverChannel);
    await approverChannel.attach();

    const result = await runAgent(agentChannel, "Publish the blog post called 'Approved Post'");

    cleanup();

    expect(result).toHaveProperty('published', true);
    expect(result).toHaveProperty('title');
  });

  it('agent rejects when approval is denied', async () => {
    const agentChannel = agentClient.channels.get(channelName + '-reject');
    const approverChannel = approverClient.channels.get(channelName + '-reject');

    const cleanup = autoReject(approverChannel);
    await approverChannel.attach();

    await expect(runAgent(agentChannel, "Publish the blog post called 'Rejected Post'")).rejects.toThrow(
      'Tool call rejected',
    );

    cleanup();
  });
});
