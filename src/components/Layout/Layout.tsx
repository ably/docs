import cn from 'classnames';
import { ReactNode } from 'react';

import { Container } from 'src/components';

import ProductNavigation from 'src/components/ProductNavigation';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
import { useSidebar } from 'src/contexts/SidebarContext';
import { Footer } from '../Footer';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Header } from '../Header';

interface LayoutProps {
  isExtraWide?: boolean;
  showProductNavigation?: boolean;
  currentProduct?: string;
  noSidebar?: boolean;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isExtraWide = false,
  showProductNavigation = true,
  currentProduct,
  noSidebar = false,
}) => {
  const sidebarName = currentProduct === 'home' ? 'channels' : currentProduct;
  const showSidebar = !noSidebar;

  const { collapsed } = useSidebar();

  return (
    <GlobalLoading>
      <Header sidebarName={sidebarName} />
      {showProductNavigation && <ProductNavigation currentProduct={currentProduct} />}

      {showSidebar && <LeftSideBar sidebarName={sidebarName} />}
      <Container
        as="main"
        className={
          showSidebar
            ? cn('grid 2xl:mx-auto max-w-1264 transition-all', {
                'sm:ml-244': !collapsed,
                'sm:ml-32': collapsed,
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
