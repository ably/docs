import * as Ably from 'ably';
import { ChatClient, RoomOptionsDefaults } from '@ably/chat';
import { nanoid } from 'nanoid';

const names = ['Bob', 'Jane', 'John', 'Sammy'];
const clientId = names[Math.floor(Math.random() * names.length)] ?? nanoid();
const realtimeClient = new Ably.Realtime({
  clientId: clientId,
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});
const chatClient = new ChatClient(realtimeClient);

let timer: NodeJS.Timeout | null = null;

// Get ROOM with typing capabilities
const room = chatClient.rooms.get('typing-indicator', { typing: RoomOptionsDefaults.typing });

// Subscribe to room for anyone typing or updates on typing
room.typing.subscribe(async () => {
  // Get clientIds of current users typing:
  const currentlyTypingClientIds = await room.typing.get();
  let clientsTyping = '';
  const clientIdsArray = Array.from(currentlyTypingClientIds).filter((id) => id !== clientId);

  for (let i = 0; i < clientIdsArray.length; i++) {
    clientsTyping += clientIdsArray[i];
    if (i !== clientIdsArray.length - 1) {
      clientsTyping += ' and ';
    }
  }

  const typingIndicator = document.getElementById('user-input-label');

  if (clientIdsArray.length > 0) {
    if (typingIndicator) {
      typingIndicator.innerText = clientsTyping + (clientIdsArray.length === 1 ? ' is typing' : ' are typing');
    }
  } else {
    if (typingIndicator) {
      typingIndicator.innerText = '';
    }
  }
});

const element = document.getElementById('user-input');
if (element) {
  element.addEventListener('keydown', startTyping);
}

async function startTyping() {
  await room.typing.start();

  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(async () => {
    await room.typing.stop();
    timer = null;
  }, 5000);
}
