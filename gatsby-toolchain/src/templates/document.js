import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Html from '../components/blocks/Html';

const Document = ({ pageContext: { contentOrderedList } }) => {
    const elements = useMemo(() => contentOrderedList.filter(
        ({ type }) => type === 'Html'
    ).map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html html={data} key={i}/>
    ), [contentOrderedList]);
    return <Layout>{ elements }</Layout>;
};

export default Document;

export const query = graphql`
    query($slug: String!) {
        document: fileHtml(slug: { eq: $slug }) {
            slug
            contentOrderedList {
                data
                type
            }
        }
    }
`