import React from 'react';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { createSessionHooks, ActiveRun } from '@ably/ai-transport/react';
import { UIMessageCodec, VercelInput, VercelOutput, VercelProjection } from '@ably/ai-transport/vercel';
import type { UIMessage } from 'ai';
import { runAgent } from './agent';
import { config } from './config';
import './styles/styles.css';

// Bind the codec's types once so the hooks need no type parameters at call sites.
const { ClientSessionProvider, useClientSession, useView } = createSessionHooks<
  VercelInput,
  VercelOutput,
  VercelProjection,
  UIMessage
>();

// Generate a unique session (channel) name for this demo.
const CHANNEL_NAME = `ai:token-streaming-${crypto.randomUUID()}`;

const client = new Ably.Realtime({
  key: config.ABLY_KEY,
  clientId: 'user',
});

// Wake the agent. In production this POSTs `run.toInvocation().toJSON()` to your
// agent endpoint; here it invokes the in-browser agent directly.
const wakeAgent = (run: ActiveRun) => runAgent(run.toInvocation().toJSON());

const Chat: React.FC = () => {
  const { session } = useClientSession();
  const view = useView({ limit: 30 });
  const { messages, runOf } = view;

  // The latest Run is still streaming until it reaches a terminal status.
  const latestRun = runOf(messages.at(-1)?.codecMessageId ?? '');
  const isStreaming = latestRun !== undefined && latestRun.status !== 'complete' && latestRun.status !== 'cancelled';

  const handlePrompt = async () => {
    // Publish the user message on the channel, then wake the agent.
    const run = await view.send(
      UIMessageCodec.createUserMessage({
        id: crypto.randomUUID(),
        role: 'user',
        parts: [{ type: 'text', text: 'What is Ably AI Transport?' }],
      }),
    );
    await wakeAgent(run);
  };

  const stop = async () => {
    if (latestRun) {
      await session.cancel(latestRun.runId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 h-64 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-400">Select the prompt below to stream a response.</p>
        ) : (
          messages.map(({ codecMessageId, message }) => (
            <div key={codecMessageId} className="mb-3 whitespace-pre-wrap text-base leading-relaxed">
              <span className="font-bold capitalize">{message.role}: </span>
              {message.parts.map((part, i) => (part.type === 'text' ? <span key={i}>{part.text}</span> : null))}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handlePrompt}
          disabled={isStreaming}
          className={`px-3 py-2 text-sm border rounded-md transition-colors ${
            isStreaming
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300 cursor-pointer'
          }`}
        >
          What is Ably AI Transport?
        </button>
        {isStreaming && (
          <button onClick={stop} className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <AblyProvider client={client}>
    <ClientSessionProvider channelName={CHANNEL_NAME} codec={UIMessageCodec}>
      <Chat />
    </ClientSessionProvider>
  </AblyProvider>
);

export default App;
