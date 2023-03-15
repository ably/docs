import React, { useContext, useMemo } from 'react';
import { Accordion } from 'react-accessible-accordion';
import { isArray } from 'lodash/fp';

import { PathnameContext } from 'src/contexts';
import { ROOT_LEVEL } from './consts';
import { SidebarLinkItem, SidebarLink, EXPAND_MENU, SidebarData, checkSectionMatch } from './';

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
  const pathname = useContext(PathnameContext);
  const preExpanded: string[] = useMemo(() => [], []);

  const linkMenu = data.map(({ label, link, level = ROOT_LEVEL, tutorial = false, content }) => {
    const uuid = encodeURIComponent(`${label}${link}`);
    const isActive = link !== '' && (highlightedMenuId === link || pathname === link);
    const autoExpandMenu = isArray(content) && link !== '' ? EXPAND_MENU.EXPANDED : expandMenu;

    if ([EXPAND_MENU.EXPANDED, EXPAND_MENU.COLLAPSE_NEXT].includes(autoExpandMenu)) {
      preExpanded.push(uuid);
    } else if (
      EXPAND_MENU.SECTION_MATCH === expandMenu &&
      checkSectionMatch(pathname)({
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

    const alwaysExpanded = isArray(content) && link !== '';

    const labelMaybeWithLink = (
      <SidebarLink
        alwaysExpanded={alwaysExpanded}
        expandable={expandable}
        isActive={isActive}
        indent={indent}
        to={link}
      >
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
          isTutorial={tutorial}
        />
      </li>
    ) : (
      <li key={`${label}-${link}-${level}`}>
        <SidebarLink to={link} isActive={isActive} indent={indent}>
          {label}
        </SidebarLink>
      </li>
    );
  });

  return (
    <Accordion allowMultipleExpanded={true} allowZeroExpanded={true} preExpanded={preExpanded}>
      <ol className="m-0 p-0">{linkMenu}</ol>
    </Accordion>
  );
};
