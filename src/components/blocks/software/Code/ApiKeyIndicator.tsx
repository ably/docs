import React, { useCallback, useState } from 'react';
import Icon from '@ably/ui/core/Icon';

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
      <Icon additionalCSS="ml-1 cursor-help" name="icon-gui-information-circle-micro" size="1rem" />
      {tooltipHover ? (
        <aside
          className="w-60 max-w-60 absolute -mt-[8.75rem] box-border
          whitespace-pre-wrap bg-white shadow-tooltip rounded border border-light-grey
          text-cool-black font-sans p-4 text-center text-p3 leading-5 cursor-default"
        >
          {tooltip}
        </aside>
      ) : null}
    </div>
  );
};

export default APIKeyIndicator;
