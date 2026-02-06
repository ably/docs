import {
  transformMdxToMarkdown,
  removeImportExportStatements,
  removeScriptTags,
  removeAnchorTags,
  removeJsxComments,
  convertMethodSignatureToCode,
  convertImagePathsToGitHub,
  convertDocsLinksToMarkdown,
  convertJsxLinkProps,
  generateLinkTextFromPath,
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

  describe('convertMethodSignatureToCode', () => {
    it('should convert simple MethodSignature to inline code', () => {
      const input = '<MethodSignature>rooms.get(name, options)</MethodSignature>';
      const output = convertMethodSignatureToCode(input);
      expect(output).toBe('`rooms.get(name, options)`');
    });

    it('should convert template literal MethodSignature to inline code', () => {
      const input = '<MethodSignature>{`rooms.get<RoomOptions>(name, options)`}</MethodSignature>';
      const output = convertMethodSignatureToCode(input);
      expect(output).toBe('`rooms.get<RoomOptions>(name, options)`');
    });

    it('should handle MethodSignature with angle brackets in template literal', () => {
      const input = '<MethodSignature>{`Map<string, Room>`}</MethodSignature>';
      const output = convertMethodSignatureToCode(input);
      expect(output).toBe('`Map<string, Room>`');
    });

    it('should handle multiple MethodSignatures', () => {
      const input = `## Method A
<MethodSignature>methodA()</MethodSignature>

## Method B
<MethodSignature>{\`methodB<T>()\`}</MethodSignature>`;
      const output = convertMethodSignatureToCode(input);
      expect(output).toContain('`methodA()`');
      expect(output).toContain('`methodB<T>()`');
      expect(output).not.toContain('<MethodSignature>');
    });

    it('should preserve MethodSignature in code blocks', () => {
      const input = '```jsx\n<MethodSignature>preserve this</MethodSignature>\n```';
      const output = convertMethodSignatureToCode(input);
      expect(output).toContain('<MethodSignature>preserve this</MethodSignature>');
    });

    it('should handle surrounding content', () => {
      const input = 'Before\n\n<MethodSignature>method()</MethodSignature>\n\nAfter';
      const output = convertMethodSignatureToCode(input);
      expect(output).toBe('Before\n\n`method()`\n\nAfter');
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
      const input = '[Link text](https://ably.com/docs/api/realtime-sdk/channels?lang=javascript)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/docs/api/realtime-sdk/channels.md)');
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

    it('should not modify non-/docs/ links', () => {
      const input = '[Link text](https://ably.com/blog/article?lang=en)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://ably.com/blog/article?lang=en)');
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

    it('should not add .md to URLs that already have a file extension (.png)', () => {
      const input = '[Image](https://raw.githubusercontent.com/ably/docs/main/src/images/content/diagrams/test.png)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Image](https://raw.githubusercontent.com/ably/docs/main/src/images/content/diagrams/test.png)');
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

    // Tests for www subdomains - www.ably.com and www.ably-dev.com ARE processed
    it('should process www.ably.com links (www subdomain is in allowlist)', () => {
      const input = '[Link text](https://www.ably.com/docs/channels)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](https://www.ably.com/docs/channels.md)');
    });

    // Tests for relative URLs (should not be processed)
    it('should not modify relative URLs', () => {
      const input = '[Link text](/docs/channels)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](/docs/channels)');
    });

    // Test for invalid URLs
    it('should not modify invalid URLs', () => {
      const input = '[Link text](not-a-valid-url)';
      const output = convertDocsLinksToMarkdown(input);
      expect(output).toBe('[Link text](not-a-valid-url)');
    });
  });

  describe('generateLinkTextFromPath', () => {
    it('should handle /docs root path without extra "docs"', () => {
      const output = generateLinkTextFromPath('/docs');
      expect(output).toBe('ably docs');
    });

    it('should convert /docs/ path to readable text', () => {
      const output = generateLinkTextFromPath('/docs/chat/getting-started/javascript');
      expect(output).toBe('ably docs chat getting-started javascript');
    });

    it('should handle trailing slashes without producing trailing spaces', () => {
      const output = generateLinkTextFromPath('/docs/channels/');
      expect(output).toBe('ably docs channels');
    });
  });

  describe('convertJsxLinkProps', () => {
    it('should convert quoted /docs/ path with single quotes', () => {
      const input = `'/docs/chat/getting-started/javascript'`;
      const output = convertJsxLinkProps(input, siteUrl);
      const expected =
        `'[ably docs chat getting-started javascript]` +
        `(http://localhost:3000/docs/chat/getting-started/javascript)'`;
      expect(output).toBe(expected);
    });

    it('should convert quoted /docs/ path with double quotes', () => {
      const input = `"/docs/chat/getting-started/react"`;
      const output = convertJsxLinkProps(input, siteUrl);
      const expected =
        `"[ably docs chat getting-started react]` +
        `(http://localhost:3000/docs/chat/getting-started/react)"`;
      expect(output).toBe(expected);
    });

    it('should not convert non-docs paths', () => {
      const input = `'/blog/article'`;
      const output = convertJsxLinkProps(input, siteUrl);
      expect(output).toBe(`'/blog/article'`);
    });

    it('should not convert external URLs', () => {
      const input = `'https://example.com/docs/page'`;
      const output = convertJsxLinkProps(input, siteUrl);
      expect(output).toBe(`'https://example.com/docs/page'`);
    });

    it('should handle Tiles component content like the real example', () => {
      const input = `<Tiles>
{[
  {
    title: 'JavaScript',
    description: 'Start building with Chat using Ably\\'s JavaScript SDK',
    image: 'icon-tech-javascript',
    link: '/docs/chat/getting-started/javascript',
  },
  {
    title: 'React',
    description: 'Start building Chat applications using Ably\\'s React SDK.',
    image: 'icon-tech-react',
    link: '/docs/chat/getting-started/react',
  },
]}
</Tiles>`;
      const output = convertJsxLinkProps(input, siteUrl);
      const expectedJsLink =
        `link: '[ably docs chat getting-started javascript]` +
        `(http://localhost:3000/docs/chat/getting-started/javascript)'`;
      const expectedReactLink =
        `link: '[ably docs chat getting-started react]` +
        `(http://localhost:3000/docs/chat/getting-started/react)'`;
      expect(output).toContain(expectedJsLink);
      expect(output).toContain(expectedReactLink);
      // Ensure other content is preserved
      expect(output).toContain(`title: 'JavaScript'`);
      expect(output).toContain(`image: 'icon-tech-javascript'`);
    });

    it('should not convert /docs/ paths inside code blocks', () => {
      const input = `Here's an example:

\`\`\`ruby
link '/docs/channels'
\`\`\`

\`\`\`javascript
fetch('/docs/api/posts/123')
await fetch("/docs/api/posts/456")
\`\`\`

Real prop: link: '/docs/presence'`;
      const output = convertJsxLinkProps(input, siteUrl);
      // Code block content should be preserved
      expect(output).toContain("link '/docs/channels'");
      expect(output).toContain("fetch('/docs/api/posts/123')");
      expect(output).toContain('fetch("/docs/api/posts/456")');
      // Non-code-block content should be converted
      const expectedPresenceLink =
        `link: '[ably docs presence](http://localhost:3000/docs/presence)'`;
      expect(output).toContain(expectedPresenceLink);
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
