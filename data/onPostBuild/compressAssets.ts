import { GatsbyNode } from 'gatsby';
import fastGlob from 'fast-glob';
import path from 'path';
import Piscina from 'piscina';

/**
 * This file is inspired by gatsby-plugin-zopfli and is essentially a smaller,
 * inlined version of it.
 *
 * It comes in two parts, first is the onPostBuild hook for Gatsby, which finds
 * all the assets we want to compress, and it then uses Piscina to perform the
 * compression tasks in parallel.
 *
 * The second part is the worker code, which is the code that is executed by the
 * worker threads. It's a simple function that takes in the file path and the
 * output path, and it compresses the file using the gzipAsync function.
 *
 * It all happens in this single file
 */

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ reporter }) => {
  const cwd = path.join(process.cwd(), 'public');
  const globResult = await fastGlob('**/*.{css,js,json,svg}', { cwd });

  const files = globResult.map((file) => {
    return {
      from: path.join(cwd, file),
      to: path.join(cwd, `${file}.gz`),
    };
  });

  const maxThreads = parseInt(process.env.COMPRESS_MAX_THREADS || '12', 10);

  reporter.info(`Compressing ${files.length} files with ${maxThreads} threads`);

  const pool = new Piscina({
    filename: path.join(__dirname, 'compressAssetsWorker.js'), // Use separate JavaScript worker
    maxThreads,
  });
  const compress = files.map((file) => pool.run(file));

  await Promise.all(compress);

  reporter.info(`Compressed ${pool.completed} files - ${(pool.duration / 1000).toFixed(3)}s`);
};
