import * as Ably from 'ably';
import { ChatClient, Room, RoomOptionsDefaults } from '@ably/chat';
import './styles.css';

const mockNames = ['Bob', 'Jane', 'John', 'Sammy'];
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];
const realtimeClient = new Ably.Realtime({
  clientId: mockName(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});

let chatClient: ChatClient;
let room: Room;

async function initializeChat() {
  chatClient = new ChatClient(realtimeClient);
  room = await chatClient.rooms.get('chat-room-messages', RoomOptionsDefaults);

  /** 💡 Add every every message published to the room 💡 */
  room.messages.subscribe((message) => {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start';
    messages.appendChild(messageDiv);
    const authorSpan = document.createElement('span');
    authorSpan.className = `font-bold ${message.message.clientId === chatClient.clientId ? 'text-grey-500' : 'text-blue-500'} mr-2`;
    authorSpan.textContent = `${message.message.clientId === chatClient.clientId ? 'You' : message.message.clientId}:`;
    messageDiv.appendChild(authorSpan);
    const messageSpan = document.createElement('span');
    messageSpan.className = 'text-gray-700';
    messageSpan.textContent = message.message.text;
    messageDiv.appendChild(messageSpan);
  });

  /** 💡 Attach to the room to subscribe to messages 💡 */
  await room.attach();
}

initializeChat();

function handleSubmit() {
  const form = document.querySelector('form') as HTMLFormElement;
  const formData = new FormData(form);

  const message = formData.get('message') as string;

  if (message.trim() !== '') {
    /** 💡 Send message to room 💡 */
    room.messages.send({ text: message });

    const messageInput = form.querySelector('input[name="message"]') as HTMLInputElement;
    messageInput.value = '';
  }
}

(window as any).handleSubmit = handleSubmit;
