import { REALTIME_SDK_INTERFACE, REST_SDK_INTERFACE, SDK_INTERFACES } from '../../../data/createPages/constants';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Icon from '@ably/ui/core/Icon';
import { languageLabel } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';

const SDKToolTip = ({ tooltip }: { tooltip: string }) => {
  const [tooltipHover, setTooltipHover] = useState(false);
  const showTooltipHover = useCallback(() => setTooltipHover(true), []);
  const hideTooltipHover = useCallback(() => setTooltipHover(false), []);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={tooltip}
      className="flex flex-row w-full justify-start mt-0.5"
      onMouseOver={showTooltipHover}
      onMouseOut={hideTooltipHover}
    >
      <Icon
        name="icon-gui-information-circle-outline"
        size="1.25rem"
        color="text-neutral-500"
        additionalCSS="mt-3 ml-4"
      />
      {tooltipHover ? (
        <aside
          className="w-60 max-w-60 absolute box-border
          whitespace-pre-wrap bg-white shadow-tooltip rounded border border-light-grey
          p-4 text-center ui-text-p3 cursor-default -ml-40 -mt-[5.5rem]"
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
        className="flex md:overflow-x-auto pl-0 justify-end md:justify-start h-12 mr-4 my-0"
      >
        {sdkInterfaceAvailable.map((sdkInterface) => (
          <button
            key={sdkInterface}
            className={`font-medium font-sans focus:outline-none px-6 text-mid-grey ${
              selectedSDKInterfaceTab === sdkInterface ? 'bg-charcoal-grey' : ''
            }`}
            onClick={() => handleTabChanges(sdkInterface)}
          >
            {languageLabel(sdkInterface as LanguageKey) ?? sdkInterface}
          </button>
        ))}
        <SDKToolTip tooltip="Ably SDKs may contain a realtime and a REST interface, each of which satisfy different use cases." />
      </menu>
    </div>
  );
};

export default SDKInterfacePanel;
