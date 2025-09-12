"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPostBuild = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
const piscina_1 = __importDefault(require("piscina"));
const worker_threads_1 = require("worker_threads");
const promises_1 = __importDefault(require("fs/promises"));
const zopfli_1 = require("@gfx/zopfli");
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
const onPostBuild = async ({ reporter }) => {
    const cwd = path_1.default.join(process.cwd(), 'public');
    const globResult = await (0, fast_glob_1.default)('**/*.{css,js,json,svg}', { cwd });
    const files = globResult.map((file) => {
        return {
            from: path_1.default.join(cwd, file),
            to: path_1.default.join(cwd, `${file}.gz`),
        };
    });
    const maxThreads = parseInt(process.env.COMPRESS_MAX_THREADS || '12', 10);
    reporter.info(`Compressing ${files.length} files with ${maxThreads} threads`);
    const pool = new piscina_1.default({
        filename: __filename.replace('.ts', '.js'),
        maxThreads,
    });
    const compress = files.map((file) => pool.run(file));
    await Promise.all(compress);
    reporter.info(`Compressed ${pool.completed} files - ${(pool.duration / 1000).toFixed(3)}s`);
};
exports.onPostBuild = onPostBuild;
/**
 * From here on down is the worker code that is executed by the worker threads
 * in Piscina to perform the actual compression.
 *
 * The number of iterations is set to 15 by default, but can be overridden by
 * setting the ASSET_COMPRESSION_ITERATIONS environment variable. Lower number of
 * iterations means faster compression but lower compression ratio (good for CI
 * and review apps)
 *
 */
const options = {
    numiterations: parseInt(process.env.ASSET_COMPRESSION_ITERATIONS || '15', 10),
};
const compress = async ({ from, to }) => {
    const fileContent = await promises_1.default.readFile(from, 'utf8');
    const compressedContent = await (0, zopfli_1.gzipAsync)(fileContent, options);
    await promises_1.default.writeFile(to, compressedContent);
};
// This strange bit of code is to ensure we export a default function
// when we're being called by the Piscina worker
if (!worker_threads_1.isMainThread) {
    module.exports = async ({ from, to }) => {
        await compress({ from, to });
    };
}
