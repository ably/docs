import React from 'react';
import { HorizontalCodeMenu } from '.';
import MenuLabel from './Label';
import MenuItem from './MenuItem';

const HorizontalMenu = ({ label, items }) => <HorizontalCodeMenu>
    { label && <MenuLabel>{label}</MenuLabel> }
    {
        items.map(({ Component, props, content }, index) => <MenuItem key={index}>
            <Component {...props}>
                {content}
            </Component>
        </MenuItem>)
    }
</HorizontalCodeMenu>;

export default HorizontalMenu;