import React from 'react';
import Select from 'react-select';
import { SmallMenuLabel } from './Label';
import { DOCUMENTATION_PATH, LATEST_ABLY_API_VERSION_STRING } from '../../../data/transform/constants';
import { Warning } from '../Notifications';
import { routeToPage } from './route-to-page';
import { dropdownIndicatorStyles } from './ReactSelectStyles/dropdown-indicator-styles';
import { optionStyles } from './ReactSelectStyles/option-styles';
import { controlStyles } from './ReactSelectStyles/control-styles';
import { noIndicatorSeparator } from './ReactSelectCustomComponents/no-indicator-separator';
import { groupHeadingStyles } from './ReactSelectStyles/group-heading-styles';
import { menuListStyles } from './ReactSelectStyles/menu-list-styles';

type PageVersion = {
  node: {
    version: string;
    slug: string;
  };
};

export type VersionData = {
  versions: PageVersion[];
  version: string;
  rootVersion: string;
};

const VersionMenu = ({ versions, version, rootVersion }: VersionData) => {
  const latestOption = [
    {
      label: LATEST_ABLY_API_VERSION_STRING,
      value: rootVersion,
    },
  ];
  const options = versions
    .map((v) => ({
      label: v.node.version,
      value: v.node.slug,
    }))
    .sort((a, b) => parseFloat(b.label) - parseFloat(a.label));
  const currentValue = version ? { label: `API v ${version}`, value: version } : latestOption[0];

  return (
    <>
      {versions.length > 0 && (
        <div className="flex justify-end items-center col-span-1">
          {version && version !== LATEST_ABLY_API_VERSION_STRING && (
            <Warning
              message={` Version ${version}. We recommend `}
              linkText={`the latest version, ${LATEST_ABLY_API_VERSION_STRING}`}
              href={`${DOCUMENTATION_PATH}${rootVersion}`}
            />
          )}
          <Select
            components={noIndicatorSeparator}
            isSearchable={false}
            classNamePrefix="react-select"
            menuPosition="fixed"
            styles={{
              control: controlStyles({ width: '96px', border: '0', boxShadow: 'none' }),
              option: optionStyles({ width: '128px' }),
              dropdownIndicator: dropdownIndicatorStyles,
              groupHeading: groupHeadingStyles,
              menuList: menuListStyles,
            }}
            inputId={'version-menu'}
            value={currentValue}
            options={options}
            onChange={routeToPage}
          />
        </div>
      )}
    </>
  );
};

export default VersionMenu;
