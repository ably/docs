import React from 'react';
import Select from 'react-select';
import { DOCUMENTATION_PATH, LATEST_ABLY_API_VERSION_STRING } from '../../../data/transform/constants';
import { Warning } from '../Notifications';
import { routeToPage } from './route-to-page';
import { dropdownIndicatorStyles } from './ReactSelectStyles/dropdown-indicator-styles';
import { optionStyles } from './ReactSelectStyles/option-styles';
import { controlStyles } from './ReactSelectStyles/control-styles';
import { noIndicatorSeparator } from './ReactSelectCustomComponents/no-indicator-separator';
import { groupHeadingStyles } from './ReactSelectStyles/group-heading-styles';
import { menuListStyles } from './ReactSelectStyles/menu-list-styles';
import { noPaddingValueContainerStyles } from './ReactSelectStyles/Versions/no-padding-value-container-styles';
import { ReactSelectOption } from './react-select-option-types';

type PageVersion = {
  node: {
    version: string;
    slug: string;
  };
};

export type VersionMenuProps = {
  versions: PageVersion[];
  version: string;
  rootVersion: string;
};

const versionToOption = (v: PageVersion) => ({
  label: v.node.version,
  value: v.node.slug,
});

const parseAndCompareOptionLabelFloats = (a: ReactSelectOption, b: ReactSelectOption) =>
  parseFloat(b.label) - parseFloat(a.label);

const getRootVersionOption = (rootVersion: string, prefix?: boolean) => ({
  label: `${prefix ? 'API v ' : ''}${LATEST_ABLY_API_VERSION_STRING}`,
  value: rootVersion,
});

const versionsToSortedOptions = (versions: PageVersion[], rootVersion: string) =>
  versions
    .map(versionToOption)
    .concat([getRootVersionOption(rootVersion)])
    .sort(parseAndCompareOptionLabelFloats);

const getCurrentVersionOrRootVersion = (version: string, rootVersion: string) =>
  version ? { label: `API v ${version}`, value: version } : getRootVersionOption(rootVersion, true);

const VersionMenu = ({ versions, version, rootVersion }: VersionMenuProps) => {
  const options = versionsToSortedOptions(versions, rootVersion);
  const currentValue = getCurrentVersionOrRootVersion(version, rootVersion);

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
              valueContainer: noPaddingValueContainerStyles,
            }}
            inputId={'version-menu'}
            value={currentValue}
            options={[
              {
                label: 'Version:',
                options: options,
              },
            ]}
            onChange={routeToPage}
          />
        </div>
      )}
    </>
  );
};

export default VersionMenu;
