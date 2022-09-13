import React, { useState } from 'react';
import Icon from '@ably/ui/core/Icon';

const APIKeyIndicator = ({ tooltip }: { tooltip: string }) => {
  const [tooltipHover, setTooltipHover] = useState<boolean>(false);
  return (
    <div
      className="flex flex-row w-full justify-start mt-2"
      onMouseOver={() => setTooltipHover(true)}
      onMouseOut={() => setTooltipHover(false)}
    >
      <div className="docs-api-key-label" title={tooltip}>
        Demo Only
      </div>
      <Icon additionalCSS="ml-4 cursor-help" name="icon-gui-info" size="1rem" />
      {tooltipHover ? (
        <aside
          className="w-240 max-w-240 absolute -mt-140 box-border
          whitespace-pre-wrap bg-white shadow-tooltip rounded border border-light-grey
          text-cool-black font-sans p-16 text-center text-p3 leading-5 cursor-default"
        >
          {tooltip}
        </aside>
      ) : null}
    </div>
  );
};

export default APIKeyIndicator;
