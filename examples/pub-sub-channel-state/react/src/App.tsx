import { useEffect, useState } from 'react';
import { useChannel, useChannelStateListener } from 'ably/react';
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { nanoid } from 'nanoid';
import { config } from './config';
import './styles/styles.css';

const client = new Realtime({ key: config.ABLY_KEY, clientId: nanoid() });

function ChannelState() {
  const [isAttached, setIsAttached] = useState(false);
  const [channelStates, setChannelStates] = useState<string[]>([]);
  const [channelName, setChannelName] = useState('pub-sub-channel-state');

  useEffect(() => {
    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : {});
    const name = urlParams.get('name');

    if (name) {
      setChannelName(name);
    }
  }, []);

  useChannelStateListener({ channelName }, (stateChange) => {
    const timestamp = new Date().toLocaleTimeString();
    setChannelStates((prevStates) => [
      `[${timestamp}] State changed: ${stateChange.previous} to ${stateChange.current}`,
      ...prevStates,
    ]);
    if (stateChange.current === 'attached') {
      setIsAttached(true);
    } else {
      setIsAttached(false);
    }
  });

  const { channel } = useChannel(channelName);

  const handleAttach = () => {
    channel?.attach();
  };

  const handleDetach = () => {
    channel?.detach();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 uk-text-primary">
      {isAttached ? (
        <div className="flex justify-center items-center">
          <button
            onClick={handleDetach}
            className="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2"
          >
            Click to detach
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            onClick={handleAttach}
            className="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2"
          >
            Click to attach
          </button>
        </div>
      )}
      <textarea readOnly value={channelStates.join('\n')} className="w-full text-sm h-80 p-2 border rounded" />
    </div>
  );
}

export default function App() {
  const [channelName, setChannelName] = useState('pub-sub-channel-state');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name) {
      setChannelName(name);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AblyProvider client={client}>
        <ChannelProvider channelName={channelName}>
          <ChannelState />
        </ChannelProvider>
      </AblyProvider>
    </div>
  );
}
