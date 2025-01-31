'use client'

import { useEffect, useState } from 'react';
import { useChannel, useChannelStateListener } from 'ably/react';

export default function Home() {
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

  useChannelStateListener({channelName}, (stateChange) => {
    const timestamp = new Date().toLocaleTimeString();
    setChannelStates((prevStates) => [`[${timestamp}] State changed: ${stateChange.previous} to ${stateChange.current}`, ...prevStates]);
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
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="flex justify-center items-center text-xl font-bold mb-4">Controlling the channel state</h2>
      {isAttached ? (
        <div className="flex justify-center items-center">
          <button
            onClick={handleDetach}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4"
          >
            Click to detach
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            onClick={handleAttach}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Click to attach
          </button>
        </div>
      )}
      <textarea
        readOnly
        value={channelStates.join('\n')}
        className="w-full h-40 p-2 border rounded"
      />
    </div>
  );
}
