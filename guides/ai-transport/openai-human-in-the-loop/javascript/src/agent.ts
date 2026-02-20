import OpenAI from 'openai';
import Ably from 'ably';
import 'dotenv/config';

// Function that executes the approved action
async function publishBlogPost(args: string) {
  const { title } = JSON.parse(args);
  console.log(`Publishing blog post: ${title}`);
  return { published: true, title };
}

// Request human approval for a tool call via Ably
async function requestHumanApproval(
  toolCall: { call_id: string; name: string; arguments: string },
  channel: Ably.RealtimeChannel,
  pendingApprovals: Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>,
) {
  const approvalPromise = new Promise((resolve, reject) => {
    pendingApprovals.set(toolCall.call_id, { resolve, reject });
  });

  await channel.publish({
    name: 'approval-request',
    data: {
      tool: toolCall.name,
      arguments: toolCall.arguments,
    },
    extras: {
      headers: {
        toolCallId: toolCall.call_id,
      },
    },
  });

  console.log(`Approval request sent for: ${toolCall.name}`);
  return approvalPromise;
}

// Subscribe to approval responses and resolve pending promises
export async function subscribeApprovalResponses(
  channel: Ably.RealtimeChannel,
  pendingApprovals: Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>,
) {
  const roleHierarchy = ['editor', 'publisher', 'admin'];
  const approvalPolicies: Record<string, { minRole: string }> = {
    publish_blog_post: { minRole: 'publisher' },
  };

  function canApprove(approverRole: string, requiredRole: string) {
    return roleHierarchy.indexOf(approverRole) >= roleHierarchy.indexOf(requiredRole);
  }

  await channel.subscribe('approval-response', async (message: Ably.Message) => {
    const { decision } = message.data as { decision: string };
    const toolCallId = message.extras?.headers?.toolCallId;
    const pending = pendingApprovals.get(toolCallId);

    if (!pending) return;

    const toolName = 'publish_blog_post';
    const policy = approvalPolicies[toolName];
    const approverRole = (message.extras?.userClaim as string) || message.data?.approverRole;

    if (approverRole && !canApprove(approverRole, policy.minRole)) {
      pending.reject(new Error(`Approver role '${approverRole}' insufficient for '${policy.minRole}'`));
      pendingApprovals.delete(toolCallId);
      return;
    }

    if (decision === 'approved') {
      pending.resolve({ approved: true, approverRole });
    } else {
      pending.reject(new Error(`Action rejected by ${approverRole}`));
    }
    pendingApprovals.delete(toolCallId);
  });
}

// Process a tool call: request approval then execute
async function processToolCall(
  toolCall: { call_id: string; name: string; arguments: string },
  channel: Ably.RealtimeChannel,
  pendingApprovals: Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>,
) {
  if (toolCall.name === 'publish_blog_post') {
    await requestHumanApproval(toolCall, channel, pendingApprovals);
    return await publishBlogPost(toolCall.arguments);
  }
  throw new Error(`Unknown tool: ${toolCall.name}`);
}

// Run the agent: send prompt to OpenAI, handle tool calls with HITL approval
export async function runAgent(channel: Ably.RealtimeChannel, prompt: string) {
  const pendingApprovals = new Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();
  await subscribeApprovalResponses(channel, pendingApprovals);

  const openai = new OpenAI();

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    tools: [
      {
        type: 'function',
        name: 'publish_blog_post',
        description: 'Publish a blog post to the website. Requires human approval.',
        parameters: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the blog post to publish',
            },
          },
          required: ['title'],
        },
      },
    ],
  });

  const toolCalls = response.output.filter(
    (item): item is OpenAI.Responses.ResponseFunctionToolCall => item.type === 'function_call',
  );

  const results: Array<{ success: boolean; result?: unknown; error?: string }> = [];

  for (const toolCall of toolCalls) {
    try {
      const result = await processToolCall(toolCall, channel, pendingApprovals);
      results.push({ success: true, result });
    } catch (err) {
      results.push({ success: false, error: (err as Error).message });
    }
  }

  return results;
}

// Run as a standalone script
async function main() {
  const realtime = new Ably.Realtime({
    key: process.env.ABLY_API_KEY,
    echoMessages: false,
  });

  const channel = realtime.channels.get('ai:openai-hitl-guide');
  const results = await runAgent(channel, "Publish the blog post called 'Introducing our new API'");
  console.log('Results:', results);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
