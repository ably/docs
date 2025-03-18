"use client";

import { Inter } from "next/font/google";
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { nanoid } from 'nanoid';
import '../../styles/styles.css';
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

const client = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: nanoid()});
const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : {});
const channelName = urlParams.get('name') || 'pub-sub-channel-messages';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
