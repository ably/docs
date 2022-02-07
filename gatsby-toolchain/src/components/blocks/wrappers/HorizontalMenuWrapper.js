import React from 'react';
import { HorizontalCodeMenu } from '../../Menu';
import MenuLabel from '../../Menu/Label';
import MenuItem from '../../Menu/MenuItem';

const HorizontalMenuWrapper = ({ label, items, children }) => <>
    <HorizontalCodeMenu>
            { label && <MenuLabel>{label}</MenuLabel> }
            {
                items.map(({ Component, props, content }, index) => <MenuItem key={index}>
                    <Component {...props}>
                        {content}
                    </Component>
                </MenuItem>)
            }
    </HorizontalCodeMenu>
    {children}
</>;

export default HorizontalMenuWrapper;