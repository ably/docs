import { Suspense } from 'react';
import Header from '@/src/components/Layout/Header';
import { Container } from '@/src/components/Container';
import GlobalLoading from '@/src/components/GlobalLoading/GlobalLoading';

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <GlobalLoading template="examples">
        <Header />
        <div className="pt-16">
          <Container as="main" className="px-4">
            {children}
          </Container>
        </div>
      </GlobalLoading>
    </Suspense>
  );
}
