"use client";

import { Inter } from "next/font/google";
import '../../styles/styles.css'
import dynamic from 'next/dynamic';

const FrankenUICore = dynamic(
  () =>
    // @ts-ignore
    import('franken-ui/js/core.iife').then(() => {
      return function NoopComponent() {
        return null;
      };
    }),
  {
    ssr: false,
  },
);

const FrankenUIIcon = dynamic(
  () =>
    // @ts-ignore
    import('franken-ui/js/icon.iife').then(() => {
      return function NoopComponent() {
        return null;
      };
    }),
  {
    ssr: false,
  },
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <FrankenUICore />
          <FrankenUIIcon />
          {children}
      </body>
    </html>
  );
}
