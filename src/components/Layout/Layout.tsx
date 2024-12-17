import { PropsWithChildren } from 'react';

import '../../styles/global.css';

import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container } from 'src/components';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { LayoutProvider } from 'src/contexts/layout-context';

interface LayoutProps {
  noSidebar?: boolean;
  showSearchBar?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children, noSidebar = false, showSearchBar }) => {
  const showSidebar = !noSidebar;

  return (
    <GlobalLoading>
      <Header showSearchBar={showSearchBar} />
      <div className="flex mx-24 sm:mx-32 md:mx-40 lg:mx-64 gap-80 justify-center transition-[margin]">
        {showSidebar ? <LeftSidebar /> : null}
        <Container as="main" className="flex-1">
          {children}
        </Container>
        {showSidebar ? <RightSidebar /> : null}
      </div>
      <Footer />
    </GlobalLoading>
  );
};

const WrappedLayout: React.FC<PropsWithChildren<LayoutProps>> = (props) => (
  <LayoutProvider>
    <Layout {...props} />
  </LayoutProvider>
);

export default WrappedLayout;
