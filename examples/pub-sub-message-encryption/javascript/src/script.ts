import * as Ably from 'ably';
import type { RealtimeChannel, Message } from 'ably';
import { nanoid } from 'nanoid';
import './styles.css';

let channel: RealtimeChannel | null;

async function encryptedMessages() {
  document.getElementById('title').textContent = 'Client without an encryption key';

  channel = await establishConnection(false);
  await subscribeToChannel(channel);
}

async function decryptedMessages() {
  document.getElementById('title').textContent = 'Client with an encryption key';

  channel = await establishConnection();
  await subscribeToChannel(channel);
}

async function establishConnection(hasCipher = true) {
  const client = new Ably.Realtime({
    clientId: nanoid(),
    key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
  });

  let options = {};

  if (hasCipher) {
    const key = await Ably.Realtime.Crypto.generateRandomKey();
    options = {
      cipher: {
        key,
      },
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const channelName = urlParams.get('name') || 'pub-sub-message-encryption';
  const channel = client.channels.get(channelName, options);

  return channel;
}

async function subscribeToChannel(channel: RealtimeChannel) {
  channel.subscribe((message: Message) => {
    const messageElement = document.createElement('div');

    if (message.data instanceof ArrayBuffer) {
      const decoder = new TextDecoder('utf-8');
      messageElement.textContent = decoder.decode(message.data as ArrayBuffer);
    } else {
      messageElement.textContent = message.data;
    }

    document.getElementById('messages').appendChild(messageElement);
  });
}

async function initializeMessagingMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const encryptedParam = urlParams.get('encrypted') || 'false';

  if (encryptedParam === 'false') {
    await encryptedMessages();
  } else {
    await decryptedMessages();
  }
}

const publishButton = document.getElementById('publish-button');

publishButton.addEventListener('click', () => {
  const messageInput = document.getElementById('message-input') as HTMLInputElement;
  const message = messageInput.value.trim();

  if (message) {
    channel.publish('message', message);
    messageInput.value = '';
  }
});

initializeMessagingMode();
