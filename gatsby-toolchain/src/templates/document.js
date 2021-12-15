import React, { useMemo } from 'react';
import { graphql } from 'gatsby';

const Html = ({ html }) => <section dangerouslySetInnerHTML={{__html: html }}></section>;

const Document = ({ pageContext: { contentOrderedList } }) => {
    const elements = useMemo(() => contentOrderedList.filter(
        ({ type }) => type === 'Html'
    ).map(
        // It is currently safe to use an index as a key.
        // We will need a unique key to alter any of these.
        ({ data }, i) => <Html html={data} key={i}/>
    ), [contentOrderedList]);
    return <main>{ elements }</main>;
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