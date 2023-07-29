import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';

import { Container } from 'src/components';
import { Header } from '../Header';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Footer } from '../Footer';

const Layout: FC<{ isExtraWide?: boolean }> = ({ children, isExtraWide = false }) => {
  return (
    <GlobalLoading>
      <Header />
      <Container
        as="main"
        className={cn('grid grid-cols-1 mx-auto max-w-1264', {
          ['md:grid-cols-two-col-layout']: isExtraWide,
          ['md:grid-cols-layout xxl:grid-cols-large-layout']: !isExtraWide,
        })}
      >
        {children}
      </Container>
      <div className="grid grid-cols-1 md:grid-cols-footer-layout">
        <Footer />
      </div>
    </GlobalLoading>
  );
};

export default Layout;
