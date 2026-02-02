import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'POC: API Key Injection',
  description: 'Proof of concept for Next.js API key injection in Sandpack',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: '20px' }}>
        {children}
      </body>
    </html>
  );
}
