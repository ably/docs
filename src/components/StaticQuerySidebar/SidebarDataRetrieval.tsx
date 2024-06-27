import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { EXPAND_MENU, HamburgerMenuProps, SidebarProps } from 'src/components';
import { LeftSidebarProps } from 'src/components/StaticQuerySidebar';

import { sidebarDataFromDocumentPaths, sidebarDataFromPageFurniture } from './data';

export const SidebarDataRetrieval = ({
  className,
  languages,
  expandMenu,
  sidebarName,
  Component,
  collapsible,
}: LeftSidebarProps & {
  expandMenu: EXPAND_MENU;
  Component: React.FunctionComponent<SidebarProps | HamburgerMenuProps>;
}) => {
  const data = useStaticQuery(graphql`
    fragment SubMenuFields on PageFurnitureYaml {
      label
      link
      external
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
      LiveSyncLeftSidebar: pageFurnitureYaml(name: { eq: "LiveSyncLeftSidebarMenu" }) {
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
      ChatLeftSidebar: pageFurnitureYaml(name: { eq: "ChatLeftSidebarMenu" }) {
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
      AssetTrackingLeftSidebar: pageFurnitureYaml(name: { eq: "AssetTrackingLeftSidebarMenu" }) {
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

  if (
    sidebarName !== undefined &&
    (data.ChannelsLeftSidebar ||
      data.ApiLeftSidebar ||
      data.SpacesLeftSidebar ||
      data.LiveSyncLeftSidebar ||
      data.ChatLeftSidebar ||
      data.AssetTrackingLeftSidebar)
  ) {
    const sideBarItems =
      sidebarName === 'api-reference'
        ? data.ApiLeftSidebar.items
        : sidebarName === 'spaces'
          ? data.SpacesLeftSidebar.items
          : sidebarName === 'livesync'
            ? data.LiveSyncLeftSidebar.items
            : sidebarName === 'chat'
              ? data.ChatLeftSidebar.items
              : sidebarName === 'asset-tracking'
                ? data.AssetTrackingLeftSidebar.items
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
      collapsible={collapsible}
    />
  );
};
