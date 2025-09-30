#!/usr/bin/env node

/**
 * Validates that markdown files exist for all HTML pages in the public directory.
 * This script ensures the markdown generation process completed successfully.
 */

import * as fs from 'fs';
import * as path from 'path';
import fastGlob from 'fast-glob';

const publicDir = path.join(process.cwd(), 'public', 'docs');

// Constants for content validation (must match generateMarkdown.ts)
const REDIRECT_PAGE_MAX_SIZE = 1000; // Maximum size in bytes for redirect pages

interface ValidationResult {
  totalPages: number;
  markdownFound: number;
  markdownMissing: number;
  redirectPages: number;
  missingFiles: string[];
}

const validateMarkdownFiles = async (): Promise<ValidationResult> => {
  // Find all index.html files in the docs directory
  const htmlFiles = await fastGlob('**/index.html', {
    cwd: publicDir,
    absolute: false,
  });

  const result: ValidationResult = {
    totalPages: htmlFiles.length,
    markdownFound: 0,
    markdownMissing: 0,
    redirectPages: 0,
    missingFiles: [],
  };

  for (const htmlFile of htmlFiles) {
    // Get the directory of the HTML file
    const dir = path.dirname(htmlFile);

    // Check if this is a redirect page (skip validation for these)
    const htmlPath = path.join(publicDir, htmlFile);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    if (htmlContent.length < REDIRECT_PAGE_MAX_SIZE && htmlContent.includes('window.location.href')) {
      result.redirectPages++;
      continue; // Skip redirect pages
    }

    // Check if corresponding markdown file exists
    const markdownFile = path.join(publicDir, dir, 'index.md');

    if (fs.existsSync(markdownFile)) {
      result.markdownFound++;

      // Verify the markdown file has content
      const stats = fs.statSync(markdownFile);
      if (stats.size === 0) {
        console.warn(`⚠️  Warning: ${dir}/index.md is empty`);
      }
    } else {
      result.markdownMissing++;
      result.missingFiles.push(dir);
    }
  }

  return result;
};

const main = async () => {
  console.log('🔍 Validating markdown files...\n');

  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Error: Public docs directory not found: ${publicDir}`);
    console.error('   Make sure to run this script after the build process.');
    process.exit(1);
  }

  try {
    const result = await validateMarkdownFiles();

    console.log(`📊 Validation Results:`);
    console.log(`   Total HTML pages: ${result.totalPages}`);
    console.log(`   🔀 Redirect pages (skipped): ${result.redirectPages}`);
    console.log(`   📄 Content pages: ${result.totalPages - result.redirectPages}`);
    console.log(`   ✅ Markdown files found: ${result.markdownFound}`);
    console.log(`   ❌ Markdown files missing: ${result.markdownMissing}`);

    if (result.markdownMissing > 0) {
      console.log('\n⚠️  Missing markdown files:');
      result.missingFiles.slice(0, 10).forEach((file) => {
        console.log(`   - ${file}/index.md`);
      });

      if (result.missingFiles.length > 10) {
        console.log(`   ... and ${result.missingFiles.length - 10} more`);
      }

      console.log('\n❌ Validation failed: Some markdown files are missing.');
      console.log('   This may indicate an issue with the markdown generation process.');
      process.exit(1);
    }

    // Calculate coverage percentage
    const coverage = (result.markdownFound / result.totalPages) * 100;
    console.log(`\n✅ Validation passed! Markdown coverage: ${coverage.toFixed(1)}%`);
  } catch (error) {
    console.error('❌ Error during validation:', error);
    process.exit(1);
  }
};

main();
