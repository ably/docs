import { GatsbySSR } from 'gatsby';
import React from 'react';
import { SidebarProvider, urlsForCollapsedSidebar } from './src/contexts/SidebarContext';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element, props }) => {
  const { location } = props;
  const currentUrl = location ? location.pathname : '';
  const shouldCollapse = urlsForCollapsedSidebar.some((url) => currentUrl.includes(url));
  console.log(shouldCollapse);

  return <SidebarProvider initialCollapsedState={shouldCollapse}>{element}</SidebarProvider>;
};
