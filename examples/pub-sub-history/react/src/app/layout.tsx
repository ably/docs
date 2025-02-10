"use client";

import { Inter } from "next/font/google";
import "franken-ui/js/core.iife";
import "franken-ui/js/icon.iife";
import '../../styles/styles.css'

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
