"use client";

import { useRoom, useMessages } from '@ably/chat';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import '../../styles/styles.css'

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { roomStatus, connectionStatus } = useRoom();
  const { send } = useMessages();

  useEffect(() => {
    if (searchParams.get('loadChat') === 'true') {
      router.push('/chat');
    }
  }, [searchParams, router]);

  if (roomStatus !== 'attached' || connectionStatus !== 'connected') {
    return <div>Loading...</div>;
  }

  const generateRandomMessage = () => {
    const messages = [
      "Hey everyone! Just joined this amazing chat.",
      "What a beautiful day for chatting!",
      "Hello from the other side of the screen!",
      "Anyone here interested in web development?",
      "I love how this chat app works!",
      "Greetings from a random message generator!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  let messageCount = 0;

  const handleSendMessage = () => {
    const randomMessage = generateRandomMessage();
    send({ text: randomMessage });
    messageCount++;

    const alert = document.createElement('div');
    alert.className = 'fixed left-1/2 top-4 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
    alert.textContent = `Message: "${randomMessage}" sent to chat room!`;
    document.body.appendChild(alert);

    const enterChatButton = document.getElementById('enter-chat');

    if (messageCount >= 5 && enterChatButton) {
      (enterChatButton as HTMLButtonElement).disabled = false;
      enterChatButton.className = 'uk-btn uk-btn-md uk-btn-primary mb-4 rounded';
      enterChatButton.onclick = () => router.push('/chat');
    }

    setTimeout(() => {
      alert.remove();
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-1/3 bg-gray-300 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl mb-8 text-center">
          Use the 'Send message' button to send 5 messages before you enter and subscribe to the chat room.
        </h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSendMessage}
            className="uk-btn uk-btn-md uk-btn-primary mb-4 rounded w-full"
          >
            Send message
          </button>
          <button
            id="enter-chat"
            className="uk-btn uk-btn-md uk-btn-secondary mb-4 rounded w-full"
            disabled
          >
            Enter chat
          </button>
        </div>
      </div>
    </div>
  );
}
