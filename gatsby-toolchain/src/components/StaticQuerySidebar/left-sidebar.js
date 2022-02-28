import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import { sidebarDataFromDocumentPaths, sidebarDataFromPageFurniture } from './data';
import { EXPAND_MENU } from '../Sidebar/consts';

const LeftSideBar = ({ className }) => {
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
  return <Sidebar className={className} data={sidebarData} expandMenu={EXPAND_MENU.COLLAPSE_NEXT} />;
};

LeftSideBar.propTypes = {
  className: PropTypes.string,
};

export { LeftSideBar };
