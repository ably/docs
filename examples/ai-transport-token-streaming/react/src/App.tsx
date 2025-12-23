import React, { useState, useEffect } from 'react';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { Realtime, RealtimeMessage } from 'ably';
import { requestLLMProcessing } from './BackendLLMService';
import { config } from './config';
import './styles/styles.css';

// Generate unique channel name for this session
const CHANNEL_NAME = `ai-transport-${crypto.randomUUID()}`;
const client = new Realtime({
  key: config.ABLY_KEY,
});

interface ProcessedMessage {
  token: string;
  messageOrder: number;
}

// Inner component that uses the channel
const AITransportDemo: React.FC = () => {
  const [currentResponse, setCurrentResponse] = useState<string>('');
  const [messages, setMessages] = useState<ProcessedMessage[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [currentResponseId, setCurrentResponseId] = useState<string | null>(null);
  const [isChannelDetached, setIsChannelDetached] = useState<boolean>(false);

  const { channel } = useChannel(CHANNEL_NAME, (message: RealtimeMessage) => {
    const responseId = message.extras.headers.responseId;

    if (!currentResponseId || responseId !== currentResponseId) {
      return; // Ignore messages not for current response
    }

    if (message.name === 'token') {
      const newMessage: ProcessedMessage = {
        token: message.data.token,
        messageOrder: message.timestamp,
      };

      setMessages((prev) => [...prev, newMessage]);
    } else if (message.name === 'stream-complete') {
      setIsProcessing(false);
    }
  });

  // Connection state monitoring
  useConnectionStateListener((stateChange: { current: string }) => {
    setConnectionState(stateChange.current);
  });

  // Update current response when messages change
  useEffect(() => {
    const combinedText = messages.map(({ token }) => token).join('');
    setCurrentResponse(combinedText);
  }, [messages]);

  const handlePromptClick = async (selectedPrompt: string) => {
    if (isProcessing || connectionState !== 'connected' || isChannelDetached) {
      return;
    }

    setIsProcessing(true);
    setMessages([]);
    setCurrentResponse('');
    setPrompt(selectedPrompt);

    const responseId = `request-${crypto.randomUUID()}`;
    setCurrentResponseId(responseId);

    try {
      await requestLLMProcessing(selectedPrompt, responseId, config.ABLY_KEY, CHANNEL_NAME);
    } catch (error) {
      setIsProcessing(false);
    }
  };

  const handleDisconnect = () => {
    channel.detach();
    setIsChannelDetached(true);
  };

  const handleReconnect = async () => {
    setIsChannelDetached(false);
    await channel.attach();

    // Fetch missed messages for current response
    if (currentResponseId) {
      let page = await channel.history({ untilAttach: true });

      // Paginate backwards through history
      while (page) {
        for (const message of page.items) {
          const responseId = message.extras.headers.responseId;
          if (responseId === currentResponseId) {
            if (message.name === 'token') {
              const messageOrder = message.timestamp;
              setMessages((prev) => {
                // Only add if not already present
                if (prev.find((m) => m.messageOrder === messageOrder)) {
                  return prev;
                }
                return [...prev, { token: message.data.token, messageOrder }].sort(
                  (a, b) => a.messageOrder - b.messageOrder,
                );
              });
            } else if (message.name === 'stream-complete') {
              setIsProcessing(false);
            }
          }
        }
        // Move to next page if available
        page = page.hasNext() ? await page.next() : null;
      }
    }
  };

  const availablePrompts = ['What is Ably AI Transport?'];

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      {/* Response section with always visible status */}
      <div className="mb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-600 mt-4 mb-2 flex justify-between items-center">
            <span>{prompt ? `You asked: "${prompt}"` : ''}</span>

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
          {availablePrompts.map((promptText) => (
            <button
              key={promptText}
              onClick={() => handlePromptClick(promptText)}
              disabled={isProcessing || connectionState !== 'connected' || isChannelDetached}
              className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                isProcessing || connectionState !== 'connected' || isChannelDetached
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                  : 'bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300 cursor-pointer'
              }`}
            >
              {promptText}
            </button>
          ))}
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
