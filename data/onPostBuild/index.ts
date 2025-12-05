import { GatsbyNode } from 'gatsby';
import { onPostBuild as llmstxt } from './llmstxt';
import { onPostBuild as transpileMdxToMarkdown } from './transpileMdxToMarkdown';
import { onPostBuild as compressAssets } from './compressAssets';

export const onPostBuild: GatsbyNode['onPostBuild'] = async (args) => {
  // Run all onPostBuild functions in sequence
  await llmstxt(args);
  await transpileMdxToMarkdown(args);
  await compressAssets(args);
};
