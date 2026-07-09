import * as Ably from 'ably';
import { createClientSession } from '@ably/ai-transport';
import type { ClientSession, ClientView } from '@ably/ai-transport';
import { UIMessageCodec } from '@ably/ai-transport/vercel';
import type { VercelInput, VercelOutput, VercelProjection } from '@ably/ai-transport/vercel';
import type { UIMessage } from 'ai';
import { runAgent } from './agent';
import { config } from './config';

// Generate a unique session (channel) name for this demo.
const CHANNEL_NAME = `ai:token-streaming-${crypto.randomUUID()}`;

const responseEl = document.getElementById('response-text') as HTMLDivElement;
const promptButton = document.getElementById('prompt-button') as HTMLButtonElement;
const stopButton = document.getElementById('stop-button') as HTMLButtonElement;
const refreshButton = document.getElementById('refresh-button') as HTMLButtonElement;

// One client for the page's lifetime. The session and view are rebuilt on refresh.
const client = new Ably.Realtime({ key: config.ABLY_KEY, clientId: 'user' });
let session: ClientSession<VercelInput, VercelOutput, VercelProjection, UIMessage>;
let view: ClientView<VercelInput, UIMessage>;
let ready = false;

// Re-render whenever the visible conversation changes (tokens append in realtime).
const render = () => {
  const messages = view.getMessages();

  if (messages.length === 0) {
    responseEl.className = 'text-gray-400';
    responseEl.textContent = 'Select the prompt below to stream a response.';
  } else {
    responseEl.className = '';
    responseEl.innerHTML = messages
      .map(({ message }) => {
        const text = message.parts
          .filter((part) => part.type === 'text')
          .map((part) => (part as { text: string }).text)
          .join('');
        return `<div class="mb-3"><span class="font-bold capitalize">${message.role}: </span>${text}</div>`;
      })
      .join('');
  }

  const latest = messages.at(-1);
  const latestRun = latest ? view.runOf(latest.codecMessageId) : undefined;
  // The latest Run is streaming while its status is 'active'.
  const isStreaming = latestRun?.status === 'active';

  stopButton.style.display = isStreaming ? 'inline-block' : 'none';
  promptButton.disabled = !ready || isStreaming;
};

// Build a fresh session and view over the channel, then connect. Called on load
// and on refresh: the fresh session reconnects to the same channel and reloads
// its history, so a response that streamed while away is restored.
const createSession = () => {
  ready = false;
  session = createClientSession({ client, channelName: CHANNEL_NAME, codec: UIMessageCodec });
  view = session.createView();

  view.on('update', render);
  // Run status transitions (for example streaming ending) do not fire 'update'.
  session.tree.on('run', render);

  session
    .connect()
    .then(async () => {
      // A fresh view starts empty; page in channel history. On the first load the
      // channel has no history, so this is a no-op.
      while (view.hasOlder()) await view.loadOlder();
      ready = true;
      render();
    })
    .catch((error) => {
      responseEl.className = 'text-red-500';
      responseEl.textContent = `Failed to connect: ${String(error)}`;
    });
  render();
};

const handlePrompt = async () => {
  // Publish the user message on the channel, then wake the agent.
  const run = await view.send(
    UIMessageCodec.createUserMessage({
      id: crypto.randomUUID(),
      role: 'user',
      parts: [{ type: 'text', text: 'What is Ably AI Transport?' }],
    }),
  );
  // In production this POSTs `run.toInvocation().toJSON()` to your agent
  // endpoint; here it invokes the in-browser agent directly.
  await runAgent(run.toInvocation().toJSON());
};

const handleStop = async () => {
  const latest = view.getMessages().at(-1);
  const latestRun = latest ? view.runOf(latest.codecMessageId) : undefined;
  if (latestRun) {
    await session.cancel(latestRun.runId);
  }
};

// Simulate a page refresh: close the session and build a fresh one. It
// reconnects to the same channel and reloads its history, so the conversation
// is restored after the view briefly clears, exactly like reloading the page.
const refresh = async () => {
  await session.close();
  createSession();
};

promptButton.onclick = handlePrompt;
stopButton.onclick = handleStop;
refreshButton.onclick = refresh;

createSession();
