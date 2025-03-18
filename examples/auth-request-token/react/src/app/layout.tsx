"use client";

import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';
import '../../styles/styles.css'

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
