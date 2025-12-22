import React, { useState, useRef } from 'react';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { Realtime, Message } from 'ably';
import { Agent } from './agent';
import { config } from './config';
import './styles/styles.css';

// Generate unique channel name for this session
const CHANNEL_NAME = `ai-transport-${crypto.randomUUID()}`;
const client = new Realtime({
  key: config.ABLY_KEY,
});

const AITransportDemo: React.FC = () => {
  const [currentResponse, setCurrentResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [isChannelDetached, setIsChannelDetached] = useState<boolean>(false);

  const currentResponseId = useRef<string | null>(null);
  const isHydrating = useRef<boolean>(false);
  const pendingTokens = useRef<string[]>([]);

  const { channel } = useChannel(CHANNEL_NAME, (message: Message) => {
    const responseId = message.extras?.headers?.responseId;

    if (!currentResponseId.current || responseId !== currentResponseId.current) {
      return;
    }

    if (message.name === 'start') {
      setCurrentResponse('');
      pendingTokens.current = [];
    } else if (message.name === 'token') {
      if (isHydrating.current) {
        // Buffer tokens while hydrating from history
        pendingTokens.current.push(message.data.token);
      } else {
        setCurrentResponse((prev) => prev + message.data.token);
      }
    } else if (message.name === 'stop') {
      setIsProcessing(false);
    }
  });

  useConnectionStateListener((stateChange: { current: string }) => {
    setConnectionState(stateChange.current);
  });

  const handlePromptClick = () => {
    if (isProcessing || connectionState !== 'connected' || isChannelDetached) {
      return;
    }

    setIsProcessing(true);
    setCurrentResponse('');

    const responseId = `request-${crypto.randomUUID()}`;
    currentResponseId.current = responseId;
    const agent = new Agent(config.ABLY_KEY, CHANNEL_NAME);
    agent.processPrompt('What is Ably AI Transport?', responseId);
  };

  const handleDisconnect = () => {
    channel.detach();
    setIsChannelDetached(true);
  };

  const handleReconnect = async () => {
    isHydrating.current = true;
    pendingTokens.current = [];

    setIsChannelDetached(false);
    await channel.attach();

    if (currentResponseId.current) {
      let page = await channel.history({ untilAttach: true });

      const historyTokens: string[] = [];
      let foundStreamComplete = false;

      while (page) {
        for (const message of page.items) {
          const responseId = message.extras?.headers?.responseId;
          if (responseId === currentResponseId.current) {
            if (message.name === 'token') {
              historyTokens.push(message.data.token);
            } else if (message.name === 'stop') {
              foundStreamComplete = true;
            }
          }
        }
        page = page.hasNext() ? await page.next() : null;
      }

      // History arrives newest-first, so reverse it
      // Then append any tokens that arrived during hydration
      setCurrentResponse(historyTokens.reverse().join('') + pendingTokens.current.join(''));

      if (foundStreamComplete) {
        setIsProcessing(false);
      }
    }

    isHydrating.current = false;
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
                {isChannelDetached && isProcessing
                  ? 'Paused'
                  : isProcessing
                    ? 'Streaming'
                    : currentResponse
                      ? 'Complete'
                      : connectionState === 'connected'
                        ? 'Ready'
                        : 'Disconnected'}
              </span>
              {/* Disconnect/Reconnect button */}
              <button
                onClick={isChannelDetached ? handleReconnect : handleDisconnect}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                {isChannelDetached ? 'Reconnect' : 'Disconnect'}
              </button>
            </div>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 h-48 overflow-y-auto whitespace-pre-wrap text-base leading-relaxed">
            {currentResponse || (isProcessing ? 'Thinking...' : 'Select a prompt below to get started')}
            {isProcessing && <span className="text-blue-600">▋</span>}
          </div>
        </div>
      </div>

      {/* Prompt selection */}
      <div className="mb-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePromptClick()}
            disabled={isProcessing || connectionState !== 'connected' || isChannelDetached}
            className={`px-3 py-2 text-sm border rounded-md transition-colors ${
              isProcessing || connectionState !== 'connected' || isChannelDetached
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
