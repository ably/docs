import Ably from 'ably';
import 'dotenv/config';

// Subscribe to approval requests and auto-approve or let the caller decide.
// Returns a promise that resolves with the request data when an approval request is received.
export function subscribeApprovalRequests(channel: Ably.RealtimeChannel): Promise<{
  tool: string;
  arguments: Record<string, unknown>;
  toolCallId: string;
}> {
  return new Promise((resolve) => {
    channel.subscribe('approval-request', (message: Ably.Message) => {
      const request = message.data as { tool: string; arguments: Record<string, unknown> };
      const toolCallId = message.extras?.headers?.toolCallId as string;
      resolve({ ...request, toolCallId });
    });
  });
}

// Publish an approval response (approve or reject)
export async function respondToApproval(
  channel: Ably.RealtimeChannel,
  toolCallId: string,
  decision: 'approved' | 'rejected',
  approverRole?: string,
) {
  await channel.publish({
    name: 'approval-response',
    data: { decision, approverRole },
    extras: {
      headers: { toolCallId },
    },
  });
}

// Run as a standalone script (interactive CLI)
async function main() {
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const realtime = new Ably.Realtime({
    key: process.env.ABLY_API_KEY,
  });

  const channel = realtime.channels.get('ai:anthropic-hitl-guide');

  console.log('Waiting for approval requests...\n');

  channel.subscribe('approval-request', (message: Ably.Message) => {
    const request = message.data as { tool: string; arguments: Record<string, unknown> };
    const toolCallId = message.extras?.headers?.toolCallId as string;

    console.log('\n========================================');
    console.log('APPROVAL REQUEST');
    console.log(`Tool: ${request.tool}`);
    console.log(`Arguments: ${JSON.stringify(request.arguments, null, 2)}`);
    console.log('========================================');

    rl.question('Approve this action? (y/n): ', async (answer: string) => {
      const decision = answer.toLowerCase() === 'y' ? 'approved' : 'rejected';
      await respondToApproval(channel, toolCallId, decision);
      console.log(`Decision sent: ${decision}\n`);
    });
  });
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
