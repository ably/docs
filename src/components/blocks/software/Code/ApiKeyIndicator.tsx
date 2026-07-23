import React, { useCallback, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/16/solid';

type ApiKeyIndicatorProps = { tooltip: string };

const APIKeyIndicator = ({ tooltip }: ApiKeyIndicatorProps) => {
  const [tooltipHover, setTooltipHover] = useState(false);
  const showTooltipHover = useCallback(() => setTooltipHover(true), []);
  const hideTooltipHover = useCallback(() => setTooltipHover(false), []);
  return (
    <div
      className="flex flex-row w-full justify-start mt-0.5"
      onMouseOver={showTooltipHover}
      onMouseOut={hideTooltipHover}
    >
      <div className="docs-api-key-label" title={tooltip}>
        Demo Only
      </div>
      <InformationCircleIcon className="size-[1rem] ml-1 cursor-help" aria-hidden />
      {tooltipHover ? (
        <aside
          className="w-60 max-w-60 absolute -mt-[8.75rem] box-border
          whitespace-pre-wrap bg-white dark:bg-neutral-1200 shadow-tooltip rounded border border-neutral-300 dark:border-neutral-1100
          text-cool-black dark:text-neutral-000 font-sans p-4 text-center text-p3 leading-5 cursor-default"
        >
          {tooltip}
        </aside>
      ) : null}
    </div>
  );
};

export default APIKeyIndicator;
