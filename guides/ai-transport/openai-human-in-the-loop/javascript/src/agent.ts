import OpenAI from 'openai';
import Ably from 'ably';

export async function runAgent(channel: Ably.RealtimeChannel, prompt: string) {
  const openai = new OpenAI();

  const response = await openai.responses.create({
    model: 'gpt-4o',
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
      } as unknown as OpenAI.Responses.FunctionTool,
    ],
  });

  const toolCalls = response.output.filter((item) => item.type === 'function_call');

  for (const toolCall of toolCalls) {
    // Set up listener for approval response before publishing request
    const decisionPromise = new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        channel.unsubscribe('approval-response', listener);
        reject(new Error('Timed out waiting for approval response'));
      }, 30000);

      const listener = (message: Ably.Message) => {
        const messageToolCallId = message.extras?.headers?.toolCallId;
        if (messageToolCallId === toolCall.call_id) {
          clearTimeout(timeout);
          channel.unsubscribe('approval-response', listener);
          resolve((message.data as { decision: string }).decision);
        }
      };

      channel.subscribe('approval-response', listener);
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

    const decision = await decisionPromise;

    if (decision !== 'approved') {
      throw new Error(`Tool call rejected: ${toolCall.name}`);
    }

    const { title } = JSON.parse(toolCall.arguments);
    return { published: true, title };
  }

  return { message: 'No tool calls were made by the model.' };
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:openai-hitl-guide');
  const result = await runAgent(channel, 'Publish a blog post called "Hello World"');
  console.log('Result:', result);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
