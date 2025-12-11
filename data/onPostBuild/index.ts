import { GatsbyNode, Reporter } from 'gatsby';
import { onPostBuild as llmstxt } from './llmstxt';
import { onPostBuild as compressAssets } from './compressAssets';
import { validateRedirectFile, REDIRECT_FILE_PATH } from '../utils/validateRedirectFile';

const validateRedirects = async (reporter: Reporter): Promise<void> => {
  reporter.info(`[REDIRECTS] Validating redirect file...`);

  const result = validateRedirectFile({
    minRedirects: 10, // arbitrarily small, just enough to get a sense of if things are healthy
    validateFormat: true,
  });

  // Report errors
  if (result.errors.length > 0) {
    result.errors.forEach((error) => reporter.error(`[REDIRECTS] ${error}`));
    reporter.panicOnBuild(
      `CRITICAL: ${REDIRECT_FILE_PATH} validation failed. This will cause all redirects to fail in production!`,
    );
    return;
  }

  // Report warnings
  result.warnings.forEach((warning) => reporter.warn(`[REDIRECTS] ${warning}`));

  // Report success
  reporter.info(`[REDIRECTS] ✓ Validation passed: ${result.lineCount} redirects found`);
};

export const onPostBuild: GatsbyNode['onPostBuild'] = async (args) => {
  // Validate redirects first - fail fast if there's an issue
  await validateRedirects(args.reporter);

  // Run all onPostBuild functions in sequence
  await llmstxt(args);
  await compressAssets(args);
};
