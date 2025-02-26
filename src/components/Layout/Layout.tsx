import React, { PropsWithChildren } from 'react';

import '../../styles/global.css';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container } from 'src/components';
import Header from './Header';
import Footer from './Footer';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { LayoutProvider, useLayoutContext } from 'src/contexts/layout-context';
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
  sidebar?: boolean;
  searchBar?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  const { options } = useLayoutContext();
  const { searchBar, sidebar, template } = options;

  return (
    <GlobalLoading template={template}>
      <Header searchBar={searchBar} />
      <div className="flex pt-64 gap-80 justify-center ui-standard-container mx-auto">
        {sidebar ? <LeftSidebar /> : null}
        <Container as="main" className="flex-1">
          {sidebar ? <Breadcrumbs /> : null}
          {children}
          <Footer />
        </Container>
        {sidebar ? <RightSidebar /> : null}
      </div>
    </GlobalLoading>
  );
};

const WrappedLayout: React.FC<PropsWithChildren<LayoutProps>> = (props) => (
  <LayoutProvider>
    <Layout {...props} />
  </LayoutProvider>
);

export default WrappedLayout;
