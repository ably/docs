import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Sidebar from '../Sidebar';
import { sidebarDataFromDocumentPaths, sidebarDataFromPageFurniture } from './data';


const LeftSideBar = ({ className }) => {
    const data = useStaticQuery(graphql`
        fragment SubMenuFields on PageFurnitureYaml {
            label
            link
            level
            contentString
        }
        query {
            pageFurnitureYaml(name:{eq: "LeftSidebarMenu"}) {
                contentArray {
                    ...SubMenuFields
                    contentArray {
                        ...SubMenuFields
                        contentArray {
                            ...SubMenuFields
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
    if(data.pageFurnitureYaml && data.pageFurnitureYaml.contentArray) {
        sidebarData = sidebarDataFromPageFurniture(data.pageFurnitureYaml.contentArray);
    } else {
        sidebarData = sidebarDataFromDocumentPaths(data.allDocumentPath.edges);
    }
    return <Sidebar className={ className } data={ sidebarData } />;
}

export { LeftSideBar };