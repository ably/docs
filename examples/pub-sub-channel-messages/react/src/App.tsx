import { useState } from 'react';
import { useChannel } from 'ably/react';
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { nanoid } from 'nanoid';
import './styles/styles.css';

interface Message {
  text: string;
  isNew: boolean;
}

const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : {});
const channelName = urlParams.get('name') || 'pub-sub-channel-messages';

const client = new Realtime({ key: import.meta.env.VITE_ABLY_KEY, clientId: nanoid() });

function ChannelMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [headlines, setHeadlines] = useState([
    'AI Breakthrough: New Model Achieves Human-Level Understanding in Complex Tasks',
    'SpaceX Successfully Launches 100th Mission to Mars',
    'Quantum Computing Milestone: 1000 Qubit Processor Unveiled',
    'Revolutionary Battery Technology Promises Week-Long Phone Charge',
    'Web4 Protocol Introduces Decentralized Neural Networks',
    'Flying Cars Get FAA Approval for Urban Transportation',
    'Scientists Develop Self-Healing Smartphone Screens',
    'Blockchain Technology Revolutionizes Global Supply Chain',
    'New Chip Architecture Doubles Computing Power While Halving Energy Use',
    'Virtual Reality Breakthrough: Neural Interface Allows Direct Brain Connection',
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { publish } = useChannel(channelName, (message) => {
    setMessages((prev) => [{ text: message.data, isNew: true }, ...prev]);

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.text === message.data ? { ...msg, isNew: false } : msg)));
    }, 5000);
  });

  const publishHeadline = async () => {
    if (headlines.length === 0) {
      setIsButtonDisabled(true);
      const publishButton = document.getElementById('publish-button') as HTMLButtonElement;
      publishButton.className = 'uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2 cursor-not-allowed';

      return;
    }

    const randomIndex = Math.floor(Math.random() * headlines.length);
    const selectedHeadline = headlines[randomIndex];

    await publish('headline', selectedHeadline);
    setHeadlines((prev) => prev.filter((_, index) => index !== randomIndex));
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center gap-6 uk-text-primary">
      <button
        id="publish-button"
        onClick={publishHeadline}
        className="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2"
        disabled={isButtonDisabled}
      >
        Publish Random Headline
      </button>

      <div className="w-full max-w-2xl h-96 border rounded-lg overflow-y-auto bg-white shadow-lg">
        <div className="p-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              {msg.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">NEW</span>
              )}
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500">Headlines remaining: {headlines.length}</div>
    </div>
  );
}

export default function App() {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName}>
        <ChannelMessages />
      </ChannelProvider>
    </AblyProvider>
  );
}
