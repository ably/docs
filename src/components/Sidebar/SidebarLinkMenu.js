import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'react-accessible-accordion';
import styled from 'styled-components';
import { ROOT_LEVEL } from './consts';
import SidebarLabel from './SidebarLabel';
import SidebarLink from './SidebarLink';
import SidebarLinkItem from './SidebarLinkItem';
import { EXPAND_MENU } from './expand-menu-enum';
import { checkSectionMatch } from './check-section-match';

const OrderedList = styled.ol`
  margin: 0;
  padding: 0;
`;

const SidebarLinkMenu = ({ data, interactable = false, expandMenu = EXPAND_MENU.EXPANDED, indent = 0 }) => {
  const preExpanded = useMemo(() => [], []);
  const linkMenu = useMemo(
    () =>
      data.map(({ label, link, level = ROOT_LEVEL, content = false }) => {
        const uuid = encodeURIComponent(`${label}${link}`);

        if ([EXPAND_MENU.EXPANDED, EXPAND_MENU.COLLAPSE_NEXT].includes(expandMenu)) {
          preExpanded.push(uuid);
        } else if (
          EXPAND_MENU.SECTION_MATCH === expandMenu &&
          checkSectionMatch(window.location.pathname)({
            label,
            link,
            level,
            content,
          })
        ) {
          preExpanded.push(uuid);
        }
        const nextExpandMenu =
          expandMenu === EXPAND_MENU.COLLAPSE_NEXT
            ? EXPAND_MENU.COLLAPSED
            : expandMenu === EXPAND_MENU.EXPAND_NEXT
            ? EXPAND_MENU.EXPANDED
            : expandMenu;

        const labelMaybeWithLink = interactable ? (
          <SidebarLink $leaf={false} indent={indent} level={level} to={link}>
            {label}
          </SidebarLink>
        ) : (
          <SidebarLabel $leaf={false} indent={indent} level={level}>
            {label}
          </SidebarLabel>
        );

        const isActive = link === window.location.pathname;

        return content ? (
          <li key={`${label}-${link}-${level}`}>
            <SidebarLinkItem
              uuid={uuid}
              label={labelMaybeWithLink}
              link={link}
              level={level}
              content={content}
              interactable={interactable}
              expandMenu={nextExpandMenu}
              indent={indent}
            />
          </li>
        ) : (
          <li key={`${label}-${link}-${level}`}>
            <SidebarLink to={link} $leaf={indent > 0} $active={isActive} indent={indent}>
              {label}
            </SidebarLink>
          </li>
        );
      }),
    [data, interactable, indent, expandMenu, preExpanded],
  );
  return (
    <Accordion allowMultipleExpanded={true} allowZeroExpanded={true} preExpanded={preExpanded}>
      <OrderedList>{linkMenu}</OrderedList>
    </Accordion>
  );
};

SidebarLinkMenu.propTypes = {
  data: PropTypes.array,
  interactable: PropTypes.bool,
  expandMenu: PropTypes.oneOf(Object.values(EXPAND_MENU)),
  indent: PropTypes.number,
};

export default SidebarLinkMenu;
