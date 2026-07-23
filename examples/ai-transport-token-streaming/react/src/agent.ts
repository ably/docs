// Agent
// In production this runs on a server (for example a Next.js route handler). It
// is run in the browser here so the example is self-contained, but the AI
// Transport SDK code is identical to a real agent endpoint.
// See https://ably.com/docs/ai-transport/getting-started/core-sdk
import * as Ably from 'ably';
import { createAgentSession, Invocation, InvocationData } from '@ably/ai-transport';
import { UIMessageCodec } from '@ably/ai-transport/vercel';
import { streamMockResponse } from './llm';
import { config } from './config';

// Receive an invocation, start a Run, hydrate the conversation, stream the
// response to the channel, and end the Run.
export const runAgent = async (invocationData: InvocationData): Promise<void> => {
  const ably = new Ably.Realtime({ key: config.ABLY_KEY, clientId: 'agent' });
  const invocation = Invocation.fromJSON(invocationData);

  const session = createAgentSession({
    client: ably,
    channelName: invocation.sessionName,
    codec: UIMessageCodec,
  });

  await session.connect();
  const run = session.createRun(invocation);

  try {
    // Drain `run.view` to fold in the triggering input (and any earlier turns)
    // before starting. `run.view` is the single history driver and holds the
    // conversation to feed the model.
    while (run.view.hasOlder()) await run.view.loadOlder();
    await run.start();

    // In production, stream from your model provider instead:
    //   const conversation = run.view.getMessages().map((m) => m.message);
    //   const result = streamText({
    //     model: anthropic('claude-sonnet-4-20250514'),
    //     messages: convertToModelMessages(conversation),
    //     abortSignal: run.abortSignal,
    //   });
    //   const { reason } = await run.pipe(result.toUIMessageStream());
    const { reason } = await run.pipe(streamMockResponse(run.abortSignal));
    await run.end(reason === 'error' ? { reason: 'error' } : { reason });
  } catch {
    await run.end({ reason: 'error' });
  } finally {
    // Non-durable teardown: end the session (its runs are already ended above).
    await session.end();
    ably.close();
  }
};
