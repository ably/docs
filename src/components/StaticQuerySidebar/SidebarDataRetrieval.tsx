import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { EXPAND_MENU, SidebarProps } from 'src/components';

import { sidebarDataFromDocumentPaths, sidebarDataFromPageFurniture } from './data';
import { LeftSidebarProps } from './LeftSideBar';
import { ArticleType } from '../../contexts/article-type-context';
import { ARTICLE_TYPES } from '../../../data/transform/constants';

export const SidebarDataRetrieval = ({
  className,
  languages,
  expandMenu,
  articleType,
  Component,
}: LeftSidebarProps & {
  articleType: ArticleType;
  expandMenu: EXPAND_MENU;
  Component: React.FunctionComponent<SidebarProps>;
}) => {
  const data = useStaticQuery(graphql`
    fragment SubMenuFields on PageFurnitureYaml {
      label
      link
      level
      tutorial
      text
    }
    query {
      LeftSidebar: pageFurnitureYaml(name: { eq: "LeftSidebarMenu" }) {
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
  if (data.LeftSidebar || data.ApiLeftSidebar) {
    const sideBarItems =
      articleType === ARTICLE_TYPES.apiReference ? data.ApiLeftSidebar.items : data.LeftSidebar.items;
    sidebarData = sidebarDataFromPageFurniture(sideBarItems);
  } else {
    sidebarData = sidebarDataFromDocumentPaths(data.allDocumentPath.edges);
  }
  console.log(sidebarData);
  return (
    <Component
      className={className}
      languages={languages}
      data={sidebarData}
      expandMenu={expandMenu}
      articleType={articleType}
    />
  );
};
