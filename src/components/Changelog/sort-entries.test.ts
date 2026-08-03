import { sortByDateDesc } from './sort-entries';
import { ChangelogEntry } from './types';

const entries: ChangelogEntry[] = [
  {
    link: '/docs/changelog/a',
    title: 'AI Transport release v0.3.0',
    description: 'Declarative codec authoring and LiveObjects pass-through.',
    date: '2026-06-19',
    products: ['ai-transport'],
  },
  {
    link: '/docs/changelog/b',
    title: 'JS Client Library release v2.23.0',
    description: 'React channel hooks can infer the channel from ChannelProvider.',
    date: '2026-06-18',
    products: ['pub-sub'],
  },
  {
    link: '/docs/changelog/c',
    title: 'Improved visibility into LiveObjects',
    description: 'Realtime streaming of object operations in the dashboard.',
    date: '2026-06-09',
    products: ['liveobjects'],
  },
];

describe('sortByDateDesc', () => {
  it('orders entries newest first without mutating the input', () => {
    const input = [entries[2], entries[0], entries[1]];
    const sorted = sortByDateDesc(input);
    expect(sorted.map((e) => e.date)).toEqual(['2026-06-19', '2026-06-18', '2026-06-09']);
    expect(input.map((e) => e.date)).toEqual(['2026-06-09', '2026-06-19', '2026-06-18']);
  });

  const sameDay: ChangelogEntry[] = [
    { link: '/docs/changelog/2026/06/zephyr', title: 'Z', description: '', date: '2026-06-19', products: [] },
    { link: '/docs/changelog/2026/06/alpha', title: 'A', description: '', date: '2026-06-19', products: [] },
    { link: '/docs/changelog/2026/06/mango', title: 'M', description: '', date: '2026-06-19', products: [] },
  ];

  it('breaks same-day ties alphabetically by slug', () => {
    const sorted = sortByDateDesc(sameDay);
    expect(sorted.map((e) => e.link)).toEqual([
      '/docs/changelog/2026/06/alpha',
      '/docs/changelog/2026/06/mango',
      '/docs/changelog/2026/06/zephyr',
    ]);
  });

  it('is deterministic regardless of input order for same-day entries', () => {
    const a = sortByDateDesc(sameDay).map((e) => e.link);
    const b = sortByDateDesc([...sameDay].reverse()).map((e) => e.link);
    expect(a).toEqual(b);
  });

  it('sorts undated entries last (by slug among themselves)', () => {
    const mixed: ChangelogEntry[] = [
      { link: '/docs/changelog/x', title: 'X', description: '', date: '', products: [] },
      { link: '/docs/changelog/dated', title: 'D', description: '', date: '2026-06-19', products: [] },
      { link: '/docs/changelog/a', title: 'A', description: '', date: '', products: [] },
    ];
    expect(sortByDateDesc(mixed).map((e) => e.link)).toEqual([
      '/docs/changelog/dated',
      '/docs/changelog/a',
      '/docs/changelog/x',
    ]);
  });
});
