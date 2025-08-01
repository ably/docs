import { useState } from 'react';
import * as Ably from 'ably';
import { ChatClient, RoomOptions } from '@ably/chat';
import { ChatClientProvider } from '@ably/chat/react';
import { AvatarProvider, ChatSettingsProvider, Sidebar, ThemeProvider } from '@ably/chat-react-ui-components';
import '@ably/chat-react-ui-components/dist/style.css';
import 'minifaker/locales/en';
import minifaker from 'minifaker';


const ablyClient = new Ably.Realtime({
  key: import.meta.env.VITE_ABLY_KEY,
  clientId: minifaker.username(),
});

// Initialize the Chat client
const chatClient = new ChatClient(ablyClient);

export default function App() {
  // State for rooms and active room
  const [rooms, setRooms] = useState<string[]>(['general', 'football-highlights', 'random']);
  const [activeRoom, setActiveRoom] = useState<string | undefined>('general');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [roomOptions] = useState<RoomOptions>({ occupancy: { enableEvents: true } });

  // Room management functions
  const addRoom = (name: string) => {
    console.log(`Adding room: ${name}`);
    setRooms(prev => prev.includes(name) ? prev : [...prev, name]);
  };

  const leaveRoom = (name: string) => {
    console.log(`Leaving room: ${name}`);
    setRooms(prev => prev.filter(n => n !== name));
    if (activeRoom === name) {
      setActiveRoom(rooms.length > 0 ? rooms[0] : undefined);
    }
  };

  const handleSetActiveRoom = (name?: string) => {
    console.log(`Setting active room to: ${name}`);
    setActiveRoom(name);
  };

  return (
      <ThemeProvider>
        <AvatarProvider>
          <ChatSettingsProvider>
            <ChatClientProvider client={chatClient}>
              <div className="h-screen w-full flex justify-center items-center bg-white">
                <div
                  className="shadow-lg rounded-lg overflow-hidden"
                >
                  <Sidebar
                    roomNames={rooms}
                    activeRoomName={activeRoom}
                    defaultRoomOptions={roomOptions}
                    addRoom={addRoom}
                    setActiveRoom={handleSetActiveRoom}
                    leaveRoom={leaveRoom}
                    isCollapsed={isSidebarCollapsed}
                    onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
                  />
                </div>
              </div>
            </ChatClientProvider>
          </ChatSettingsProvider>
        </AvatarProvider>
      </ThemeProvider>
  );
}
