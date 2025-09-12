const fs = require('fs/promises');
const { gzipAsync } = require('@gfx/zopfli');

const options = {
  numiterations: parseInt(process.env.ASSET_COMPRESSION_ITERATIONS || '15', 10),
};

const compress = async ({ from, to }) => {
  const fileContent = await fs.readFile(from, 'utf8');
  const compressedContent = await gzipAsync(fileContent, options);
  await fs.writeFile(to, compressedContent);
};

module.exports = compress;
