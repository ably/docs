import React from 'react';
import { PageProps } from 'gatsby';
import { useLocation } from '@reach/router';
import cn from 'src/utilities/cn';

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
  json_ld?: Record<string, unknown>;
  // Error-code pages (generated from the ably-common registry) carry the stable
  // snake_case identifier, rendered as a soft sub-title beneath the title.
  identifier?: string;
  date?: string;
  products?: string[];
  meta_image?: string;
  meta_image_alt?: string;
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
  const showProductBar = activePage.hasProductBar;
  // Changelog entries have no product left-nav, but are prose like docs articles,
  // so they use the same constrained reading width rather than the wide landing width.
  const isChangelogEntry = template === 'changelog-entry';
  const isRedocPage =
    location.pathname === '/docs/api/control-api' ||
    location.pathname === '/docs/api/chat-rest' ||
    location.pathname === '/docs/api/liveobjects-rest';

  return (
    <GlobalLoading template={template}>
      <Header />
      {showProductBar && <ProductBar className="hidden md:block" />}
      <div className="max-w-[1600px] mx-auto pt-16">
        <div className={cn('flex md:pl-0 md:pr-10 lg:pl-0 lg:pr-12', !leftSidebar && 'md:px-12')}>
          <LeftSidebar className={cn(!leftSidebar && 'md:hidden')} />
          <Container
            as="main"
            className={cn(
              'flex-1 min-w-0 px-6 sm:px-8 md:px-10 lg:pl-12 lg:pr-12',
              { 'max-w-[800px] box-content mx-auto lg:mr-0': !isRedocPage && (leftSidebar || isChangelogEntry) },
              { 'max-w-screen-lg mx-auto': !isRedocPage && !leftSidebar && !isChangelogEntry },
              { 'overflow-x-clip': !isRedocPage },
            )}
          >
            {leftSidebar ? (
              <div className="flex items-center justify-between mt-10 gap-4">
                <Breadcrumbs />
                <div className="hidden md:flex shrink-0">
                  <CopyForLLM />
                </div>
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
