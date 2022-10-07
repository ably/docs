import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { EXPAND_MENU, SidebarProps } from 'src/components';

import { sidebarDataFromDocumentPaths, sidebarDataFromPageFurniture } from './data';
import { LeftSidebarProps } from './LeftSideBar';

export const SidebarDataRetrieval = ({
  className,
  languages,
  expandMenu,
  Component,
}: LeftSidebarProps & {
  expandMenu: EXPAND_MENU;
  Component: React.FunctionComponent<SidebarProps>;
}) => {
  const data = useStaticQuery(graphql`
    fragment SubMenuFields on PageFurnitureYaml {
      label
      link
      level
      text
    }
    query {
      pageFurnitureYaml(name: { eq: "LeftSidebarMenu" }) {
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
  if (data.pageFurnitureYaml && data.pageFurnitureYaml.items) {
    sidebarData = sidebarDataFromPageFurniture(data.pageFurnitureYaml.items);
  } else {
    sidebarData = sidebarDataFromDocumentPaths(data.allDocumentPath.edges);
  }
  return <Component className={className} languages={languages} data={sidebarData} expandMenu={expandMenu} />;
};
