import { GatsbyNode } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type FileHtmlContentOrderedListItem {
      data: String!
      type: String!
    }
    type FileHtmlMetaData {
      languages: [String]
      meta_description: String
      meta_keywords: String
      title: String
      redirect_from: [String]
      product: String
    }
    type FileHtml implements Node {
      articleType: String
      slug: String
      version: String
      contentOrderedList: [FileHtmlContentOrderedListItem]
      meta: FileHtmlMetaData
    }
    type MdxFrontmatter implements Node {
      title: String
      meta_description: String
      meta_keywords: String
      redirect_from: [String]
    }
    type HowToHtml implements Node {
      slug: String
      tutorial: Node
    }
    type HowToSourceFile implements Node {
      howToName: String!
      srcPath: String!
    }
    type Error implements Node {
      message: String
    }
  `;
  createTypes(typeDefs);

  // Schema update for site
  const siteTypes = `
    # We always want an assetPrefix
    type Site implements Node {
      assetPrefix: String
    }

    # Extend site metadata with external script config
    type ExternalScriptData implements Node {
      hubspotTrackingId: String
      gtmContainerId: String
      headwayAccountId: String
      announcementEnabled: String
      oneTrustEnabled: String
      oneTrustDomain: String
      oneTrustTest: String
      inkeepChatEnabled: Boolean
      inkeepSearchEnabled: Boolean
      inkeepApiKey: String
      insightsEnabled: Boolean
      insightsDebug: Boolean
      mixpanelApiKey: String
      mixpanelAutoCapture: Boolean
      posthogApiKey: String
      posthogApiHost: String
      conversationsUrl: String
    }

    type SiteSiteMetadata implements Node {
      title: String
      siteUrl: String
      externalScriptsData: ExternalScriptData
    }
  `;
  createTypes(siteTypes);
};
