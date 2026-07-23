import React from 'react';
import useSWR from 'swr';
import cn from 'src/utilities/cn';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

type StatusProps = {
  statusUrl: string;
  additionalCSS?: string;
  refreshInterval?: number;
  showDescription?: boolean;
};

export const statusTypes = ['none', 'operational', 'minor', 'major', 'critical', 'unknown'] as const;

export type StatusType = (typeof statusTypes)[number];

export const StatusUrl = 'https://ntqy1wz94gjv.statuspage.io/api/v2/status.json';

// Our SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const indicatorClass = (indicator?: StatusType) => {
  switch (indicator) {
    case 'none':
    case 'operational':
      return 'bg-gui-success-green';
    case 'minor':
      return 'bg-yellow-500';
    case 'major':
      return 'bg-orange-500';
    case 'critical':
      return 'bg-gui-error-red';
    default:
      return 'bg-neutral-500';
  }
};

export const StatusIcon = ({ statusUrl, refreshInterval = 1000 * 60 }: StatusProps) => {
  const { data, error, isLoading } = useSWR(statusUrl, fetcher, {
    refreshInterval,
  });

  return (
    <span
      className={cn('inline-flex h-2 aspect-square rounded-full', indicatorClass(data?.status?.indicator), {
        'animate-pulse': isLoading || error,
      })}
    ></span>
  );
};

const Status = ({
  statusUrl = StatusUrl,
  additionalCSS,
  refreshInterval = 1000 * 60,
  showDescription = false,
}: StatusProps) => {
  const { data } = useSWR(statusUrl, fetcher, {
    refreshInterval,
  });

  return (
    <a
      href="https://status.ably.com"
      className={cn('inline-flex group/status items-center gap-2', additionalCSS)}
      target="_blank"
      rel="noreferrer"
    >
      <StatusIcon statusUrl={statusUrl} refreshInterval={refreshInterval ?? 1000 * 60} />
      {showDescription && data?.status?.description && (
        <div className="flex gap-2 ui-text-label4 font-medium text-neutral-900 group-hover/status:text-neutral-1300 dark:text-neutral-400 dark:group-hover/status:text-neutral-000 transition-colors">
          <span>
            {data.status.description.charAt(0).toUpperCase() + data.status.description.slice(1).toLowerCase()}
          </span>
          <ArrowTopRightOnSquareIcon className="size-4" aria-hidden />
        </div>
      )}
    </a>
  );
};

export default Status;
