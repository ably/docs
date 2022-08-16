import React from 'react';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { DispatchExpandedMenu } from './hamburger-expanded-menu-context';
import { dataToHamburgerSidebarItem } from './HamburgerSidebarRenderer';

export const HamburgerSidebarSubmenu = ({
  handleMenuExpansion,
  label,
  level,
  closed,
  content,
}: {
  handleMenuExpansion: DispatchExpandedMenu;
  label: string;
  level?: number;
  closed?: boolean;
  content: SidebarData[];
}) => {
  const isNested = level && level > 1;
  const LabelComponent = isNested ? 'h5' : 'h4';
  return (
    <>
      <LabelComponent className="cursor-pointer max-w-full w-256 mr-24" onClick={() => handleMenuExpansion(label)}>
        {label}
      </LabelComponent>
      {!closed && content ? (
        <ol className={isNested ? 'ml-8' : ''}>{content.map(dataToHamburgerSidebarItem)}</ol>
      ) : null}
    </>
  );
};
