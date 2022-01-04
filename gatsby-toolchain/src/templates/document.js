import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Html from '../components/blocks/Html';
import { LeftSideBar } from '../components/StaticQuerySidebar';
import DataTypes from '../../data/types';

const Document = ({ pageContext: { contentOrderedList }, data: { inlineTOC: { tableOfContents }} }) => {
    const elements = useMemo(() => contentOrderedList.filter(
        ({ type }) =>  Object.values(DataTypes).includes(type)
    ).map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html html={data} key={i}/>
    ), [contentOrderedList]);
    return <Layout><LeftSideBar className="col-span-1" /><article className="col-span-4">{ elements }</article></Layout>;
};

export default Document;

export const query = graphql`
    query($slug: String!) {
        document: fileHtml(slug: { eq: $slug }) {
            contentOrderedList {
                data
                type
            }
        }
        inlineTOC: fileInlineToc(slug: { eq: $slug }) {
            tableOfContents {
                content {
                    values {
                        linkTitle
                        link
                    }
                    key
                }
            }
        }
    }
`