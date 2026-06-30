import React from 'react';
import ChangelogEntryCard from './ChangelogEntryCard';
import { ChangelogEntry } from './types';

// Reverse-chronological list of entries (already sorted newest-first by the index
// page). Each entry is a row showing its own full date; rows are separated by a
// horizontal rule via `divide-y`.
const ChangelogTimeline = ({ entries }: { entries: ChangelogEntry[] }) => {
  if (entries.length === 0) {
    return <p className="ui-text-p1 text-neutral-800 dark:text-neutral-500">No updates match your filters.</p>;
  }

  return (
    <ul className="flex flex-col list-none pl-0 mb-0 divide-y divide-neutral-300 dark:divide-neutral-1000">
      {entries.map((entry) => (
        <ChangelogEntryCard key={entry.link} entry={entry} />
      ))}
    </ul>
  );
};

export default ChangelogTimeline;
