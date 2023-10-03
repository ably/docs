import cn from 'classnames';
import { ReactNode, useEffect } from 'react';

import ProductNavigation from 'src/components/ProductNavigation';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
import { useSidebar } from 'src/contexts/SidebarContext';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container, SidebarName } from 'src/components';
import { Header } from '../Header';
import { Footer } from '../Footer';

export enum SidebarState {
  Collapsed = 'collapsed',
  Open = 'open',
}

interface LayoutProps {
  isExtraWide?: boolean;
  showProductNavigation?: boolean;
  currentProduct?: string;
  noSidebar?: boolean;
  initialSidebarState?: SidebarState;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isExtraWide = false,
  showProductNavigation = true,
  currentProduct,
  noSidebar = false,
  initialSidebarState = SidebarState.Open,
}) => {
  const sidebarName = currentProduct === 'home' ? 'channels' : currentProduct;
  const showSidebar = !noSidebar;

  const { collapsed, setCollapsed } = useSidebar();

  useEffect(() => {
    setCollapsed(initialSidebarState === SidebarState.Collapsed);
  }, [initialSidebarState, setCollapsed]);

  return (
    <GlobalLoading>
      <Header sidebarName={sidebarName} />
      {showProductNavigation && <ProductNavigation currentProduct={currentProduct} />}
      {showSidebar && <LeftSideBar sidebarName={sidebarName as SidebarName} collapsible />}
      <Container
        as="main"
        className={
          showSidebar
            ? cn('grid 2xl:mx-auto max-w-1264 transition-all', {
                'md:ml-32': collapsed,
                'md:ml-244': !collapsed,
                'md:grid-cols-1': isExtraWide,
                'md:grid-cols-2 md:grid-cols-layout': !isExtraWide,
              })
            : undefined
        }
      >
        {children}
      </Container>
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
