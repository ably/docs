import React from 'react';
import { graphql } from 'gatsby';
import { Head } from '../../../components/Head';
import ChangelogContent from '../../../components/Changelog/ChangelogContent';
import { ChangelogFileNode, nodesToEntries } from '../../../components/Changelog/entries';
import { ImageProps } from '../../../components/Image';
import { CHANGELOG_DEFAULT_OG_IMAGE, CHANGELOG_DEFAULT_OG_IMAGE_ALT } from '../../../components/Changelog/og-image';
import { CHANGELOG_PATH, CHANGELOG_RSS_PATH } from '../../../components/Changelog/constants';
import { useSiteMetadata } from '../../../hooks/use-site-metadata';

const Changelog = ({
  data: { entries: entryFiles, allFile },
}: {
  data: { entries: { nodes: ChangelogFileNode[] }; allFile: { images: ImageProps[] } };
}) => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl(CHANGELOG_PATH);
  const meta_title = 'Ably Changelog - Product Updates, Releases and Fixes';
  const meta_description =
    'New features, improvements, and fixes across the Ably platform and SDKs, including Pub/Sub, Chat, Spaces, LiveObjects, LiveSync, and AI Transport.';

  // Entry pages are the .mdx files under src/pages/docs/changelog/ (nested by
  // year/month, e.g. 2026/06/<slug>.mdx). The query scopes to those files; the
  // shared helper validates and builds each entry's path. Ordering is driven by the
  // `date` frontmatter, not the folder, so the nesting doesn't affect order.
  const entries = nodesToEntries(entryFiles.nodes);

  return (
    <>
      <Head
        title={meta_title}
        metaTitle={meta_title}
        canonical={canonical}
        description={meta_description}
        ogImage={CHANGELOG_DEFAULT_OG_IMAGE}
        ogImageAlt={CHANGELOG_DEFAULT_OG_IMAGE_ALT}
        rssUrl={canonicalUrl(CHANGELOG_RSS_PATH)}
        rssTitle="Ably Changelog"
      />
      <ChangelogContent entries={entries} images={allFile.images} />
    </>
  );
};

export default Changelog;

export const query = graphql`
  query ChangelogIndex {
    entries: allFile(
      filter: {
        sourceInstanceName: { eq: "pages" }
        extension: { eq: "mdx" }
        relativeDirectory: { regex: "/^docs/changelog(/|$)/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childMdx {
          frontmatter {
            title
            meta_description
            date
            products
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "images" }, relativeDirectory: { eq: "changelog" } }) {
      images: nodes {
        extension
        base
        publicURL
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;
