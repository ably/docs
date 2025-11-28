#!/usr/bin/env node

/**
 * Standalone CLI script for generating language-specific markdown files
 *
 * Usage:
 *   yarn generate-markdown
 *   yarn generate-markdown --mode=simple
 *   yarn generate-markdown --pages "docs/realtime/*"
 *   yarn generate-markdown --languages "javascript,python"
 *   yarn generate-markdown --help
 */

import dotenv from 'dotenv';
import { exportToMarkdown } from '../data/onPostBuild/markdownOutput';
import { exportToMarkdownWithLanguages } from '../data/onPostBuild/markdownOutputWithLanguages';

// Mock reporter for standalone execution
class ConsoleReporter {
  info(message: string) {
    console.log(`ℹ️  ${message}`);
  }

  warn(message: string) {
    console.warn(`⚠️  ${message}`);
  }

  error(message: string, error?: Error) {
    console.error(`❌ ${message}`);
    if (error) {
      console.error(error);
    }
  }

  verbose(message: string) {
    if (process.env.VERBOSE === 'true') {
      console.log(`🔍 ${message}`);
    }
  }

  panicOnBuild(message: string) {
    console.error(`💥 PANIC: ${message}`);
    process.exit(1);
  }
}

interface CliOptions {
  mode: 'simple' | 'advanced';
  env?: string;
  pages?: string;
  languages?: string;
  siteUrl?: string;
  verbose: boolean;
  help: boolean;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    mode: 'advanced',
    env: process.env.NODE_ENV || 'production',
    pages: undefined,
    languages: undefined,
    siteUrl: process.env.GATSBY_ABLY_MAIN_WEBSITE || 'https://ably.com',
    verbose: false,
    help: false,
  };

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg.startsWith('--mode=')) {
      const mode = arg.split('=')[1];
      if (mode === 'simple' || mode === 'advanced') {
        options.mode = mode;
      } else {
        console.error(`Invalid mode: ${mode}. Must be "simple" or "advanced"`);
        process.exit(1);
      }
    } else if (arg.startsWith('--env=')) {
      options.env = arg.split('=')[1];
    } else if (arg.startsWith('--pages=')) {
      options.pages = arg.split('=')[1];
    } else if (arg.startsWith('--languages=')) {
      options.languages = arg.split('=')[1];
    } else if (arg.startsWith('--site-url=')) {
      options.siteUrl = arg.split('=')[1];
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Generate language-specific markdown files from built HTML

Usage:
  yarn generate-markdown [options]

Options:
  --mode=<mode>          Export mode: "simple" or "advanced" (default: advanced)
  --env=<environment>    Environment to load (.env.<environment>)
  --pages=<pattern>      Glob pattern to filter pages (e.g., "docs/realtime/*")
  --languages=<list>     Comma-separated language list (e.g., "javascript,python")
  --site-url=<url>       Site URL for absolute links
  --verbose, -v          Enable verbose logging
  --help, -h             Show this help message

Examples:
  yarn generate-markdown
  yarn generate-markdown --mode=simple
  yarn generate-markdown --pages="docs/realtime/*"
  yarn generate-markdown --languages="javascript,python" --verbose

Environment Variables:
  MARKDOWN_SIMPLE_MODE   Force simple mode (set to 'true')
  ASSET_PREFIX           Asset prefix for rewriting URLs
  VERBOSE                Enable verbose logging
  `);
}

async function loadEnvironment(env?: string) {
  // Load environment variables
  const envFile = env ? `.env.${env}` : `.env.${process.env.NODE_ENV || 'production'}`;

  dotenv.config({ path: envFile });

  console.log(`📦 Loaded environment from ${envFile}`);
}

async function main() {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  // Set verbose mode
  if (options.verbose) {
    process.env.VERBOSE = 'true';
  }

  // Load environment
  await loadEnvironment(options.env);

  const reporter = new ConsoleReporter() as any;
  const siteUrl = options.siteUrl || process.env.GATSBY_ABLY_MAIN_WEBSITE || 'https://ably.com';

  console.log('');
  console.log('🚀 Starting markdown generation...');
  console.log('');
  console.log(`   Mode: ${options.mode}`);
  console.log(`   Site URL: ${siteUrl}`);
  console.log(`   Environment: ${options.env}`);

  if (options.pages) {
    console.log(`   Pages filter: ${options.pages}`);
  }

  if (options.languages) {
    console.log(`   Languages: ${options.languages}`);
  }

  if (process.env.ASSET_PREFIX) {
    console.log(`   Asset Prefix: ${process.env.ASSET_PREFIX}`);
  }

  console.log('');

  const startTime = Date.now();

  try {
    if (options.mode === 'simple') {
      // Simple mode
      await exportToMarkdown(
        { reporter, siteUrl },
        { advancedMode: false }
      );
    } else {
      // Advanced mode with language support
      const assetPrefix = process.env.ASSET_PREFIX;

      if (options.pages || options.languages) {
        reporter.warn('Page and language filtering not yet implemented, generating all pages/languages');
        // TODO: Implement filtering by passing options to exportToMarkdownWithLanguages
      }

      await exportToMarkdownWithLanguages({
        reporter,
        siteUrl,
        assetPrefix,
      });
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('');
    console.log(`✅ Markdown generation complete in ${duration}s`);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Markdown generation failed:');
    console.error(error);
    console.error('');

    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Run main function
main();
