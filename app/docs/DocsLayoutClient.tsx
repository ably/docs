'use client';

import { ReactNode } from 'react';
import cn from '@ably/ui/core/utils/cn';
import { LayoutProvider } from '@/lib/layout-context';
import Header from '@/src/components/Layout/Header';
import LeftSidebar from '@/src/components/Layout/LeftSidebar';
import RightSidebar from '@/src/components/Layout/RightSidebar';
import Footer from '@/src/components/Layout/Footer';
import Breadcrumbs from '@/src/components/Layout/Breadcrumbs';
import HiddenLanguageLinks from '@/src/components/Layout/HiddenLanguageLinks';
import GlobalLoading from '@/src/components/GlobalLoading/GlobalLoading';
import { Container } from '@/src/components/Container';

interface DocsLayoutClientProps {
  children: ReactNode;
  pageLanguages?: string[];
  hideLeftSidebar?: boolean;
  hideRightSidebar?: boolean;
  template?: string;
}

export function DocsLayoutClient({
  children,
  pageLanguages,
  hideLeftSidebar = false,
  hideRightSidebar = false,
  template = 'mdx',
}: DocsLayoutClientProps) {
  const showLeftSidebar = !hideLeftSidebar;
  const showRightSidebar = !hideRightSidebar;

  return (
    <LayoutProvider pageLanguages={pageLanguages}>
      <GlobalLoading template={template}>
        <Header />
        <div
          className={cn(
            'ui-standard-container mx-0 max-w-full flex pt-16 md:px-0 md:gap-12 lg:gap-16 xl:gap-20 justify-center',
            !showLeftSidebar && 'md:px-12',
          )}
        >
          <LeftSidebar className={cn(!showLeftSidebar && 'md:hidden')} />
          <div className="flex-1 flex min-w-0 justify-center">
            <div className="max-w-screen-lg w-full flex md:gap-12 lg:gap-16 xl:gap-20">
              <Container as="main" className="flex-1 px-4 -mx-4 overflow-x-hidden sm:overflow-x-auto">
                {showLeftSidebar ? <Breadcrumbs /> : <div />}
                {children}
                <Footer />
              </Container>
              {showRightSidebar ? <RightSidebar /> : <div />}
            </div>
          </div>
        </div>
        <HiddenLanguageLinks />
      </GlobalLoading>
    </LayoutProvider>
  );
}
