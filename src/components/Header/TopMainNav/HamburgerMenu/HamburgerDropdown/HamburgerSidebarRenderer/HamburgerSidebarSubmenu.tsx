import React from 'react';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { MAX_NESTING_LEVEL } from './constants';
import { DispatchExpandedMenu } from './hamburger-expanded-menu-context';
import { HamburgerSidebarItemContainer } from '.';
import { dataToHamburgerSidebarItem } from '.';

const getClosedRotation = (rotation: number, isClosed: boolean) => (rotation + (isClosed ? 180 : 0)) % 360;

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
  const isMaxNestedLevel = level && level > MAX_NESTING_LEVEL;
  const nestedRootLevelHeader = rootLevel > MAX_NESTING_LEVEL;
  const validRootLevelHeader = nestedRootLevelHeader ? MAX_NESTING_LEVEL : rootLevel;
  const isRootLevelHeader = level === validRootLevelHeader;
  const shouldDisplayRootLevelHeaderIndicator = !closed && isRootLevelHeader;

  const LabelComponent = isNested ? 'h5' : 'h4';
  const defaultChevronRotationAmount = isMaxNestedLevel && !isRootLevelHeader ? 0 : 270;
  const chevronRotation = `transform rotate-${getClosedRotation(defaultChevronRotationAmount, !closed)}`;
  const maybeRootLevelIndentation = isRootLevelHeader ? 'ml-30' : 'ml-8';

  return (
    <>
      <HamburgerSidebarItemContainer>
        <LabelComponent
          className="cursor-pointer max-w-full mr-24 flex flex-grow justify-between text-16"
          onClick={() => handleMenuExpansion(label)}
          tabIndex={0}
        >
          <span>
            {shouldDisplayRootLevelHeaderIndicator && (
              <img className="pr-24 h-12" src="/images/icons/bold-chevron-left.svg" />
            )}
            {label}
          </span>
          {!isRootLevelHeader && <img className={chevronRotation} src="/images/icons/chevron-down.svg" />}
        </LabelComponent>
      </HamburgerSidebarItemContainer>
      {!closed && content ? (
        <ol className={maybeRootLevelIndentation}>{content.map(dataToHamburgerSidebarItem)}</ol>
      ) : null}
    </>
  );
};
