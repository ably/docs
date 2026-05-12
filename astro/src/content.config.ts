import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Pulls MDX pages straight out of the Gatsby tree — no copy, no symlink.
 * The glob base is resolved relative to this astro project root, so
 * `../src/pages/docs` resolves to the Gatsby project's docs content.
 *
 * This is the "can Astro read the existing content in place?" test.
 */
export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: '**/*.mdx',
      base: '../src/pages/docs',
    }),
    schema: z
      .object({
        title: z.string(),
        meta_description: z.string().optional(),
        meta_keywords: z.string().optional(),
        intro: z.string().optional(),
        redirect_from: z.array(z.string()).nullable().optional(),
        languages: z.array(z.string()).nullable().optional(),
      })
      // The real content uses more fields than we've catalogued yet — keep the
      // schema permissive so unknown keys don't fail the build during the PoC.
      .passthrough(),
  }),
};
