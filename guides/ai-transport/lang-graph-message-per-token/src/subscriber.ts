import Ably from 'ably';

export function subscribe(channel: Ably.RealtimeChannel): Promise<string> {
  return new Promise((resolve) => {
    const responses = new Map<string, string>();

    channel.subscribe('start', (message: Ably.Message) => {
      const responseId = message.extras?.headers?.responseId;
      console.log('\n[Response started]', responseId);
      responses.set(responseId, '');
    });

    channel.subscribe('token', (message: Ably.Message) => {
      const responseId = message.extras?.headers?.responseId;
      const token = message.data as string;
      const currentText = responses.get(responseId) || '';
      responses.set(responseId, currentText + token);
      process.stdout.write(token);
    });

    channel.subscribe('stop', (message: Ably.Message) => {
      const responseId = message.extras?.headers?.responseId;
      const finalText = responses.get(responseId) || '';
      console.log('\n[Response completed]', responseId);
      resolve(finalText);
    });
  });
}

async function main() {
  const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
  const channel = realtime.channels.get('langgraph-mpt-guide');
  console.log('Subscriber ready, waiting for tokens...');
  const response = await subscribe(channel);
  console.log('\nFull response:', response);
  realtime.close();
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
