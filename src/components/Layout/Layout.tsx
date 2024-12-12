import { ReactNode } from 'react';

import '../../styles/global.css';

import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container } from 'src/components';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

interface LayoutProps {
  noSidebar?: boolean;
  children: ReactNode;
  showSearchBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, noSidebar = false, showSearchBar }) => {
  const showSidebar = !noSidebar;

  return (
    <GlobalLoading>
      <Header showSearchBar={showSearchBar} />
      <div className="flex mx-80 gap-80 justify-center">
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

export default Layout;
