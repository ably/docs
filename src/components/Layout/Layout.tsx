import React from 'react';
import { PageProps } from 'gatsby';

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

export type PageContextType = {
  layout: LayoutOptions;
  languages?: string[];
  frontmatter?: {
    title: string;
  };
};

type LayoutProps = PageProps<unknown, PageContextType>;

const Layout: React.FC<LayoutProps> = ({ children, pageContext }) => {
  const { searchBar, leftSidebar, rightSidebar, template } = pageContext.layout ?? {};

  return (
    <GlobalLoading template={template}>
      <Header searchBar={searchBar} />
      <div className="flex pt-64 md:gap-48 lg:gap-64 xl:gap-80 justify-center ui-standard-container mx-auto">
        {leftSidebar ? <LeftSidebar /> : null}
        <Container as="main" className="flex-1 overflow-x-auto">
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
