import React, { useMemo } from 'react';
import { Accordion } from 'react-accessible-accordion';
import styled from 'styled-components';

import { ROOT_LEVEL } from './consts';
import { SidebarLinkItem, SidebarHeading, SidebarLink, EXPAND_MENU, SidebarData, checkSectionMatch } from './';
import { safeWindow } from '../../utilities/browser/safe-window';
import { isArray } from 'lodash/fp';

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

export const SidebarLinkMenu = ({
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
        const autoExpandMenu = isArray(content) && link !== '' ? EXPAND_MENU.EXPANDED : expandMenu;
        if ([EXPAND_MENU.EXPANDED, EXPAND_MENU.COLLAPSE_NEXT].includes(autoExpandMenu)) {
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

        // NOTE: first condition is a fix for a build stage. safeWindow.location.pathname is also an empty string
        const isActive = link !== '' && (highlightedMenuId === link || safeWindow.location.pathname === link);

        const alwaysExpanded = isArray(content) && link !== '';

        const labelMaybeWithLink = expandable ? (
          <SidebarHeading as={alwaysExpanded ? 'a' : 'span'} href={link} isActive={isActive} indent={indent}>
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
              collapsible={!alwaysExpanded}
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
