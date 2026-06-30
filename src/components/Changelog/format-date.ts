// Date helpers for the changelog. Entries store an ISO date string in frontmatter.
//
// All helpers format in UTC. A date-only ISO string ("2026-06-08") parses as UTC
// midnight, so display formatting must also use `timeZone: 'UTC'` — otherwise the
// human-readable date, the month grouping key, and the <time> datetime can disagree
// by a day in non-UTC timezones (and SSR/client hydration would mismatch).

// Full date used as the timeline group header, e.g. "19 June 2026".
export const formatFullDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
};

// Compact date for the homepage widget, e.g. "19 Jun".
export const formatShortDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
};

// Machine-readable date (YYYY-MM-DD) for the <time> element's datetime attribute.
export const toISODate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toISOString().slice(0, 10);
};
