import { ReactNode, useEffect } from 'react';

import '../../styles/global.css';

import { useSidebar } from 'src/contexts/SidebarContext';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container } from 'src/components';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LeftSidebar } from './LeftSidebar';

interface LayoutProps {
  isExtraWide?: boolean;
  showProductNavigation?: boolean;
  currentProduct: string;
  noSidebar?: boolean;
  collapsibleSidebar?: boolean;
  children: ReactNode;
  showSearchBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, noSidebar = false, showSearchBar }) => {
  const showSidebar = !noSidebar;

  const { collapsed, setCollapsed, initialCollapsedState } = useSidebar();

  useEffect(() => {
    if (typeof initialCollapsedState === 'undefined' || !setCollapsed) {
      return;
    }

    setCollapsed(initialCollapsedState);
  }, [initialCollapsedState, setCollapsed]);

  return (
    <GlobalLoading>
      <Header showSearchBar={showSearchBar} />
      <div className="flex mx-80 gap-80">
        {showSidebar && <LeftSidebar />}
        <Container as="main" className="flex flex-1 gap-80">
          {children}
        </Container>
      </div>
      <Footer />
    </GlobalLoading>
  );
};

export default Layout;
