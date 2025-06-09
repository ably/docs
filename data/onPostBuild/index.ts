import { GatsbyNode } from 'gatsby';
import { onPostBuild as llmstxt } from './llmstxt';
import { onPostBuild as compressAssets } from './compressAssets';
import { onPostBuild as markdownOutput } from './markdownOutput';

export const onPostBuild: GatsbyNode['onPostBuild'] = async (args) => {
  // Run all onPostBuild functions in sequence
  await llmstxt(args);
  await markdownOutput(args);
  await compressAssets(args);
};
