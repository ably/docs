import * as fs from 'fs';
import * as path from 'path';
import fastGlob from 'fast-glob';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const LLMS_FILE = path.join(PUBLIC_DIR, 'llms.txt');

function countHtmlFiles(): number {
  const htmlFiles = fastGlob.sync('docs/**/*.html', { cwd: PUBLIC_DIR });

  const contentFiles = htmlFiles.filter((file) => {
    // Exclude versioned redirect pages
    if (file.includes('/versions/')) {
      return false;
    }

    // Exclude root index (not documentation content)
    if (file === 'index.html') {
      return false;
    }

    return true;
  });

  return contentFiles.length;
}

function countLlmsPages(): { totalLines: number; uniquePages: number } {
  const content = fs.readFileSync(LLMS_FILE, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim().length > 0);

  // Extract unique page URLs (without ?lang= parameters)
  const uniqueUrls = new Set<string>();

  lines.forEach((line) => {
    // Skip the header line
    if (line.startsWith('#')) {
      return;
    }

    // Extract URL from markdown link format: - [Title](URL): Description
    const urlMatch = line.match(/\[.*?\]\((.*?)\)/);
    if (urlMatch) {
      const url = urlMatch[1];
      // Remove lang parameter to get base URL
      const baseUrl = url.split('?')[0];
      uniqueUrls.add(baseUrl);
    }
  });

  return {
    totalLines: lines.length,
    uniquePages: uniqueUrls.size,
  };
}

function validateCounts(htmlCount: number, uniquePageCount: number): boolean {
  // With language-specific URLs, we expect to have a reasonable coverage of the HTML files
  // The unique page count should be at least 50% of the HTML count (allowing for pages not captured by our GraphQL queries)
  // and at most 100% (we shouldn't have more unique pages than HTML files)
  const coverage = uniquePageCount / htmlCount;
  const minCoverage = 0.5; // At least 50% coverage
  const maxCoverage = 1.0; // At most 100% coverage

  return coverage >= minCoverage && coverage <= maxCoverage;
}

function main() {
  try {
    const htmlCount = countHtmlFiles();
    const { totalLines, uniquePages } = countLlmsPages();
    const isValid = validateCounts(htmlCount, uniquePages);

    console.log(`HTML files found: ${htmlCount}`);
    console.log(`Total lines in llms.txt: ${totalLines}`);
    console.log(`Unique pages in llms.txt: ${uniquePages}`);
    console.log(`Coverage: ${Math.round((uniquePages / htmlCount) * 100)}%`);

    if (!isValid) {
      console.error(
        `Error: The coverage of unique pages in llms.txt (${Math.round((uniquePages / htmlCount) * 100)}%) is not within the acceptable range of 50-100% of HTML files (${htmlCount})`,
      );
      process.exit(1);
    }

    console.log('Validation successful!');
  } catch (error) {
    console.error('Error during validation:', error);
    process.exit(1);
  }
}

main();
