import { REALTIME_SDK_INTERFACE, REST_SDK_INTERFACE, SDK_INTERFACES } from '../../../data/createPages/constants';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Icon from '@ably/ui/core/Icon';
import languageLabels from '../../maps/language';

const SDKToolTip = ({ tooltip }: { tooltip: string }) => {
  const [tooltipHover, setTooltipHover] = useState(false);
  const showTooltipHover = useCallback(() => setTooltipHover(true), []);
  const hideTooltipHover = useCallback(() => setTooltipHover(false), []);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={tooltip}
      className="flex flex-row w-full justify-start mt-2"
      onMouseOver={showTooltipHover}
      onMouseOut={hideTooltipHover}
    >
      <Icon name="icon-gui-info" size="1.25rem" color="mid-grey" additionalCSS="mt-12 ml-16" />
      {tooltipHover ? (
        <aside
          className="w-240 max-w-240 absolute box-border
          whitespace-pre-wrap bg-white shadow-tooltip rounded border border-light-grey
          text-cool-black font-sans p-16 text-center text-p3 leading-5 cursor-default -ml-160 -mt-88"
        >
          {tooltip}
        </aside>
      ) : null}
    </div>
  );
};

const SDKInterfacePanel = ({
  selectedSDKInterfaceTab,
  setSelectedSDKInterfaceTab,
  sdkInterfaceAvailable = SDK_INTERFACES,
  setPreviousSDKInterfaceTab,
}: {
  selectedSDKInterfaceTab: string;
  setSelectedSDKInterfaceTab: Dispatch<SetStateAction<string>>;
  sdkInterfaceAvailable: string[];
  setPreviousSDKInterfaceTab: Dispatch<SetStateAction<string>>;
}) => {
  const handleTabChanges = (sdkInterface: string) => {
    setSelectedSDKInterfaceTab(sdkInterface);
    setPreviousSDKInterfaceTab(sdkInterface === REALTIME_SDK_INTERFACE ? REST_SDK_INTERFACE : REALTIME_SDK_INTERFACE);
  };

  return (
    <div className="bg-dark-grey border-charcoal-grey text-white border-b-4 rounded-t-lg flex justify-end">
      <menu
        data-testid="menuSDKInterface"
        className="flex md:overflow-x-auto pl-0 justify-end md:justify-start h-48 mr-16 my-0"
      >
        {sdkInterfaceAvailable.map((sdkInterface) => (
          <button
            key={sdkInterface}
            className={`font-medium font-sans focus:outline-none px-24 text-mid-grey ${
              selectedSDKInterfaceTab === sdkInterface ? 'bg-charcoal-grey' : ''
            }`}
            onClick={() => handleTabChanges(sdkInterface)}
          >
            {languageLabels[sdkInterface] ?? sdkInterface}
          </button>
        ))}
        <SDKToolTip tooltip="Tooltips display informative text when users hover over, focus on, or tap an element." />
      </menu>
    </div>
  );
};

export default SDKInterfacePanel;
