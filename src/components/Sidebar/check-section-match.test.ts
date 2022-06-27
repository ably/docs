import { Arbitrary, array, assert, constant, letrec, nat, oneof, property, record, string } from 'fast-check';
import { checkSectionMatch } from './check-section-match';
import { SidebarData } from './sidebar-data';

const simpleSectionMatch = checkSectionMatch('/docs/match');

describe('Check Section Matches function', () => {
  it('Matches on a simple slug', () =>
    expect(
      simpleSectionMatch({
        label: 'Test Data',
        link: '/docs/match',
      }),
    ).toBe(true));
  it('Does not match on a simple absence of slug', () =>
    expect(
      simpleSectionMatch({
        label: 'Test Data',
      }),
    ).toBe(false));
  it('Does not match on a non-matching slug', () =>
    expect(
      simpleSectionMatch({
        label: 'Test Data',
        link: '/docs/match/overly-specific-page',
      }),
    ).toBe(false));

  it('Matches on a nested slug', () =>
    expect(
      simpleSectionMatch({
        label: 'Test Data',
        link: '/docs',
        content: [
          {
            label: 'Test Data Two',
            link: '/docs/match',
          },
        ],
      }),
    ).toBe(true));
  it('Does not match without a nested slug', () =>
    expect(
      simpleSectionMatch({
        label: 'Test Data',
        link: '/docs',
        content: [
          {
            label: 'Test Data Two',
            link: '/docs/no-match',
          },
          {
            label: 'Test Data Two',
          },
        ],
      }),
    ).toBe(false));
});

const sidebarDataArbitraryWithMatchingLink: Arbitrary<SidebarData> = record({
  label: string(),
  link: constant('/docs/match'),
  level: nat(),
  content: constant(undefined),
});

const sidebarDataArbitraryTreeWithMatchingLink = letrec((tie) => ({
  node: record({
    label: string(),
    link: string().filter((s) => s !== '/docs/match'),
    level: nat(),
    content: oneof(
      { maxDepth: 5 },
      array(sidebarDataArbitraryWithMatchingLink, { minLength: 1, maxLength: 5 }),
      array(tie('node'), { minLength: 1, maxLength: 5 }),
    ),
  }),
})).node;

describe('Property test of Check Section Matches function', () => {
  it('Matches when sidebar data contains a link', () => {
    assert(
      // @ts-ignore
      property(sidebarDataArbitraryTreeWithMatchingLink, (sidebarData: SidebarData) =>
        expect(simpleSectionMatch(sidebarData)).toBe(true),
      ),
    );
  });
  it('Does not match when sidebar data does not contain a link', () => {});
});
