# Language-Specific Markdown Generation

This implementation generates language-specific markdown files from HTML pages with React-based language selectors.

## Overview

The system can operate in two modes:

1. **Simple Mode** (legacy): Converts static HTML to markdown without language awareness
2. **Advanced Mode** (new): Hydrates React, switches languages, and generates separate markdown files per language

## How It Works

### Advanced Mode (Default)

1. **Load HTML**: Reads built HTML files from `./public`
2. **Setup JSDOM**: Creates a browser-like environment with React support
3. **Asset Rewriting**: Rewrites `ASSET_PREFIX` URLs to local paths (since assets aren't deployed yet)
4. **React Hydration**: Loads and executes Gatsby bundles (webpack-runtime, framework, app, page bundles)
5. **Language Detection**: Identifies available languages from:
   - Language selector DOM elements
   - Page metadata
   - Product-based language data (`src/data/languages/languageData.ts`)
6. **Language Switching**: For each language:
   - Updates URL search params (`?lang=javascript`)
   - Triggers React re-render
   - Waits for content to update
7. **Content Extraction**: Extracts main content and converts to markdown
8. **File Generation**: Saves as `page.{language}.md` (e.g., `docs/realtime/channels.javascript.md`)

### File Naming Convention

- **With languages**: `/docs/foo/index.html` → `/docs/foo.javascript.md`, `/docs/foo.python.md`, etc.
- **Without languages**: `/docs/foo/index.html` → `/docs/foo.md` (current behavior)

## Usage

### During Build (Automatic)

Advanced mode runs automatically after each build:

```bash
yarn build
```

To force simple mode:

```bash
MARKDOWN_SIMPLE_MODE=true yarn build
```

### Standalone Script

Generate markdown without rebuilding the site:

```bash
# Default (advanced mode, all pages, all languages)
yarn generate-markdown

# Simple mode (static HTML conversion)
yarn generate-markdown:simple

# Verbose logging
yarn generate-markdown:verbose

# Custom options
node scripts/generate-language-markdown.ts --mode=advanced --verbose
```

#### CLI Options

```
--mode=<mode>          Export mode: "simple" or "advanced" (default: advanced)
--env=<environment>    Environment to load (.env.<environment>)
--pages=<pattern>      Glob pattern to filter pages (e.g., "docs/realtime/*")
--languages=<list>     Comma-separated languages (e.g., "javascript,python")
--site-url=<url>       Site URL for absolute links
--verbose, -v          Enable verbose logging
--help, -h             Show help message
```

### Examples

```bash
# Generate for specific pages
yarn generate-markdown --pages="docs/realtime/*"

# Generate specific languages only
yarn generate-markdown --languages="javascript,python" --verbose

# Use different environment
yarn generate-markdown --env=staging
```

## Environment Variables

- `ASSET_PREFIX`: Asset CDN URL (automatically rewritten to local paths)
- `MARKDOWN_SIMPLE_MODE`: Set to `'true'` to force simple mode
- `VERBOSE`: Set to `'true'` for detailed logging
- `GATSBY_ABLY_MAIN_WEBSITE`: Site URL for absolute links

## Implementation Details

### File Structure

```
data/onPostBuild/
├── markdownOutput.ts              # Mode switcher and simple implementation
├── markdownOutputWithLanguages.ts # Advanced mode with React hydration
└── index.ts                       # Post-build hook orchestration

scripts/
└── generate-language-markdown.ts  # Standalone CLI script
```

### Key Components

#### 1. JSDOM Setup (`markdownOutputWithLanguages.ts`)

```typescript
class LocalAssetResourceLoader extends ResourceLoader {
  // Rewrites ASSET_PREFIX URLs to local ./public paths
  async fetch(url: string, options: any) {
    if (this.assetPrefix && url.includes(this.assetPrefix)) {
      const localPath = url.replace(this.assetPrefix, '');
      return fs.readFile(path.join('./public', localPath));
    }
    return super.fetch(url, options);
  }
}
```

#### 2. Language Detection

```typescript
function detectAvailableLanguages(document: Document, htmlFile: string): string[] {
  // 1. Try DOM selectors
  const options = document.querySelectorAll('[data-language-selector] option');
  if (options.length > 0) {
    return Array.from(options).map(opt => opt.value);
  }

  // 2. Fallback to product-based data
  const product = extractProductFromPath(htmlFile); // e.g., 'realtime' → 'pubsub'
  return Object.keys(languageData[product]);
}
```

#### 3. Language Switching

```typescript
async function switchLanguage(dom: JSDOM, language: string): Promise<boolean> {
  // Update URL search params
  window.location.search = `?lang=${language}`;

  // Trigger events
  window.dispatchEvent(new Event('popstate'));
  window.dispatchEvent(new Event('hashchange'));

  // Manipulate selector
  const selector = document.querySelector('[data-language-selector] select');
  selector.value = language;
  selector.dispatchEvent(new Event('change'));

  // Wait for content to update
  await waitFor(() => contentChanged(), 5000);
}
```

### Frontmatter Schema

```yaml
---
title: "Channel Lifecycle"
url: "/docs/realtime/channels"
generated_at: "2025-11-18T10:30:00Z"
description: "Learn about channel lifecycle and state management"
language: "javascript"
language_version: "2.11"
---
```

## Supported Languages

Languages are defined per product in `src/data/languages/languageData.ts`:

- **Pub/Sub**: javascript, nodejs, typescript, react, csharp, flutter, java, kotlin, objc, php, python, ruby, swift, go, laravel
- **Chat**: javascript, react, swift, kotlin
- **Spaces**: javascript, react
- **Asset Tracking**: javascript, swift, kotlin

## Troubleshooting

### React Hydration Fails

**Symptom**: Falls back to simple mode

**Causes**:
- Missing Gatsby bundles
- JavaScript errors during hydration
- Timeout (default: 30s)

**Solution**: Check browser console logs, increase timeout in `CONFIG.hydrationTimeout`

### Language Switching Doesn't Work

**Symptom**: All language files have identical content

**Causes**:
- Language selector not found
- React state not updating
- Content not conditional on language

**Solution**:
- Verify language selector exists: `document.querySelector('[data-language-selector]')`
- Check if content actually changes by language in browser
- Increase `CONFIG.languageSwitchTimeout`

### Asset Loading Errors

**Symptom**: Scripts fail to load, 404 errors

**Causes**:
- `ASSET_PREFIX` not properly rewritten
- Assets not built yet
- Incorrect path resolution

**Solution**:
- Ensure `./public` directory exists with all assets
- Check `ASSET_PREFIX` value matches expected URL
- Verify `rewriteAssetUrls()` is working correctly

### Memory Issues

**Symptom**: Process crashes with OOM

**Causes**:
- Too many JSDOM instances
- Large pages
- Memory leaks

**Solution**:
- Process files sequentially (current implementation)
- Reduce `CONFIG.hydrationTimeout`
- Use `--max-old-space-size=4096` Node flag

## Performance Considerations

### Simple Mode
- **Speed**: ~50-100ms per page
- **Memory**: ~50MB for 100 pages
- **Use Case**: No language selectors, static content

### Advanced Mode
- **Speed**: ~2-5 seconds per page (per language)
- **Memory**: ~200-500MB for 100 pages
- **Use Case**: Language selectors, conditional content

### Optimization Strategies

1. **Parallel Processing** (future): Use worker threads for multiple pages
2. **Caching**: Reuse JSDOM environment for same template types
3. **Selective Generation**: Only regenerate changed pages
4. **Hybrid Mode**: Use simple mode for pages without language selectors

## Future Enhancements

### 1. Smart Detection
- Detect which pages actually need language processing
- Skip pages where content doesn't change by language

### 2. Incremental Generation
```typescript
interface IncrementalOptions {
  changedFiles?: string[];  // Only regenerate these
  compareHash?: boolean;    // Skip if content hash unchanged
}
```

### 3. Parallel Processing
```typescript
import { Worker } from 'worker_threads';

async function processInParallel(files: string[], workers: number) {
  // Distribute files across worker threads
}
```

### 4. Page Filtering
Already designed in CLI but not implemented:

```bash
yarn generate-markdown --pages="docs/realtime/*"
yarn generate-markdown --languages="javascript,python"
```

## Testing

### Manual Testing

```bash
# 1. Build the site
yarn build

# 2. Check generated files
ls public/docs/realtime/*.md

# 3. Verify content differs by language
diff public/docs/realtime/channels.javascript.md public/docs/realtime/channels.python.md

# 4. Test CLI
yarn generate-markdown:verbose
```

### Test Cases

1. **Pages with language selector**: Should generate multiple `.{lang}.md` files
2. **Pages without language selector**: Should generate single `.md` file
3. **Invalid HTML**: Should fall back to simple mode
4. **Missing assets**: Should handle gracefully
5. **ASSET_PREFIX**: Should rewrite URLs correctly

### Debugging

Enable verbose logging:

```bash
VERBOSE=true yarn generate-markdown
```

Or use Node debugger:

```bash
node --inspect-brk scripts/generate-language-markdown.ts
```

## Known Limitations

1. **Server-Side Only**: Cannot run in browser
2. **Sequential Processing**: One page at a time (slow for large sites)
3. **React Dependency**: Requires React to be fully functional
4. **Limited Language Detection**: Relies on DOM or product mapping
5. **No Incremental Updates**: Regenerates all files every time
6. **Memory Intensive**: JSDOM + React uses significant RAM

## Contributing

When modifying the language generation:

1. Test both simple and advanced modes
2. Verify ASSET_PREFIX handling for staging/production
3. Check memory usage for large page sets
4. Update this documentation
5. Add tests for new features

## Related Files

- `src/components/Layout/LanguageSelector.tsx` - Language selector component
- `src/data/languages/languageData.ts` - Language versions per product
- `gatsby-config.ts` - Asset prefix configuration
- `data/onPostBuild/index.ts` - Post-build hook orchestration

## Questions?

For issues or questions:
1. Check the troubleshooting section above
2. Review JSDOM and Gatsby documentation
3. Examine browser console for client-side behavior
4. Contact the documentation team
