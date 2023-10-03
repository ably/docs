import React from 'react';
import { SidebarProvider } from './src/contexts/SidebarContext';

export const wrapRootElement = ({ element }) => {
  return <SidebarProvider>{element}</SidebarProvider>;
};
