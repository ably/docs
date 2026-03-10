import Anthropic from '@anthropic-ai/sdk';
import Ably from 'ably';

export async function runAgent(channel: Ably.RealtimeChannel, prompt: string) {
  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
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

  for (const block of response.content) {
    if (block.type === 'tool_use') {
      const toolUse = block;

      // Set up listener for approval response before publishing request
      const approvalPromise = new Promise<Ably.Message>((resolve, reject) => {
        const timeout = setTimeout(() => {
          channel.unsubscribe('approval-response', listener);
          reject(new Error('Approval response timed out'));
        }, 30000);

        const listener = (message: Ably.Message) => {
          if (message.extras?.headers?.toolCallId === toolUse.id) {
            clearTimeout(timeout);
            channel.unsubscribe('approval-response', listener);
            resolve(message);
          }
        };

        channel.subscribe('approval-response', listener);
      });

      // Publish approval request to channel
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

      const approvalResponse = await approvalPromise;

      const decision = (approvalResponse.data as { decision: string }).decision;

      if (decision === 'approved') {
        // Simulate tool execution
        const input = toolUse.input as { title: string };
        return { published: true, title: input.title };
      } else {
        throw new Error(`Tool call rejected: ${toolUse.name}`);
      }
    }
  }

  // No tool use in response - return the text content
  const textBlock = response.content.find((b) => b.type === 'text');
  return { published: false, text: textBlock?.type === 'text' ? textBlock.text : '' };
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:anthropic-hitl-guide');
  try {
    const result = await runAgent(channel, 'Publish a blog post called "Hello World"');
    console.log('Result:', result);
  } finally {
    realtime.close();
  }
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
