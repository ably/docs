import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Html from '../components/blocks/Html';
import { LeftSideBar } from '../components/StaticQuerySidebar';
import DataTypes from '../../data/types';
import PageLanguageContext from '../contexts/page-language-context';
import Article from '../components/Article';
import { IGNORED_LANGUAGES } from '../../data/createPages/createPageVariants';
import { H1 } from '../components/blocks/headings';

const Document = ({ pageContext: { contentOrderedList, language, languages }, data: { inlineTOC: { tableOfContents }, document: {
    meta: { title }
} } }) => {
    const filteredLanguages = useMemo(() =>
        languages
            .filter(language => /^[^,]+$/.test(language))
            .filter(language => !IGNORED_LANGUAGES.includes(language)),
        [languages]
    );
    const elements = useMemo(() => contentOrderedList.filter(
        ({ type }) =>  Object.values(DataTypes).includes(type)
    ).map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i}/>
    ), [contentOrderedList]);

    return <PageLanguageContext.Provider value={ language }>
        <Layout languages={filteredLanguages }>
            <LeftSideBar className="col-span-1 px-8" />
            <Article>
                <H1 data={ title } attribs={{ id: 'title' }} />
                {elements}
            </Article>
        </Layout>
    </PageLanguageContext.Provider>;
};

export default Document;

export const query = graphql`
    query($slug: String!) {
        document: fileHtml(slug: { eq: $slug }) {
            meta {
                title
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