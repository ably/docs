import * as Ably from 'ably';
import type { RealtimeChannel, Message } from 'ably';
import { nanoid } from 'nanoid';
import './styles.css';

const client = new Ably.Realtime({
  clientId: nanoid(),
  key: import.meta.env.VITE_ABLY_KEY as string,
});

const urlParams = new URLSearchParams(window.location.search);

const channelName = urlParams.get('name') || 'pub-sub-message-annotations';
const channel = client.channels.get(channelName);

const clientId = urlParams.get('clientId') || 'user2';
console.log(`Client ID: ${clientId}`);

function createMessageElement(message: Message) {
  // Create the container for the message
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container mb-4';
  messageContainer.dataset.messageId = message.id;

  // Create the message element
  const messageElement = document.createElement('div');
  messageElement.className = 'message p-4 border rounded-lg bg-white shadow-lg cursor-pointer hover:bg-gray-50';

  // Add the message content
  if (message.data instanceof ArrayBuffer) {
    const decoder = new TextDecoder('utf-8');
    messageElement.textContent = decoder.decode(message.data as ArrayBuffer);
  } else {
    messageElement.textContent = message.data;
  }

  // Add elements to the container
  messageContainer.appendChild(messageElement);

  return messageContainer;
}

async function subscribeToChannel(channel: RealtimeChannel) {
  channel.subscribe((message: Message) => {
    const messageElement = createMessageElement(message);
    document.getElementById('messages')?.appendChild(messageElement);
  });
}

const publishButton = document.getElementById('publish-button');

publishButton?.addEventListener('click', () => {
  const messageInput = document.getElementById('message-input') as HTMLInputElement;
  const message = messageInput.value.trim();

  if (message) {
    channel.publish('message', message);
    messageInput.value = '';
  }
});

async function main() {
  await subscribeToChannel(channel);
}

main();
