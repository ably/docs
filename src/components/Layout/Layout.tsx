import React from 'react';
import { PageProps } from 'gatsby';
import { useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';

import '../../styles/global.css';
import { Container } from 'src/components/Container';
import { LayoutOptions } from 'data/onCreatePage';
import { LayoutProvider, useLayoutContext } from 'src/contexts/layout-context';
import Breadcrumbs from './Breadcrumbs';
import CopyForLLM from './CopyForLLM';
import Footer from './Footer';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import ProductBar from './ProductBar';
import RightSidebar from './RightSidebar';
import HiddenLanguageLinks from './HiddenLanguageLinks';

export type Frontmatter = {
  title: string;
  meta_description: string;
  meta_keywords?: string;
  redirect_from?: string[];
  last_updated?: string;
  intro?: string;
};

export type PageContextType = {
  layout: LayoutOptions;
  languages?: string[];
  frontmatter: Frontmatter;
};

type LayoutProps = PageProps<unknown, PageContextType>;

const Layout: React.FC<LayoutProps> = ({ children, pageContext }) => {
  const location = useLocation();
  const { activePage } = useLayoutContext();
  const { leftSidebar, rightSidebar, template } = pageContext.layout ?? {};
  const showProductBar = activePage.product !== null && activePage.product !== 'platform';
  const isRedocPage =
    location.pathname === '/docs/api/control-api' ||
    location.pathname === '/docs/api/chat-rest' ||
    location.pathname === '/docs/api/liveobjects-rest';

  return (
    <GlobalLoading template={template}>

      <Header />
      {showProductBar && <ProductBar className="hidden md:block" />}
      <div className="max-w-[1856px] mx-auto pt-16">
        <div
          className={cn(
            'flex px-8',
            !leftSidebar && 'md:px-12',
          )}
        >
          <LeftSidebar className={cn(!leftSidebar && 'md:hidden')} />
          <Container
            as="main"
            className={cn(
              'flex-1 min-w-0',
              { 'max-w-[704px] mx-auto': !isRedocPage && leftSidebar },
              { 'overflow-x-hidden sm:overflow-x-auto': !isRedocPage },
            )}
          >
            {leftSidebar ? (
              <div className="flex items-center justify-between mt-8 gap-4">
                <Breadcrumbs />
                <CopyForLLM />
              </div>
            ) : null}
            {children}
            <Footer pageContext={pageContext} />
          </Container>
          {rightSidebar ? <RightSidebar /> : <div />}
        </div>
      </div>
      <HiddenLanguageLinks />
    </GlobalLoading>
  );
};

const WrappedLayout: React.FC<LayoutProps> = (props) => (
  <LayoutProvider pageContext={props.pageContext}>
    <Layout {...props} />
  </LayoutProvider>
);

export default WrappedLayout;
