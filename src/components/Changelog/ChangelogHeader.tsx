import React from 'react';
import Icon from '@ably/ui/core/Icon';
import Link from '../Link';
import { formatFullDate, toISODate } from './format-date';

// Header rendered at the top of an individual changelog entry page, in place of
// the standard doc PageHeader. Shows a back-link, the title, and the publish date.
const ChangelogHeader = ({ title, date }: { title: string; date?: string }) => (
  <div className="my-8 border-b border-neutral-300 dark:border-neutral-1000 pb-8">
    <Link to="/docs/changelog" className="flex gap-1 items-center mb-5">
      <Icon name="icon-gui-chevron-left-micro" size="16px" />
      <span className="ui-text-menu4 text-neutral-900 dark:text-neutral-400 font-semibold">All updates</span>
    </Link>
    <h1 className="ui-text-h1 mb-4">{title}</h1>
    {date && (
      <time dateTime={toISODate(date)} className="ui-text-p3 block font-medium text-neutral-800 dark:text-neutral-500">
        {formatFullDate(date)}
      </time>
    )}
  </div>
);

export default ChangelogHeader;
