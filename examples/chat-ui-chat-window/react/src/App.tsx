import { useState } from 'react';
import * as Ably from 'ably';
import { ChatClient } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider } from '@ably/chat/react';
import {
  ChatWindow,
  RoomInfo,
  ThemeProvider,
  AvatarProvider,
  ChatSettingsProvider,
} from '@ably/chat-react-ui-components';
import '@ably/chat-react-ui-components/dist/style.css';
import 'minifaker/locales/en';
import minifaker from 'minifaker';


const ablyClient = new Ably.Realtime({
  key: import.meta.env.VITE_ABLY_KEY,
  clientId: minifaker.username()
});

// Initialize the Chat client
const chatClient = new ChatClient(ablyClient);

export default function App() {
  // Room name for the chat window
  const [roomName] = useState<string>('general');

  return (
    <div className="min-h-screen">
      <ThemeProvider>
        <AvatarProvider>
          <ChatSettingsProvider>
            <ChatClientProvider client={chatClient}>
              <ChatRoomProvider name={roomName}>
                <div className="flex flex-1 justify-center items-center h-screen bg-gray-50 dark:bg-gray-950">
                  <div
                    className="h-full w-full max-w-4xl border rounded-lg overflow-hidden bg-white dark:bg-gray-900 flex flex-col">
                    <ChatWindow
                      roomName={roomName}
                      customHeaderContent={<RoomInfo />}
                      enableTypingIndicators={true}
                    />
                  </div>
                </div>
              </ChatRoomProvider>
            </ChatClientProvider>
          </ChatSettingsProvider>
        </AvatarProvider>
      </ThemeProvider>
    </div>
  );
}
