import * as Ably from 'ably';
import { ChatClient, Message, RoomOptionsDefaults } from '@ably/chat';
import { faker } from '@faker-js/faker';
import './styles.css';

const realtimeClient = new Ably.Realtime({
  clientId: faker.person.firstName(),
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
});
const chatClient = new ChatClient(realtimeClient);
const room = chatClient.rooms.get('chat-room-messages', RoomOptionsDefaults);

const landingPage = document.getElementById('landing-page');
const chatRoom = document.getElementById('chat-room-messages');

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('loadChat') === 'true') {
  landingPage.style.display = 'none';
  chatRoom.style.display = 'block';
  enterChat();
}

/** Action to enter the chat room, loading in historical messages, and subscribing to any new messages received. */
document.getElementById('enter-chat').addEventListener('click', async () => {
  landingPage.style.display = 'none';
  chatRoom.style.display = 'block';
  await enterChat();
});

document.getElementById('load-message').addEventListener('click', () => {
  const randomMessage = generateRandomMessage();
  room.messages.send({ text: randomMessage });

  const alert = document.createElement('div');
  alert.className = 'fixed left-1/2 top-4 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
  alert.textContent = `Message: "${randomMessage}" sent to chat room!`;
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
});

function generateRandomMessage() {
  const messages = [
    'Hey everyone! Just joined this amazing chat.',
    'What a beautiful day for chatting!',
    'Hello from the other side of the screen!',
    'Anyone here interested in web development?',
    'I love how this chat app works!',
    'Greetings from a random message generator!',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

const getPastMessages = async () => {
  /** 💡 Add past 10 messages published to the room 💡 */
  const pastMessages = await room.messages.get({ limit: 10 });

  pastMessages.items.forEach((message) => {
    const messageExists = document.getElementById(message.timeserial);

    if (messageExists) {
      return null;
    }

    addMessage(message, 'before');
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });

  const loadButton = document.getElementById('load-past-messages');
  if (loadButton instanceof HTMLButtonElement) {
    loadButton.disabled = true;
    loadButton.className = 'absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-300 text-white rounded-full p-2';
  }
};

async function enterChat() {
  room.messages.subscribe((message) => {
    addMessage(message.message);

    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });

  /** 💡 Attach to the room to subscribe to messages 💡 */
  await room.attach();
}

function addMessage(message: Message, position = 'after') {
  const messages = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.id = message.timeserial;
  messageDiv.className = 'flex items-start';

  if (position === 'after') {
    messages.appendChild(messageDiv);
  } else {
    messages.insertBefore(messageDiv, messages.firstChild);
  }
  const authorSpan = document.createElement('span');
  authorSpan.className = `font-bold ${message.clientId === chatClient.clientId ? 'text-grey-500' : 'text-blue-500'} mr-2`;
  authorSpan.textContent = `${message.clientId === chatClient.clientId ? 'You' : message.clientId}:`;
  messageDiv.appendChild(authorSpan);
  const messageSpan = document.createElement('span');
  messageSpan.className = 'text-gray-700';
  messageSpan.textContent = message.text;
  messageDiv.appendChild(messageSpan);
}

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
(window as any).getPastMessages = getPastMessages;
