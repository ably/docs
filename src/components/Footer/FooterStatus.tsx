import React, { useEffect, useState } from 'react';
import Icon from '@ably/ui/core/Icon';
import { Link } from 'gatsby';
import cn from '@ably/ui/core/utils/cn';

const indicatorClass = (indicator: string) => {
  switch (indicator) {
    case 'none':
      return 'bg-status-operational';
    case 'operational':
      return 'bg-status-operational';
    case 'minor':
      return 'bg-status-minor';
    case 'major':
      return 'bg-status-major';
    case 'critical':
      return 'bg-status-critical';
    default:
      return 'bg-status-unknown';
  }
};

const Status = ({ statusUrl, additionalCSS }: { statusUrl: string; additionalCSS?: string }) => {
  const [data, setData] = useState<{ status?: { indicator: string } } | null>(null);

  additionalCSS ??= '';

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (statusUrl !== '') {
      const fetchData = async () => {
        try {
          const response = await fetch(statusUrl);
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching status data:', error);
        }
      };
      fetchData();
      interval = setInterval(fetchData, 60000); // Fetch data every minute
    }
    return () => {
      clearInterval(interval);
    };
  }, [statusUrl]);

  return (
    <a
      href="https://status.ably.com"
      className={cn('flex items-center justify-center', additionalCSS)}
      target="_blank"
      rel="noreferrer"
    >
      <span
        className={`w-8 h-8 rounded-full ${!data ? 'animate-pulse' : ''} ${indicatorClass(data?.status?.indicator || '')}`}
      ></span>
    </a>
  );
};

export const FooterStatus = () => (
  <div className="flex flex-1 justify-end items-center gap-x-8 h-40">
    <Status statusUrl="https://status.ably.com/api/v2/status.json" />
    <span className="ui-text-menu4 font-medium text-neutral-900">All systems operational</span>
    <a href="https://status.ably.com/" target="_blank" rel="noopener noreferrer">
      <Icon
        color="text-neutral-900"
        name="icon-gui-external-link-bolder"
        size="16px"
        additionalCSS="hover:text-neutral-1200"
      />
    </a>
  </div>
);
