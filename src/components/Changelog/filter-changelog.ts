import { ChangelogEntry } from './types';

// Pure filter used by the changelog index. An entry is kept when it matches one of
// the selected products, or when no product filter is active. Free-text search is
// intentionally not handled here — the changelog is covered by the site-wide
// (Inkeep) search, so the index only offers product tag filtering.
export const filterChangelog = (entries: ChangelogEntry[], selectedProducts: string[]): ChangelogEntry[] =>
  entries.filter(
    (entry) => selectedProducts.length === 0 || entry.products.some((product) => selectedProducts.includes(product)),
  );

// Newest first. Entries sharing a date are ordered by slug so the result is stable
// and deterministic across builds (dates are date-only, so same-day entries would
// otherwise inherit the arbitrary GraphQL query order). Unparseable dates sort last.
export const sortByDateDesc = (entries: ChangelogEntry[]): ChangelogEntry[] =>
  [...entries].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    const aInvalid = Number.isNaN(aTime);
    const bInvalid = Number.isNaN(bTime);
    // Valid dates sort before invalid ones.
    if (aInvalid !== bInvalid) {
      return aInvalid ? 1 : -1;
    }
    // Among valid dates, newest first.
    if (!aInvalid && bTime !== aTime) {
      return bTime - aTime;
    }
    // Tie (same day, or both undated): order by slug. Links are unique, so this
    // fully breaks the tie and keeps ordering stable from one build to the next.
    return a.link.localeCompare(b.link);
  });
