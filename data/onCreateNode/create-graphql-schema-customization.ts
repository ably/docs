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
      title: String
      redirect_from: [String]
      product: String
    }
    type FileHtml implements Node {
      contentOrderedList: [FileHtmlContentOrderedListItem]
      meta: FileHtmlMetaData
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
      addsearchSiteKey: String
      gtmContainerId: String
      headwayAccountId: String
      boomerangEnabled: String
      announcementEnabled: String
      oneTrustEnabled: String
      oneTrustDomain: String
      oneTrustTest: String
      inkeepEnabled: String
      inkeepApiKey: String
      inkeepIntegrationId: String
      inkeepOrganizationId: String
    }

    type SiteSiteMetadata implements Node {
      title: String
      siteUrl: String
      externalScriptsData: ExternalScriptData
    }
  `;
  createTypes(siteTypes);
};
