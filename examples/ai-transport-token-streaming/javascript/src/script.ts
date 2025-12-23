import * as Ably from 'ably';
import { requestLLMProcessing } from './BackendLLMService';
import { config } from './config';

// Generate unique channel name for this session
const CHANNEL_NAME = `ai-transport-${crypto.randomUUID()}`;
const client = new Ably.Realtime({
  key: config.ABLY_KEY,
});

interface ProcessedMessage {
  token: string;
  messageOrder: number;
}

// State management
let currentResponse = '';
let messages: ProcessedMessage[] = [];
let prompt = '';
let isProcessing = false;
let connectionState = 'disconnected';
let currentResponseId: string | null = null;
let isChannelDetached = false;

// DOM elements
const promptDisplay = document.getElementById('prompt-display');
const connectionStatus = document.getElementById('connection-status');
const processingStatus = document.getElementById('processing-status');
const connectionToggle = document.getElementById('connection-toggle') as HTMLButtonElement;
const responseText = document.getElementById('response-text');
const cursor = document.getElementById('cursor');
const promptButtons = document.getElementById('prompt-buttons');

// Available prompts
const availablePrompts = ['What is Ably AI Transport?'];

// Get channel and set up subscription
const channel = client.channels.get(CHANNEL_NAME);

// Message handler
const handleMessage = (message: Ably.Message) => {
  const responseId = message.extras?.headers?.responseId;

  if (!currentResponseId || responseId !== currentResponseId) {
    return; // Ignore messages not for current response
  }

  if (message.name === 'token') {
    const messageOrder = message.timestamp;
    const newMessage: ProcessedMessage = {
      token: message.data.token,
      messageOrder,
    };

    messages.push(newMessage);
    updateCurrentResponse();
  } else if (message.name === 'stream-complete') {
    isProcessing = false;
    updateUI();
  }
};

// Subscribe to messages
channel.subscribe(handleMessage);

// Connection state monitoring
client.connection.on((stateChange) => {
  connectionState = stateChange.current;
  updateUI();
});

// Update current response when messages change
function updateCurrentResponse() {
  const combinedText = messages.map(({ token }) => token).join('');
  currentResponse = combinedText;
  updateUI();
}

// Handle prompt click
async function handlePromptClick(selectedPrompt: string) {
  if (isProcessing || connectionState !== 'connected' || isChannelDetached) {
    return;
  }

  isProcessing = true;
  messages = [];
  currentResponse = '';
  prompt = selectedPrompt;

  const responseId = `request-${crypto.randomUUID()}`;
  currentResponseId = responseId;

  updateUI();

  try {
    await requestLLMProcessing(selectedPrompt, responseId, config.ABLY_KEY, CHANNEL_NAME);
  } catch (error) {
    console.error('Error requesting LLM processing:', error);
    isProcessing = false;
    updateUI();
  }
}

// Handle disconnect
function handleDisconnect() {
  channel.detach();
  isChannelDetached = true;
  updateUI();
}

// Handle reconnect
async function handleReconnect() {
  isChannelDetached = false;
  await channel.attach();

  // Fetch missed messages for current response
  if (currentResponseId) {
    let page = await channel.history({ untilAttach: true });

    // Paginate backwards through history
    while (page) {
      for (const message of page.items) {
        const responseId = message.extras.headers.responseId;
        if (responseId === currentResponseId) {
          if (message.name === 'token') {
            const messageOrder = message.timestamp;
            // Only add if not already present
            if (!messages.find((m) => m.messageOrder === messageOrder)) {
              messages.push({ token: message.data.token, messageOrder });
              messages.sort((a, b) => a.messageOrder - b.messageOrder);
            }
          } else if (message.name === 'stream-complete') {
            isProcessing = false;
          }
        }
      }

      // Move to next page if available
      page = page.hasNext() ? await page.next() : null;
    }
    updateCurrentResponse();
  }

  updateUI();
}

// Update UI elements
function updateUI() {
  // Update prompt display
  promptDisplay.textContent = prompt && `You asked: "${prompt}"`;

  // Update connection status
  if (isChannelDetached) {
    connectionStatus.className = 'w-2 h-2 rounded-full bg-red-500';
  } else if (connectionState === 'connected') {
    connectionStatus.className = 'w-2 h-2 rounded-full bg-green-500';
  } else {
    connectionStatus.className = 'w-2 h-2 rounded-full bg-red-500';
  }

  // Update processing status
  if (isChannelDetached && isProcessing) {
    processingStatus.textContent = 'Paused';
  } else if (isProcessing) {
    processingStatus.textContent = 'Streaming';
  } else if (currentResponse) {
    processingStatus.textContent = 'Complete';
  } else {
    processingStatus.textContent = 'Ready';
  }

  // Update connection toggle button
  connectionToggle.textContent = isChannelDetached ? 'Reconnect' : 'Disconnect';

  // Update response text
  responseText.textContent = currentResponse || (isProcessing ? 'Thinking...' : 'Select a prompt below to get started');

  // Update cursor
  cursor.textContent = isProcessing ? '▋' : '';

  // Update prompt buttons
  updatePromptButtons();
}

// Update prompt buttons
function updatePromptButtons() {
  promptButtons.innerHTML = '';

  availablePrompts.forEach((promptText) => {
    const button = document.createElement('button');
    button.textContent = promptText;
    button.onclick = () => handlePromptClick(promptText);

    const disabled = isProcessing || connectionState !== 'connected' || isChannelDetached;
    button.disabled = disabled;

    button.className = `px-3 py-2 text-sm border rounded-md transition-colors ${
      disabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
        : 'bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300 cursor-pointer'
    }`;

    promptButtons.appendChild(button);
  });
}

// Set up connection toggle
connectionToggle.onclick = () => {
  if (isChannelDetached) {
    handleReconnect();
  } else {
    handleDisconnect();
  }
};

// Initial UI update
updateUI();
