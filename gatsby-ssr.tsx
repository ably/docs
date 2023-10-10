import { GatsbySSR } from 'gatsby';
import React from 'react';
import UserContextWrapper from 'src/contexts/user-context/wrap-with-provider';
import { SidebarProvider, urlsForCollapsedSidebar } from './src/contexts/SidebarContext';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return (
    <UserContextWrapper>
      <SidebarProvider>{element}</SidebarProvider>
    </UserContextWrapper>
  );
};

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element, props }) => {
  const { location } = props;
  const currentUrl = location ? location.pathname : '';
  const shouldCollapse = urlsForCollapsedSidebar.some((url) => currentUrl.includes(url));
  console.log(shouldCollapse);

  return <SidebarProvider initialCollapsedState={shouldCollapse}>{element}</SidebarProvider>;
};

export { wrapRootElement };
