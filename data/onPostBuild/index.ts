import { GatsbyNode } from 'gatsby';
import { onPostBuild as llmstxt } from './llmstxt';
import { onPostBuild as generateMarkdown } from './generateMarkdown';
import { onPostBuild as compressAssets } from './compressAssets';

export const onPostBuild: GatsbyNode['onPostBuild'] = async (args) => {
  // Run all onPostBuild functions in sequence
  await llmstxt(args);
  await generateMarkdown(args);
  await compressAssets(args);
};
