import * as Ably from 'ably';
import { Agent } from './agent';
import { config } from './config';

// Generate unique channel name for this session
const CHANNEL_NAME = `ai-transport-${crypto.randomUUID()}`;
const client = new Ably.Realtime({
  key: config.ABLY_KEY,
});
const channel = client.channels.get(CHANNEL_NAME);

// Agent for processing prompts
const agent = new Agent(config.ABLY_KEY, CHANNEL_NAME);

const responseTextElement = document.getElementById('response-text') as HTMLDivElement;
const connectionToggle = document.getElementById('connection-toggle') as HTMLButtonElement;
const promptButton = document.getElementById('prompt-button') as HTMLButtonElement;
const processingStatus = document.getElementById('processing-status') as HTMLSpanElement;

let currentResponseId: string | null = null;
let responseCompleted = false;
let responseText = '';
let isHydrating = false;
let pendingTokens: string[] = [];

const updateDisplay = () => {
  responseTextElement.innerText = responseText;
  processingStatus.innerText = responseCompleted ? 'Completed' : 'In Progress';
};

channel.subscribe('start', (message) => {
  const responseId = message.extras?.headers?.responseId;
  if (responseId && currentResponseId === responseId) {
    responseCompleted = false;
    responseText = '';
    pendingTokens = [];
    updateDisplay();
  }
});

channel.subscribe('token', (message) => {
  const responseId = message.extras?.headers?.responseId;
  if (responseId && currentResponseId === responseId) {
    if (isHydrating) {
      pendingTokens.push(message.data.token);
    } else {
      responseText += message.data.token;
      updateDisplay();
    }
  }
});

channel.subscribe('stop', (message) => {
  const responseId = message.extras?.headers?.responseId;
  if (responseId && currentResponseId === responseId) {
    responseCompleted = true;
    updateDisplay();
  }
});

// Hydrate from history after reattaching
const hydrateFromHistory = async () => {
  if (!currentResponseId) {
    isHydrating = false;
    return;
  }

  let page = await channel.history({ untilAttach: true });

  const historyTokens: string[] = [];
  while (page) {
    for (const message of page.items) {
      const responseId = message.extras?.headers?.responseId;
      if (responseId !== currentResponseId) {
        continue;
      }
      if (message.name === 'token') {
        historyTokens.push(message.data.token);
      } else if (message.name === 'stop') {
        responseCompleted = true;
      }
    }
    page = page.hasNext() ? await page.next() : null;
  }

  // History arrives newest-first, so reverse it
  // Then append any tokens that arrived during hydration
  responseText = historyTokens.reverse().join('') + pendingTokens.join('');
  isHydrating = false;
  updateDisplay();
};

const handlePromptClick = () => {
  currentResponseId = `request-${crypto.randomUUID()}`;
  responseText = '';
  updateDisplay();
  agent.processPrompt('What is Ably AI Transport?', currentResponseId);
};

const handleConnect = async () => {
  // Set hydrating before attach to buffer any live tokens
  isHydrating = true;
  pendingTokens = [];

  await channel.attach();
  await hydrateFromHistory();

  connectionToggle.innerText = 'Disconnect';
};

const handleDisconnect = async () => {
  await channel.detach();
  processingStatus.innerText = 'Paused';
  connectionToggle.innerText = 'Connect';
};

const handleConnectionToggle = () => {
  if (channel.state === 'attached') {
    handleDisconnect();
  } else {
    handleConnect();
  }
};

connectionToggle.onclick = handleConnectionToggle;
promptButton.onclick = handlePromptClick;
