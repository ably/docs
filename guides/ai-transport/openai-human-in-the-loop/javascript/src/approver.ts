import Ably from 'ably';

export function autoApprove(channel: Ably.RealtimeChannel): () => void {
  const listener = (message: Ably.Message) => {
    const toolCallId = message.extras?.headers?.toolCallId;
    channel.publish({
      name: 'approval-response',
      data: { decision: 'approved' },
      extras: {
        headers: {
          toolCallId,
        },
      },
    });
  };

  channel.subscribe('approval-request', listener);

  return () => {
    channel.unsubscribe('approval-request', listener);
  };
}

export function autoReject(channel: Ably.RealtimeChannel): () => void {
  const listener = (message: Ably.Message) => {
    const toolCallId = message.extras?.headers?.toolCallId;
    channel.publish({
      name: 'approval-response',
      data: { decision: 'rejected' },
      extras: {
        headers: {
          toolCallId,
        },
      },
    });
  };

  channel.subscribe('approval-request', listener);

  return () => {
    channel.unsubscribe('approval-request', listener);
  };
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  const channel = realtime.channels.get('ai:openai-hitl-guide');

  const { createInterface } = await import('readline');
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log('Approver ready, waiting for approval requests...');

  channel.subscribe('approval-request', (message: Ably.Message) => {
    const data = message.data as { tool: string; arguments: string };
    const toolCallId = message.extras?.headers?.toolCallId;

    console.log(`\nApproval requested for tool: ${data.tool}`);
    console.log(`Arguments: ${data.arguments}`);

    rl.question('Approve? (y/n): ', (answer) => {
      const decision = answer.toLowerCase() === 'y' ? 'approved' : 'rejected';
      channel.publish({
        name: 'approval-response',
        data: { decision },
        extras: {
          headers: {
            toolCallId,
          },
        },
      });
      console.log(`Decision sent: ${decision}`);
    });
  });
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
