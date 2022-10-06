import React, { useMemo } from 'react';
import { Accordion } from 'react-accessible-accordion';
import styled from 'styled-components';
import { ROOT_LEVEL } from './consts';
import SidebarHeading from './SidebarHeading';
import SidebarLink from './SidebarLink';
import SidebarLinkItem from './SidebarLinkItem';
import { EXPAND_MENU } from './expand-menu-enum';
import { checkSectionMatch } from './check-section-match';
import { safeWindow } from '../../utilities/browser/safe-window';
import { SidebarData } from './sidebar-data';

const OrderedList = styled.ol`
  margin: 0;
  padding: 0;
`;

type Props = {
  data: SidebarData[];
  expandable?: boolean;
  expandMenu: EXPAND_MENU;
  highlightedMenuId: string | null;
  indent?: number;
  indentOffset?: number;
};

const SidebarLinkMenu = ({
  data,
  highlightedMenuId,
  expandable = true,
  expandMenu = EXPAND_MENU.EXPANDED,
  indent = 0,
  indentOffset = 0,
}: Props) => {
  const preExpanded: string[] = useMemo(() => [], []);
  const linkMenu = useMemo(
    () =>
      data.map(({ label, link, level = ROOT_LEVEL, content }) => {
        const uuid = encodeURIComponent(`${label}${link}`);
        if ([EXPAND_MENU.EXPANDED, EXPAND_MENU.COLLAPSE_NEXT].includes(expandMenu)) {
          preExpanded.push(uuid);
        } else if (
          EXPAND_MENU.SECTION_MATCH === expandMenu &&
          checkSectionMatch(safeWindow.location.pathname)({
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

        const isActive = highlightedMenuId === link || safeWindow.location.pathname === link;

        const labelMaybeWithLink = expandable ? (
          <SidebarHeading isActive={isActive} indent={indent}>
            {label}
          </SidebarHeading>
        ) : (
          <SidebarLink isActive={isActive} indent={indent} to={link}>
            {label}
          </SidebarLink>
        );
        return content ? (
          <li key={`${label}-${link}-${level}`}>
            <SidebarLinkItem
              uuid={uuid}
              label={labelMaybeWithLink}
              link={link}
              level={level}
              content={content}
              expandable={expandable}
              expandMenu={nextExpandMenu}
              indent={indent}
              indentOffset={indentOffset}
              isActive={isActive}
            />
          </li>
        ) : (
          <li key={`${label}-${link}-${level}`}>
            <SidebarLink to={link} isActive={isActive} indent={indent}>
              {label}
            </SidebarLink>
          </li>
        );
      }),
    [data, expandable, indent, expandMenu, preExpanded, highlightedMenuId, indentOffset],
  );

  return (
    <Accordion allowMultipleExpanded={true} allowZeroExpanded={true} preExpanded={preExpanded}>
      <OrderedList>{linkMenu}</OrderedList>
    </Accordion>
  );
};

export default SidebarLinkMenu;
