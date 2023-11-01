import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';

import ProductNavigation from 'src/components/ProductNavigation';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Container, SidebarName } from 'src/components';
import { Header } from '../Header';
import { Footer } from '../Footer';

const Layout: FC<{
  showProductNavigation?: boolean;
  children: React.ReactNode;
  currentProduct?: string;
  isExtraWide?: boolean;
  noSidebar?: boolean;
}> = ({
  showProductNavigation = true,
  currentProduct = undefined,
  isExtraWide = false,
  noSidebar = false,
  children,
}) => {
  const sidebarName = currentProduct === 'home' ? 'channels' : currentProduct;
  const showSidebar = !noSidebar;

  return (
    <GlobalLoading>
      <Header sidebarName={sidebarName} />
      {showProductNavigation && <ProductNavigation currentProduct={currentProduct} />}
      {showSidebar && <LeftSideBar sidebarName={sidebarName as SidebarName} />}
      <Container
        as="main"
        className={
          showSidebar
            ? cn('grid md:ml-244 2xl:mx-auto max-w-1264', {
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
