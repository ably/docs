"use client";

import { Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
