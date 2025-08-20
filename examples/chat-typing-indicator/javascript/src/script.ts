import * as Ably from 'ably';
import { ChatClient, Room, TypingOptions } from '@ably/chat';
import { nanoid } from 'nanoid';
import { config } from './config';

const names = ['Bob', 'Jane', 'John', 'Sammy'];
const realtimeClient = new Ably.Realtime({
  clientId: names[Math.floor(Math.random() * names.length)] ?? nanoid(),
  key: config.ABLY_KEY,
});
const chatClient = new ChatClient(realtimeClient);

const typingOptions: TypingOptions = {
  heartbeatThrottleMs: 3000,
};

let room: Room;

async function initializeChat() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get('name') || 'chat-typing-indicator';

  // Get ROOM with typing capabilities
  room = await chatClient.rooms.get(roomName, { typing: typingOptions });
  await room.attach();

  // Subscribe to room for anyone typing or updates on typing
  room.typing.subscribe((event) => {
    const typingClientIds = Array.from(event.currentlyTyping).filter((id) => id !== chatClient.clientId);
    const clientsTyping = typingClientIds.join(' and ');
    const typingIndicator = document.getElementById('user-input-label');

    if (typingIndicator) {
      typingIndicator.innerText = clientsTyping
        ? `${clientsTyping} ${typingClientIds.length === 1 ? 'is' : 'are'} typing`
        : '';
    }
  });
}

const element = document.getElementById('user-input');
if (element) {
  element.addEventListener('keydown', startTyping);
}

async function startTyping() {
  await room.typing.keystroke();
}

initializeChat().catch((error) => {
  console.log('Error initializing chat', error);
});
