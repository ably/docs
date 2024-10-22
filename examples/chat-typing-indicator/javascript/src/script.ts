import * as Ably from 'ably';
import { ChatClient, TypingOptions } from '@ably/chat';
import { nanoid } from 'nanoid';

const names = ['Bob', 'Jane', 'John', 'Sammy'];
const realtimeClient = new Ably.Realtime({
  clientId: names[Math.floor(Math.random() * names.length)] ?? nanoid(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});
const chatClient = new ChatClient(realtimeClient);

const typingOptions: TypingOptions = {
  timeoutMs: 5000,
};

// Get ROOM with typing capabilities
const room = chatClient.rooms.get('typing-indicator', { typing: typingOptions });

// Subscribe to room for anyone typing or updates on typing
room.typing.subscribe(async () => {
  // Get clientIds of current users typing:
  const currentlyTyping = await room.typing.get();

  const typingClientIds = Array.from(currentlyTyping).filter((id) => id !== chatClient.clientId);
  const clientsTyping = typingClientIds.join(' and ');
  const typingIndicator = document.getElementById('user-input-label');

  if (typingIndicator) {
    typingIndicator.innerText = clientsTyping
      ? `${clientsTyping} ${typingClientIds.length === 1 ? 'is' : 'are'} typing`
      : '';
  }
});

const element = document.getElementById('user-input');
if (element) {
  element.addEventListener('keydown', startTyping);
}

async function startTyping() {
  await room.typing.start();
}