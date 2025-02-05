"use client";

import { Inter } from "next/font/google";
import { Realtime } from 'ably';
import { ChatClient, ChatClientProvider, ChatRoomProvider, DefaultRoomOptions } from '@ably/chat';
import { faker } from '@faker-js/faker';
import '../../styles/styles.css'

const inter = Inter({ subsets: ["latin"] });

const realtimeClient = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: faker.person.firstName()});
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
            id="chat-room-messages"
            options={DefaultRoomOptions}
          >
            {children}
          </ChatRoomProvider>
        </ChatClientProvider>
      </body>
    </html>
  );
}
