import { useState } from 'react';
import { useRoom, useMessages } from '@ably/chat/react';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css';

export default function Home() {
  const { roomStatus, connectionStatus } = useRoom();
  const navigate = useNavigate();
  const { send } = useMessages();
  const [messageCount, setMessageCount] = useState(0);

  if (roomStatus !== 'attached' || connectionStatus !== 'connected') {
    return <div>Loading...</div>;
  }

  const generateRandomMessage = () => {
    const messages = [
      'Hey everyone! Just joined this amazing chat.',
      'What a beautiful day for chatting!',
      'Hello from the other side of the screen!',
      'Anyone here interested in web development?',
      'I love how this chat app works!',
      'Greetings from a random message generator!',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleSendMessage = () => {
    const randomMessage = generateRandomMessage();
    send({ text: randomMessage });
    setMessageCount((prev) => prev + 1);

    const alert = document.createElement('div');
    alert.className = 'fixed left-1/2 top-4 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
    alert.textContent = `Message: "${randomMessage}" sent to chat room!`;
    document.body.appendChild(alert);

    const enterChatButton = document.getElementById('enter-chat');

    if (messageCount >= 4 && enterChatButton) {
      (enterChatButton as HTMLButtonElement).disabled = false;
      enterChatButton.className = 'uk-btn uk-btn-sm mb-1 rounded-[1998px] border border-black bg-transparent text-black';
      enterChatButton.onclick = () => navigate('/chat');
    }

    setTimeout(() => {
      alert.remove();
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 uk-text-primary">
      <div className="w-1/3 bg-gray-300 p-8 rounded-lg shadow-lg">
        <h2 className="text-sm mb-4 text-center">
          Use the 'Send message' button to send 5 messages before you enter and subscribe to the chat room.
        </h2>
        <div className="flex flex-col gap-2">
          <button onClick={handleSendMessage} className="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] w-full hover
:uk-btn-primary+1 active:uk-btn-primary+2">
            Send message
          </button>
          <button id="enter-chat" className="uk-btn uk-btn-sm uk-btn-secondary mb-1 round
ed" disabled>
            Enter chat
          </button>
        </div>
      </div>
    </div>
  );
}
