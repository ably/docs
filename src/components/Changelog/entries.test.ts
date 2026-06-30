import { isChangelogEntryNode, nodesToEntries, ChangelogFileNode } from './entries';

const node = (
  overrides: Partial<ChangelogFileNode> & { name: string; relativeDirectory: string },
): ChangelogFileNode => ({
  childMdx: {
    frontmatter: { title: 'Some entry', meta_description: 'A description', date: '2026-06-19', products: ['pub-sub'] },
  },
  ...overrides,
});

describe('isChangelogEntryNode', () => {
  it('accepts a nested entry with a title', () => {
    expect(isChangelogEntryNode(node({ name: 'js-sdk-2-23-0', relativeDirectory: 'docs/changelog/2026/06' }))).toBe(
      true,
    );
  });

  it('accepts an entry placed directly under docs/changelog', () => {
    expect(isChangelogEntryNode(node({ name: 'an-entry', relativeDirectory: 'docs/changelog' }))).toBe(true);
  });

  it('rejects a directory index', () => {
    expect(isChangelogEntryNode(node({ name: 'index', relativeDirectory: 'docs/changelog' }))).toBe(false);
  });

  it('rejects files outside docs/changelog', () => {
    expect(isChangelogEntryNode(node({ name: 'messages', relativeDirectory: 'docs/chat/rooms' }))).toBe(false);
    expect(isChangelogEntryNode(node({ name: 'x', relativeDirectory: 'docs/changelog-archive' }))).toBe(false);
  });

  it('rejects a node without a childMdx or title', () => {
    expect(isChangelogEntryNode({ name: 'x', relativeDirectory: 'docs/changelog', childMdx: null })).toBe(false);
    expect(
      isChangelogEntryNode(
        node({
          name: 'x',
          relativeDirectory: 'docs/changelog',
          childMdx: { frontmatter: { title: null, meta_description: null, date: null, products: null } },
        }),
      ),
    ).toBe(false);
  });
});

describe('nodesToEntries', () => {
  it('filters non-entries and builds the site path from the file location', () => {
    const entries = nodesToEntries([
      node({ name: 'js-sdk-2-23-0', relativeDirectory: 'docs/changelog/2026/06' }),
      node({ name: 'index', relativeDirectory: 'docs/changelog' }),
      node({ name: 'messages', relativeDirectory: 'docs/chat/rooms' }),
    ]);
    expect(entries).toEqual([
      {
        link: '/docs/changelog/2026/06/js-sdk-2-23-0',
        title: 'Some entry',
        description: 'A description',
        date: '2026-06-19',
        products: ['pub-sub'],
      },
    ]);
  });

  it('defaults missing optional frontmatter', () => {
    const [entry] = nodesToEntries([
      node({
        name: 'minimal',
        relativeDirectory: 'docs/changelog/2026/06',
        childMdx: { frontmatter: { title: 'Minimal', meta_description: null, date: null, products: null } },
      }),
    ]);
    expect(entry).toEqual({
      link: '/docs/changelog/2026/06/minimal',
      title: 'Minimal',
      description: '',
      date: '',
      products: [],
    });
  });
});
