import * as fs from 'fs';
import * as path from 'path';
import { CHANGELOG_ROOT } from './entries';

// The changelog `allFile` queries must scope to changelog MDX only. `graphql`
// requires a static string literal, so the `relativeDirectory` regex can't be
// shared as a constant and is hand-copied into each query. These guards fail the
// build if the two copies drift from each other or from CHANGELOG_ROOT — the
// failure mode the entries.ts comment warns about (index and feed sourcing
// different entry sets).
const QUERY_FILES = ['src/pages/docs/changelog/index.tsx', 'data/onPostBuild/changelogFeed.ts'];

const extractScopeRegex = (source: string): string | null => {
  const match = source.match(/relativeDirectory:\s*\{\s*regex:\s*"([^"]+)"\s*\}/);
  return match ? match[1] : null;
};

describe('changelog query scope', () => {
  const scopes = QUERY_FILES.map((file) => ({
    file,
    regex: extractScopeRegex(fs.readFileSync(path.join(process.cwd(), file), 'utf-8')),
  }));

  it.each(scopes)('$file has a relativeDirectory scope regex', ({ regex }) => {
    expect(regex).not.toBeNull();
  });

  it('uses an identical scope regex across every query', () => {
    const unique = new Set(scopes.map((s) => s.regex));
    expect(unique.size).toBe(1);
  });

  it('scopes to CHANGELOG_ROOT', () => {
    expect(scopes[0].regex).toContain(CHANGELOG_ROOT);
  });
});
