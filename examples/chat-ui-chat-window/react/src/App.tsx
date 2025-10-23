import * as Ably from 'ably';
import { ChatClient } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider } from '@ably/chat/react';
import {
  ChatWindow,
  RoomInfo,
  ThemeProvider,
  AvatarProvider,
  ChatSettingsProvider,
} from '@ably/chat-react-ui-kit';
import '@ably/chat-react-ui-kit/dist/style.css';
import 'minifaker/locales/en';
import minifaker from 'minifaker';


const ablyClient = new Ably.Realtime({
  key: import.meta.env.VITE_ABLY_KEY,
  clientId: minifaker.username()
});

// Initialize the Chat client
const chatClient = new ChatClient(ablyClient);

// Initial room to join when the app loads
const initialRoom = import.meta.env.VITE_NAME || 'general';

export default function App() {

  return (
      <ThemeProvider>
        <AvatarProvider>
          <ChatSettingsProvider>
            <ChatClientProvider client={chatClient}>
              <ChatRoomProvider name={initialRoom}>
                <div className="flex flex-1 justify-center items-center h-screen bg-white dark:bg-gray-950">
                  <div
                    className="h-full w-full max-w-4xl border rounded-lg overflow-hidden bg-white dark:bg-gray-900 flex flex-col">
                    <ChatWindow
                      roomName={initialRoom}
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
  );
}
