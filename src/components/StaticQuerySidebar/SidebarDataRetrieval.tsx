import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { EXPAND_MENU, SidebarProps, HamburgerMenuProps } from 'src/components';

import { sidebarDataFromDocumentPaths, sidebarDataFromPageFurniture } from './data';
import { LeftSidebarProps } from './LeftSideBar';

export const SidebarDataRetrieval = ({
  className,
  languages,
  expandMenu,
  sidebarName,
  Component,
}: LeftSidebarProps & {
  expandMenu: EXPAND_MENU;
  Component: React.FunctionComponent<SidebarProps | HamburgerMenuProps>;
}) => {
  const data = useStaticQuery(graphql`
    fragment SubMenuFields on PageFurnitureYaml {
      label
      link
      level
      text
    }
    query {
      ChannelsLeftSidebar: pageFurnitureYaml(name: { eq: "LeftSidebarMenu" }) {
        items {
          ...SubMenuFields
          items {
            ...SubMenuFields
            items {
              ...SubMenuFields
              items {
                ...SubMenuFields
              }
            }
          }
        }
      }
      ApiLeftSidebar: pageFurnitureYaml(name: { eq: "ApiLeftSidebarMenu" }) {
        items {
          ...SubMenuFields
          items {
            ...SubMenuFields
            items {
              ...SubMenuFields
              items {
                ...SubMenuFields
              }
            }
          }
        }
      }
      SpacesLeftSidebar: pageFurnitureYaml(name: { eq: "SpacesLeftSidebarMenu" }) {
        items {
          ...SubMenuFields
          items {
            ...SubMenuFields
            items {
              ...SubMenuFields
              items {
                ...SubMenuFields
              }
            }
          }
        }
      }
      allDocumentPath {
        edges {
          node {
            id
            label
            level
            link
            parent {
              id
            }
          }
        }
      }
    }
  `);

  let sidebarData;

  if (sidebarName !== undefined && (data.ChannelsLeftSidebar || data.ApiLeftSidebar || data.SpacesLeftSidebar)) {
    const sideBarItems =
      sidebarName === 'api-reference'
        ? data.ApiLeftSidebar.items
        : sidebarName === 'spaces'
        ? data.SpacesLeftSidebar.items
        : data.ChannelsLeftSidebar.items;
    sidebarData = sidebarDataFromPageFurniture(sideBarItems);
  } else {
    sidebarData = sidebarDataFromDocumentPaths(data.allDocumentPath.edges);
  }

  return (
    <Component
      className={className}
      languages={languages}
      data={sidebarData}
      expandMenu={expandMenu}
      sidebarName={sidebarName}
    />
  );
};
