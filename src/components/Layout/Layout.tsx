import React, { PropsWithChildren } from 'react';
import cn from '@ably/ui/core/utils/cn';

import '../../styles/global.css';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container } from 'src/components';
import Header from './Header';
import Footer from './Footer';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { LayoutProvider } from 'src/contexts/layout-context';
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
  noSidebar?: boolean;
  hideSearchBar?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children, noSidebar = false, hideSearchBar }) => {
  const showSidebar = !noSidebar;

  // a temporary thing to test out containerised layout
  const [withContainer, setWithContainer] = React.useState(false);
  React.useEffect(() => {
    setWithContainer(localStorage.getItem('ably-docs-with-container') === 'true');
  }, []);

  return (
    <GlobalLoading>
      <Header hideSearchBar={hideSearchBar} />
      <div
        className={cn(
          'flex pt-64 gap-80 justify-center',
          { 'ui-standard-container mx-auto': withContainer },
          { 'mx-24 sm:mx-32 md:mx-40 lg:mx-64': !withContainer },
        )}
      >
        {showSidebar ? <LeftSidebar /> : null}
        <Container as="main" className="flex-1">
          <Breadcrumbs />
          {children}
          <Footer />
        </Container>
        {showSidebar ? <RightSidebar /> : null}
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
