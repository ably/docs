import { Suspense } from 'react';
import { DocsLayoutClient } from './DocsLayoutClient';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <DocsLayoutClient>{children}</DocsLayoutClient>
    </Suspense>
  );
}
