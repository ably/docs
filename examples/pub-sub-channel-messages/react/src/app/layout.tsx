"use client";

import { Inter } from "next/font/google";
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { nanoid } from 'nanoid';
import '../../styles/styles.css';

const inter = Inter({ subsets: ["latin"] });

const client = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: nanoid()});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AblyProvider client={client}>
          <ChannelProvider channelName="cut-nil-tie">
            {children}
          </ChannelProvider>
        </AblyProvider>
      </body>
    </html>
  );
}