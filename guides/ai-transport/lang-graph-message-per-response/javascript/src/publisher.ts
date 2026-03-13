import { ChatAnthropic } from '@langchain/anthropic';
import { StateGraph, Annotation, START, END } from '@langchain/langgraph';
import Ably from 'ably';

const model = new ChatAnthropic({ model: 'claude-sonnet-4-5-20250929' });

const StateAnnotation = Annotation.Root({
  messages: Annotation<any[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});

const graph = new StateGraph(StateAnnotation)
  .addNode('agent', async (state) => {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
  })
  .addEdge(START, 'agent')
  .addEdge('agent', END);

const app = graph.compile();

export async function publish(channel: Ably.RealtimeChannel, prompt: string) {
  let msgSerial: string | null = null;

  const stream = await app.stream(
    { messages: [{ role: 'user', content: prompt }] },
    { streamMode: 'messages' },
  );

  for await (const [messageChunk, _metadata] of stream) {
    if (!msgSerial && messageChunk?.id) {
      const result = await channel.publish({ name: 'response', data: '' });
      msgSerial = result.serials[0];
    }

    const content = messageChunk?.content;
    if (content && msgSerial) {
      channel.appendMessage({ serial: msgSerial, data: content });
    }
  }
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY, echoMessages: false });
  const channel = realtime.channels.get('ai:langgraph-mpr-guide');
  await publish(channel, 'Tell me a short joke');
  console.log('Done streaming. Closing connection...');
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
