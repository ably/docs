"use client";

import { Inter } from "next/font/google";
import Spaces from "@ably/spaces";
import { AblyProvider } from "ably/react";
import { SpaceProvider, SpacesProvider } from "@ably/spaces/react";
import { Realtime } from 'ably';
import "../../styles/styles.css";

const inter = Inter({ subsets: ["latin"] });

const client = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: "clientId"});
const spaces = new Spaces(client);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AblyProvider client={client}>
          <SpacesProvider client={spaces}>
            <SpaceProvider name="component-locking">{children}</SpaceProvider>
          </SpacesProvider>
        </AblyProvider>
      </body>
    </html>
  );
}
