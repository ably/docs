import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';
import SidebarLink from './SidebarLink';
import SidebarLinkMenu from './SidebarLinkMenu';
import { EXPAND_MENU } from './expand-menu-enum';

const INDENTATION_INCREASE = 8;

const SidebarLinkItem = ({
  uuid,
  label,
  link,
  content,
  level,
  indentOffset,
  interactable = false,
  indent = 0,
  expandMenu = EXPAND_MENU.EXPANDED,
}) => {
  const nextIndent = indentOffset > 0 ? indent : indent + INDENTATION_INCREASE;
  const nextIndentOffset = indentOffset - 1;
  const linkContent = useMemo(
    () =>
      Array.isArray(content) ? (
        <SidebarLinkMenu
          key={label}
          data={content}
          indent={nextIndent}
          expandMenu={expandMenu}
          indentOffset={nextIndentOffset}
        />
      ) : (
        <SidebarLink to={link} $leaf={true} indent={indent}>
          {content}
        </SidebarLink>
      ),
    [content, indent, label, link, expandMenu],
  );
  return <SidebarItem uuid={uuid} label={label} content={linkContent} level={level} interactable={interactable} />;
};

SidebarLinkItem.propTypes = {
  uuid: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  link: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  level: PropTypes.number,
  interactable: PropTypes.bool,
  indent: PropTypes.number,
  expandMenu: PropTypes.oneOf(Object.values(EXPAND_MENU)),
};

export default SidebarLinkItem;
