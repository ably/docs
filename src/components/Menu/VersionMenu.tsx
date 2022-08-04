import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SmallMenuLabel } from './Label';
import { DOCUMENTATION_PATH, LATEST_ABLY_API_VERSION_STRING } from '../../../data/transform/constants';
import { Warning } from '../Notifications';
import { routeToPage } from './route-to-page';
import { containerListStyles } from './ReactSelectStyles/container-styles';
import { dropdownIndicatorStyles } from './ReactSelectStyles/dropdown-indicator-styles';
import { optionStyles } from './ReactSelectStyles/option-styles';
import { controlStyles } from './ReactSelectStyles/control-styles';

type PageVersion = {
  node: {
    version: string;
    slug: string;
  };
};

const VersionMenu = ({
  versions,
  version,
  rootVersion,
}: {
  versions: PageVersion[];
  version: string;
  rootVersion: string;
}) => {
  const latestOption = [
    {
      label: LATEST_ABLY_API_VERSION_STRING,
      value: rootVersion,
    },
  ];
  const options = latestOption
    .concat(
      versions.map((v) => ({
        label: v.node.version,
        value: v.node.slug,
      })),
    )
    .sort((a, b) => parseFloat(b.label) - parseFloat(a.label));
  const currentValue = version ? { label: version, value: version } : latestOption[0];

  return (
    <>
      {versions.length > 0 && (
        <div className="flex justify-end items-center col-span-1 mb-40">
          <SmallMenuLabel htmlFor={'version-menu'}>API Version:</SmallMenuLabel>
          <Select
            components={{ IndicatorSeparator: () => null }}
            classNamePrefix="react-select"
            styles={{
              control: controlStyles({ width: '100px' }),
              option: optionStyles({ width: '100px' }),
              dropdownIndicator: dropdownIndicatorStyles,
              container: containerListStyles,
            }}
            inputId={'version-menu'}
            value={currentValue}
            options={options}
            onChange={routeToPage}
          />
        </div>
      )}
      {version && version !== LATEST_ABLY_API_VERSION_STRING && (
        <Warning
          message={` You are viewing an old version (${version}) of this documentation. We recommend you `}
          linkText={`view the latest version, ${LATEST_ABLY_API_VERSION_STRING}`}
          href={`${DOCUMENTATION_PATH}${rootVersion}`}
        />
      )}
    </>
  );
};

VersionMenu.propTypes = {
  versions: PropTypes.array,
  version: PropTypes.string,
  rootVersion: PropTypes.string,
};

export default VersionMenu;
