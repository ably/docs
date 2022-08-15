import React from 'react';
import { SidebarProps } from '../../../../../Sidebar';

export const HamburgerSidebarRenderer = ({ className, data, expandMenu }: SidebarProps) => {
  return <div>{JSON.stringify(data)}</div>;
};
