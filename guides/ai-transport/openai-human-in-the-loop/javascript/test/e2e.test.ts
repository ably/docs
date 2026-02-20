import Ably from 'ably';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { runAgent } from '../src/agent.js';
import { subscribeApprovalRequests, respondToApproval } from '../src/client.js';

describe('openai-human-in-the-loop', () => {
  let agentClient: Ably.Realtime;
  let approverClient: Ably.Realtime;
  let channelName: string;

  beforeAll(() => {
    channelName = `test-openai-hitl-${Date.now()}`;

    agentClient = new Ably.Realtime({
      key: process.env.ABLY_API_KEY,
      echoMessages: false,
    });

    approverClient = new Ably.Realtime({
      key: process.env.ABLY_API_KEY,
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    agentClient?.close();
    approverClient?.close();
  });

  it('publishes an approval request when tool call is triggered', async () => {
    const agentChannel = agentClient.channels.get(channelName + '-request');
    const approverChannel = approverClient.channels.get(channelName + '-request');

    // Set up listener for approval request
    const requestPromise = subscribeApprovalRequests(approverChannel);

    // Wait for subscription to be established
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Run agent in background - it will block waiting for approval
    const agentPromise = runAgent(agentChannel, "Publish the blog post called 'Test Post'");

    // Wait for the approval request to arrive
    const request = await requestPromise;

    expect(request.tool).toBe('publish_blog_post');
    expect(request.toolCallId).toBeTruthy();

    // Parse the arguments to verify content
    const args = JSON.parse(request.arguments);
    expect(args.title).toBeTruthy();

    // Approve to unblock the agent
    await respondToApproval(approverChannel, request.toolCallId, 'approved', 'publisher');

    const results = await agentPromise;
    expect(results.length).toBeGreaterThan(0);
  });

  it('executes the tool when approved by a user with sufficient role', async () => {
    const agentChannel = agentClient.channels.get(channelName + '-approve');
    const approverChannel = approverClient.channels.get(channelName + '-approve');

    const requestPromise = subscribeApprovalRequests(approverChannel);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const agentPromise = runAgent(agentChannel, "Publish the blog post called 'Approved Post'");

    const request = await requestPromise;

    // Approve with a role that meets the minimum requirement
    await respondToApproval(approverChannel, request.toolCallId, 'approved', 'admin');

    const results = await agentPromise;

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].success).toBe(true);
    expect((results[0].result as { published: boolean }).published).toBe(true);
  });

  it('rejects the tool when the user explicitly rejects', async () => {
    const agentChannel = agentClient.channels.get(channelName + '-reject');
    const approverChannel = approverClient.channels.get(channelName + '-reject');

    const requestPromise = subscribeApprovalRequests(approverChannel);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const agentPromise = runAgent(agentChannel, "Publish the blog post called 'Rejected Post'");

    const request = await requestPromise;

    // Reject the request
    await respondToApproval(approverChannel, request.toolCallId, 'rejected', 'publisher');

    const results = await agentPromise;

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].success).toBe(false);
    expect(results[0].error).toContain('rejected');
  });
});
