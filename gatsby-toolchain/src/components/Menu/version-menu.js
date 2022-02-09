import React from 'react';
import Select from 'react-select';
import { SmallMenuLabel } from './Label';
import { LATEST_ABLY_API_VERSION } from '../../../data/transform/constants';
import { navigate } from 'gatsby';

const routeToPage = ({ value }) => {
    navigate(`/documentation/${value}`);
};

const VersionMenu = ({ versions, version, rootVersion }) => {
    const latestOption = [{
        label: LATEST_ABLY_API_VERSION,
        value: rootVersion
    }];
    const options = latestOption.concat(
        versions.map(v => ({
        label: v.node.version,
        value: v.node.slug
    })));
    const currentValue = version ? { label: version, value: version } : latestOption;

    return  versions.length > 0 ? <>
        <SmallMenuLabel htmlFor={'version-menu'}>API Version:</SmallMenuLabel>
        <Select
            inputId={'version-menu'}
            value={currentValue}
            options={options}
            onChange={routeToPage}
        />
    </> : null;
}

export default VersionMenu;