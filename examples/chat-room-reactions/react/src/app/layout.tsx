"use client";

import { Inter } from "next/font/google";
import { ChatClient, ChatClientProvider, ChatRoomProvider, RoomOptionsDefaults } from '@ably/chat';
import { Realtime } from 'ably';
import '../../styles/styles.css'

const inter = Inter({ subsets: ["latin"] });

const mockNames = ['Bob', 'Jane', 'John', 'Sammy'];
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

const realtimeClient = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: mockName()});
const chatClient = new ChatClient(realtimeClient);

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
            id="chat-room-reactions"
            options={RoomOptionsDefaults}
          >
            {children}
          </ChatRoomProvider>
        </ChatClientProvider>
      </body>
    </html>
  );
}
