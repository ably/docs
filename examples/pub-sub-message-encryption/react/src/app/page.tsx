'use client'

import { useState, useEffect } from 'react';
import { CipherKey, Realtime } from 'ably';
import { useSearchParams } from 'next/navigation';
import type { Message } from "ably"
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { nanoid } from 'nanoid';

const urlParams = new URLSearchParams(window.location.search);
const channelName = urlParams.get('name') || 'pub-sub-message-encryption';

export default function Home() {
  const searchParams = useSearchParams();
  const isEncrypted = searchParams.get('encrypted') === 'true';

  const [client, setClient] = useState<Realtime | null>(null);
  const [key, setKey] = useState<CipherKey | null>(null);

  useEffect(() => {
    const initializeAbly = async () => {
      const generatedKey = await Realtime.Crypto.generateRandomKey();
      const newClient = new Realtime({
        key: process.env.NEXT_PUBLIC_ABLY_KEY,
        clientId: nanoid()
      });

      setKey(generatedKey);
      setClient(newClient);
    };

    initializeAbly();
  }, []);

  if (!client || !key) return null;

  return (
    <AblyProvider client={client}>
      {isEncrypted ? (
        <ChannelProvider
          channelName={channelName}
          options={{ cipher: { key } }}
        >
          <DecodedMessages />
        </ChannelProvider>
      ) : (
        <ChannelProvider
          channelName={channelName}
        >
          <EncodedMessages />
        </ChannelProvider>
      )}
    </AblyProvider>
  );
}

function EncodedMessages() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const { publish } = useChannel(channelName, (message) => {
    if (message.data instanceof ArrayBuffer) {
      const decoder = new TextDecoder('utf-8');
      setMessages((prevMessages: string[]) => [...prevMessages, decoder.decode(message.data as ArrayBuffer)]);
    } else {
      setMessages((prevMessages: string[]) => [...prevMessages, message.data]);
    }
  });

  const publishMessage = () => {
    if (message.trim()) {
      publish('encrypted-test', message);
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-1/2 h-1/2 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Client without an encryption key</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="
              w-full
              px-4
              py-2
              border
              border-gray-300
              rounded-md
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
          <button
            id="publish-button"
            onClick={publishMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={!message.trim()}
          >
            Publish
          </button>
        </div>

        <div className="h-full border rounded-lg overflow-y-auto bg-white shadow-lg">
          <div className="p-4 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

function DecodedMessages() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const { publish } = useChannel(channelName, (message) => {
    setMessages((prevMessages: Message[]) => [...prevMessages, message]);
  });

  const publishMessage = () => {
    if (message.trim()) {
      publish('encrypted-test', message);
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-1/2 h-1/2 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Client with an encryption key</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="
              flex-grow
              px-4
              py-2
              border
              border-gray-300
              rounded-md
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
          <button
            id="publish-button"
            onClick={publishMessage}
            className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
            disabled={!message.trim()}
          >
            Publish
          </button>
        </div>

        <div className="h-full border rounded-lg overflow-y-auto bg-white shadow-lg">
          <div className="p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <span>{msg.data}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
