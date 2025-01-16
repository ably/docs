"use client";

import { Inter } from "next/font/google";
import { Realtime } from 'ably';
import { ChatClient, ChatClientProvider, ChatRoomProvider, RoomOptionsDefaults, TypingOptions } from '@ably/chat';
import { time } from "console";

const inter = Inter({ subsets: ["latin"] });

const mockNames = ['Bob', 'Jane', 'John', 'Sammy'];
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

const realtimeClient = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: mockName()});
const chatClient = new ChatClient(realtimeClient);

const typingOptions: TypingOptions = {
  timeoutMs: 5000,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatClientProvider client={chatClient}>
          <ChatRoomProvider
            id="typing-indicator"
            options={{
              ...RoomOptionsDefaults,
              typing: typingOptions
            }}
          >
            {children}
          </ChatRoomProvider>
        </ChatClientProvider>
      </body>
    </html>
  );
}
