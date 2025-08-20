import { useState, useEffect } from 'react';
import { CipherKey, Realtime } from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { nanoid } from 'nanoid';
import { config } from './config';
import './styles/styles.css';

const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : {});
const channelName = urlParams.get('name') || 'pub-sub-message-encryption';
const isEncrypted = urlParams.get('encrypted') === 'true';

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
    <div className="flex justify-center items-center min-h-screen p-4 uk-text-primary">
      <div className="w-1/2 h-1/2 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Client without an encryption key</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="uk-input uk-width-1-1 uk-border-rounded-left h-10"
          />
          <button
            id="publish-button"
            onClick={publishMessage}
            className="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2 h-10"
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
  const [messages, setMessages] = useState<any[]>([]);

  const { publish } = useChannel(channelName, (message) => {
    setMessages((prevMessages: any[]) => [...prevMessages, message]);
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
        <h2 className="text-lg font-bold text-center mb-2">Client with an encryption key</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="uk-input uk-width-1-1 uk-border-rounded-left h-10"
          />
          <button
            id="publish-button"
            onClick={publishMessage}
            className="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2 h-10"
            disabled={!message.trim()}
          >
            Publish
          </button>
        </div>

        <div className="h-full border rounded-lg overflow-y-auto bg-white shadow-lg">
          <div className="p-4 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                <span>{msg.data}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [client, setClient] = useState<Realtime | null>(null);
  const [key, setKey] = useState<CipherKey | null>(null);

  useEffect(() => {
    const initializeAbly = async () => {
      const generatedKey = await Realtime.Crypto.generateRandomKey();
      const newClient = new Realtime({
        key: config.ABLY_KEY,
        clientId: nanoid(),
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
        <ChannelProvider channelName={channelName} options={{ cipher: { key } }}>
          <DecodedMessages />
        </ChannelProvider>
      ) : (
        <ChannelProvider channelName={channelName}>
          <EncodedMessages />
        </ChannelProvider>
      )}
    </AblyProvider>
  );
}
