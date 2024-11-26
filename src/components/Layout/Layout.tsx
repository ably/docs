import cn from '@ably/ui/core/utils/cn';
import { ReactNode, useEffect } from 'react';

import '../../styles/global.css';

import { LeftSidebar } from 'src/components/Sidebar/LeftSidebar';
import { useSidebar } from 'src/contexts/SidebarContext';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container } from 'src/components';
import { Header } from '../Header';
import { Footer } from '../Footer';

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
      <div className="flex">
        {showSidebar && <LeftSidebar />}
        <Container as="main" className="flex flex-1 gap-80">
          {children}
        </Container>
      </div>
      <div
        className={cn({
          'grid grid-cols-1 md:grid-cols-footer-layout': showSidebar,
        })}
      >
        <Footer />
      </div>
    </GlobalLoading>
  );
};

export default Layout;
