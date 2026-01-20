import { Suspense } from 'react';
import Header from '@/src/components/Layout/Header';
import GlobalLoading from '@/src/components/GlobalLoading/GlobalLoading';

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <GlobalLoading template="examples">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </GlobalLoading>
    </Suspense>
  );
}
