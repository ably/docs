"use client";

import { Inter } from "next/font/google";
import { Realtime } from 'ably';
import { ChatClient, ChatClientProvider, ChatRoomProvider, AllFeaturesEnabled } from '@ably/chat';
import { faker } from '@faker-js/faker';
import '../../styles/styles.css'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// @ts-ignore
dynamic(() => import('franken-ui/js/core.iife'), {
  ssr: false,
});

// @ts-ignore
dynamic(() => import('franken-ui/js/icon.iife'), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

const realtimeClient = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: faker.person.firstName()});
const chatClient = new ChatClient(realtimeClient);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [roomName, setRoomName] = useState('chat-room-history');

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
            id={roomName}
            options={AllFeaturesEnabled}
          >
            {children}
          </ChatRoomProvider>
        </ChatClientProvider>
      </body>
    </html>
  );
}
