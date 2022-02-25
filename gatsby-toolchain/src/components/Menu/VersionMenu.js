import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SmallMenuLabel } from './Label';
import { LATEST_ABLY_API_VERSION_STRING } from '../../../data/transform/constants';
import { navigate } from 'gatsby';
import { Warning } from '../Notifications';

const routeToPage = ({ value }) => {
  navigate(`/documentation/${value}`);
};

const VersionMenu = ({ versions, version, rootVersion }) => {
  const latestOption = [
    {
      label: LATEST_ABLY_API_VERSION_STRING,
      value: rootVersion,
    },
  ];
  const options = latestOption.concat(
    versions.map((v) => ({
      label: v.node.version,
      value: v.node.slug,
    })),
  );
  const currentValue = version ? { label: version, value: version } : latestOption;

  return (
    <div>
      {versions.length > 0 && (
        <>
          <SmallMenuLabel htmlFor={'version-menu'}>API Version:</SmallMenuLabel>
          <Select inputId={'version-menu'} value={currentValue} options={options} onChange={routeToPage} />
        </>
      )}
      {version && version !== LATEST_ABLY_API_VERSION_STRING && (
        <Warning
          message={`You are viewing an old version (${version}) of this documentation. We recommend you `}
          linkText={`view the latest version, ${LATEST_ABLY_API_VERSION_STRING}`}
          href={`/documentation/${rootVersion}`}
        />
      )}
    </div>
  );
};

VersionMenu.propTypes = {
  versions: PropTypes.array,
  version: PropTypes.string,
  rootVersion: PropTypes.string,
};

export default VersionMenu;
