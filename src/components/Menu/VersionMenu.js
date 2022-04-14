import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SmallMenuLabel } from './Label';
import { DOCUMENTATION_PATH, LATEST_ABLY_API_VERSION_STRING } from '../../../data/transform/constants';
import { navigate } from 'gatsby';
import { Warning } from '../Notifications';

const routeToPage = ({ value }) => {
  navigate(`${DOCUMENTATION_PATH}${value}`);
};

const VersionMenu = ({ versions, version, rootVersion }) => {
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
              control: (provided) => ({
                ...provided,
                width: '100px',
                border: 0,
                boxShadow: 'none',
                fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
                fontSize: '14px',
              }),
              option: (provided) => ({
                ...provided,
                cursor: 'pointer',
                width: '100px',
                border: 0,
                boxShadow: 'none',
                fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
                backgroundColor: 'transparent',
                fontSize: '14px',
                '&:hover': {
                  color: 'var(--color-gui-hover)',
                  backgroundColor: 'white',
                },
                '&:focus': {
                  color: 'var(--color-gui-hover)',
                  backgroundColor: 'white',
                },
                '&:target': {
                  color: 'var(--color-gui-hover)',
                  backgroundColor: 'white',
                },
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: 'var(--color-cool-black)',
                '&:hover': {
                  color: 'var(--color-gui-hover)',
                },
              }),
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
