#!/usr/bin/env ts-node

/**
 * Copy example images from src/images/examples to public/images/examples
 * This makes them available for the examples list page
 */

import fs from 'fs';
import path from 'path';

const SOURCE_DIR = path.join(process.cwd(), 'src/images/examples');
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/examples');

async function copyExampleImages() {
  console.log('Copying example images...');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  if (!fs.existsSync(SOURCE_DIR)) {
    console.warn(`Source directory not found: ${SOURCE_DIR}`);
    return;
  }

  const files = fs.readdirSync(SOURCE_DIR);
  let count = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) {
      const sourcePath = path.join(SOURCE_DIR, file);
      const destPath = path.join(OUTPUT_DIR, file);
      fs.copyFileSync(sourcePath, destPath);
      count++;
    }
  }

  console.log(`Copied ${count} example images to ${OUTPUT_DIR}`);
}

copyExampleImages().catch(console.error);
