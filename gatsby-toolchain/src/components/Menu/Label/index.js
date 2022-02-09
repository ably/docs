import React from 'react';
import styled from 'styled-components';
import { primary } from '../../../styles/colors';

/**
 * This can be moved to a styled component if wanted, the CSS class approach is retained in keeping
 * with the previous codebase & website
 */
const MenuLabel = ({ children }) => <li className='c-menu__item c-menu__label'>{children}</li>;

const SmallMenuLabel = styled.span`
    vertical-align: middle;
    font-weight: 700;
    font-size: 12px;
    margin-right: 0;
    color: ${primary.charcoal}
`;

export {
    SmallMenuLabel
};
export default MenuLabel;