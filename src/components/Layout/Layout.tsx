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
  const { searchBar, leftSidebar, rightSidebar, template } = pageContext.layout ?? {};
  const isControlApiPage = location.pathname === '/docs/api/control-api';

  return (
    <GlobalLoading template={template}>
      <Header searchBar={searchBar} />
      <div className="flex pt-64 md:gap-48 lg:gap-64 xl:gap-80 justify-center ui-standard-container mx-auto">
        {leftSidebar ? <LeftSidebar /> : null}
        <Container as="main" className={cn('flex-1', { 'overflow-x-auto': !isControlApiPage })}>
          {leftSidebar ? <Breadcrumbs /> : null}
          {children}
          <Footer />
        </Container>
        {rightSidebar ? <RightSidebar /> : null}
      </div>
    </GlobalLoading>
  );
};

const WrappedLayout: React.FC<LayoutProps> = (props) => (
  <LayoutProvider pageContext={props.pageContext}>
    <Layout {...props} />
  </LayoutProvider>
);

export default WrappedLayout;
