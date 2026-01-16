import React, { useState } from 'react';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { Realtime, Message } from 'ably';
import { Agent } from './agent';
import { config } from './config';
import './styles/styles.css';

// Generate unique channel name for this session
const CHANNEL_NAME = `ai:response-${crypto.randomUUID()}`;

const client = new Realtime({
  key: config.ABLY_KEY,
});

const AITransportDemo: React.FC = () => {
  const [responses, setResponses] = useState<Map<string, string>>(new Map());
  const [currentSerial, setCurrentSerial] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [isChannelDetached, setIsChannelDetached] = useState<boolean>(false);

  // Subscribe to messages on the channel
  const { channel } = useChannel(CHANNEL_NAME, (message: Message) => {
    const serial = message.serial;
    if (!serial) {
      return;
    }

    switch (message.action) {
      case 'message.create':
        // Initial message creation
        setResponses((prev) => new Map(prev).set(serial, message.data || ''));
        setCurrentSerial(serial);
        break;
      case 'message.append':
        // Only append if this is for the current response
        setCurrentSerial((current) => {
          if (current === serial) {
            setResponses((prev) => {
              const newMap = new Map(prev);
              const existing = newMap.get(serial) || '';
              return newMap.set(serial, existing + (message.data || ''));
            });
          }
          return current;
        });
        break;
      case 'message.update':
        // Full state from history (rewind) - replace existing data
        setResponses((prev) => new Map(prev).set(serial, message.data || ''));
        setCurrentSerial(serial);
        break;
    }
  });

  useConnectionStateListener((stateChange: { current: string }) => {
    setConnectionState(stateChange.current);
  });

  const currentResponse = currentSerial ? responses.get(currentSerial) || '' : '';

  const handlePromptClick = () => {
    if (connectionState !== 'connected' || isChannelDetached) {
      return;
    }

    setResponses(new Map());
    setCurrentSerial(null);

    const agent = new Agent(config.ABLY_KEY, CHANNEL_NAME);
    agent.processPrompt('What is Ably AI Transport?');
  };

  const handleDisconnect = () => {
    channel.detach();
    setIsChannelDetached(true);
  };

  const handleReconnect = async () => {
    setIsChannelDetached(false);
    // Set rewind option before reattaching to get history as message.update events
    channel.setOptions({ params: { rewind: '2m' } });
    await channel.attach();
  };

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      {/* Response section with always visible status */}
      <div className="mb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-600 mt-4 mb-2 flex justify-end items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isChannelDetached ? 'bg-red-500' : connectionState === 'connected' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                {isChannelDetached ? 'Disconnected' : connectionState === 'connected' ? 'Connected' : 'Disconnected'}
              </span>
              {/* Disconnect/Reconnect button */}
              <button
                onClick={isChannelDetached ? handleReconnect : handleDisconnect}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                {isChannelDetached ? 'Connect' : 'Disconnect'}
              </button>
            </div>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 h-48 overflow-y-auto whitespace-pre-wrap text-base leading-relaxed">
            {currentResponse || 'Select a prompt below to get started'}
          </div>
        </div>
      </div>

      {/* Prompt selection */}
      <div className="mb-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePromptClick()}
            disabled={connectionState !== 'connected' || isChannelDetached}
            className={`px-3 py-2 text-sm border rounded-md transition-colors ${
              connectionState !== 'connected' || isChannelDetached
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                : 'bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300 cursor-pointer'
            }`}
          >
            What is Ably AI Transport?
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App component with providers
const App: React.FC = () => {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={CHANNEL_NAME}>
        <AITransportDemo />
      </ChannelProvider>
    </AblyProvider>
  );
};

export default App;
