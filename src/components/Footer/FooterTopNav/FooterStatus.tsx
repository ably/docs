import React, { useEffect, useState } from 'react';
import FeaturedLink from '@ably/ui/core/FeaturedLink';

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
  const [data, setData] = useState<string | null>(null);

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
    <a href="https://status.ably.com" className={`inline-block ${additionalCSS}`} target="_blank" rel="noreferrer">
      <span className="flex items-center h-30 w-30">
        <span
          className={`w-22 h-22 rounded-full ${!data ? 'animate-pulse' : ''} ${indicatorClass(data?.status?.indicator)}`}
        ></span>
      </span>
    </a>
  );
};

export const FooterStatus = () => (
  <>
    <div className="flex flex-row mt-24 -mb-6">
      <Status statusUrl="https://status.ably.com/api/v2/status.json" additionalCSS="-mt-4" />
      <span className="pl-4 font-bold">System status</span>
    </div>
    <FeaturedLink url="https://status.ably.com/" textSize="text-p3">
      <span className="pl-4 ml-30">More on our status site</span>
    </FeaturedLink>
  </>
);
