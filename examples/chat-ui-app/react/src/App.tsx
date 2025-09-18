import * as Ably from 'ably';
import { ChatClient } from '@ably/chat';
import { ChatClientProvider } from '@ably/chat/react';
import {
  App as ChatApp,
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

// Initial room to join when the app loads
const roomName = import.meta.env.VITE_NAME || 'general';
const initialRooms = [roomName];

export default function App() {
  // Initial room to join when the app loads
  return (
    <ThemeProvider>
        <AvatarProvider>
          <ChatSettingsProvider>
            <ChatClientProvider client={chatClient}>
              <ChatApp
                initialRoomNames={initialRooms}
                width="100%"
                height="80vh"
              />
            </ChatClientProvider>
          </ChatSettingsProvider>
        </AvatarProvider>
      </ThemeProvider>
  );
}
