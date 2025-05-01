"use client";

import { useRoom, useMessages } from '@ably/chat/react';
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
      enterChatButton.className = 'text-white px-4 py-2 rounded bg-green-500 hover:bg-green-60';
      enterChatButton.onclick = () => router.push('/chat');
    }

    setTimeout(() => {
      alert.remove();
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-xl mb-4 text-center">Use the 'Send message' button to send 5 messages before you enter and subscribe to the chat room.</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send message
          </button>
          <button
            id="enter-chat"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            disabled
          >
            Enter chat
          </button>
        </div>
      </div>
    </div>
  );
}
