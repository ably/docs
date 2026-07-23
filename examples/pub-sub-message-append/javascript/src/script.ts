import * as Ably from 'ably';
import { Publisher } from './publisher';
import { config } from './config';

// Generate a unique channel name for this session. It must be in a namespace with
// message append support enabled, see /docs/messages/updates-deletes#enable
const CHANNEL_NAME = `ai:stream-${crypto.randomUUID()}`;
const client = new Ably.Realtime({
  key: config.ABLY_KEY,
});

const channel = client.channels.get(CHANNEL_NAME);

// Publisher for the text stream
const publisher = new Publisher(config.ABLY_KEY, CHANNEL_NAME);

// DOM elements
const streamTextElement = document.getElementById('stream-text') as HTMLDivElement;
const connectionToggle = document.getElementById('connection-toggle') as HTMLButtonElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;
const processingStatus = document.getElementById('processing-status') as HTMLSpanElement;

// Track streamed text by message serial
const streams = new Map<string, string>();
let currentSerial: string | null = null;

const updateDisplay = () => {
  if (currentSerial) {
    streamTextElement.innerText = streams.get(currentSerial) || '';
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
      streams.set(serial, message.data || '');
      currentSerial = serial;
      processingStatus.innerText = 'Streaming';
      break;
    case 'message.append': {
      // Only append if this is for the current stream
      if (currentSerial === serial) {
        const current = streams.get(serial) || '';
        streams.set(serial, current + (message.data || ''));
      }
      break;
    }
    case 'message.update':
      // Full state from history or resync - always use it
      streams.set(serial, message.data || '');
      currentSerial = serial;
      break;
  }
  updateDisplay();
});

const handleStartClick = () => {
  currentSerial = null;
  streamTextElement.innerText = '';
  processingStatus.innerText = 'Streaming';

  publisher.startStream();
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
startButton.onclick = handleStartClick;

handleConnect();
