const path = require('path');
const textile = require('textile-js');
const { simpleSitemapAndIndex } = require('sitemap');
const { identity } = require('lodash');
const { safeFileExists } = require('./safeFileExists');
const { flattenContentOrderedList, maybeRetrievePartial } = require('../transform');
const { postParser } = require('../transform/post-parser');
const { htmlParser } = require('../html-parser');
const { createLanguagePageVariants } = require('./createPageVariants');
const { LATEST_ABLY_API_VERSION_STRING, DOCUMENTATION_PATH, DOCUMENTATION_NAME } = require('../transform/constants');
const { createContentMenuDataFromPage } = require('./createContentMenuDataFromPage');
const { DEFAULT_LANGUAGE } = require('./constants');
const { writeRedirectToConfigFile } = require('./writeRedirectToConfigFile');

const mainWebsite = process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000';

const writeRedirect = writeRedirectToConfigFile('config/nginx-redirects.conf');

const documentTemplate = path.resolve(`src/templates/document.tsx`);
const apiReferenceTemplate = path.resolve(`src/templates/apiReference.tsx`);

const createPages = async ({ graphql, actions: { createPage, createRedirect } }) => {
  /**
   * It's not ideal to have:
   * * the reusable function `documentCreator` defined inline like this
   * * so much of `documentCreator` being imperative processing of data
   * - but Gatsby throws horrible unrelated errors (from onCreateNode) if
   * you try to extract any of this functionality into an independent composable
   * and testable function.
   */

  // DOCUMENT TEMPLATE
  const documentResult = await graphql(`
    query {
      allError {
        nodes {
          message
        }
      }
      allFileHtml(filter: { articleType: { eq: "document" } }) {
        edges {
          node {
            slug
            parentSlug
            version
            contentOrderedList {
              data
              type
            }
            meta {
              redirect_from
            }
          }
        }
      }
    }
  `);
  /**
   * We could log here, the reason we don't right now is that the error should already have been caught and logged.
   * Because Gatsby spawns a bunch of async processes during the onCreateNode step, though, and errors don't prevent
   * the onCreateNode processes from continuing, the workaround is to create Error nodes and then quit when we get
   * to the next synchronous stage in the Gatsby pipeline if any Error nodes exist.
   * It's an awkward solution and an alternative would be welcome, I'm not sure what we would do instead though.
   * We could log only during createPages and never during onCreateNode, but then if there's an error that does manage
   * to crash Gatsby somehow or the Error Node is broken, we wouldn't see the output.
   *
   * For context:
   * The original ticket here was EDX-21. When I originally detected missing meta descriptions, I wanted to
   * console.warn and continue just so editors could see the error. However it was decided that it should be a
   * requirement to always have a meta description, so the app had to avoid building while still throwing & logging
   * an error when a page didn't have a meta description.
   */
  if (documentResult.data.allError.nodes && documentResult.data.allError.nodes.length > 0) {
    process.exit(1);
  }
  // API REFERENCES TEMPLATE
  const apiReferenceResult = await graphql(`
    query {
      allFileHtml(filter: { articleType: { eq: "apiReference" } }) {
        edges {
          node {
            slug
            parentSlug
            version
            contentOrderedList {
              data
              type
            }
            meta {
              redirect_from
            }
          }
        }
      }
    }
  `);

  createRedirect({
    fromPath: '/',
    toPath: '/docs',
    isPermanent: true,
    force: true,
    redirectInBrowser: true,
  });

  const retrievePartialFromGraphQL = maybeRetrievePartial(graphql);

  const documentCreator = (documentTemplate) => async (edge) => {
    const content = flattenContentOrderedList(
      await Promise.all(edge.node.contentOrderedList.map(retrievePartialFromGraphQL)),
    )
      .map((content) => (content.data ? content.data : ''))
      .join('\n');

    const postParsedContent = postParser(textile(content));
    const contentOrderedList = htmlParser(postParsedContent);
    const contentMenu = contentOrderedList.map((item) => createContentMenuDataFromPage(item));
    const [languages, contentMenuObject] = createLanguagePageVariants(identity, documentTemplate)(
      contentOrderedList,
      edge.node.slug,
      edge.node.parentSlug,
      edge.node.version,
    );

    contentMenuObject[DEFAULT_LANGUAGE] = contentMenu;

    const script = safeFileExists(`static/scripts/${edge.node.slug}.js`);

    const pagePath = `${DOCUMENTATION_PATH}${edge.node.slug}`;

    const redirectFromList = edge.node.meta?.redirect_from;
    if (redirectFromList) {
      redirectFromList.forEach((redirectFrom) => {
        const alreadyDocsPage = /^\/docs.*/.test(redirectFrom);
        const redirectFromPath = `${alreadyDocsPage ? '' : '/docs'}${redirectFrom}`;
        const redirectFromUrl = new URL(redirectFromPath, 'https://ably.com');
        if (!redirectFromUrl.hash) {
          writeRedirect(redirectFromPath, pagePath);
        }
        createRedirect({
          fromPath: redirectFromPath,
          toPath: pagePath,
          isPermanent: true,
          force: true,
          redirectInBrowser: true,
        });
      });
    }
    const slug = edge.node.parentSlug ? edge.node.parentSlug : edge.node.slug;
    createPage({
      path: `${DOCUMENTATION_PATH}${edge.node.slug}`,
      component: documentTemplate,
      context: {
        slug,
        version: edge.node.version ?? LATEST_ABLY_API_VERSION_STRING,
        language: DEFAULT_LANGUAGE,
        languages,
        contentOrderedList,
        contentMenu: contentMenuObject,
        script,
      },
    });
    return slug;
  };

  const documentSlugs = await Promise.all(documentResult.data.allFileHtml.edges.map(documentCreator(documentTemplate)));
  const apiReferenceSlugs = await Promise.all(
    apiReferenceResult.data.allFileHtml.edges.map(documentCreator(apiReferenceTemplate)),
  );
  const allSlugs = [...documentSlugs, ...apiReferenceSlugs]
    .filter(
      (slug) =>
        !(
          // Legacy versions of pages are excluded from the sitemap (anything with a URL containing .../versions/vx.x/where x is at least one digit, e.g. v1.1, v1.2
          (
            /\/\b(versions)\b\/(v)[0-9]./.test(slug) ||
            // Urls with /docs/code-
            /\/\b(docs)\/\b(code-)/.test(path) ||
            // anything with a URL beginning with /docs/tutorials
            /\/\b(docs)\b\/(tutorials)\//.test(path) ||
            // /documentation/
            /\/\b(documentation)\/$/.test(path) ||
            // Exclude root domain url
            path === '/'
          )
        ),
    )
    .map((slug) => slug.replace(/\/$/, ''));
  const docsPrefix = `/${DOCUMENTATION_NAME}`;
  const sitemap = await Promise.all(
    allSlugs.map(async (slug) => ({
      url: `${docsPrefix}/${slug}`,
    })),
  );
  const sitemapPublicPath = path.posix.join('', docsPrefix);
  const sitemapWritePath = path.join(`public`, docsPrefix);

  simpleSitemapAndIndex({
    hostname: mainWebsite,
    publicBasePath: sitemapPublicPath,
    destinationDir: sitemapWritePath,
    sourceData: sitemap,
    gzip: false,
  });
};

module.exports = { createPages };
