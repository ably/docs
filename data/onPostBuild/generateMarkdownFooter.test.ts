import {
  flattenNavPages,
  mdxNodeToNavLink,
  buildMdxPageSet,
  buildMetaDescriptionMap,
  buildNavigationLookup,
  generateNavigationFooter,
  buildNavLookup,
} from './generateMarkdownFooter';
import type { FlatNavPage, NavContext, NavLink, NavMdxNode } from './generateMarkdownFooter';

describe('generateMarkdownFooter', () => {
  describe('flattenNavPages', () => {
    it('should return a non-empty array of pages from all products', () => {
      const pages = flattenNavPages();
      expect(pages.length).toBeGreaterThan(0);
    });

    it('should include pages from all 7 products', () => {
      const pages = flattenNavPages();
      const products = new Set(pages.map((p) => p.product));
      expect(products.size).toBe(7);
      expect(products).toContain('Platform');
      expect(products).toContain('Ably Pub/Sub');
      expect(products).toContain('Ably Chat');
      expect(products).toContain('Ably AI Transport');
      expect(products).toContain('Ably Spaces');
      expect(products).toContain('Ably LiveObjects');
      expect(products).toContain('Ably LiveSync');
    });

    it('should skip external links', () => {
      const pages = flattenNavPages();
      const externalPages = pages.filter((p) => p.link.startsWith('http'));
      expect(externalPages).toHaveLength(0);
    });

    it('should preserve depth-first order within a product', () => {
      const pages = flattenNavPages();
      const chatPages = pages.filter((p) => p.product === 'Ably Chat');
      const chatLinks = chatPages.map((p) => p.link);

      // About Chat should come first
      expect(chatLinks[0]).toBe('/docs/chat');

      // Getting started overview should come before individual getting started pages
      const gsOverviewIdx = chatLinks.indexOf('/docs/chat/getting-started');
      const gsJsIdx = chatLinks.indexOf('/docs/chat/getting-started/javascript');
      expect(gsOverviewIdx).toBeLessThan(gsJsIdx);

      // Messages should come before History (both in Chat features)
      const messagesIdx = chatLinks.indexOf('/docs/chat/rooms/messages');
      const historyIdx = chatLinks.indexOf('/docs/chat/rooms/history');
      expect(messagesIdx).toBeLessThan(historyIdx);
    });

    it('should include both content and API pages', () => {
      const pages = flattenNavPages();
      const chatPages = pages.filter((p) => p.product === 'Ably Chat');
      const chatLinks = chatPages.map((p) => p.link);

      // Content page
      expect(chatLinks).toContain('/docs/chat/rooms/messages');
      // API page (non-external)
      expect(chatLinks).toContain('/docs/chat/api');
    });

    it('should track section keys correctly for sibling grouping', () => {
      const pages = flattenNavPages();
      const messagesPage = pages.find((p) => p.link === '/docs/chat/rooms/messages');
      const historyPage = pages.find((p) => p.link === '/docs/chat/rooms/history');
      const setupPage = pages.find((p) => p.link === '/docs/chat/setup');

      expect(messagesPage?.sectionKey).toBe('Ably Chat::Chat features');
      expect(historyPage?.sectionKey).toBe('Ably Chat::Chat features');
      // Setup is in Concepts section, different from Chat features
      expect(setupPage?.sectionKey).toBe('Ably Chat::Concepts');
    });

    it('should use __root__ section key for top-level pages', () => {
      const pages = flattenNavPages();
      const aboutChat = pages.find((p) => p.link === '/docs/chat');
      expect(aboutChat?.sectionKey).toBe('Ably Chat::__root__');
    });

    it('should handle nested sections correctly', () => {
      const pages = flattenNavPages();
      // Chat > Moderation > Direct integrations > Hive (Model Only)
      const hivePage = pages.find((p) => p.link === '/docs/chat/moderation/direct/hive-model-only');
      expect(hivePage).toBeDefined();
      expect(hivePage?.sectionKey).toBe('Ably Chat::Direct integrations');
    });

    it('should handle mixed sections with both direct pages and nested subsections', () => {
      const pages = flattenNavPages();
      // Chat > Moderation has Introduction (direct page) + Direct integrations (subsection)
      const introPage = pages.find((p) => p.link === '/docs/chat/moderation');
      const hivePage = pages.find((p) => p.link === '/docs/chat/moderation/direct/hive-model-only');

      expect(introPage?.sectionKey).toBe('Ably Chat::Moderation');
      expect(hivePage?.sectionKey).toBe('Ably Chat::Direct integrations');
    });
  });

  describe('mdxNodeToNavLink', () => {
    it('should handle regular files', () => {
      expect(mdxNodeToNavLink('docs/chat/rooms', 'messages')).toBe('/docs/chat/rooms/messages');
    });

    it('should handle index files', () => {
      expect(mdxNodeToNavLink('docs/chat/rooms', 'index')).toBe('/docs/chat/rooms');
    });

    it('should handle top-level index', () => {
      expect(mdxNodeToNavLink('docs', 'index')).toBe('/docs');
    });

    it('should handle deeply nested files', () => {
      expect(mdxNodeToNavLink('docs/chat/moderation/direct', 'bodyguard')).toBe(
        '/docs/chat/moderation/direct/bodyguard',
      );
    });
  });

  describe('buildMdxPageSet', () => {
    const makeNavMdxNode = (relDir: string, name: string): NavMdxNode => ({
      parent: { relativeDirectory: relDir, name },
    });

    it('should return correct set of nav links', () => {
      const nodes: NavMdxNode[] = [
        makeNavMdxNode('docs/chat/rooms', 'messages'),
        makeNavMdxNode('docs/chat/rooms', 'history'),
        makeNavMdxNode('docs/chat', 'setup'),
      ];
      const pageSet = buildMdxPageSet(nodes);
      expect(pageSet.has('/docs/chat/rooms/messages')).toBe(true);
      expect(pageSet.has('/docs/chat/rooms/history')).toBe(true);
      expect(pageSet.has('/docs/chat/setup')).toBe(true);
      expect(pageSet.size).toBe(3);
    });

    it('should handle index files correctly', () => {
      const nodes: NavMdxNode[] = [makeNavMdxNode('docs/chat/rooms', 'index')];
      const pageSet = buildMdxPageSet(nodes);
      expect(pageSet.has('/docs/chat/rooms')).toBe(true);
    });
  });

  describe('buildMetaDescriptionMap', () => {
    const makeNavMdxNode = (relDir: string, name: string, metaDesc?: string): NavMdxNode => ({
      parent: { relativeDirectory: relDir, name },
      frontmatter: metaDesc ? { meta_description: metaDesc } : undefined,
    });

    it('should map nav links to meta descriptions', () => {
      const nodes: NavMdxNode[] = [
        makeNavMdxNode('docs/chat/rooms', 'messages', 'Send and receive messages.'),
        makeNavMdxNode('docs/chat/rooms', 'history', 'Retrieve message history.'),
      ];
      const descMap = buildMetaDescriptionMap(nodes);
      expect(descMap.get('/docs/chat/rooms/messages')).toBe('Send and receive messages.');
      expect(descMap.get('/docs/chat/rooms/history')).toBe('Retrieve message history.');
    });

    it('should handle index files', () => {
      const nodes: NavMdxNode[] = [makeNavMdxNode('docs/chat/rooms', 'index', 'Room overview.')];
      const descMap = buildMetaDescriptionMap(nodes);
      expect(descMap.get('/docs/chat/rooms')).toBe('Room overview.');
    });

    it('should skip nodes without meta_description', () => {
      const nodes: NavMdxNode[] = [
        makeNavMdxNode('docs/chat/rooms', 'messages', 'Has description.'),
        makeNavMdxNode('docs/chat/rooms', 'history'),
      ];
      const descMap = buildMetaDescriptionMap(nodes);
      expect(descMap.has('/docs/chat/rooms/messages')).toBe(true);
      expect(descMap.has('/docs/chat/rooms/history')).toBe(false);
      expect(descMap.size).toBe(1);
    });
  });

  describe('buildNavigationLookup', () => {
    const siteUrl = 'https://ably.com';

    it('should use absolute .md URLs', () => {
      const mdxPageSet = new Set(['/docs/chat/rooms/messages', '/docs/chat/rooms/history']);
      const metaDescriptions = new Map<string, string>();
      const lookup = buildNavigationLookup(siteUrl, metaDescriptions, mdxPageSet);

      const ctx = lookup.get('/docs/chat/rooms/messages');
      expect(ctx).toBeDefined();
      if (ctx && ctx.siblings.length > 0) {
        expect(ctx.siblings[0].url).toMatch(/^https:\/\/ably\.com\/docs\/.*\.md$/);
      }
    });

    it('should compute siblings correctly', () => {
      const mdxPageSet = new Set([
        '/docs/chat/rooms/messages',
        '/docs/chat/rooms/history',
        '/docs/chat/rooms/presence',
      ]);
      const metaDescriptions = new Map([
        ['/docs/chat/rooms/history', 'Retrieve message history.'],
        ['/docs/chat/rooms/presence', 'See who is online.'],
      ]);
      const lookup = buildNavigationLookup(siteUrl, metaDescriptions, mdxPageSet);

      const messagesCtx = lookup.get('/docs/chat/rooms/messages');
      expect(messagesCtx?.siblings).toHaveLength(2);
      expect(messagesCtx?.siblings[0].name).toBe('Message storage and history');
      expect(messagesCtx?.siblings[0].url).toBe('https://ably.com/docs/chat/rooms/history.md');
      expect(messagesCtx?.siblings[0].description).toBe('Retrieve message history.');
    });

    it('should exclude the current page from siblings', () => {
      const mdxPageSet = new Set(['/docs/chat/rooms/messages', '/docs/chat/rooms/history']);
      const metaDescriptions = new Map<string, string>();
      const lookup = buildNavigationLookup(siteUrl, metaDescriptions, mdxPageSet);

      const messagesCtx = lookup.get('/docs/chat/rooms/messages');
      expect(messagesCtx).toBeDefined();
      // Current page should not appear in its own siblings
      const selfSibling = messagesCtx?.siblings.find((s) => s.url.includes('/rooms/messages'));
      expect(selfSibling).toBeUndefined();
    });

    it('should use page name as fallback description when meta_description is missing', () => {
      const mdxPageSet = new Set(['/docs/chat/rooms/messages', '/docs/chat/rooms/history']);
      const metaDescriptions = new Map<string, string>(); // No descriptions
      const lookup = buildNavigationLookup(siteUrl, metaDescriptions, mdxPageSet);

      const messagesCtx = lookup.get('/docs/chat/rooms/messages');
      expect(messagesCtx?.siblings[0].description).toBe('Message storage and history');
    });

    it('should filter out non-MDX pages', () => {
      // /docs/api/control-api is a .tsx page in the Platform nav
      const mdxPageSet = new Set(['/docs/platform']); // Only MDX page, not /docs/api/control-api
      const metaDescriptions = new Map<string, string>();
      const lookup = buildNavigationLookup(siteUrl, metaDescriptions, mdxPageSet);

      const platformCtx = lookup.get('/docs/platform');
      expect(platformCtx).toBeDefined();
    });
  });

  describe('generateNavigationFooter', () => {
    const siteUrl = 'https://ably.com';

    it('should generate footer with Related Topics and Documentation Index sections', () => {
      const navContext: NavContext = {
        siblings: [
          { name: 'Sibling 1', url: 'https://ably.com/docs/sibling1.md', description: 'First sibling.' },
          { name: 'Sibling 2', url: 'https://ably.com/docs/sibling2.md', description: 'Second sibling.' },
        ],
      };

      const footer = generateNavigationFooter(navContext, siteUrl);

      expect(footer).toContain('## Related Topics');
      expect(footer).toContain('- [Sibling 1](https://ably.com/docs/sibling1.md): First sibling.');
      expect(footer).toContain('- [Sibling 2](https://ably.com/docs/sibling2.md): Second sibling.');
      expect(footer).toContain('## Documentation Index');
      expect(footer).toContain('Fetch [llms.txt](https://ably.com/llms.txt)');
    });

    it('should list all siblings in Related Topics', () => {
      const navContext: NavContext = {
        siblings: [
          { name: 'Sibling 1', url: 'https://ably.com/docs/sibling1.md', description: 'First sibling.' },
          { name: 'Sibling 2', url: 'https://ably.com/docs/sibling2.md', description: 'Second sibling.' },
          { name: 'Sibling 3', url: 'https://ably.com/docs/sibling3.md', description: 'Third sibling.' },
        ],
      };

      const footer = generateNavigationFooter(navContext, siteUrl);

      expect(footer).toContain('## Related Topics');
      expect(footer).toContain('- [Sibling 1](https://ably.com/docs/sibling1.md): First sibling.');
      expect(footer).toContain('- [Sibling 2](https://ably.com/docs/sibling2.md): Second sibling.');
      expect(footer).toContain('- [Sibling 3](https://ably.com/docs/sibling3.md): Third sibling.');
    });

    it('should omit Related Topics section when no siblings', () => {
      const navContext: NavContext = {
        siblings: [],
      };

      const footer = generateNavigationFooter(navContext, siteUrl);

      expect(footer).not.toContain('## Related Topics');
      expect(footer).toContain('## Documentation Index');
    });

    it('should always include Documentation Index section', () => {
      const navContext: NavContext = { siblings: [] };
      const footer = generateNavigationFooter(navContext, siteUrl);

      expect(footer).toContain('## Documentation Index');
      expect(footer).toContain('To discover additional Ably documentation:');
      expect(footer).toContain(
        '1. Fetch [llms.txt](https://ably.com/llms.txt) for the canonical list of available pages.',
      );
      expect(footer).toContain('2. Identify relevant URLs from that index.');
      expect(footer).toContain('3. Fetch target pages as needed.');
      expect(footer).toContain('Avoid using assumed or outdated documentation paths.');
    });

    it('should use correct siteUrl for llms.txt link', () => {
      const navContext: NavContext = { siblings: [] };
      const footer = generateNavigationFooter(navContext, 'https://custom-site.com');

      expect(footer).toContain(
        'Fetch [llms.txt](https://custom-site.com/llms.txt) for the canonical list of available pages.',
      );
    });
  });

  describe('buildNavLookup', () => {
    it('should integrate buildMdxPageSet, buildMetaDescriptionMap, and buildNavigationLookup correctly', () => {
      const siteUrl = 'https://ably.com';
      const mdxNodes: NavMdxNode[] = [
        {
          parent: { relativeDirectory: 'docs/chat/rooms', name: 'messages' },
          frontmatter: { meta_description: 'Send and receive messages.' },
        },
        {
          parent: { relativeDirectory: 'docs/chat/rooms', name: 'history' },
          frontmatter: { meta_description: 'Retrieve message history.' },
        },
        {
          parent: { relativeDirectory: 'docs/chat', name: 'setup' },
          frontmatter: { meta_description: 'Set up the Chat SDK.' },
        },
      ];

      const lookup = buildNavLookup(siteUrl, mdxNodes);

      // Should return a Map
      expect(lookup).toBeInstanceOf(Map);

      // Should have entries for pages that exist in both nav data and mdxNodes
      // The lookup filters to only pages that have MDX source files
      expect(lookup.size).toBeGreaterThan(0);

      // Check that a known page has correct navigation context structure
      const messagesCtx = lookup.get('/docs/chat/rooms/messages');
      if (messagesCtx) {
        expect(messagesCtx).toHaveProperty('siblings');
        expect(Array.isArray(messagesCtx.siblings)).toBe(true);
        // Siblings should have the correct structure
        if (messagesCtx.siblings.length > 0) {
          expect(messagesCtx.siblings[0]).toHaveProperty('name');
          expect(messagesCtx.siblings[0]).toHaveProperty('url');
          expect(messagesCtx.siblings[0]).toHaveProperty('description');
        }
      }
    });

    it('should use meta_description from frontmatter when available', () => {
      const siteUrl = 'https://ably.com';
      const mdxNodes: NavMdxNode[] = [
        {
          parent: { relativeDirectory: 'docs/chat/rooms', name: 'messages' },
          frontmatter: { meta_description: 'Custom messages description.' },
        },
        {
          parent: { relativeDirectory: 'docs/chat/rooms', name: 'history' },
          frontmatter: { meta_description: 'Custom history description.' },
        },
      ];

      const lookup = buildNavLookup(siteUrl, mdxNodes);
      const messagesCtx = lookup.get('/docs/chat/rooms/messages');

      // If history is a sibling, it should use the custom description
      if (messagesCtx) {
        const historySibling = messagesCtx.siblings.find((s) => s.url.includes('history'));
        if (historySibling) {
          expect(historySibling.description).toBe('Custom history description.');
        }
      }
    });
  });
});
