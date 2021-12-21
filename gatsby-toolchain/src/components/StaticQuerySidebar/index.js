import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Sidebar from '../Sidebar';

const sidebarDataFromData = data => data.map(({ label, link, level = 3, contentString = false, contentArray = false }) => {
    const result = {
        label,
        link,
        level,
        content: contentArray ? sidebarDataFromData(contentArray) : contentString
    }
    return result;
})

const LeftSideBar = () => {
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
        }
    `);
    let sidebarData;
    if(data.pageFurnitureYaml.contentArray) {
        sidebarData = sidebarDataFromData(data.pageFurnitureYaml.contentArray);
    } else {
        sidebarData = [{link: 'href', label: 'label'}];
    }
    return <Sidebar data={ sidebarData } />;
}

export { LeftSideBar };