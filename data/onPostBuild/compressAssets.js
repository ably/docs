"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPostBuild = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
const piscina_1 = __importDefault(require("piscina"));
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
        filename: path_1.default.join(__dirname, 'compressAssetsWorker.js'),
        maxThreads,
    });
    const compress = files.map((file) => pool.run(file));
    await Promise.all(compress);
    reporter.info(`Compressed ${pool.completed} files - ${(pool.duration / 1000).toFixed(3)}s`);
};
exports.onPostBuild = onPostBuild;
