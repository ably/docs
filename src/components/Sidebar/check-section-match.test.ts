import { Arbitrary, array, assert, constant, letrec, nat, oneof, property, record, string } from 'fast-check';
import { checkSectionMatch } from './check-section-match';
import { SidebarData } from './types';

const simpleSectionMatch = checkSectionMatch('/docs/match');

describe('Check Section Matches function', () => {
  it('Matches on a simple slug', () =>
    expect(
      simpleSectionMatch({
        label: 'Test Data',
        link: '/docs/match',
      }),
    ).toBe(true));
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
});

const sidebarDataArbitraryWithMatchingLink: Arbitrary<SidebarData> = record({
  label: string(),
  link: constant('/docs/match'),
  level: nat(),
  content: constant(undefined),
});

const sidebarDataArbitraryTreeWithMatchingLink = letrec((tie) => {
  const sidebarNode = <Arbitrary<SidebarData>>tie('node');
  return {
    node: record({
      label: string(),
      link: string().filter((s) => s !== '/docs/match'),
      level: nat(),
      content: oneof(
        { depthIdentifier: 'node', maxDepth: 5 },
        array(sidebarDataArbitraryWithMatchingLink, { minLength: 1, maxLength: 20, depthIdentifier: 'node' }),
        array(sidebarNode, { minLength: 1, maxLength: 20, depthIdentifier: 'node' }),
      ),
    }),
  };
}).node;

const sidebarDataArbitraryTreeWithoutMatchingLink = letrec<{
  node: SidebarData;
}>((tie) => {
  const sidebarNode = <Arbitrary<SidebarData>>tie('node');

  return {
    node: record({
      label: string(),
      link: string().filter((s) => s !== '/docs/match'),
      level: nat(),
      content: oneof(
        { depthIdentifier: 'node', maxDepth: 5 },
        constant(undefined),
        array(sidebarNode, { minLength: 1, maxLength: 3, depthIdentifier: 'node' }),
      ),
    }),
  };
}).node;

describe('Property test of Check Section Matches function', () => {
  it('Matches when sidebar data contains a link', () => {
    assert(
      property(sidebarDataArbitraryTreeWithMatchingLink, (sidebarData: SidebarData) =>
        expect(simpleSectionMatch(sidebarData)).toBe(true),
      ),
    );
  });
  it('Does not match when sidebar data does not contain a link', () => {
    assert(
      property(sidebarDataArbitraryTreeWithoutMatchingLink, (sidebarData: SidebarData) =>
        expect(simpleSectionMatch(sidebarData)).toBe(false),
      ),
    );
  });
});
