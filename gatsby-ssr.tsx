import type { GatsbySSR } from 'gatsby';
import React from 'react';
import { SidebarProvider } from './src/contexts/SidebarContext';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <SidebarProvider>{element}</SidebarProvider>;
};
