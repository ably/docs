import Anthropic from '@anthropic-ai/sdk';
import Ably from 'ably';
import 'dotenv/config';

// Function that executes the approved action
async function publishBlogPost(args: { title: string }) {
  console.log(`Publishing blog post: ${args.title}`);
  return { published: true, title: args.title };
}

// Request human approval for a tool use via Ably
async function requestHumanApproval(
  toolUse: { id: string; name: string; input: Record<string, unknown> },
  channel: Ably.RealtimeChannel,
  pendingApprovals: Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>,
) {
  const approvalPromise = new Promise((resolve, reject) => {
    pendingApprovals.set(toolUse.id, { resolve, reject });
  });

  await channel.publish({
    name: 'approval-request',
    data: {
      tool: toolUse.name,
      arguments: toolUse.input,
    },
    extras: {
      headers: {
        toolCallId: toolUse.id,
      },
    },
  });

  console.log(`Approval request sent for: ${toolUse.name}`);
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
    const { decision, approverRole: dataRole } = message.data as { decision: string; approverRole?: string };
    const toolCallId = message.extras?.headers?.toolCallId;
    const pending = pendingApprovals.get(toolCallId);

    if (!pending) return;

    const toolName = 'publish_blog_post';
    const policy = approvalPolicies[toolName];
    const approverRole = (message.extras?.userClaim as string) || dataRole;

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

// Process a tool use: request approval then execute
async function processToolUse(
  toolUse: { id: string; name: string; input: Record<string, unknown> },
  channel: Ably.RealtimeChannel,
  pendingApprovals: Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>,
) {
  if (toolUse.name === 'publish_blog_post') {
    await requestHumanApproval(toolUse, channel, pendingApprovals);
    return await publishBlogPost(toolUse.input as { title: string });
  }
  throw new Error(`Unknown tool: ${toolUse.name}`);
}

// Run the agent: send prompt to Anthropic, handle tool use with HITL approval
export async function runAgent(channel: Ably.RealtimeChannel, prompt: string) {
  const pendingApprovals = new Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();
  await subscribeApprovalResponses(channel, pendingApprovals);

  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    tools: [
      {
        name: 'publish_blog_post',
        description: 'Publish a blog post to the website. Requires human approval.',
        input_schema: {
          type: 'object' as const,
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
    messages: [{ role: 'user', content: prompt }],
  });

  const toolUseBlocks = response.content.filter(
    (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
  );

  const results: Array<{ success: boolean; result?: unknown; error?: string }> = [];

  for (const toolUse of toolUseBlocks) {
    try {
      const result = await processToolUse(
        { id: toolUse.id, name: toolUse.name, input: toolUse.input as Record<string, unknown> },
        channel,
        pendingApprovals,
      );
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

  const channel = realtime.channels.get('ai:anthropic-hitl-guide');
  const results = await runAgent(channel, "Publish the blog post called 'Introducing our new API'");
  console.log('Results:', results);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
