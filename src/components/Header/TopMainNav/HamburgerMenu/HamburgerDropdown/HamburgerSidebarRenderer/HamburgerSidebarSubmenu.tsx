import React from 'react';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { MAX_NESTING_LEVEL } from './constants';
import { DispatchExpandedMenu } from './hamburger-expanded-menu-context';
import { dataToHamburgerSidebarItem } from './HamburgerSidebarRenderer';

export const HamburgerSidebarSubmenu = ({
  handleMenuExpansion,
  label,
  level,
  nestedLevel,
  closed,
  content,
}: {
  handleMenuExpansion: DispatchExpandedMenu;
  label: string;
  level?: number;
  nestedLevel: number;
  closed?: boolean;
  content: SidebarData[];
}) => {
  const isNested = level && level > 0;
  const rootLevel = nestedLevel - 1;
  const validRootLevelHeader = rootLevel > MAX_NESTING_LEVEL ? MAX_NESTING_LEVEL : rootLevel;
  const isRootLevelHeader = level === validRootLevelHeader;
  const shouldDisplayRootLevelHeaderIndicator = !closed && isRootLevelHeader;

  const LabelComponent = isNested ? 'h5' : 'h4';

  const chevronRotation = closed ? '' : 'transform rotate-180';
  const maybeRootLevelIndentation = isRootLevelHeader ? 'ml-30' : 'ml-8';

  return (
    <>
      <LabelComponent
        className="cursor-pointer max-w-full mr-24 flex justify-between text-base"
        onClick={() => handleMenuExpansion(label)}
      >
        <span>
          {shouldDisplayRootLevelHeaderIndicator && <img className="pr-24" src="/images/icons/bold-chevron-left.svg" />}
          {label}
        </span>
        {!isRootLevelHeader && <img className={chevronRotation} src="/images/icons/chevron-down.svg" />}
      </LabelComponent>
      {!closed && content ? (
        <ol className={maybeRootLevelIndentation}>{content.map(dataToHamburgerSidebarItem)}</ol>
      ) : null}
    </>
  );
};
