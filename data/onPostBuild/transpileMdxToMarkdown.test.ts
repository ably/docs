import {
  transformMdxToMarkdown,
  removeImportExportStatements,
  removeScriptTags,
  removeAnchorTags,
  removeJsxComments,
  convertImagePathsToGitHub,
  convertDocsLinksToMarkdown,
  convertRelativeUrls,
  replaceTemplateVariables,
  calculateOutputPath,
} from './transpileMdxToMarkdown';
import * as fs from 'fs';
import * as path from 'path';

describe('MDX to Markdown Transpilation', () => {
  const siteUrl = 'http://localhost:3000';

  describe('Full transformation with fixture', () => {
    it('should transform comprehensive fixture correctly', () => {
      const inputPath = path.join(__dirname, '__fixtures__', 'input.mdx');
      const input = fs.readFileSync(inputPath, 'utf-8');

      const { content, title, intro } = transformMdxToMarkdown(input, siteUrl);

      expect(title).toBe('Test Fixture');
      expect(intro).toBe('This is a test introduction');
      expect(content).toMatchSnapshot();
    });

    it('should throw error when title is missing', () => {
      const input = `---
meta_description: "Test"
---

Content without title`;

      expect(() => {
        transformMdxToMarkdown(input, siteUrl);
      }).toThrow('Missing title in frontmatter');
    });

    it('should not include intro or throw when it is not present', () => {
      const input = `---
title: Test Fixture
---

Content without intro`;

      expect(() => transformMdxToMarkdown(input, siteUrl)).not.toThrow();
    });
  });

  describe('removeImportExportStatements', () => {
    it('should remove single-line imports', () => {
      const input = `import Foo from 'bar'\n\nContent here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('import');
      expect(output).toContain('Content here');
    });

    it('should remove multi-line imports', () => {
      const input = `import {\n  Foo,\n  Bar\n} from 'module';\n\nContent here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('import');
      expect(output).not.toContain('from');
      expect(output).toContain('Content here');
    });

    it('should remove side-effect imports without semicolons', () => {
      const input = `import 'side-effect-module'

## First Heading

Content here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('import');
      expect(output).not.toContain('side-effect');
      expect(output).toContain('## First Heading');
      expect(output).toContain('Content here');
    });

    it('should remove side-effect imports with semicolons', () => {
      const input = `import "another-module";

Content here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('import');
      expect(output).not.toContain('another-module');
      expect(output).toContain('Content here');
    });

    it('should remove export default statements', () => {
      const input = `export default SomeComponent;\n\nContent here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('export');
      expect(output).toContain('Content here');
    });

    it('should remove export const statements', () => {
      const input = `export const foo = 'bar';\n\nContent here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('export');
      expect(output).toContain('Content here');
    });

    it('should remove multi-line export functions', () => {
      const input = `export function foo() {\n  return 'bar';\n}\n\nContent here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('export');
      expect(output).not.toContain('function foo');
      expect(output).toContain('Content here');
    });

    it('should remove multi-line export classes', () => {
      const input = `export class Foo {\n  bar() {}\n}\n\nContent here`;
      const output = removeImportExportStatements(input);
      expect(output).not.toContain('export');
      expect(output).not.toContain('class Foo');
      expect(output).toContain('Content here');
    });

    it('should preserve import/export statements in code blocks', () => {
      const input = `import Component from './component'

## Code Example

\`\`\`javascript
import { realtime } from '@ably/realtime';
export const config = { ... };
\`\`\`
`;
      const output = removeImportExportStatements(input);
      expect(output).toContain('import { realtime }');
      expect(output).toContain('export const config');
      expect(output).not.toContain('import Component');
    });

    it('should handle multi-line imports followed by content', () => {
      const input = `import {
  Foo,
  Bar
} from 'module';

## First Heading

Content here`;
      const output = removeImportExportStatements(input);
      expect(output).toContain('## First Heading');
      expect(output).toContain('Content here');
      expect(output).not.toContain('import');
      expect(output).not.toContain('Foo');
      expect(output).not.toContain('Bar');
    });

    it('should stop removing at first non-import/export line', () => {
      const input = `import Foo from 'bar';

{/* JSX comment */}

import { something } from 'somewhere';`;
      const output = removeImportExportStatements(input);
      expect(output).toContain('{/* JSX comment */}');
      expect(output).toContain("import { something } from 'somewhere'");
      expect(output).not.toContain('import Foo');
    });

    it('should handle blank lines between imports', () => {
      const input = `import Foo from 'bar';

import Baz from 'qux';

## Content`;
      const output = removeImportExportStatements(input);
      expect(output).toContain('## Content');
      expect(output).not.toContain('import Foo');
      expect(output).not.toContain('import Baz');
    });

    it('should handle export function on one line', () => {
      const input = `export function foo() { return 'bar'; }

## Content`;
      const output = removeImportExportStatements(input);
      expect(output).toContain('## Content');
      expect(output).not.toContain('export');
      expect(output).not.toContain('function foo');
    });

    it('should remove multi-line arrow function exports', () => {
      const input = `export const MyComponent = () => {
  const x = 1;
  return x;
};

## Content`;
      const output = removeImportExportStatements(input);
      expect(output).toContain('## Content');
      expect(output).not.toContain('export');
      expect(output).not.toContain('MyComponent');
      expect(output).not.toContain('const x = 1');
    });

    it('should remove object exports with nested braces', () => {
      const input = `export const config = {
  nested: {
    value: 'test';
  }
};

## Content`;
      const output = removeImportExportStatements(input);
      expect(output).toContain('## Content');
      expect(output).not.toContain('export');
      expect(output).not.toContain('config');
      expect(output).not.toContain('nested');
    });
  });

  describe('removeScriptTags', () => {
    it('should remove script tags outside code blocks', () => {
      const input = `Text before\n<script>alert('test')</script>\nText after`;
      const output = removeScriptTags(input);
      expect(output).not.toContain('<script>');
      expect(output).toContain('Text before');
      expect(output).toContain('Text after');
    });

    it('should remove script tags with attributes', () => {
      const input = `<script type="application/ld+json">{"test": true}</script>\nContent`;
      const output = removeScriptTags(input);
      expect(output).not.toContain('<script>');
      expect(output).toContain('Content');
    });

    it('should preserve script tags in code blocks', () => {
      const input = '```html\n<script>code example</script>\n```';
      const output = removeScriptTags(input);
      expect(output).toContain('<script>');
      expect(output).toContain('code example');
    });

    it('should preserve content in code blocks', () => {
      const input = 'Before\n```\n<script>preserve</script>\n```\nAfter';
      const output = removeScriptTags(input);
      expect(output).toContain('<script>preserve</script>');
    });
  });

  describe('removeAnchorTags', () => {
    it('should remove self-closing anchor tags', () => {
      const input = '## Heading <a id="test"/>';
      const output = removeAnchorTags(input);
      expect(output).toBe('## Heading ');
    });

    it('should remove anchor tags with name attribute', () => {
      const input = '## Heading <a name="test"/>';
      const output = removeAnchorTags(input);
      expect(output).toBe('## Heading ');
    });

    it('should remove empty anchor tags', () => {
      const input = '## Heading <a id="test"></a>';
      const output = removeAnchorTags(input);
      expect(output).toBe('## Heading ');
    });

    it('should preserve anchor tags in code blocks', () => {
      const input = '```html\n<a id="preserve"/>\n```';
      const output = removeAnchorTags(input);
      expect(output).toContain('<a id="preserve"/>');
    });

    it('should preserve link anchors with href', () => {
      const input = '[Link text](http://example.com)';
      const output = removeAnchorTags(input);
      expect(output).toBe('[Link text](http://example.com)');
    });
  });

  describe('removeJsxComments', () => {
    it('should remove single-line JSX comments', () => {
      const input = 'Text {/* comment */} more text';
      const output = removeJsxComments(input);
      expect(output).not.toContain('{/*');
      expect(output).not.toContain('*/}');
      expect(output).toContain('Text');
      expect(output).toContain('more text');
    });

    it('should remove multi-line JSX comments', () => {
      const input = 'Text {/*\n  multi\n  line\n*/} more';
      const output = removeJsxComments(input);
      expect(output).not.toContain('{/*');
      expect(output).toContain('Text');
      expect(output).toContain('more');
    });

    it('should preserve JSX comments in code blocks', () => {
      const input = '```jsx\n{/* code comment */}\n```';
      const output = removeJsxComments(input);
      expect(output).toContain('{/* code comment */}');
    });
  });

  describe('convertImagePathsToGitHub', () => {
    const githubBase = 'https://raw.githubusercontent.com/ably/docs/main/src';

    it('should convert relative image paths', () => {
      const input = '![Alt text](../../../images/content/diagrams/test.png)';
      const output = convertImagePathsToGitHub(input);
      expect(output).toBe(`![Alt text](${githubBase}/images/content/diagrams/test.png)`);
    });

    it('should convert absolute image paths', () => {
      const input = '![Alt text](/images/content/test.png)';
      const output = convertImagePathsToGitHub(input);
      expect(output).toBe(`![Alt text](${githubBase}/images/content/test.png)`);
    });

    it('should convert direct image paths', () => {
      const input = '![Alt text](images/content/test.png)';
      const output = convertImagePathsToGitHub(input);
      expect(output).toBe(`![Alt text](${githubBase}/images/content/test.png)`);
    });

    it('should handle multiple images', () => {
      const input = `![One](../images/a.png)\n![Two](/images/b.png)`;
      const output = convertImagePathsToGitHub(input);
      expect(output).toContain(`${githubBase}/images/a.png`);
      expect(output).toContain(`${githubBase}/images/b.png`);
    });
  });

  describe('convertDocsLinksToMarkdown', () => {
    it('should add .md extension to /docs/ links', () => {
      const input = '[Link text](https://ably.com/docs/channels)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md)');
    });

    it('should remove ?lang= query parameters from /docs/ links', () => {
      const input = '[Link text](https://ably.com/docs/channels?lang=javascript)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md)');
    });

    it('should remove any query parameters from /docs/ links', () => {
      const input = '[Link text](https://ably.com/docs/channels?lang=python&version=2)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md)');
    });

    // Hash anchors are preserved as they provide semantic context for LLMs
    it('should preserve hash anchors and add .md before them', () => {
      const input = '[Link text](https://ably.com/docs/channels#section)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md#section)');
    });

    it('should handle both query params and hash anchors', () => {
      const input = '[Link text](https://ably.com/docs/channels?lang=javascript#section)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md#section)');
    });

    it('should not modify links that already have .md extension', () => {
      const input = '[Link text](https://ably.com/docs/channels.md)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md)');
    });

    it('should not modify links that already have .md extension with hash', () => {
      const input = '[Link text](https://ably.com/docs/channels.md#section)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md#section)');
    });

    it('should not modify non-/docs/ links', () => {
      const input = '[Link text](https://ably.com/blog/article?lang=en)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/blog/article?lang=en)');
    });

    it('should handle nested /docs/ paths', () => {
      const input = '[Link text](https://ably.com/docs/api/realtime-sdk/channels?lang=javascript)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/api/realtime-sdk/channels.md)');
    });

    it('should handle multiple links in content', () => {
      const input = `Check [channels](https://ably.com/docs/channels?lang=js) and [presence](https://ably.com/docs/presence?lang=python#enter)`;
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toContain('[channels](https://ably.com/docs/channels.md)');
      expect(output).toContain('[presence](https://ably.com/docs/presence.md#enter)');
    });

    it('should not modify external non-ably /docs/ links', () => {
      const input = '[External](https://example.com/docs/page?lang=en)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[External](https://example.com/docs/page?lang=en)');
    });

    it('should handle ably-dev.com links', () => {
      const input = '[Link text](https://ably-dev.com/docs/channels?lang=javascript)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably-dev.com/docs/channels.md)');
    });

    it('should handle ably-dev.com links with hash anchors', () => {
      const input = '[Link text](https://ably-dev.com/docs/channels#section)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably-dev.com/docs/channels.md#section)');
    });

    it('should not modify sdk.ably.com links (API documentation)', () => {
      const input = '[Room](https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/interfaces/chat-js.Room.html)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Room](https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/interfaces/chat-js.Room.html)');
    });

    it('should not modify sdk.ably.com links with /docs/ in path', () => {
      const input = '[Docs](https://sdk.ably.com/docs/some-path)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Docs](https://sdk.ably.com/docs/some-path)');
    });

    it('should not add .md to URLs that already have a file extension (.png)', () => {
      const input = '[Image](https://raw.githubusercontent.com/ably/docs/main/src/images/content/diagrams/test.png)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Image](https://raw.githubusercontent.com/ably/docs/main/src/images/content/diagrams/test.png)');
    });

    it('should not add .md to URLs that already have a file extension (.jpg)', () => {
      const input = '[Photo](https://ably.com/docs/images/photo.jpg)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Photo](https://ably.com/docs/images/photo.jpg)');
    });

    it('should not add .md to URLs that already have a file extension (.html)', () => {
      const input = '[Page](https://ably.com/docs/api/page.html)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Page](https://ably.com/docs/api/page.html)');
    });

    it('should not add .md to URLs that already have a file extension (.pdf)', () => {
      const input = '[Document](https://ably.com/docs/guides/document.pdf)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Document](https://ably.com/docs/guides/document.pdf)');
    });

    it('should not add .md to URLs with file extension and hash anchor', () => {
      const input = '[Image](https://ably.com/docs/images/diagram.svg#section)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Image](https://ably.com/docs/images/diagram.svg#section)');
    });

    // Tests for proper host validation (not just substring matching)
    it('should not modify GitHub URLs with "ably" in the path', () => {
      const input = '[GitHub](https://github.com/ably/docs/blob/main/README.md)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[GitHub](https://github.com/ably/docs/blob/main/README.md)');
    });

    it('should not modify URLs where "ably" is a substring of the host (notably.com)', () => {
      const input = '[External](https://notably.com/docs/page)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[External](https://notably.com/docs/page)');
    });

    it('should not modify URLs where "ably" is a substring of the host (probably.com)', () => {
      const input = '[External](https://probably.com/docs/page)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[External](https://probably.com/docs/page)');
    });

    it('should not modify URLs where "ably" is a substring of the host (reliably.io)', () => {
      const input = '[External](https://reliably.io/docs/page)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[External](https://reliably.io/docs/page)');
    });

    // Tests for trailing slash normalization
    it('should normalize trailing slashes before adding .md', () => {
      const input = '[Link text](https://ably.com/docs/channels/)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md)');
    });

    it('should normalize trailing slashes with hash anchors', () => {
      const input = '[Link text](https://ably.com/docs/channels/#section)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md#section)');
    });

    it('should normalize trailing slashes with query params', () => {
      const input = '[Link text](https://ably.com/docs/channels/?lang=javascript)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/channels.md)');
    });

    // Tests for subdomains - subdomains are NOT processed (only exact ably.com and ably-dev.com)
    it('should not modify www.ably.com links (subdomain not in allowlist)', () => {
      const input = '[Link text](https://www.ably.com/docs/channels)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://www.ably.com/docs/channels)');
    });

    it('should not modify subdomains of ably-dev.com', () => {
      const input = '[Link text](https://staging.ably-dev.com/docs/channels)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://staging.ably-dev.com/docs/channels)');
    });

    // Tests for relative URLs (should not be processed)
    it('should not modify relative URLs', () => {
      const input = '[Link text](/docs/channels)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](/docs/channels)');
    });

    it('should not modify relative URLs without leading slash', () => {
      const input = '[Link text](docs/channels)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](docs/channels)');
    });

    // Test for invalid URLs
    it('should not modify invalid URLs', () => {
      const input = '[Link text](not-a-valid-url)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](not-a-valid-url)');
    });
  });

  describe('convertRelativeUrls', () => {
    it('should convert relative URLs to absolute', () => {
      const input = '[Link text](/docs/channels)';
      const output = convertRelativeUrls(input, siteUrl);
      expect(output).toBe('[Link text](http://localhost:3000/docs/channels)');
    });

    it('should preserve external URLs', () => {
      const input = '[Link](https://example.com/page)';
      const output = convertRelativeUrls(input, siteUrl);
      expect(output).toBe('[Link](https://example.com/page)');
    });

    it('should preserve hash-only links', () => {
      const input = '[Anchor](#section)';
      const output = convertRelativeUrls(input, siteUrl);
      expect(output).toBe('[Anchor](#section)');
    });

    it('should handle multiple links', () => {
      const input = '[Internal](/docs/a) and [External](https://b.com) and [Hash](#c)';
      const output = convertRelativeUrls(input, siteUrl);
      expect(output).toContain('[Internal](http://localhost:3000/docs/a)');
      expect(output).toContain('[External](https://b.com)');
      expect(output).toContain('[Hash](#c)');
    });
  });

  describe('replaceTemplateVariables', () => {
    it('should replace API_KEY', () => {
      const input = 'Use {{API_KEY}} in your code';
      const output = replaceTemplateVariables(input);
      expect(output).toBe('Use your-api-key in your code');
    });

    it('should replace RANDOM_CHANNEL_NAME', () => {
      const input = 'Channel: {{RANDOM_CHANNEL_NAME}}';
      const output = replaceTemplateVariables(input);
      expect(output).toBe('Channel: your-channel-name');
    });

    it('should replace multiple occurrences', () => {
      const input = '{{API_KEY}} and {{RANDOM_CHANNEL_NAME}} and {{API_KEY}}';
      const output = replaceTemplateVariables(input);
      expect(output).toBe('your-api-key and your-channel-name and your-api-key');
    });
  });

  describe('calculateOutputPath', () => {
    it('should handle index files', () => {
      const output = calculateOutputPath('docs/channels', 'index');
      expect(output).toContain('public/docs/channels.md');
      expect(output).toMatch(/public\/docs\/channels\.md$/);
    });

    it('should handle non-index files', () => {
      const output = calculateOutputPath('docs/chat', 'connect');
      expect(output).toContain('public/docs/chat/connect.md');
      expect(output).toMatch(/public\/docs\/chat\/connect\.md$/);
    });

    it('should handle top-level docs index', () => {
      const output = calculateOutputPath('docs', 'index');
      expect(output).toContain('public/docs.md');
      expect(output).toMatch(/public\/docs\.md$/);
    });

    it('should handle nested index paths', () => {
      const output = calculateOutputPath('docs/api/realtime-sdk', 'index');
      expect(output).toContain('public/docs/api/realtime-sdk.md');
      expect(output).toMatch(/public\/docs\/api\/realtime-sdk\.md$/);
    });

    it('should handle deeply nested files', () => {
      const output = calculateOutputPath('docs/chat/moderation/direct', 'bodyguard');
      expect(output).toContain('public/docs/chat/moderation/direct/bodyguard.md');
      expect(output).toMatch(/public\/docs\/chat\/moderation\/direct\/bodyguard\.md$/);
    });
  });
});
