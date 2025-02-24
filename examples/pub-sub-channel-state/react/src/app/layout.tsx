"use client";

import { Inter } from "next/font/google";
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { nanoid } from 'nanoid';
import '../../styles/styles.css';
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const client = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: nanoid()});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [channelName, setChannelName] = useState('pub-sub-channel-state');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name) {
      setChannelName(name);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AblyProvider client={client}>
          <ChannelProvider channelName={channelName}>
            {children}
          </ChannelProvider>
        </AblyProvider>
      </body>
    </html>
  );
}
