import type { GatsbySSR } from 'gatsby';
import React from 'react';
import UserContextWrapper from 'src/contexts/user-context/wrap-with-provider';
import { SidebarProvider } from './src/contexts/SidebarContext';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return (
    <UserContextWrapper>
      <SidebarProvider>{element}</SidebarProvider>
    </UserContextWrapper>
  );
};

export { wrapRootElement };
