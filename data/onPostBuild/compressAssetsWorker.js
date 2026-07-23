const fs = require('fs/promises');
const { gzipAsync } = require('@gfx/zopfli');

const options = {
  // Default 1: zopfli's deflate ratio plateaus after the first iteration
  // (<0.5% byte savings vs. 5/15 for 25-45% more time per file). Set
  // ASSET_COMPRESSION_ITERATIONS higher for production if max ratio is wanted.
  numiterations: parseInt(process.env.ASSET_COMPRESSION_ITERATIONS || '1', 10),
};

const compress = async ({ from, to }) => {
  const fileContent = await fs.readFile(from, 'utf8');
  const compressedContent = await gzipAsync(fileContent, options);
  await fs.writeFile(to, compressedContent);
};

module.exports = compress;
