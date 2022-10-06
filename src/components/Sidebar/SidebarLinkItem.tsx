import React, { useMemo, ReactNode } from 'react';

import { SidebarItem } from './SidebarItem';
import SidebarLink from './SidebarLink';
import SidebarLinkMenu from './SidebarLinkMenu';
import { EXPAND_MENU } from './expand-menu-enum';
import { HighlightedMenuContext } from '../../contexts/highlighted-menu-context';

const INDENTATION_INCREASE = 8;

type Props = {
  uuid: string;
  label: ReactNode | string;
  link: string;
  content: boolean | string | any[];
  level: number;
  expandable: boolean;
  indent: number;
  expandMenu: EXPAND_MENU;
  isActive: boolean;
  indentOffset: number;
};

const SidebarLinkItem = ({
  uuid,
  label,
  link,
  content,
  level,
  indentOffset,
  expandable = false,
  indent = 0,
  expandMenu = EXPAND_MENU.EXPANDED,
  isActive = false,
}: Props) => {
  const nextIndent = indentOffset > 0 ? indent : indent + INDENTATION_INCREASE;
  const nextIndentOffset = indentOffset - 1;

  const linkContent = useMemo(
    () =>
      Array.isArray(content) ? (
        <HighlightedMenuContext.Consumer>
          {(highlightedMenuId) => (
            <SidebarLinkMenu
              key={highlightedMenuId}
              data={content}
              indent={nextIndent}
              expandMenu={expandMenu}
              indentOffset={nextIndentOffset}
              highlightedMenuId={highlightedMenuId}
            />
          )}
        </HighlightedMenuContext.Consumer>
      ) : (
        <SidebarLink to={link} isActive={isActive} indent={indent}>
          {content}
        </SidebarLink>
      ),
    [content, indent, link, expandMenu, isActive, nextIndent, nextIndentOffset],
  );

  return <SidebarItem uuid={uuid} label={label} content={linkContent} level={level} expandable={expandable} />;
};

export default SidebarLinkItem;
