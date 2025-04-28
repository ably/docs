import { useEffect, useState } from 'react';
import {
  ChatClient,
  AllFeaturesEnabled,
} from '@ably/chat';
import {
  useChatClient,
  useRoom,
  usePresenceListener,
  usePresence,
  ChatClientProvider,
  ChatRoomProvider,
} from '@ably/chat/react';
import { Realtime } from 'ably';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import './styles/styles.css';

interface OnlineStatus {
  status: string;
}

const realtimeClient = new Realtime({ key: import.meta.env.VITE_ABLY_KEY, clientId: minifaker.firstName() });
const chatClient = new ChatClient(realtimeClient);

const Online = () => {
  const { presenceData } = usePresenceListener();
  const { clientId } = useChatClient();
  const { update } = usePresence({
    enterWithData: { status: 'Online' },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg uk-text-primary">
      <div className="space-y-4">
        {presenceData.map((onlineStatus) => (
          <div
            key={onlineStatus.clientId}
            className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div
              className={`w-4 h-4 mr-3 rounded-full ${
                (onlineStatus.data as OnlineStatus)?.status === 'Away' ? 'bg-amber-500' : 'bg-green-500'
              }`}
            ></div>
            <div>
              <p className="font-medium">
                {onlineStatus.clientId}
                {onlineStatus.clientId === clientId ? ' (You)' : ''}
              </p>
              <p className="text-sm italic">{(onlineStatus.data as OnlineStatus)?.status ?? 'Online'}</p>
            </div>
          </div>
        ))}
        {presenceData
          .filter((status) => status.clientId === clientId)
          .map((userStatus) => (
            <button
              key={clientId}
              className="uk-btn uk-btn-md uk-btn-primary mb-4 rounded-[1998px] w-full min-w-[120px] border uk-border-primary"
              onClick={async () =>
                await update({
                  status: (userStatus.data as OnlineStatus)?.status === 'Away' ? 'Online' : 'Away',
                })
              }
            >
              {(userStatus.data as OnlineStatus)?.status === 'Away' ? 'Show online' : 'Set away'}
            </button>
          ))}
      </div>
    </div>
  );
};

function Home() {
  const { roomStatus, connectionStatus } = useRoom();

  if (roomStatus !== 'attached' || connectionStatus !== 'connected') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Online />
    </div>
  );
}

export default function App() {
  const [roomName, setRoomName] = useState('chat-online-status');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name !== null) {
      setRoomName(name);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <ChatClientProvider client={chatClient}>
        <ChatRoomProvider id={roomName} options={AllFeaturesEnabled}>
          <Home />
        </ChatRoomProvider>
      </ChatClientProvider>
    </div>
  );
}
