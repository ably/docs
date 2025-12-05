import {
  transformMdxToMarkdown,
  removeImportExportStatements,
  removeScriptTags,
  removeAnchorTags,
  removeJsxComments,
  convertImagePathsToGitHub,
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

      const { content, title } = transformMdxToMarkdown(input, siteUrl);

      expect(title).toBe('Test Fixture');
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
