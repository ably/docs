import React from 'react';
import Link from '../Link';
import ChangelogTag from './ChangelogTag';
import { ChangelogEntry } from './types';
import { formatFullDate, toISODate } from './format-date';

// A single entry row: the full date in a left column, then the title (links to the
// entry page), product tags, and an excerpt on the right. Rows are separated by a
// horizontal rule via the list's `divide-y` in ChangelogTimeline.
const ChangelogEntryCard = ({ entry }: { entry: ChangelogEntry }) => (
  <li className="py-8 first:pt-0 last:pb-0">
    <Link to={entry.link} className="group flex flex-col gap-2 sm:flex-row sm:gap-10">
      {entry.date && (
        <time
          dateTime={toISODate(entry.date)}
          className="ui-text-p3 text-neutral-800 dark:text-neutral-500 sm:w-32 sm:shrink-0"
        >
          {formatFullDate(entry.date)}
        </time>
      )}
      <div className="flex-1 min-w-0 grid gap-2">
        <h3 className="ui-text-h4 text-neutral-1300 dark:text-neutral-000 group-hover:underline mb-0">{entry.title}</h3>
        {entry.products.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {entry.products.map((product) => (
              <ChangelogTag key={product} product={product} />
            ))}
          </div>
        )}
        {entry.description && (
          <p className="ui-text-p2 text-neutral-800 dark:text-neutral-500 line-clamp-3 mb-0">{entry.description}</p>
        )}
      </div>
    </Link>
  </li>
);

export default ChangelogEntryCard;
