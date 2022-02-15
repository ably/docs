import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Html from '../components/blocks/Html';
import { LeftSideBar } from '../components/StaticQuerySidebar';
import PageLanguageContext from '../contexts/page-language-context';
import Article from '../components/Article';
import { IGNORED_LANGUAGES } from "../../data/createPages/constants";
import { H1 } from '../components/blocks/headings';
import VersionMenu from '../components/Menu/version-menu';
import RightSidebar from '../components/Sidebar/RightSidebar';

const Document = ({
    pageContext: {
        contentOrderedList,
        language,
        languages,
        version,
        contentMenu,
        slug
    },
    data: { inlineTOC: { tableOfContents },
    document: {
        meta: { title }
    },
    versions
 } }) => {
    const filteredLanguages = useMemo(() =>
        languages
            .filter(language => /^[^,]+$/.test(language))
            .filter(language => !IGNORED_LANGUAGES.includes(language)),
        [languages]
    );
    const elements = useMemo(() => contentOrderedList.map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i}/>
    ), [contentOrderedList]);

    return <PageLanguageContext.Provider value={ language }>
        <Layout languages={filteredLanguages }>
            <LeftSideBar className="col-span-1 px-16" />
            <Article columns={3}>
                <H1 data={ title } attribs={{ id: 'title' }} />
                <VersionMenu versions={ versions.edges } version={ version } rootVersion={ slug }/>
                {elements}
            </Article>
            <RightSidebar className="col-span-1 px-16" menuData={contentMenu[0]}/>
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
        versions: allFileHtmlVersion(filter: { parentSlug: {eq: $slug }}) {
            edges {
                node {
                    parentSlug
                    slug
                    version
                }
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
`;
