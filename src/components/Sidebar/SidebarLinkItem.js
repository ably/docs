import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SidebarItem } from './SidebarItem';
import SidebarLink from './SidebarLink';
import SidebarLinkMenu from './SidebarLinkMenu';
import { EXPAND_MENU } from './expand-menu-enum';
import { HighlightedMenuContext } from '../../contexts/highlighted-menu-context';

const INDENTATION_INCREASE = 8;

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
  $active = false,
}) => {
  const nextIndent = indentOffset > 0 ? indent : indent + INDENTATION_INCREASE;
  const nextIndentOffset = indentOffset - 1;
  const linkContent = useMemo(
    () =>
      Array.isArray(content) ? (
        <HighlightedMenuContext.Consumer>
          {(highlightedMenuId) => (
            <SidebarLinkMenu
              key={label}
              data={content}
              indent={nextIndent}
              expandMenu={expandMenu}
              indentOffset={nextIndentOffset}
              highlightedMenuId={highlightedMenuId}
            />
          )}
        </HighlightedMenuContext.Consumer>
      ) : (
        <SidebarLink to={link} $leaf={true} $active={$active} indent={indent}>
          {content}
        </SidebarLink>
      ),
    [content, indent, label, link, expandMenu, $active],
  );
  return <SidebarItem uuid={uuid} label={label} content={linkContent} level={level} expandable={expandable} />;
};

SidebarLinkItem.propTypes = {
  uuid: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  link: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  level: PropTypes.number,
  expandable: PropTypes.bool,
  indent: PropTypes.number,
  expandMenu: PropTypes.oneOf(Object.values(EXPAND_MENU)),
  $active: PropTypes.bool,
};

export default SidebarLinkItem;
