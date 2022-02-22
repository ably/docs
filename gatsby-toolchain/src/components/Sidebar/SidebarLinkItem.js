import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';
import SidebarLink from './SidebarLink';
import SidebarLinkMenu from './SidebarLinkMenu';

const SidebarLinkItem = ({ uuid, label, link, content, level, interactable = false, indent = 0 }) => {
  const linkContent = useMemo(
    () =>
      Array.isArray(content) ? (
        <SidebarLinkMenu key={label} data={content} indent={indent + 16} />
      ) : (
        <SidebarLink to={link} $leaf={true} indent={indent}>
          {content}
        </SidebarLink>
      ),
    [content, indent, label, link],
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
};

export default SidebarLinkItem;
