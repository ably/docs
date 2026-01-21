/**
 * Utilities for generating URLs for LLM/agent discoverability.
 * Used by Head.tsx and MDXWrapper.tsx to provide consistent URL generation.
 */

/**
 * Converts a canonical URL to its markdown equivalent for LLM/agent discovery.
 * Example: https://ably.com/docs/channels -> https://ably.com/docs/channels.md
 * Example: https://ably.com/docs/channels/ -> https://ably.com/docs/channels.md
 */
export const getMarkdownUrl = (canonical: string): string => {
  try {
    const url = new URL(canonical);
    const pathnameWithoutTrailingSlash = url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;
    url.pathname = `${pathnameWithoutTrailingSlash}.md`;
    return url.toString();
  } catch {
    // Fallback for relative URLs or non-standard inputs
    const withoutTrailingSlash = canonical.endsWith('/') ? canonical.slice(0, -1) : canonical;
    return `${withoutTrailingSlash}.md`;
  }
};

/**
 * Gets the base URL for llms.txt from a canonical URL.
 * Example: https://ably.com/docs/channels -> https://ably.com/llms.txt
 */
export const getLlmsTxtUrl = (canonical: string): string => {
  try {
    const url = new URL(canonical);
    return `${url.origin}/llms.txt`;
  } catch {
    // Fallback for relative URLs or parsing errors
    return '/llms.txt';
  }
};
