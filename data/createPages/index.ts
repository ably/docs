import path from 'path';
import { writeRedirectToConfigFile, getRedirectCount } from './writeRedirectToConfigFile';
import { siteMetadata } from '../../gatsby-config';
import { GatsbyNode } from 'gatsby';
import { examples, DEFAULT_EXAMPLE_LANGUAGES } from '../../src/data/examples/';
import { Example } from '../../src/data/examples/types';

const examplesTemplate = path.resolve(`src/templates/examples.tsx`);

interface ExampleQueryResult {
  allExampleFile: {
    nodes: {
      project: string;
      projectRelativePath: string;
      language: string;
      extension: string;
      content: string;
    }[];
  };
}

interface MdxNode {
  parent: {
    relativeDirectory: string;
    name: string;
  };
  frontmatter?: {
    redirect_from?: string[];
  };
}

interface MdxRedirectsQueryResult {
  allMdx: {
    nodes: MdxNode[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage, createRedirect },
  reporter,
}) => {
  // Initialize redirect writer with reporter
  const writeRedirect = writeRedirectToConfigFile('config/nginx-redirects.conf', reporter);
  // Query our examples
  const examplesResult = await graphql<ExampleQueryResult>(`
    query {
      allExampleFile {
        nodes {
          project
          projectRelativePath
          language
          extension
          content
        }
      }
    }
  `);

  // Query for MDX pages with redirects
  const mdxRedirectsResult = await graphql<MdxRedirectsQueryResult>(`
    query {
      allMdx {
        nodes {
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
          frontmatter {
            redirect_from
          }
        }
      }
    }
  `);

  createRedirect({
    fromPath: '/',
    toPath: '/docs',
    isPermanent: true,
    redirectInBrowser: true,
  });

  if (!mdxRedirectsResult.data) {
    throw new Error('MDX redirects result is undefined');
  }

  const exampleCreator = async (exampleDatum: Example) => {
    if (!examplesResult.data) {
      throw new Error('Examples result is undefined');
    }

    const relatedFiles = examplesResult.data.allExampleFile.nodes.filter((node) => node.project === exampleDatum.id);
    const languageFiles: Record<string, Record<string, string>> = {};

    for (const language of exampleDatum.languages ?? DEFAULT_EXAMPLE_LANGUAGES) {
      const filesForLanguage = relatedFiles.reduce<Record<string, string>>((acc, file) => {
        if (file.language === language && language === 'react' && file.projectRelativePath.startsWith('src/')) {
          acc[file.projectRelativePath.replace('src/', '')] = file.content;
        } else if (file.language === language) {
          acc[file.projectRelativePath] = file.content;
        }
        return acc;
      }, {});
      languageFiles[language] = filesForLanguage;
    }

    const example = {
      ...exampleDatum,
      files: languageFiles,
    };

    createPage({
      path: `/examples/${example.id}`,
      component: examplesTemplate,
      context: {
        example,
        layout: { sidebar: false, template: 'examples' },
      },
    });
  };

  // Handle redirects for MDX files
  const mdxRedirectCreator = async (node: MdxNode) => {
    if (node.frontmatter?.redirect_from) {
      node.frontmatter.redirect_from.forEach((redirectFrom: string) => {
        const redirectFromUrl = new URL(redirectFrom, siteMetadata.siteUrl);
        // Here we don't have a slug, so we need to construct the path manually
        // from the parent node. Mdx nodes are pretty bare
        const toPath = `/${node.parent.relativeDirectory}${node.parent.name === 'index' ? '' : `/${node.parent.name}`}`;

        if (!redirectFromUrl.hash) {
          // We need to be prefix aware just like Gatsby's internals so it works
          // with nginx redirects
          writeRedirect(redirectFrom, toPath);
        } else {
          reporter.info(
            `[REDIRECTS] Skipping MDX hash fragment redirect: ${redirectFrom} (hash: ${redirectFromUrl.hash})`,
          );
        }

        createRedirect({
          fromPath: redirectFrom,
          toPath: toPath,
          isPermanent: true,
          force: true,
          redirectInBrowser: true,
        });
      });
    }
  };

  await Promise.all([
    ...examples.map(exampleCreator),
    ...mdxRedirectsResult.data.allMdx.nodes.map(mdxRedirectCreator),
  ]);

  reporter.info(`[REDIRECTS] Completed writing ${getRedirectCount()} redirects`);
};
