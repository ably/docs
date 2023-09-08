import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';

import { Container } from 'src/components';

import { Header } from '../Header';
import ProductNavigation from 'src/components/ProductNavigation';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Footer } from '../Footer';

const Layout: FC<{
  isExtraWide?: boolean;
  showProductNavigation?: boolean;
  currentProduct?: string;
  noSidebar?: boolean;
}> = ({
  children,
  isExtraWide = false,
  showProductNavigation = true,
  currentProduct = undefined,
  noSidebar = false,
}) => {
  const sidebarName = currentProduct === 'home' ? 'channels' : currentProduct;
  const showSidebar = !noSidebar;

  return (
    <GlobalLoading>
      <Header sidebarName={sidebarName} />
      {showProductNavigation && <ProductNavigation currentProduct={currentProduct} />}
      {showSidebar && <LeftSideBar sidebarName={sidebarName} />}
      <Container
        as="main"
        className={
          showSidebar
            ? cn('grid md:ml-244 2xl:mx-auto max-w-1264', {
                'md:grid-cols-1': isExtraWide,
                'md:grid-cols-2 md:grid-cols-layout': !isExtraWide,
              })
            : null
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
