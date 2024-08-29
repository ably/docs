import cn from 'classnames';
import { ReactNode, useEffect } from 'react';

import '../../styles/global.css';

import ProductNavigation from 'src/components/ProductNavigation';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
import { useSidebar } from 'src/contexts/SidebarContext';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container, type SidebarName } from 'src/components';
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

function assertNever(name: string): never {
  throw new Error('Received unrecognized sidebar name: ' + name);
}

const getSidebarName = (currentProduct: string): SidebarName => {
  switch (currentProduct) {
    case 'home':
    case 'channels':
    case 'pub_sub':
    case 'SDKs':
      return 'channels';
    case 'api-reference':
      return 'api-reference';
    case 'spaces':
      return 'spaces';
    case 'livesync':
      return 'livesync';
    case 'chat':
      return 'chat';
    case 'asset-tracking':
      return 'asset-tracking';
    default:
      return assertNever(currentProduct);
  }
};

const Layout: React.FC<LayoutProps> = ({
  children,
  isExtraWide = false,
  showProductNavigation = true,
  currentProduct,
  noSidebar = false,
  collapsibleSidebar = false,
  showSearchBar,
}) => {
  const sidebarName = getSidebarName(currentProduct);
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
      <Header sidebarName={sidebarName} showSearchBar={showSearchBar} />
      {showProductNavigation && <ProductNavigation currentProduct={currentProduct} />}

      {showSidebar && <LeftSideBar sidebarName={sidebarName as SidebarName} collapsible={collapsibleSidebar} />}
      <Container
        as="main"
        className={
          showSidebar
            ? cn('grid', {
                'md:ml-48': collapsibleSidebar && collapsed,
                'md:ml-244': collapsibleSidebar && !collapsed,
                'md:grid-cols-1': isExtraWide,
                'md:grid-cols-2 md:grid-cols-layout': !isExtraWide,
                'md:ml-244 2xl:mx-auto max-w-1264': !collapsibleSidebar,
                'mx-24 transition-all': collapsibleSidebar,
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
