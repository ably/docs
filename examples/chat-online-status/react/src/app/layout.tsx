"use client";

import { Inter } from "next/font/google";
import { Realtime } from 'ably';
import { ChatClientProvider, ChatRoomProvider } from '@ably/chat/react';
import { ChatClient } from '@ably/chat';
import { ReactNode, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import '../../styles/styles.css';

const inter = Inter({ subsets: ["latin"] });

const realtimeClient = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: faker.person.firstName()});
const chatClient = new ChatClient(realtimeClient);

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [roomName, setRoomName] = useState('chat-online-status');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name !== null) {
      setRoomName(name);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatClientProvider client={chatClient}>
          <ChatRoomProvider
            id={roomName}>
            {children}
          </ChatRoomProvider>
        </ChatClientProvider>
      </body>
    </html>
  );
}
