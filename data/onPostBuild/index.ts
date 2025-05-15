import { GatsbyNode } from 'gatsby';
import { onPostBuild as llmstxt } from './llmstxt';

export const onPostBuild: GatsbyNode['onPostBuild'] = async (args) => {
  // Run all onPostBuild functions in sequence
  await llmstxt(args);
};
