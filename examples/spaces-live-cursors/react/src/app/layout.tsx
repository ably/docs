"use client";

import { Inter } from "next/font/google";
import Spaces from "@ably/spaces";
import { SpaceProvider, SpacesProvider } from "@ably/spaces/react";
import { Realtime } from 'ably';
import { nanoid } from 'nanoid';
import "../../styles/styles.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const client = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: nanoid()});
const spaces = new Spaces(client);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [spaceName, setSpaceName] = useState('spaces-live-cursors');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name) {
      setSpaceName(name);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SpacesProvider client={spaces}>
          <SpaceProvider name={spaceName}>{children}</SpaceProvider>
        </SpacesProvider>
      </body>
    </html>
  );
}
