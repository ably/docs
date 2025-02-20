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
  noSidebar?: boolean;
  hideSearchBar?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  const { options } = useLayoutContext();
  const { hideSearchBar, noSidebar, template } = options;

  return (
    <GlobalLoading template={template}>
      <Header hideSearchBar={hideSearchBar} />
      <div className="flex pt-64 gap-80 justify-center ui-standard-container mx-auto">
        {!noSidebar ? <LeftSidebar /> : null}
        <Container as="main" className="flex-1">
          <Breadcrumbs />
          {children}
          <Footer />
        </Container>
        {!noSidebar ? <RightSidebar /> : null}
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
