import React from 'react';
import { graphql } from 'gatsby';

export default function Document(props) {
    console.log(props);
    return <p>Placeholder</p>;
}

export const query = graphql`
    query($slug: String!) {
        document: fileHtml(slug: { eq: $slug }) {
            contentOrderedList {
                data
                type
            }
        }
    }
`