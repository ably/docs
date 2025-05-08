import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const LLMS_FILE = path.join(PUBLIC_DIR, 'llms.txt');

function countHtmlFiles(): number {
  const htmlFiles = glob.sync('**/*.html', { cwd: PUBLIC_DIR });
  return htmlFiles.length;
}

function countLlmsLines(): number {
  const content = fs.readFileSync(LLMS_FILE, 'utf-8');
  return content.split('\n').filter((line) => line.trim().length > 0).length;
}

function validateCounts(htmlCount: number, llmsCount: number): boolean {
  const difference = Math.abs(htmlCount - llmsCount);
  const maxAllowedDifference = Math.ceil(htmlCount * 0.75); // 75% of html count
  return difference <= maxAllowedDifference;
}

function main() {
  try {
    const htmlCount = countHtmlFiles();
    const llmsCount = countLlmsLines();
    const isValid = validateCounts(htmlCount, llmsCount);

    console.log(`HTML files found: ${htmlCount}`);
    console.log(`Lines in llms.txt: ${llmsCount}`);

    if (!isValid) {
      console.error(
        `Error: The number of lines in llms.txt (${llmsCount}) is not within 75% of the number of HTML files (${htmlCount})`,
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
