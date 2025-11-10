import React from 'react';
import { PageProps } from 'gatsby';
import { useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';

import '../../styles/global.css';
import { Container } from 'src/components';
import { LayoutOptions } from 'data/onCreatePage';
import { LayoutProvider } from 'src/contexts/layout-context';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import HiddenLanguageLinks from './HiddenLanguageLinks';

export type Frontmatter = {
  title: string;
  meta_description: string;
  meta_keywords?: string;
  redirect_from?: string[];
};

export type PageContextType = {
  layout: LayoutOptions;
  languages?: string[];
  frontmatter: Frontmatter;
};

type LayoutProps = PageProps<unknown, PageContextType>;

const Layout: React.FC<LayoutProps> = ({ children, pageContext }) => {
  const location = useLocation();
  const { leftSidebar, rightSidebar, template } = pageContext.layout ?? {};
  const isRedocPage =
    location.pathname === '/docs/api/control-api' ||
    location.pathname === '/docs/api/chat-rest' ||
    location.pathname === '/docs/api/liveobjects-rest';

  return (
    <GlobalLoading template={template}>
      <Header />
      <div className="flex pt-16 px-12 md:px-0 md:gap-12 lg:gap-16 xl:gap-20 justify-center">
        {leftSidebar ? <LeftSidebar /> : <div />}
        <Container as="main" className={cn('flex-1', { 'overflow-x-auto': !isRedocPage })}>
          {leftSidebar ? <Breadcrumbs /> : <div />}
          {children}
          <Footer />
        </Container>
        {rightSidebar ? <RightSidebar /> : <div />}
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
