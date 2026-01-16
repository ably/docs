import * as Ably from 'ably';
import { Agent } from './agent';
import { config } from './config';

// Generate unique channel name for this session
const CHANNEL_NAME = `ai:response-${crypto.randomUUID()}`;
const client = new Ably.Realtime({
  key: config.ABLY_KEY,
});

const channel = client.channels.get(CHANNEL_NAME);

// DOM elements
const responseTextElement = document.getElementById('response-text') as HTMLDivElement;
const connectionToggle = document.getElementById('connection-toggle') as HTMLButtonElement;
const promptButton = document.getElementById('prompt-button') as HTMLButtonElement;
const processingStatus = document.getElementById('processing-status') as HTMLSpanElement;

// Track responses by message serial
const responses = new Map<string, string>();
let currentSerial: string | null = null;

const updateDisplay = () => {
  if (currentSerial) {
    responseTextElement.innerText = responses.get(currentSerial) || '';
  }
};

// Subscribe to messages - rewind delivers history as message.update,
// then seamlessly transitions to live message.append events
channel.subscribe((message: Ably.Message) => {
  const serial = message.serial;
  if (!serial) {
    return;
  }

  switch (message.action) {
    case 'message.create':
      responses.set(serial, message.data || '');
      currentSerial = serial;
      processingStatus.innerText = 'Streaming';
      break;
    case 'message.append': {
      // Only append if this is for the current response
      if (currentSerial === serial) {
        const current = responses.get(serial) || '';
        responses.set(serial, current + (message.data || ''));
      }
      break;
    }
    case 'message.update':
      // Full state from history or resync - always use it
      responses.set(serial, message.data || '');
      currentSerial = serial;
      break;
  }
  updateDisplay();
});

const handlePromptClick = () => {
  currentSerial = null;
  responseTextElement.innerText = '';
  processingStatus.innerText = 'Streaming';

  const agent = new Agent(config.ABLY_KEY, CHANNEL_NAME);
  agent.processPrompt('What is Ably AI Transport?');
};

const handleConnect = async () => {
  // Set rewind option before attaching to get history as message.update events
  channel.setOptions({ params: { rewind: '2m' } });
  await channel.attach();
  connectionToggle.innerText = 'Disconnect';
  processingStatus.innerText = 'Ready';
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

handleConnect();
